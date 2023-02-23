# Mangahub Server

The Node.js back-end server for [Mangahub](https://github.com/jojo-138/mangahub).

## Technologies :wrench:

- Express.js
- MySQL
- Bcrypt
- JWT
- Nodemon

## Features :zap:

- Authentication using JWT and cookies
- Password hashing using Bcrypt

## Deployment:

- AWS RDS for MySQL database
- Heroku for Node.js server

## Database Design :floppy_disk:

![Database Design](https://user-images.githubusercontent.com/101021415/220903062-6162895e-17cb-4de5-8430-1474a37a581e.PNG)

## Dev:

1. Clone this repo.
2. Run `npm install`.
3. Create your own database. Refer to [Database Design](#database-design-💾).
4. Create a `.env` file with the following key-value pairs shown below to connect to your own database and create a secret key for JTW:
   ```
   - DB_HOST
   - DB_USER
   - DB_PASSWORD
   - DB_NAME
   - JWT_KEY
   ```
5. Run `npm start:dev` to start dev using nodemon.
