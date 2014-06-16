This file wraps the following files:
<%= src.join('\n') %>

Sometimes you need only the file titles:
<%= fileTitles.join(', ') %>

For this tests the prepare callback in the Gruntfile.js 
adds a list of txt files:
<%= txtFiles.join('\n') %>

Merged file contents:
<%= fileContent %>
