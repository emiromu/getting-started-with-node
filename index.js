#!/usr/bin/env node

import http from 'http';
import fs from 'fs';
import path from 'path';

const __dirname = path.resolve();

/*
localhost:8080 should take users to index.html
localhost:8080/about should take users to about.html
localhost:8080/contact-me should take users to contact-me.html
404.html should display any time the user tries to go to a page not listed above.
*/

// Create a local server to receive data from
const server = http.createServer();

// Listen to the request event
server.on('request', (req, res) => {

    if(req.method != 'GET'){
        res.end();
    }
    else{
        switch (req.url) {
        case '/':
            const indexPage = new Promise((resolve, reject) => {
                fs.readFile(__dirname+'/index.html', 'utf8', (err, data) => {
                    if (err) {
                      console.error(err);
                      reject(err);
                    }
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.write(data);
                    res.end();
                    resolve(res)
                });
              });
            break;
        case '/about':
            const aboutPage = new Promise((resolve, reject) => {
                fs.readFile(__dirname+'/about.html', 'utf8', (err, data) => {
                    if (err) {
                      console.error(err);
                      reject(err);
                    }
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.write(data);
                    res.end();
                    resolve(res)
                });
              });
            break;
        case '/contact-me':
            const contactmePage = new Promise((resolve, reject) => {
                fs.readFile(__dirname+'/contact-me.html', 'utf8', (err, data) => {
                    if (err) {
                      console.error(err);
                      reject(err);
                    }
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.write(data);
                    res.end();
                    resolve(res)
                });
              });
            break;
        default:
            const noPage = new Promise((resolve, reject) => {
                fs.readFile(__dirname+'/404.html', 'utf8', (err, data) => {
                    if (err) {
                      console.error(err);
                      reject(err);
                    }
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.write(data);
                    res.end();
                    resolve(res)
                });
              });
        }
    }
});

server.listen(8080);
//testing : curl localhost:8080