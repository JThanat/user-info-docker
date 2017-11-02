//  users.js
//
//  Defines the users api. Add to a server by calling:
//  require('./users')
'use strict';

const http = require('http')

//  Only export - adds the API to the app with the given options.
module.exports = (app, options) => {

  app.get('/', (req, res, next) => {

    //  Get the email.
    var username = req.query.username;
    if (!username) {
      throw new Error("When searching for a user, the username must be specified, e.g: '/search?email=homer@thesimpsons.com'.");
    }

    //  Get the user from the repo.

    //BODY: {"profile_image":"https://picsum.photos/1000"}
    const opt = {
      host: 'asset_service',
      port: 8123,
      path: `/?username=${username}`,
      method: 'GET'
    };
    
    const request = http.request(opt, (response) => {
      console.log('STATUS: ' + response.statusCode);
      console.log('HEADERS: ' + JSON.stringify(response.headers));
      response.setEncoding('utf8');
      response.on('data', (chunk) => {
        options.repository.getUserByUsername(username).then((user) => {
          if(!user) { 
            res.status(404).send('User not found.');
          } else {
            const chunk_object = JSON.parse(chunk)
            res.status(200).send({
              username: user.username,
              phoneNumber: user.phone_number,
              profile_image: chunk_object.profile_image
            });
          }
        })
        .catch(next);
      });
    });

    request.on('error', (e) => {
      console.log('problem with request: ' + e.message);
    });

    request.end()

  });
};
