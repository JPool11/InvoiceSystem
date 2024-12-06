```markdown
# Invoice Management System

## Project Overview
This project is a basic invoice management system with functionalities to:

- Create invoices with detailed order lines
- View a list of all invoices
- View individual invoice details
- Annul invoices

It is built using PHP (backend), MySQL (database), and React (frontend), following the MVC architecture and a clean coding approach.

## Features

### Backend:
- Complete CRUD operations for invoices and related tables
- Database schema with appropriate relationships
- RESTful API integration with frontend

### Frontend:
- User-friendly form for creating invoices
- Views for listing and viewing detailed invoices
- Client-side validations for robust data entry
- Responsive design using Bootstrap

## Technology Stack
- **Backend**: PHP 8, MySQL
- **Frontend**: React, Bootstrap
- **API Testing**: Postman
- **Styling**: CSS with Bootstrap
- **Package Management**: npm

## Installation and Setup

### Backend Setup
1. Install a local server environment (e.g., XAMPP, WAMP, or LAMP)
2. Create a MySQL database:
   ```sql
   CREATE DATABASE InvoiceSystem;
   ```
3. Import the database schema:
   - Use the SQL script provided in the `database.sql` file to create tables and relationships
4. Configure database connection:
   - Update the `db.php` file with your database credentials:
     ```php
     $host = "localhost";
     $user = "root";  // Replace with your username
     $password = "";  // Replace with your password
     $dbname = "InvoiceSystem";
     ```
5. Place backend files (*.php) in the appropriate folder (e.g., htdocs for XAMPP)

### Frontend Setup
1. Ensure Node.js is installed on your system
2. Clone the repository and navigate to the frontend folder:
   ```bash
   git clone <repository-url>
   cd invoice-system
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm start
   ```
5. Access the application in your browser at http://localhost:3000

## Folder Structure

### Backend
```
backend/
├── db.php                  # Database connection
├── createInvoice.php       # Create an invoice
├── getInvoices.php         # Get all invoices
├── getInvoiceDetails.php   # Get details of a specific invoice
├── annulInvoice.php        # Annul an invoice
```

### Frontend
```
src/
├── components/
│   ├── InvoiceForm.js       # Form for creating invoices
│   ├── InvoiceList.js       # View for listing all invoices
│   ├── InvoiceDetails.js    # View for detailed invoice
├── api/
│   └── api.js               # Axios API configuration
├── App.js                   # Main application component
├── index.css                # Global styles
```

## Usage

### Create an Invoice:
- Navigate to `/create` to complete the form and add products
- Submit the form to create an invoice

### View All Invoices:
- Navigate to `/` to see a list of all invoices

### View Invoice Details:
- Click on an invoice from the list to view its details

### Annul an Invoice:
- Use Postman or any API client to call POST `/annulInvoice.php` with the InvoiceID

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/createInvoice.php` | POST | Create a new invoice |
| `/getInvoices.php` | GET | Retrieve all invoices |
| `/getInvoiceDetails.php` | GET | Retrieve invoice details |
| `/annulInvoice.php` | POST | Annul an existing invoice |

## API Usage Examples

### Create an Invoice
**Request**:
```http
POST /createInvoice.php
Content-Type: application/json

{
  "CustomerID": 1,
  "Products": [
    { "ProductID": 1, "Quantity": 2 },
    { "ProductID": 2, "Quantity": 1 }
  ]
}
```

**Response**:
```json
{
  "message": "Invoice created successfully",
  "InvoiceID": 5
}
```

### Retrieve All Invoices
**Request**:
```http
GET /getInvoices.php
```

**Response**:
```json
[
  {
    "InvoiceID": 1,
    "CustomerID": 1,
    "Total": 150.00,
    "Status": "Active"
  }
]
```
```