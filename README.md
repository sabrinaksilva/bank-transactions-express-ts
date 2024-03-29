# An API made with ExpressJS framework and typescript to deal with bank accounts and transactions between them.

## Features:

- Create an User, with encrypted password, to be used in OPTIONAL authentication by JWT Token
    - The param "AUTHENTICATE" define as AUTHENTICATE=true into .env defines if API should validate jwt token and
      authenticate requests
- Create a Bank
- Create a Bank account for an existent Bank
- Find a Bank account by its id
- Update Bank account by its id
- Delete a Bank account by id
- Execute Bank Transactions between two accounts, managing the rollback if some error occur
- Errors Handling
    - Return friendly messages
- Endpoints and Http Methods for requests and responses following REST pattern

## Project setup

- Make sure you have Node installed. At this project, the version used can be
  found [here](https://nodejs.org/en/blog/release/v18.19.1#2024-02-14-version-18191-hydrogen-lts-rafaelgss-prepared-by-marco-ippolito),
  such as the instalation files and tutorials for a range of operational systems
- Clone the code repository to your local machine
- Using a terminal, at the folder the source code was cloned, install the needed dependencies using the following
  commands:

  ```npm install```

- Copy the contents at ".env.example" to a new local ".env" file
    - You can enable or disable JWT authentication by switching AUTHENTICATE=true to AUTHENTICATE=false into your
      private .env
    - Define a database name, such as 'bankdb' as example, into .env and create it after it
        - At some mysql shell or database tool like datagrip or DBeaver, run the following 'CREATE DATABASE IF NOT
          EXISTS bankdb'
    - Also, if needed, configure your database username, host, port and password in .env file

## Usage

- At the top folder where the code was cloned, run ```nodemon server.ts```. That will start the server

# Please feel free to leave your feedback! 