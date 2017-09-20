# toro-net

social networking bulletin board system

## Team Structure

- Architecture Team [@mattlevan](https://github.com/mattlevan)
- Backend [@janani1989](https://github.com/janani1989)
- Frontend [@maefranco](https://github.com/maefranco)
- Requirements [@felixwhwang](https://github.com/felixwhwang)
- Testing [@juancleon](https://github.com/juancleon)
- DeOps [@john-csudh](https://github.com/john-csudh)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine 
for development and testing purposes. See deployment for notes on how to deploy the project 
on a live system.

### Prerequisites

* Git
* VirtualBox with Guest Additions
* Vagrant

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
git clone https://github.com/<your team leader's GitHub username>/toro-net
```

This will give you a local copy of your team leader's forked repository. You may commit and push code after your team 
leader has ensured you have those privileges. 

### Running the app for local development

After you've acquired a local copy of the appropriate repository, open a terminal in its root (it 
should be a folder called `toro-net`) and run these commands in sequence.  

Use Vagrant to boot an Ubuntu 16.04 LTS virtual machine and install the application dependencies automatically.
```
cd toro-net/
```
```
vagrant up
```

This will take awhile as it needs to download an Ubuntu image (1.5 GB), and other dependencies (500 MB). After 
Vagrant finishes, your host machine's `toro-net` folder will be synced with the `/home/ubuntu/toro-net` folder 
inside of your Vagrant Ubuntu VM (also called a Vagrant box). Therefore, you can just edit the source code files 
on your host machine.  

#### Backend
We want to run the web application from within our Vagrant box, so you'll need to ssh into it from the `toro-net` directory.
```
vagrant ssh
```
Now that we are inside of the Ubuntu VM, let's start MongoDB.
```
sudo service mongod start
```
Now navigate your terminal to the backend or API folder.
```
cd toro-net/api/
```

Now you're ready to run `gulp`, which will create `dist/server` directory.
```
gulp
```
CTRL+C out of `gulp` and... Now we can run the backend.
```
yarn start
```

#### Frontend
In a new terminal, let's get the frontend up and running. Navigate to your `toro-net` folder on your *host* machine 
and then run another vagrant ssh.
```
vagrant ssh
```
Now `cd` to the frontend folder.
```
cd toro-net/client/
```
Now you're ready to bootup the frontend.
```
yarn run dev
```

After you've configured both the backend and frontend according to these instructions, navigate to http://localhost:8080 
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

Please read [CONTRIBUTING.md](CONTRIBUTING.md) (to be written) for details on our code of conduct, and
the process for submitting pull requests.

## License

This project is licensed under the Apache License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

* Hat tip to @fguisso for his [MEVN-Dockerized](https://github.com/fguisso/MEVN-Dockerized) boilerplate
* Inspiration
* etc
