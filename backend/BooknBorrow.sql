DROP DATABASE IF EXISTS BooknBorrow;
CREATE DATABASE IF NOT EXISTS BooknBorrow;
USE BooknBorrow;


/* ########################################################################################################
                                   TABLE CREATION
   ######################################################################################################## */

DROP TABLE IF EXISTS users;
CREATE TABLE IF NOT EXISTS users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    user_name VARCHAR(100) NOT NULL UNIQUE,
    user_email VARCHAR(100) NOT NULL UNIQUE,
    user_password VARCHAR(100), -- sha2(SALT + password) with SALT being random (user_created for now)
    -- adaptive salted hashing: algorithm setting a time to hash a password.
    -- Ex: bcrypt(15) (supported, easy, GPU heavy), pbkdf(600000) (FIPS certified), Argon2 (CPU GPU memory heavy)
    user_created DATETIME,
    user_role ENUM('ADMIN', 'USER') NOT NULL
);


DROP TABLE IF EXISTS library;
CREATE TABLE IF NOT EXISTS library (
    library_id INT AUTO_INCREMENT PRIMARY KEY,   -- should be a GUID/UUID
    library_name VARCHAR(50) NOT NULL,
    library_email VARCHAR(50) NOT NULL UNIQUE,
    library_phone VARCHAR(50) NOT NULL UNIQUE,
    library_creationYear YEAR,
    library_zipCode VARCHAR(50),
    library_streetName VARCHAR(50),
    library_streetNumber VARCHAR(50)
);


DROP TABLE IF EXISTS book;
CREATE TABLE IF NOT EXISTS book (
    book_id INT AUTO_INCREMENT PRIMARY KEY,
    book_name VARCHAR(50) NOT NULL,
    book_author VARCHAR(60) NOT NULL,
    book_description TEXT,
    book_publicationDate DATE,
    book_isbn VARCHAR(13),
    book_imageFileName VARCHAR(50)
);


DROP TABLE IF EXISTS bookLibraryMapping;
CREATE TABLE IF NOT EXISTS bookLibraryMapping (
    book_library_mapping_id INT AUTO_INCREMENT PRIMARY KEY,
    book_id INT NOT NULL,
    library_id INT NOT NULL,
    book_status ENUM('available', 'borrowed', 'reserved') NOT NULL,
    FOREIGN KEY (book_id) REFERENCES book(book_id),
    FOREIGN KEY (library_id) REFERENCES library(library_id)
);


DROP TABLE IF EXISTS borrow;
CREATE TABLE IF NOT EXISTS borrow (
    borrow_id INT AUTO_INCREMENT PRIMARY KEY,
    book_library_mapping_id INT NOT NULL,
    FOREIGN KEY(book_library_mapping_id) REFERENCES bookLibraryMapping(book_library_mapping_id),
    user_id INT NOT NULL,
    FOREIGN KEY(user_id) REFERENCES users(user_id),
    borrow_borrowDate DATE NOT NULL,
    borrow_returnDate DATE NOT NULL,
    borrow_actualReturnDate DATE,
    borrow_status ENUM('borrowed', 'returned', 'overdue') NOT NULL,
    borrow_fine INT,
    
    CONSTRAINT chk_returnDate CHECK (borrow_borrowDate <= borrow_returnDate)
);

SHOW TABLES;


/* ########################################################################################################
                                    DATA INSERTION
   ####################################################################################################### */

INSERT INTO users (user_name, user_email, user_password, user_created, user_role) VALUES
    ('John Doe', 'john.doe@example.com', SHA2(CONCAT(now(), 'password123'), 224), now(), 'USER'),
    ('Jane Smith', 'jane.smith@example.com', SHA2(CONCAT(now(), 'secretpass'), 224), now(), 'USER'),
    ('Emily Clark', 'emily.clark@example.com', SHA2(CONCAT(now(), 'mypassword'), 224), now(), 'USER'),
    ('Sarah Lee', 'sarah.lee@example.com', SHA2(CONCAT(now(), 'letmein'), 224), now(), 'USER'),
    ('Michael Brown', 'michael.brown@example.com', SHA2(CONCAT(now(), 'adminpass'), 224), now(), 'ADMIN')
;

INSERT INTO library (library_name, library_email, library_phone, library_creationYear, library_zipCode, library_streetName, library_streetNumber) VALUES
    ('Central Library', 'central@library.com', '1234567890', 1995, '10001', 'Main St', '101'),
    ('Westside Library', 'westside@library.com', '0987654321', 2005, '10002', 'Broadway', '202'),
    ('Eastside Library', 'eastside@library.com', '1122334455', 2010, '10003', 'Lexington Ave', '303'),
    ('Uptown Library', 'uptown@library.com', '2233445566', 1990, '10004', 'Park Ave', '404'),
    ('Downtown Library', 'downtown@library.com', '3344556677', 2000, '10005', 'Wall St', '505')
