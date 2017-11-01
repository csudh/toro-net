# Toro Net

Fork the repo then clone it to your local machine.

```bash
$ git clone https://github.com/<your username>/toro-net.git
```

Change your directory into the dir on your VirtualBox Ubuntu virtual machine.

```bash
$ cd toro-net
```

Update your environment settings in `bin/run-front-end.sh`

```
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/toro-net
GITHUB_ID=233245n234566kjh243f
GITHUB_SECRET=k2hj432kjgjkh2g34kj2g4jkh23g4jk2342jhg34
APP_URL=http://127.0.0.1:3000/
```

Install application dependencies.

```bash
$ bash bin/install.sh
```

Install node packages with `npm`.

```bash
$ npm install
``` 

Run mongo as a service.  

```bash
$ ./bin/init-db.sh
```

Run the toro-net services.

```bash
$ ./bin/run-back-end.sh &
$ ./bin/run-front-end.sh &
```

Log files will be created in `var/log/*.log`.  

Open `http://localhost:3000` in any web browser.
