//  repository.js
//
//  Exposes a single function - 'connect', which returns
//  a connected repository. Call 'disconnect' on this object when you're done.
'use strict';

const MongoClient = require('mongodb').MongoClient

//  Class which holds an open connection to a repository
//  and exposes some simple functions for accessing data.
class Repository {
  constructor(connectionSettings) {
    this.url = connectionSettings.url;
    this.mongoClient = MongoClient
  }

  getUserImage(username) {

    return new Promise((resolve, reject) => {
      console.log(this.url)
      MongoClient.connect(this.url, (err,db)=> {
        if (err) {
          return reject(new Error(err))
        }
        console.log("Connected correctly to mongo");
        const collection = db.collection("userProfile")
        collection.findOne({uname:username}, (err, document) => {
          if (err) {
            return reject(new Error(err))
          }
          return resolve({
            profile_image: document.profile_image
          })
        })
        db.close()
      })

    });
  }

  disconnect() {
    this.mongoClient.close();
  }
}

//  One and only exported function, returns a connected repo.
module.exports.connect = (connectionSettings) => {
  return new Promise((resolve, reject) => {
    if(!connectionSettings.url) throw new Error("A host must be specified.");

    resolve(new Repository(connectionSettings));
  });
};
