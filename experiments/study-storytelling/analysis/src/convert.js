var j2c    = require('json2csv')
  , fs     = require('fs')
  , file   = process.argv[2]
  , _      = require('underscore')
  , fields = [ // EDIT THESE
      //basic
      'workerId',
      'postId',
      'condition',
      'fadeDelay',
      //demographics
      'age',
      'sex',
      'degree',
      'screen_size',
      'vis_experience',
      //log
      'log',
      //low-level interaction
      'visitedCountries',
      'visitedYears',
      'hover',
      'click',
      //time
      'time_diff_training',
      'time_diff_exploration',
      'time_diff_experiment',
      //comments
      'comments_1',
      'comments_2',
      'comments_3',
      'comments_4',
      'comments_5',
      'comments_6',
      'comments_7'

    ]
  , data

fs.readFile(file, 'utf8', function (err, data) {
  if (err) console.log(err)

  data = JSON.parse(data)

  // filters any undefined data (it makes R scripting easier)
  data = filterUndefined(data)

  // use 'debug' for your workerId when testing experiments, 
  //   comment out if you want to analyze data from yourself
  data = filterDebug(data) 

  convert( data )
})

function convert(d) {
  var params = {
    data: d,
    fields: fields
  }
  j2c(params, function(err, csv) {
    if (err) console.log(err)
    console.log(csv)
  })
}

function filterUndefined (arr) {
  return _.filter(arr, function(row) {
    return _.every(fields, function(f) { return row[f] })
  })
}

function filterDebug (arr) {
  return _.filter(arr, function(row) {
    return row.workerId !== 'debug'
  })
}
