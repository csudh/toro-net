# toro-net

social networking bulletin board system

## Team Structure

- Architecture Team @mattlevan
- Backend @janani1989
- Frontend @maefranco
- Requirements @felixwhwang
- Testing @juancleon
- DeOps @john-csudh

## Getting Started

These instructions will get you a copy of the project up and running on your local machine 
for development and testing purposes. See deployment for notes on how to deploy the project 
on a live system.

### Prerequisites

* `git`
* NodeJS 8.4.0 or greater
  * [Linux](https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions)
  * [Windows or macOS](https://nodejs.org/en/download/))
* `npm` 5.3.0 or greater
* The following npm modules (installed with `npm install -g <module name>`; prepend `sudo` if on Linux or macOS):
  * `gulp`
  * `babel`
  * `yarn`
* Docker
  * [Windows](https://www.docker.com/docker-windows)
  * [macOS](https://www.docker.com/docker-mac) 
  * [Ubuntu](https://www.docker.com/docker-ubuntu))
* `docker-compose` (comes bundled with Docker)

### Installing

A step by step series of examples that tell you have to get a development environment running. Make sure to 
follow the correct instructions, depending on whether you're a team leader or a team member.

#### Team Leaders

After installing the prerequisite software, fork the [`csudh/toro-net`](https://github.com/csudh/toro-net) 
repository by clicking the "Fork" button on the top right of [the GitHub page](https://github.com/csudh/toro-net).  

After forking the repository, your GitHub account will now have a copy of the repository within it. Clone it to 
your local machine. Make sure to replace `<your user name>` with your actual GitHub user name. For example, Wenhao's
URL to clone is: https://github.com/felixwhwang/toro-net. 
```
git clone https://github.com/<your user name>/toro-net
```

Ok, now you should have a local copy of the forked repository. Only the team leaders should fork the main
`csudh/toro-net` repository. Team *members* only need to clone their team leader's forked repository.  

Lastly, make sure to give your team members the privilege to push to your forked repository. These settings can be 
found within the "Settings" and "Collaborators & teams" section of *your* GitHub account's `toro-net` repository page.

#### Team Members

After installing the prerequisite software, clone the repository from your team leader from one of the following links:
* Wenhao Wang: https://github.com/felixwhwang/toro-net
* Mae Franco: https://github.com/maefranco/toro-net
* Janani Janardhanan: https://github.com/janani1989/toro-net
* Juan Leon: https://github.com/juancleon/toro-net

Copy one of the above links and run this command in your terminal:
```
git clone <link to team leader's repository>
```

This will give you a local copy of your team leader's forked repository. You may commit and push code after your team 
leader has ensured you have those privileges. 

### Running the app for local development

After you've acquired a local copy of the appropriate repository, open a terminal in its root (it 
should be a folder called `toro-net`) and run these commands in sequence. If you are on Windows, ignore the `sudo`s and
just be sure to run these commands from an Administrator terminal instead.  

#### Backend
First, navigate your terminal to the correct folder.
```
cd api/
```
Next, install the dependencies the backend relies upon (this may take a few minutes).
```
sudo npm install
```
Now you're ready to bootup the backend.
```
gulp
```

#### Frontend
In a new terminal, let's get the frontend up and running. Make sure you have already booted the backend.
```
cd client/
```
Next, install the dependencies the frontend relies upon (this may also take a few minutes).
```
sudo npm install
```
Now you're ready to bootup the backend.
```
yarn run dev
```

After you've configured both the backend and frontend according to these instructions, navigate to `localhost:8080` 
in your browser to use the web application. Any changes you make to the code on your machine will be detected 
automatically and updated within the application-- no need for restarting `gulp` or `yarn`!

### Running the app with Docker

After you've acquired a local copy of the appropriate repository, open a terminal in its root (it 
should be a folder called `toro-net`) and run these commands in sequence. If you are on Windows, ignore the `sudo`s and
just be sure to run these commands from an Administrator terminal instead.  

```
cd toro-net/
```
```
sudo docker-compose up
```

Navigate to `localhost:8080` to check out the application. Note that changes made to your source code will *not* be 
detected automatically, so it's best to use Docker for testing only. We will use Docker for production deployment further
down the semester.

## Running the tests

Explain how to run the automated tests for this system.

### Break down into end to end tests

Explain what these tests test and why.

```
Give an example
```

### And coding style tests

Explain what these tests test and why.

```
Give an example
```

## Deployment

Add additional notes about how to deploy this on a live system.

## Built With

* [MongoDB](https://mongodb.com)
* [Express](https://expressjs.com/)
* [Vue](https://vuejs.org)
* [NodeJS](https://nodejs.org)
* [Bootstrap](https://getbootstrap.com)

## Contributing

Please read `CONTRIBUTING.md` (to be written) for details on our code of conduct, and the process for submitting
pull requests.

## License

This project is licensed under the Apache License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

* Hat tip to @fguisso whose [MEVN-Dockerized](https://github.com/fguisso/MEVN-Dockerized) boilerplate
* Inspiration
* etc
