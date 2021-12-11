Installation and Execution of Front End of the application 

Step 1) Download the source code (folder: NITC-LMS-frontend)

Step 2) Go to the directory containing the source code using the "cd" command

Step 3) In the terminal run "npm install"
        It downloads the dependencies defined in the package.json file and generates a node_modules folder with the installed modules.

Step 4) The run "npm start"
        It starts the application.

Installation and Execution of Back End of the application 

Step 1) Download the source code (folder: NITC-LMS-backend)

Step 2) Go to the directory containing the source code using "cd" command

Step 3) Create a virtual environment in the directory "python -m venv venv"

Step 4) Activate the virtual environment by "venv\Scripts\activate"

Step 5) Install all the dependencies to the virtual environment from the requirements file "pip install -r requirements.txt"

Step 6) Rename the env_example file as .env and add the missing details

Step 7) Setup the flask environment variables (steps illustrated for windows)
        $env:FLASK_APP="api"
        $env:FLASK_ENV="development"

Step 8) Start the application using flask run. This opens up by default in localhost:5000

Step 9) The API opens in Postman which is a tool that lets you build and test HTTP requests in an easy-to-use interface without 
        configuring a full development environment.

Step 10) Click on "Run in Postman" 

Step 11) You can send different requests and see their responses given by the API


You can download here:
Postman: https://www.postman.com/downloads/
Postgres: https://www.postgresql.org/download/
API documentation can be viewed here: https://documenter.getpostman.com/view/15324195/UVCCfjQL

GitHub Repositories:
Frontend: https://github.com/Pavithra-Rajan/NITC-LMS-frontend
Backend: https://github.com/Vishnuchz324/NITC-LMS-backend