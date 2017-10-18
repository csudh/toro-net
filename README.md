# Toro Net
## Getting
Fork the repo then clone it to your local machine.
```
git clone https://github.com/<your username>/toro-net.git
```

Change your directory into the dir on your VirtualBox Ubuntu virtual machine.  
```
cd toro-net
```

Create .env file. Add a `.env` file with your PORT, MONGO_URI, 
[GITHUB_ID, GITHUB_SECRET and APP_URL](https://github.com/jaredhanson/passport-github) like this:

```
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/toro-net
GITHUB_ID=233245n234566kjh243f
GITHUB_SECRET=k2hj432kjgjkh2g34kj2g4jkh23g4jk2342jhg34
APP_URL=http://127.0.0.1:3000/
```
---
## Virtual Box Setup Instructions
### To use Vagrant, get started [here](#vagrant-setup-instructions)
Install dependencies (mongo, node, npm packages).  
```
bash dev-env.sh
```

Install node packages with npm.  
```
npm install
``` 

Build and watch for changes.  
```
npm run serve
```

Open a new terminal window and navigate to toro-net.  
Run mongo as a service.  
```
sudo service mongod start
```

Run the backend using nodemon  
```
./node_modules/nodemon/bin/nodemon.js server.js
```

Open http://localhost:3000 in any web browser.

---
## Vagrant Setup Instructions
__WINDOWS USERS: If you are running Vagrant on a Windows machine follow the [Windows Instructions](#windows-vagrant-setup-instructions) at the end of this document before proceeding__ 
```
# cd into the dir
cd toro-net

# provision the vagrant box
vagrant up

# ssh into your box
vagrant ssh

# cd into the dir on your box
cd toro-net

# install dependencies (mongo, node, npm packages)
./dev-env.sh

# build and watch for changes
npm run serve

# run mongo as a service
sudo service mongod start

# open a new terminal on your host os
cd toro-net
vagrant ssh
cd toro-net
./node_modules/nodemon/bin/nodemon.js server.js
```
---
### Windows Vagrant Setup Instructions
Windows has a number of quirks which make it more difficult to run with Node and Node Package 
Manager (NPM) in particular.  The short story is that NPM has file paths and names which are 
longer than Windows supports by default.  To get around this issue the instructions below will
show you how to:

 1) Increase the number of characters allowed in file paths by Windows, and 
 2) Create symbolic links in Windows so that our NPM modules can be installed in a different directory in our Vagrant VM to avoid conflicts in the Windows shared folder, but still be run from our project directory.

These steps are based upon an online guide found [here](https://www.prolificinteractive.com/2015/01/21/getting-vagrant-nodejs-windows-play-well-together/).

Add the following to your toro-net Vagrantfile to enable symlinks in VirtualBox: 
```bash
# enable vbox symlinks
config.vm.provider "virtualbox" do |vb|
    vb.customize ["setextradata", :id, "VBoxInternal2/SharedFoldersEnableSymlinksCreate/vagrant", "1"]
end
```
Open a Windows admin shell, and run the following command to enable symlinks in 
Windows between local and remote (AKA our Vagrant VM instance) machines:
```bash
# enable Windows symlinks
fsutil behavior set SymlinkEvaluation L2L:1 R2R:1 L2R:1 R2L:1
```
Restart your computer
Provision your Vagrant box
```bash
# start vagrant VM
vagrant up
```
Bypass the Windows 260 character limit by creating a symlink to write 
`npm modules` to our VM instead
    of to our shared Windows folder.
```bash
# ssh into the vagrant session
vagrant ssh

# create the symlink 
# ex. ln -s <path-to-shared-folder> <path-to-vm-home-directory-for-node-modules>
ln -s /home/ubuntu/toro-net /home/ubuntu
```
Continue with the [vagrant setup instructions](#vagrant-setup-instructions)

---