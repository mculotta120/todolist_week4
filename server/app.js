var express = require('express');
var app = express();
var path=require('path');
var bodyParser=require('body-parser');
var urlencodedParser=bodyParser.urlencoded( { extended: false } );
var pg=require('pg');
// postgres must be running and you must have this db name correct
var connectionString = 'postgres://localhost:5432/tasklist';
// static public folder
app.use( express.static( 'public' ) );

// base url
app.get( '/', function( req, res ){
  console.log( 'at base url' );
  res.sendFile( path.resolve( 'views/index.html' ) );
}); // end base url

// urlencodedParser "dependency injection" is needed for POST
app.post( '/createnew', urlencodedParser, function( req, res){
  var taskObject = { task: req.body.task,
                      active: req.body.active
                    };
  console.log(req.body.task + req.body.active ) ;
pg.connect( connectionString, function( err, client, done ){
    client.query( 'INSERT INTO todolist ( task, active) VALUES ( $1, $2 )', [ req.body.task, req.body.active] );
  });
}); // end createNew

app.post( '/createupdate', urlencodedParser, function( req, res ){
  console.log( 'in POST update: ' + req.body.task + " with " + req.body.active );
  pg.connect( connectionString, function( err, client, done ){
    client.query( "UPDATE todolist SET active = '" + req.body.active + "' WHERE task= '" + req.body.task + "'");
  });
}); // end updateUser

// send back all records in users that conform to the query
app.get( '/getlist', function( req, res ){
  var results = [];
    pg.connect( connectionString, function( err, client, done ) {
        var query = client.query('SELECT * FROM todolist ORDER BY task DESC;');
        query.on( 'row', function( row ) {
            results.push( row );
        }); // end row
        // close connection
        query.on('end', function() {
            done();
            return res.json(results);
        }); // end onEnd
        if(err) {
            console.log(err);
        } // end error
  }); // end connect
}); //end app.get

//spin up server
app.listen( 8080, 'localhost', function( req, res ){
  console.log( 'listening on 8080' );
});
