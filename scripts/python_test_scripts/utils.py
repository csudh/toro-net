import requests
import random
import json

BASE = "https://randomapi.com/api/"
REF_ID = "n053huo0"
KEY = "G8PV-S739-BB8H-VCUQ"
FMT = "prettyjson"


def get_random_user(num_users=1):
    """
    Uses the random API to generate a random toro-net user. Using free-tier of API so num_users can be at most 10.
    :param num_users: the number of users to generate
    :return: a list of json objects containing the user information
    """
    if num_users > 10 or num_users < 1:
        raise ValueError("Parameter num_users is should be in range [1, 10]")

    url = BASE + REF_ID + "?key=" + KEY + "&fmt=" + FMT + "&results=" + str(num_users)
    req = requests.get(url)

    if req.status_code == 200:
        json_data = json.loads(req.text)
        return json_data["results"]
    else:
        raise ConnectionError("API returned status code: {}".format(req.status_code))


def add_users(url, user_list):
    """
    Iterates through the list of users provided and calls the url given to add the user using the appropriate
    toro-net API endpoint.
    :param url: the url route for the add user endpoint
    :param user_list: a list of encoded user objects
    :return: None
    """
    for usr in user_list:
        post_req = requests.post(url, data={
            'displayName': usr['displayName'],
            'email': usr['email'],
            'username': usr['username'],
            'password': usr['password']
        })
        if post_req.status_code != 200:
            print("Failed to add user: {}".format(usr['displayName']))
        else:
            print(post_req.status_code)


def create_friendships(url, user_list, friend_prob=0.50):
    """
    Creates friendships between NEWLY created users. Will add functionality to add friendships between existing users
    in the future.

    :param friend_prob: the probability that any two users will be friends [0.0, 1.0)
    :param url: the url route for the add friend endpoint
    :param user_list: a list of encoded user objects
    :return: None
    """
    friendship_pairs = gen_friendships(user_list, friend_prob)
    for friendship in friendship_pairs:
        f1, f2 = user_list[friendship[0]], user_list[friendship[1]]
        post_req = requests.post(url, data={
            'sUsername': f1['username'],
            'tUsername': f2['username']
        })
        if post_req.status_code != 200:
            print("Friendship {} <-> {} failed.".format(f1['username'], f2['username']))
        else:
            print(post_req.status_code)


def gen_friendships(user_list, friend_prob=0.50):
    """
    Creates a list of indices from the input list that represent friendships between the users in those
    indices.

    :param user_list: a list of encoded user objects
    :param friend_prob: the probability that any two users will be friends [0.0, 1.0)
    :return: a list of tuples
    """
    friend_pairs = []
    for i1 in range(0, len(user_list)):
        for i2 in range(i1 + 1, len(user_list)):
            if random.random() >= friend_prob:
                friend_pairs.append([i1, i2])
    return friend_pairs

def test_shortestpath(url):
    post_req = requests.get(url)
    if post_req.status_code != 200:
        print("cool")
    else:
        print(post_req.status_code)


new_users = get_random_user(num_users=5)
add_users(url='http://localhost:3000/users/register', user_list=new_users)
create_friendships(url='http://localhost:3000/users/add/friend', user_list=new_users, friend_prob=0.50)
#test_shortestpath(url='http://localhost:3000/users/list/friend/shortest/Piper36/Lela98')
