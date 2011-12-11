<script type="text/html" id="category_sections">
	<![CDATA[
    	<% var n = this.categories.length,
    		   i = 0,
    	       category;
    	   
    	   for ( i; i < n; i++ ) { %>
    	   	<% category = this.categories[i]; %>
    	   	
			<article>
				<header><%= category.name %></header>
				<section><p><%= category.comment %></p></section>
			<article>
        <% } %>
	]]>
</script>

<script type="text/html" id="category_list">
	<![CDATA[
    	<% var n = this.categories.length,
    		   i = 0,
    		   id,
    	       parentId,
    	       category;
    	   
    	   for ( i; i < n; i++ ) { %>
    	   	<% category = this.categories[i];  
    	   	   parentId = category.parentId == 0 ? category.id : category.parentId;
    	   	 %>
			<li>
				<a href="categories/<%= category.id %>" data-parentId="<%= parentId %>"><%= category.name %></a>
			</li>
        <% } %>
	]]>
</script>

<script type="text/html" id="item">
	<![CDATA[
        <li data-app-index="<%= this.counter %>"><span>Item <%= this.counter %></span>
        	<button class='remove' data-app-index="<%= this.counter %>">Remove</button>
        </li>
	]]>
</script>

