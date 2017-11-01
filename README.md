# Toro Net

Fork the repo then clone it to your local machine.

```bash
$ git clone https://github.com/<github-user>/toro-net.git [<repo-name>]
```

We assume that `$TOPDIR` is relative to `toro-net` directory and all script executions are from the `$TOPDIR` location.

```bash
$ cd toro-net
```

## Dependencies

Install application dependencies, e.g. mongo and nodejs.

```bash
$ bash bin/install.sh
```

Install node packages with `npm`.

```bash
$ npm install
``` 

## Customization

Update your environment settings by creating a file `.env` as below:

```
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/toro-net
GITHUB_ID=233245n234566kjh243f
GITHUB_SECRET=k2hj432kjgjkh2g34kj2g4jkh23g4jk2342jhg34
APP_URL=http://127.0.0.1:3000/
```

## Deploying a Development Environment

Run mongo as a service.  

```bash
$ ./bin/init-db.sh
```

Build and watch for changes.

```bash
$ npm run serve
```

Run the backend using `nodemon.js`.

```bash
$ ./node_modules/nodemon/bin/nodemon.js server.js
```

## View Application

Open `http://localhost:3000` in any web browser.
