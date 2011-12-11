#jQote2 Template Loader
A jQuery Plugin which provides an API for loading external jQote2 templates.

## Example
Using the jQote2 Template Loader plugin is simple. Assume a template file named `"example.tpl"`, which contains the following template definition:

``` html
<script type="text/html" id="articles_tpl">
	<![CDATA[
    	<% var article;
    	   
    	   for ( var i = 0, n = this.articles.length; i < n; i++ ) {
			     article = this.articles[i]; 
		 %>
			<article>
				<header>
					<h1><%= article.name %></h1>
				</header>
				<section><p><%= article.text %></p></section>
			<article>
        <% } %>
	]]>
</script>
```

Load the `"example.tpl"` template file:

``` javascript
$.jqoteload( 'example.tpl', function( templates )
{
	// create some mock articles...
	var articles = [ { name: 'Article A', text: 'Articles A test...'},
					 { name: 'Article B', text: 'Articles B test...'},
					 { name: 'Article C', text: 'Articles C test...'} ];
    // Render the articles...
    $('#articles').jqoteapp( templates.articles_tpl, { 'articles': articles } );
});
```

After the `"example.tpl"` has been loaded, from another context we can access the compiled templates via their template element id. In this example `"articles_tpl"`.

``` javascript
//... within some other context, access the same compiled template
var template = $.jqoteret( 'articles_tpl' );
```  

### Note
[jQote2](http://aefxx.com/jquery-plugins/jqote2/ "Title") needs a CDN, [vote for it](http://cdnjs.uservoice.com/forums/98277-general/suggestions/1805611-jqote2/ "Title").
