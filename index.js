#!/usr/bin/env node

import http from 'http';
import fs from 'fs';
import path from 'path';

const __dirname = path.resolve();
const files = fs.readdirSync(__dirname);

// Create a local server to receive data from
const server = http.createServer();

// Listen to the request event
server.on('request', (req, res) => {

    if(req.method != 'GET'){
        res.end();
    }
    let url=req.url;
    if(url=='/'){
        url='/index';
    }
    if(!files.includes(url.substring(1)+'.html')){
        url='/404';
    }
    const indexPage = new Promise((resolve, reject) => {
        fs.readFile(__dirname+url+'.html', 'utf8', (err, data) => {
            if (err) {
              reject(err);
            }
            else
            {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(data);
            res.end();
            resolve(res);
            }
        });
      });
});

server.listen(8080);