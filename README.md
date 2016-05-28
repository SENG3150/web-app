# SENG3150 Assignment - Web-App

To clone the app, including the themes submodule, run this command in the terminal:

	git clone --recursive https://github.com/SENG3150/web-app.git

You will be prompted for credentials for Bitbucket, which we have used to keep the proprietary theme closed-source to stay within the theme's licensing guidelines. To get access to the private repository contact [Mitchell Davis](https://github.com/mitchdav).

# Requirements
Install [NodeJS](https://nodejs.org/en/) and then run the following commands in the terminal:

	npm install -g bower
	npm install -g gulp-cli

# Dependencies
After cloning the repository go into the directory and run the following commands in the terminal:
	
	npm install
	bower install
	
# Compiling The Application
The application includes [Gulp](http://gulpjs.com) and a gulpfile which will minimise the stylesheets and javascript to ensure that the application loads quickly for users.

To compile the application for development run the following command in the terminal, and keep the terminal open and running while you develop the web-app:

	gulp

To compile the application for development with a local API server running, run the following command in the terminal, and keep the terminal open and running while you develop the web-app:

	gulp development

To compile the application for deployment run the following command in the terminal:

	gulp deployment

# Logging In
You can use the following credentials to login successfully.

|                      | Type          | Username      | Password      |
|----------------------|---------------|---------------|---------------|
| Administrator        | administrator | administrator | administrator |
| Domain Expert        | domainexpert  | domainexpert  | domainexpert  |