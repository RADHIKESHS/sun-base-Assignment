# Customer Management System

A comprehensive Customer Management System designed for efficient management of customer data. This application includes features for user authentication, customer CRUD operations, and synchronization with an external API, providing a robust solution for managing and accessing customer information.

## Features

- **User Authentication**:
  - **Signup**: Register new users securely.
  - **Login**: Authenticate with JWT tokens.
  - **Profile Management**: Access and manage user profile details.

- **Customer Management**:
  - **Add Customer**: Enter new customer details.
  - **Edit Customer**: Update existing customer information.
  - **Delete Customer**: Remove a customer from the system.
  - **Sync Customer Data**: Synchronize customer data with an external API.

- **User Role-Based Access**:
  - All functionality is restricted based on user roles.

## Technologies Used

- **Frontend**:
  - HTML, CSS, JavaScript
  - Fetch API for network requests
  - Font Awesome for icons

- **Backend**:
  - Java 17
  - Spring Boot for managing customer data and user authentication
  - Hibernate/JPA for database interaction
  - MySQL for storing customer data and user credentials
  - JWT for authentication
  - Lombok for boilerplate code
  - RestTemplate for consuming remote APIs

- **Database**:
  - MySQL for storing customer data and user credentials

- **Remote API**:
  - API for customer data retrieval and synchronization


## Getting Started

### Prerequisites

- JDK 17+
- Maven (To build the project)
- MySQL (Database)

### Installation

1. **Clone the Repository**

    ```bash
    https://github.com/RADHIKESHS/sun-base-Assignment.git
    cd sun-base-Assignment
    ```

2. **Configure the Database**

    - Update `application.properties` or `application.yml` with your MySQL configuration:

      ```properties
      spring.datasource.url=jdbc:mysql://localhost:3306/customers_db
      spring.datasource.username=root
      spring.datasource.password=rootpassword
      spring.jpa.hibernate.ddl-auto=update
      ```

3. **Set Up the Remote API Configuration**

    - Add the following properties in `application.properties`:

      ```properties
      remote.api.auth.url=https://qa.sunbasedata.com/sunbase/portal/api/assignment_auth.jsp
      remote.api.customers.url=https://qa.sunbasedata.com/sunbase/portal/api/assignment.jsp?cmd=get_customer_list
      ```

4. **Run the Application**

    - Start the application using the following command:

      ```bash
      mvn spring-boot:run
      ```
---

## Project Explanation Video

Watch this [video](https://drive.google.com/file/d/1say9QBJF9LePz7sqOKAFEismEQpOOtgZ/view?usp=sharing) for a quick overview of the Customer Management System and how to use it.

---

## Usage

### Authentication

1. **Login**

    - Navigate to `login.html`.
    - Enter your credentials and submit the form.

    ![Login Page](https://github.com/RADHIKESHS/sun-base-Assignment/blob/main/Login-page.png)

2. **Signup**

    - Navigate to `signup.html`.
    - Complete the registration form and submit.

    ![Signup Page](https://github.com/RADHIKESHS/sun-base-Assignment/blob/main/SignUp-page.png)

### Customer Management

1. **View Customer**

    - Navigate to `customer-list.html`.
    - View customer details and interact with the data.

    ![Customer List Page](https://github.com/RADHIKESHS/sun-base-Assignment/blob/main/Index-page.png)

2. **Add or Update Customer**

    - Navigate to `add-customer.html` to add a new customer or `update-customer.html` to edit existing customer details.
    - Fill out the form and submit.

    ![Add Customer Page](https://github.com/RADHIKESHS/sun-base-Assignment/blob/main/Add-page.png)
    ![Edit Customer Page](https://github.com/RADHIKESHS/sun-base-Assignment/blob/main/Edit-page.png)

3. **Delete Customer**

    - Deleting a customer is done via the UI by selecting a customer and confirming the delete action.

### Sync Customer Data

- **Sync Customers**
  - `POST api/remoteApi-getCustomers/sync`
  - **Description**: Initiates synchronization of customer data with the external API.
  - **Headers**: `Authorization: Bearer <token>`
  - **Request Body**: None
  - **Response**:
    - **Status**: 200 OK
    - **Body**: No content
  - **Process**:
    - **Step 1: User Authentication**
      - The backend authenticates with the external API to obtain an access token.
      - **External API Endpoint**: `https://qa.sunbasedata.com/sunbase/portal/api/assignment_auth.jsp`
    - **Step 2: Fetch Customer Data**
      - Fetch customer data from `https://qa.sunbasedata.com/sunbase/portal/api/assignment.jsp?cmd=get_customer_list` using the obtained access token.
    - **Step 3: Sync Data with Backend Database**
      - Update the local database with the retrieved customer data.
    - **Step 4: Confirmation**
      - Notify the user about the success or failure of the synchronization process.

### Remote API Calls (Backend)

- **Remote API Integration**
  - **RestTemplate** is used for interacting with the remote API for authentication and customer data synchronization.
 
## API Endpoints

### Authentication

- **Login**
  - `POST api/auth/login`
  - **Request Body**:
    ```json
    {
      "username": "your-email",
      "password": "your-password"
    }
    ```
  - **Response**: Bearer token

- **Signup**
  - `POST api/auth/signup`
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
  - `GET api/auth/profile`
  - **Headers**: `Authorization: Bearer <token>`
  - **Response**: User profile details

### Customer Management

- **Get Customer**
  - `GET api/get-customer/{uuid}`
  - **Headers**: `Authorization: Bearer <token>`

- **Add Customer**
  - `POST api/add-customer`
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
  - **Response**: Newly created customer object

- **Update Customer**
  - `PUT api/update-customer/{uuid}`
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
  - **Response**: Updated customer object

- **Delete Customer**
  - `DELETE api/delete-customer/{uuid}`
  - **Headers**: `Authorization: Bearer <token>`
  - **Response**: No content
