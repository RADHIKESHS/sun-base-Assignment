# Customer Management System

A robust web-based Customer Management System that enables efficient handling of customer data. This application includes features for user authentication, CRUD operations for customer data, and synchronization with an external API.

## Features

- **User Authentication**: 
  - **Signup**: Register new users.
  - **Login**: Secure login with JWT tokens.
  - **Profile Management**: View and update user profile details.

- **Customer Management**:
  - **Add Customer**: Enter new customer details.
  - **Edit Customer**: Modify existing customer information.
  - **Sync Customer Data**: Synchronize customer data with an external API.

- **User Role-Based Access**:
  - Sync functionality is restricted to users with a specific email address.

- **Responsive Design**: Adaptable interface for various screen sizes and devices.

## Technologies Used

- **Frontend**: 
  - HTML, CSS, JavaScript
  - Fetch API for network requests
  - Font Awesome for icons

- **Backend**:
  - Spring Boot (Java) for managing customer data and user authentication

- **External API**:
  - API for customer data retrieval and synchronization

## Getting Started

### Prerequisites

- Node.js and npm installed
- Access to a running Spring Boot backend service

### Installation

1. **Clone the Repository**

    ```bash
    git clone https://github.com/your-username/your-repository.git
    cd your-repository
    ```

2. **Install Dependencies**

    ```bash
    npm install
    ```

3. **Configuration**

    - Create a `config.js` file in the `src` directory.
    - Add the following configuration:

    ```javascript
    export const BASE_URL = 'https://your-backend-url.com'; // Update with your backend URL
    ```

4. **Run the Application**

    - Open `index.html` in your web browser.

## Usage

### Authentication

1. **Login**

    - Navigate to `login.html`.
    - Enter your credentials and submit the form.

2. **Signup**

    - Navigate to `signup.html`.
    - Complete the registration form and submit.

### Customer Management

1. **Add Customer**

    - Go to `add-customer.html`.
    - Fill out the form with customer details and submit.

2. **Edit Customer**

    - Visit `edit-customer.html` with a customer UUID parameter.
    - Modify customer details and save changes.

### Sync Customer Data

1. **Eligibility**:
   - The "Sync" button is only visible to users with the email `test@sunbasedata.com`.

2. **Sync Process**:
   - **Step 1: User Authentication**
     - On clicking the "Sync" button, the application first authenticates the user with an external API to obtain an access token.
     - The authentication request is sent to the endpoint `https://qa.sunbasedata.com/sunbase/portal/api/assignment_auth.jsp` with predefined credentials.
   
   - **Step 2: Fetch Customer Data**
     - Using the obtained access token, the application makes a request to fetch the customer data from the external API.
     - The customer data is retrieved from `https://qa.sunbasedata.com/sunbase/portal/api/assignment.jsp?cmd=get_customer_list`.
   
   - **Step 3: Sync Data with Backend**
     - The retrieved customer data is then sent to the backend service via a bulk-upload endpoint.
     - This is done using the endpoint `${BASE_URL}/customers/bulk-upload`, with the data being sent in the request body and authenticated using the user's token.

   - **Step 4: Confirmation**
     - After the sync is completed, the user is notified of the success or failure of the operation.
     - The page is refreshed to show the updated customer list.

## API Endpoints

### Authentication

- **Login**
  - `POST /auth/login`
  - **Request Body**:
    ```json
    {
      "username": "your-email",
      "password": "your-password"
    }
    ```
  - **Response**: Bearer token

- **Signup**
  - `POST /auth/signup`
  - **Request Body**:
    ```json
    {
      "name": "your-name",
      "email": "your-email",
      "password": "your-password",
      "phone": "your-phone"
    }
    ```

- **Profile**
  - `GET /auth/profile`
  - **Headers**: `Authorization: Bearer <token>`
  - **Response**: User profile details

### Customer Management

- **Get Customer**
  - `GET /customers/{uuid}`
  - **Headers**: `Authorization: Bearer <token>`

- **Update Customer**
  - `PUT /customers/{uuid}`
  - **Headers**: `Authorization: Bearer <token>`
  - **Request Body**:
    ```json
    {
      "first_name": "John",
      "last_name": "Doe",
      "street": "123 Main St",
      "address": "Suite 101",
      "city": "Springfield",
      "state": "IL",
      "email": "john.doe@example.com",
      "phone": "555-1234"
    }
    ```

- **Bulk Upload**
  - `POST /customers/bulk-upload`
  - **Headers**: `Authorization: Bearer <token>`
  - **Request Body**: Array of customer objects

## Contributing

We welcome contributions to improve this project! To contribute:

1. **Fork the Repository**
2. **Create a Feature Branch**: `git checkout -b feature/your-feature`
3. **Commit Your Changes**: `git commit -am 'Add new feature'`
4. **Push to the Branch**: `git push origin feature/your-feature`
5. **Open a Pull Request**

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