;

INSERT INTO book (book_name, book_author, book_description, book_publicationDate, book_isbn, book_imageFileName) VALUES
  ('The Great Gatsby', 'F. Scott Fitzgerald', 'A novel set in the 1920s, exploring themes of wealth and society.', '1925-04-10', '9780743273565', 'The-Great-Gatsby-cover.jpg'),
  ('A Brief History of Time', 'Stephen Hawking', 'A book explaining the universe, time, and black holes.', '1988-04-01', '9780553380163', 'A-Brief-History-of-Time-cover.jpg'),
  ('The Hobbit', 'J.R.R. Tolkien', 'A fantasy novel about the adventures of Bilbo Baggins.', '1937-09-21', '9780547928227', 'The-Hobbit-cover.jpg'),
  ('1984', 'George Orwell', 'A dystopian novel about a totalitarian regime.', '1949-06-08', '9780451524935', '1984-cover.jpg'),
  ('To Kill a Mockingbird', 'Harper Lee', 'A novel about racial injustice in the American South.', '1960-07-11', '9780061120084', 'To-Kill-a-Mockingbird-cover.jpg'),
  ('Sapiens: A Brief History of Humankind', 'Yuval Noah Harari', 'A book exploring the history of humanity from ancient to modern times.', '2011-09-04', '9780062316097', 'Sapiens-A-Brief-History-of-Humankind-cover.jpg'),
  ('Design Patterns', 'Erich Gamma, Richard Helm, Ralph Johnson, John Vlissides', 'This book deals with the subject of object-oriented programming and introduces the concept of design patterns.', '1994-10-21', '9780131969452', 'Design-Patterns-cover.jpg'),
  ('The Da Vinci Code', 'Dan Brown', 'A mystery thriller involving a secret society and hidden messages.', '2003-03-18', '9780307474278', 'The-Da-Vinci-Code-cover.jpg'),
  ('Pride and Prejudice', 'Jane Austen', 'A classic novel about love and social class in 19th-century England.', '1813-01-28', '9781503290563', 'Pride-and-Prejudice-cover.webp'),
  ('The Catcher in the Rye', 'J.D. Salinger', 'A coming-of-age novel following the adventures of Holden Caulfield.', '1951-07-16', '9780316769488', 'The-Catcher-in-the-Rye-cover.jpg'),
  ('The Lord of the Rings', 'J.R.R. Tolkien', 'A fantasy epic about the quest to destroy a powerful ring.', '1954-07-29', '9780544003415', 'The-Lord-of-the-Rings-cover.jpg'),
  ('The Alchemist', 'Paulo Coelho', 'A philosophical novel about a shepherd\'s journey to find his treasure.', '1988-01-01', '9780062315007', 'The-Alchemist-cover.jpg')
;

INSERT INTO bookLibraryMapping (book_id, library_id, book_status) VALUES
    (1, 1, 'available'),
    (1, 1, 'available'),
    (3, 2, 'available'),
    (4, 3, 'available'),
    (5, 4, 'borrowed'),
    (7, 5, 'available'),
    (7, 3, 'available'),
    (8, 3, 'available'),
    (9, 4, 'available'),
    (1, 3, 'borrowed'),
    (2, 2, 'available')
;

INSERT INTO borrow (book_library_mapping_id, user_id, borrow_borrowDate, borrow_returnDate, borrow_actualReturnDate, borrow_status, borrow_fine) VALUES
    (3, 1, '2023-06-01', '2023-06-15', '2023-06-13', 'returned', 0), -- , 'The Hobbit by John Doe, borrowed by John Doe'),
    (6, 2, '2023-07-10', '2023-07-24', '2023-07-28', 'overdue', 15), -- , 'Sapiens by Jane Smith, borrowed by Jane Smith'),
    (5, 3, '2023-08-05', '2023-08-19', NULL, 'borrowed', 0), -- , 'To Kill a Mockingbird by Emily Clark, borrowed by Emily Clark'),
    (10, 4, '2023-09-01', '2023-09-15', NULL, 'borrowed', 0), -- , NULL),
    (6, 5, '2023-06-01', '2023-06-15', '2023-06-15', 'returned', 0) -- , NULL)
;


SELECT * FROM users;
SELECT * FROM library;
SELECT * FROM book;
SELECT * FROM bookLibraryMapping;
SELECT * FROM borrow;
