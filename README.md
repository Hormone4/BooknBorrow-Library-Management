# BooknBorrow Library Management

- **Topic**: Library management system. BooknBorrow is a platform for users to borrow books from multiple libraries and keep records of their readings and eventual fines if they bring back books too late.
- **Members**: LAURENT Sacha & ELIOT Simon


## Database diagrams
### Entity-relationship diagram
<img src="https://github.com/Hormone4/BooknBorrow-Library-Management/blob/main/diagrams/database/ER-diagram.png" alt=""/>

### Table structure diagram
<img src="https://github.com/Hormone4/BooknBorrow-Library-Management/blob/main/diagrams/database/Table-structure-diagram.png" alt=""/>


## Use case diagrams

### Borrowing Process Use Case Diagram
- Actors: User, Admin
- Use Cases: Borrow Book, Return Book, Check Book Availability, Extend Borrowing Period, Pay Fine (User), Manage Borrow Records (Admin).

### Library and Book Management Use Case Diagram
- Actors: Admin, User
- Use Cases: Add New Library (Admin), View Library Details, Add New Book (Admin), View Book Details, Update Book Information (Admin), Search for Books.

### User Management Use Case Diagram:
- Actors: Admin, User
- Use Cases: Register, Login, Update Profile, View User Details, Manage User Roles (Admin only), Delete Account, Manage Libraries (Admin only), Manage Books (Admin only), Manage Users (Admin only), View Borrowing Statistics (Admin only).