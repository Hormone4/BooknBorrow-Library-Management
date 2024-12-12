# BooknBorrow Book-borrowing Management

Website for book-borrowing. BooknBorrow is a platform for users to borrow books from multiple libraries and keep records of their readings and eventual fines if they bring back books too late.


## Presentation & Diagrams PDF
[Presentation PDF](https://github.com/Hormone4/BooknBorrow-Library-Management/blob/main/diagrams/presentation.pdf)


## How to run
Open terminal at the root of the repository and run the following command to install the necessary packages:
```bash
cd backend
npm install express express-session body-parser passport passport-local dotenv ejs mysql2 cors
node server.js
cd..

cd frontend
npm install -g vue-cli
```
Then, to run the serverside:
```bash
cd backend
node server.js
```
and to run the clientside (in a new console window):
```bash
cd frontend
npm run dev
```