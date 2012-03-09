
var parser = require( 'uglify-js' ).parser,
    uglify = require( 'uglify-js' ).uglify,
    path   = require('path'),
    fs     = require( 'fs' ),
    src    = '../src/jquery.jqote2.loader.js',
    built  = '../jquery.jqote2.loader-min.js';

var _read = function()
{
	console.log( 'Loading  ' + src );
	
	fs.readFile( src, 'utf8', function ( error, data )
	{
	    if ( error ) {
		    return console.log( 'Error' + error );
	    } 
	    _minify( data ); 
	});
};

var _minify = function( source )
{
	var ast = uglify.ast_squeeze( uglify.ast_mangle( parser.parse( source ) ) );

	_write( uglify.gen_code( ast ) );
};

var _write = function( min )
{
	fs.writeFile( built, min, function( error ) 
	{
		if ( error ) {
	    	return console.log( 'Error' + error );
		}
		console.log( 'Minified ' + built + '\n' + min );
	});
};

_read();
