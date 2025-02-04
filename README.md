
# tripleD Shopping Application

**CS4092: Database Design & Development (Team 15)**

## Project Overview

tripleD is an online shopping application developed for the CS4092 course, utilizing a React frontend with a Python/PostgreSQL database to manage products, availability, customer orders, and staff information.

### Project Outputs

1. **ER-Model**: A visual representation of the database structure.
2. **Relational Schema**: SQL scripts to implement the ER model.
3. **Application**: A functional online shopping application.

### Submission Structure

- **er/**: ER model files.
- **sql/**: SQL scripts for the relational schema.
- **code/**: Source code for the application.

### Features

- **User Management**: Registration, authentication, and profile management.
- **Product Catalog**: Browse, search, and filter products.
- **Shopping Cart**: Add, remove, and manage cart items.
- **Order Processing**: Checkout, order history, and order tracking.
- **Admin Panel**: Manage products, categories, and users.


## Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone https://github.com/sesemeseeds/tripleD.git
   cd tripleD
   ```

2. **Database Setup**:
   - Install PostgreSQL.
   - Create new database named 'shop' under default host (localhost) and port 5432
   - Run the scripts in the `sql/` folder to set up the database schema and initial data.

3. **Install Dependencies**:
   - Navigate to the `code/frontend` directory.
   - Install the required dependencies using the package manager (e.g., npm, pip).

4. **Run the Application**:
   - Start the backend server in `code/backend` using command ``python3 manage.py runserver`` (have python installed).
   - Open the frontend interface in your browser using `npm run start` in `code/frontend`.

