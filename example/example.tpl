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
                <p><%= article.text %></p>
            </article>
        <% } %>
    ]]>
</script>