# An API made with ExpressJS framework and typescript to deal with bank accounts and transactions between them.

## Features:
- Create an User, with encrypted password, to be used in authentication context (with JWT)
- Create a Bank agency with basic fields
- Create a Bank account for the current logged in user
- Find a bank agency or a bank account by its id
- Update field of your bank account by its id
- Delete a bank account by id
- Execute Bank Transactions between accounts, managing the rollback if some error occur
- Errors Handling in order to return "friendly" messages at return, in addition to the HttpMethod for the error response
- Automated tests to cover the most critical points
- Authenticate via JWT token

## Project setup
- Make sure you have Node installed. At this project, the version used can be found [here](https://nodejs.org/en/blog/release/v18.19.1#2024-02-14-version-18191-hydrogen-lts-rafaelgss-prepared-by-marco-ippolito), such as the instalation files and tutorials for a range of operational systems
- Clone the code repository to your local machine
- Using a terminal, at the folder the source code was clonned, install the needed dependencies using the following commands:

    ```npm install```
    
# FALTA CONFIGS DE ENV VAR E BANCO

## Usage
- At the top folder where the code was clonned, run ```nodemon server.ts```. That will start the server
