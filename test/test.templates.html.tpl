<script type="text/html" id="script_template_1">
	<![CDATA[
    	<% var n,
    		   i,
    		   article;
    	   
    	   for ( i = 0, n = article; i < n; i++ ) 
    	   { 
    	       article = this.articles[i];
    	   %>
			<article>
				<header>
					<h1><%= article.title %></h1>
					<h2><%= article.subtitle %><h2>
				</header>
				<section><p><%= article.text %></p></section>
			<article>
        <% } %>
	]]>
</script>

<script type="text/html" id="script_template_2">
	<![CDATA[
    	<% var n,
    		   i,
    		   item;
    	   
    	   for ( i = 0, n = this.items.length; i < n; i++ ) 
    	   { 
    	       item = this.items[i];
    	   %>
			<li>
				<a href="<%= item.url %>"><%= item.name %></a>
			</li>
        <% } %>
	]]>
</script>

<template id="xml_template_1">
	<a href="<%= item.url %>"><%= item.name %></a>
</template>

