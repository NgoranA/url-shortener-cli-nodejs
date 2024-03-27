# URL Shortener CLI

I decided to build this CLI tool as a guide to my students.

The external shortening service I used is [](https://bitly.com/)

You will need an API key. 

In the implementation, the students were asked to save the results from the service into their postgres databases.


It has not yet been deployed. 

You can clone the repository and install globally.
I made it easier,

run `chmod u+x run.sh` to give it permissions

then run `./run.sh` 

This will uninstall(if it exist : especially if you are modifying anything in the project) and reinstall the package globally and you can use.

running 
`url_shortener` without any arguments will prompt you to provide the url.
`url_shortener list` will give you the list of shortened links you have in your database
