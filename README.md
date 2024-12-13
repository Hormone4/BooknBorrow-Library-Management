# BooknBorrow Book-borrowing Management
BooknBorrow is a website for book-borrowing. BooknBorrow is a platform for users to borrow books from multiple libraries and keep records of their readings and eventual fines if they bring back books too late.

## Presentation & UML Diagrams PDF
Click the link below to see the presentation PDF containing all the UML diagrams.<br>
[LINK TO THE PDF](https://github.com/Hormone4/BooknBorrow-Library-Management/blob/main/diagrams/presentation.pdf)

## Screenshots
### Front Page
<img src="https://github.com/Hormone4/BooknBorrow-Library-Management/blob/main/diagrams/screenshots/front-page.png"/>

### Book selection
<img src="https://github.com/Hormone4/BooknBorrow-Library-Management/blob/main/diagrams/screenshots/book-list.png"/>

### Borrowing
<img src="https://github.com/Hormone4/BooknBorrow-Library-Management/blob/main/diagrams/screenshots/borrowing.png"/>

### User Profile
<img src="https://github.com/Hormone4/BooknBorrow-Library-Management/blob/main/diagrams/screenshots/user-profile.png"/>

## How to run
Open terminal at the ```root``` of the repository and run the following command to install the necessary packages:
```bash
cd backend
npm install express express-session body-parser passport passport-local dotenv ejs mysql2 cors
cd..

cd frontend
npm install
npm install -g vue-cli
cd..
```
Copy-paste the ```.env``` file from the ```template``` folder at the root of the ```backend``` folder, and write your correct information inside:
- ```DB_PASS=yourMysqlPassword```

Then, to run the serverside:
```bash
cd backend
node server.js
```
And to run the clientside (in a new console window):
```bash
cd frontend
npm run dev
```