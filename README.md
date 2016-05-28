# SENG3150 Assignment - Web-App

To clone the app, including the themes submodule, run this command in the terminal:

	git clone --recursive https://github.com/SENG3150/web-app.git

You will be prompted for credentials for Bitbucket, which we have used to keep the proprietary theme closed-source to stay within the theme's licensing guidelines. To get access to the private repository contact [Mitchell Davis](https://github.com/mitchdav).

## Requirements
* Install [NodeJS](https://nodejs.org/en/) and then run the following commands in the terminal:

		npm install -g bower
		npm install -g gulp-cli

* Install a web server and setup a virtual host for the website to run in. An example httpd-vhosts.conf entry is below for Apache, which assumes you have mod_deflate running:

		<VirtualHost *:80>
	        ServerAdmin admin@localhost
	        DocumentRoot "C:\web-app"
	        ServerName seng3150.local
	        ErrorLog "C:\seng3150-error.log"
	        CustomLog "C:\seng3150-common.log" common     
	        RewriteEngine on
	        RewriteOptions inherit
	        SetOutputFilter DEFLATE
	        
	        <Directory "C:\web-app">
	            Options Indexes FollowSymLinks
	            AllowOverride All
	            Order Deny,Allow
	            Deny from all
	            Allow from 127.0.0.1
	            Allow from ::1
	            Allow from localhost
	        </Directory>
	    </VirtualHost>
    
    A more complete guide that our team used to get the web server (Apache through Wamp) working is as follows:
    
    - Open Wamp/bin/apache/apache[version]/conf/httpd.conf
    - Ctrl+F for 'onlineoffline'
    - Remove the 'Require local' line below it and replace it with:
    
        Require all granted
        Order Deny,Allow
        Allow from all
	        
    - Scroll a page above it and find this section:
    
        <Directory />
            AllowOverride none
            Require all granted
        </Directory>
	        
    - Comment this out by adding hashes to the front of each line:
    
        #<Directory />
        #    AllowOverride none
        #    Require all granted
        #</Directory>
    
    - Open Wamp/bin/apache/apache[version]/conf/extra/httpd-vhosts.conf
    - Add this to the end of the file:
    
        <VirtualHost *:80>
            ServerAdmin admin@localhost
            DocumentRoot "<full path to web-app folder>"
            ServerName seng3150.local
            ErrorLog "<full path to one folder above the web-app folder>\seng3150-error.log"
            CustomLog "<full path to one folder above the web-app folder>\seng3150-common.log" common
            RewriteEngine on
            RewriteOptions inherit
            SetOutputFilter DEFLATE
            
            <Directory "<full path to web-app folder>">
                Options Indexes FollowSymLinks
                AllowOverride All
                Order Deny,Allow
                Deny from all
                Allow from 127.0.0.1
                Allow from ::1
                Allow from localhost
            </Directory>
        </VirtualHost>    
    
    - Left click on WAMP in the notifications tray, go to Apache > Apache modules > Check deflate_module
    - WAMP will restart and should have a green icon
    - Open C:\Windows\System32\drivers\etc\hosts
    - Add this line to the end of the file:
        
        127.0.0.1       seng3150.local
    
    - Open [http://seng3150.local/](http://seng3150.local/) in your browser

## Dependencies
After cloning the repository go into the directory and run the following commands in the terminal:
	
	npm install
	bower install
	
## Compiling The Application
The application includes [Gulp](http://gulpjs.com) and a gulpfile which will minimise the stylesheets and javascript to ensure that the application loads quickly for users.

To compile the application for development run the following command in the terminal, and keep the terminal open and running while you develop the web-app:

	gulp

To compile the application for development with a local [API server](https://github.com/SENG3150/server) running, run the following command in the terminal, and keep the terminal open and running while you develop the web-app:

	gulp development

To compile the application for deployment run the following command in the terminal:

	gulp deployment

## Logging In
You can use the following credentials to login successfully.

|                      | Type          | Username      | Password      |
|----------------------|---------------|---------------|---------------|
| Administrator        | administrator | administrator | administrator |
| Domain Expert        | domainexpert  | domainexpert  | domainexpert  |