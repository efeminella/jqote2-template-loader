/* jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, strict:true, 
   undef:true, curly:true, browser:true, jquery:true, indent:4, maxerr:50, newcap:true */

( function( $ )
{
	"use strict";
	
	var error = new Error( "A template URL must be provided." ),
	    obj   = Object.prototype,
	    cache = {},
	    options,
	    callback;
	
	/*
	 * Preprocesses each template contained within the templates
	 * file (specified by opts or opts.url). Each template id is
	 * used as a key and the compiled template is the value of
	 * the key. An object containing each template id key and 
	 * compiled template is returned.
	 * 
	 * @return {Object} An Object containing each template where
	 * the id of each template is used as a key and the compiled 
	 * template is the value of the key, and the resulting object 
	 * is returned.
	 */
	var _preprocess = function( file ) 
	{
		var templates = $( file ).filter( options.element || 'script' ),
			template,
			i,
			n;
		
		if ( templates ) 
		{
			cache = options.reset ? {} : cache;
			
			for ( i = 0, n = templates.length; i < n; i++ ) 
			{	
				template = templates[i];
				cache[ template.id ] = $.jqotec( template );
			}
		}
		callback( cache );
		
		options  = null;
		callback = null;
	};
	
	/*
	 * Clients can invoke jqoteret with a single template element
	 * id, or an Array of template element ids. When an Array of  
	 * template ids is passed, _jqoteretMulti retrieves each and
	 * returns all matches.
	 */
	var _jqoteretMulti = function( ids )
	{
		var ret = [];
		
		for ( var i = 0, n = ids.length; i < n; i++ )
		{
			ret.push( cache[ ids[i] ] );
		}
		return ret;
	};
	
	/*
	 * Loads an external templates file via jQuery.get();. Accordingly, 
	 * the loading of a template file is subject to the jQuery.get();
	 * API. See: http://api.jquery.com/jQuery.get/ for implementation
	 * details.
	 *
	 * Once loaded, the individual templates defined in the templates
	 * file are precompiled (via $.jqotec) and stored in an object 
	 * where each key is the id of a template and the value is the
	 * precompiled template (lambda). If a success callback function
	 * is specified, it will be invoked with the resulting templates
	 * object once loaded (unless preprocessing is configured to be 
	 * omitted via the opts.preprocess = false property).
	 *
	 * @param opts: {Object} A configuration object which defines any 
	 * of the following properties:
	 * 
	 *    url: {String} The URL of the external template which is to 
	 *    be loaded  and precompiled. This value is required.
	 * 
	 *    preprocess: {Boolean} specifies if the loaded templates file 
	 *    is to be preprocessed internally by $.jqoteload(), and have
	 *    the resulting precompiled templates returned via an invocation
	 *    of the success callback argument.
	 * 
	 *    element: {String} The name of the HTML elements which define 
	 *    templates in the loaded templates file. This is an optional 
	 *    property. The default value is 'script'.
	 *    
	 *    reset: {Boolean} Specifies if the loaded templates should
	 *    overwrite any existing templates previously loaded.
	 * 
	 * @param success {Function} 
	 *    A callback function which accepts either an object (when the 
	 *    opts.precompiled properrty == true) or, a result from jQuery
	 *    get();. The success callback is invoked either after the given
	 *    template has been loaded and preprocessed, or once the template 
	 *    has been loaded (if opts.preprocess == false).
	 * 
	 */
	var jqoteload = function( opts, success ) 
	{	
		var request,
			defaults;
		
		if ( opts || opts.url )
		{
			options  = null;
			defaults = {
				preprocess : true,
				reset      : false,
				element    : 'script'
			};
			if ( typeof opts === 'object' )
			{
				options = $.extend( defaults, opts );	
			}
			else if ( typeof opts === 'string' )
			{
				options = $.extend( defaults, {url: opts} );
			}
			callback = success;
			request  = $.get( options.url ).success( options.preprocess ? _preprocess : success );
				 
			return request;	
		}
		else
		{
			throw error;
		}
	};
	
	/*
	 * Provides a convenience method for accessing each compiled template
	 * via its id. By default, an Object containing each compiled template
	 * is passed to the callback specified to $.jqoteload. This method is
	 * useful for storing the compiled templates outside of the scope of
	 * the callback, allowing clients to access the templates via jQuery
	 * i.e. $.jqoteret. 
	 *
	 * This method is similar to the jqotecache object, and the compiled 
	 * templates returned are references to the same templates; the only
	 * difference is that jqoteret (short for "retrieve") allows for the
	 * retrieval of templates via thier defined id in the loaded templates
	 * file.
	 *
	 * @param id 
	 *    {String} The string id of a previously loaded template file, via 
	 *    $.jqoteload
	 * 
	 *    {Array} An Array of String ids of templates previously loaded via 
	 *    $.jqoteload
	 *  
	 */
	var jqoteret = function( id )
	{
		if ( obj.toString.call( id ) === "[object Array]" )
		{
			return _jqoteretMulti( id );
		}
		return cache[ id ];
	};
	
	// We extend the jQuery object itself with two additional methods,
	// the define the jqote2 loader API
	$.extend( { 
		jqoteload : jqoteload,
		jqoteret  : jqoteret
	});
}( jQuery ));
