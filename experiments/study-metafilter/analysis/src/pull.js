/* global require:true, console:true, process:true, __dirname:true */
'use strict'

var fs      = require('fs')
  , dataset = []
  , redis   = require('redis')
  , client
  , port    = 6377
  , host    = "127.0.0.1"

client = redis.createClient(port, host)

client.on('connect', keys)

function keys () {
  client.keys("*", function (err, res) {
    res.forEach(data)
    client.quit()
  });
}

function data (k, i, arr) {
  client.hgetall(k, function (err, obj) {
    dataset.push(obj)
    if(i === arr.length-1) log(dataset)
  });
}

function log (obj) {
  console.log(JSON.stringify(obj))
}
