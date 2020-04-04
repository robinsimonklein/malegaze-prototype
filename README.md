# Male Gaze - Prototype

## Client
Documentation : [here](./client/README.md)

## Server
Documentation : [here](./server/README.md)

## HTTPS Configuration for local development

### Client

- 🔒 Use [mkcert](https://github.com/FiloSottile/mkcert) to generate local certificate in `/cert` folder.
````bash
# Create and go in /cert
mkdir cert && cd cert

# Generate certificate
mkcert localhost 127.0.0.1 ::1
````

- Install the certificate on your machine.
````bash
mkcert -install
````

- Add the *key* and *pem* in `vue.config.js`
```js
https = {
    key: fs.readFileSync('./cert/localhost+3-key.pem'),
    cert: fs.readFileSync('./cert/localhost+3.pem'),
}
```

- Set HTTPS to `true` in `.env` file.
````dotenv
HTTPS=true
````

- Run the project in dev mode
```bash
yarn serve
```

- (Optionnal) Mobile connection :
    
    - Transfer the `localhost.pem` file on your mobile (i.e. via AirDrop)
    - Install the profile

- Enjoy ! 🎉


### Server

- Copy the `/cert` folder from `client` and past it in `server`

- Add the *key* and *pem* in `app.js`
```js
server = https.createServer({
    key: fs.readFileSync(`${__dirname}/cert/localhost+3-key.pem`, 'utf8'),
    cert: fs.readFileSync(`${__dirname}/cert/localhost+3.pem`, 'utf8')
}, app)
```

- Set HTTPS to `true` in `.env` file.
````dotenv
HTTPS=true
````

- Enjoy ! 🎉
