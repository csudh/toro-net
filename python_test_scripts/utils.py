import requests
import json

BASE = "https://randomapi.com/api/"
REF_ID = "gshexzje"
KEY = "O38S-58YS-9YK7-AK1D"
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

new_users = get_random_user(num_users=1)
add_users(url='http://localhost:3000/users/register', user_list=new_users)
