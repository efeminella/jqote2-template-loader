
$(document).ready( function()
{
	var url = 'test.templates.html.tpl',
		templateId1 = 'script_template_1',
		templateId2 = 'script_template_2',
		templateId3 = 'xml_template_1';

	module( "jqote2.loader API" );
	
	asyncTest( "jQuery.jqoteload(); Basic loading test, Default Options", function()
	{		
		expect( 2 );
		
		$.jqoteload( url, function( templates )
		{
			setTimeout( function() 
			{
				ok ( true, "Templates loaded" );
				ok ( templates != null, "compiled templates returned" );
				start();
			}, 13 );
		});
	});
	
	asyncTest( "jQuery.jqoteload(); URL argument, Default Options", function()
	{		
		expect( 5 );
		
		$.jqoteload( {url: url, reset: true}, function( templates )
		{
			setTimeout( function() 
			{
				ok ( true, "Templates loaded" );
				ok ( templates != null, "compiled templates returned" );
				ok ( templates[ templateId1 ] instanceof Function, "Expecting compiled template '#script_template_1' to have been returned." );
				ok ( templates[ templateId2 ] instanceof Function, "Expecting compiled template '#script_template_2' to have been returned." );
				ok ( templates[ templateId3 ] == undefined, "Expecting template '#xml_template_1' to have been omitted." );
				start();
			}, 13 );
		});
	});
	
	asyncTest( "jQuery.jqoteload(); User Options: element = 'template'", function()
	{		
		expect( 5 );
		
		var opts = { url: url, element: 'template', reset: true };
		
		$.jqoteload( opts, function( templates )
		{
			setTimeout( function() 
			{
				ok ( true, "Templates loaded" );
				ok ( templates !== null, "Expecting compiled templates to have been returned." );
				ok ( templates[ templateId3 ] instanceof Function, "Expecting compiled template '#xml_template_1' to have been returned." );
				ok ( templates[ templateId1 ] == undefined, "Expecting '#script_template_1' template to have been omitted." );
				ok ( templates[ templateId2 ] == undefined, "Expecting '#script_template_2' template to have been omitted." );
				start();
			}, 13 );
		});
	});
	
	asyncTest( "jQuery.jqoteload(); User Options: preprocess = false", function()
	{		
		expect( 3 );
		
		var opts = { url: url, preprocess: false };
		
		$.jqoteload( opts, function( templates )
		{
			setTimeout( function() 
			{
				ok ( true, "Templates loaded" );
				ok ( templates !== null, "compiled templates returned" );
				ok ( templates instanceof Object == false, "Unprocessed template returned." );
				start();
			}, 13 );
		});
	});
	
	test( "Throws an Error if no options are  provided", function() 
	{
		raises( function()
		{ 
			$.jqoteload( null );
		}, "Expecting an Error to be thrown when null url and options arguments passed." );
	});
	
	asyncTest( "jQuery.jqoteret(); Test expected template retrieval", function()
	{	
		var expected,
			actual;
				
		expect( 2 );
		
		$.jqoteload( url, function( templates )
		{
			setTimeout( function() 
			{
				expected = templates[ templateId1 ];
				actual   = $.jqoteret( templateId1 );
				
				strictEqual( expected, actual, "Expecting compiled templates to be equal" );

				expected = templates[ templateId2 ];
				actual   = $.jqoteret( templateId2 );
				
				strictEqual( expected, actual, "Expecting compiled templates to be equal"  );
				
				start();
			}, 13 );
		});
	});
	
	asyncTest( "jQuery.jqoteret(); Test all expected templates retrieval", function()
	{		
		expect( 2 );
		
		$.jqoteload( url, function( templates )
		{
			setTimeout( function() 
			{
				var all = $.jqoteret( [ templateId1, templateId2 ] );
				strictEqual( templates[ templateId1 ], all[0], "Expecting 'script_template_1' to have been returned." );
				strictEqual( templates[ templateId2 ], all[1], "Expecting 'script_template_2' to have been returned."  );
				start();
			}, 13 );
		});
	});
});
