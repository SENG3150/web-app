# web-app

# Requirements
[NodeJS](https://nodejs.org/en/) not sure if v6 is much different, I am using v4.2

# Installation
After cloning the repository go into the directory and run this command in the terminal:

	
	npm install
	
# Compiling The Application
The application includes [Gulp](http://gulpjs.com) and a gulpfile which will minimise the stylesheets and javascript to ensure that the application loads quickly for users. To run it just use this command in the terminal:


	gulp

You will need to run this after each change you make to get the latest changes in your browser, however we will look at setting up gulp-watch, which will take care of running the command automatically for you.

# Logging In
You can use the following credentials to login successfully.

| Type                 | Username      | Password      |
|----------------------|---------------|---------------|
| Administrator        | administrator | administrator |
| Domain Expert        | domainexpert  | domainexpert  |
| Technician           | technician    | technician    |
| Temporary Technician | temp          | technician    |