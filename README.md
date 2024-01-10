<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="100" alt="Nest Logo" /></a>
</p>


## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```


## List of endpoints

### Authentication:
`POST /auth/patient/register: Patient registration.`
`POST /auth/professional/register: Professional registration.`
`POST /auth/patient/login: User login to obtain authentication token.`
`POST /auth/professional/login: User login to obtain authentication token.`


### User Management:
`GET /users/professionals: Get a list of professionals who are not yet approved. (Admin-only)`
`PUT /users/professionals/:id: Approve or not a professional account. (Admin-only)`

`GET /users/:id: Get details of a specific user (Admin-only).`
`PUT /users/:id: Update user details (Patient, Professional).`
`DELETE /users/:id: Delete a user account (Admin-only).` 

`GET /users/:id/documents: Get a list of documents for a user. (Patient, Professional)`
`GET /users/:id/consultations: Get a list of consultations for a user. (Patient)`
`GET /users/:id/appointments: Get a list of appointments for a user. (Patient)`

### Consultation Management:
`GET /consultation/:id: Get details of a specific consultation. (Patient, Professional)`
`POST /consultations: Create a new consultation (Patient).`
`PUT /consultations/:id: Update consultation details (Patient, Professional)`
`DELETE /consultations/:id: Delete a consultation (Admin-only).`

`GET /consultations/:consultationId/documents: Get documents related to a consultation. (Patient, Professional)`
`GET /consultations/:consultationId/analyses: Get analyses related to a consultation. (Patient, Professional)`
`GET /consultations/:consultationId/conversation: Get conversation related to a consultation. (Professional-only)`

### Document Management:
`POST /documents/:consultationId: Upload a new document (Patient, Professional).`
`DELETE /documents/:id: Delete a document (Patient, Professional).`


### Analysis Management:
`GET /analyses/:consultationId: Get analyses related to a consultation (Patient, Professional).`
`POST /analyses/:consultationId: Upload a new analysis result (Professional-only).`
`PUT /analyses/:id: Update analysis details (Professional-only).`
`DELETE /analyses/:id: Delete an analysis (Professional-only).`


### Appointment Management:
`POST /appointments: Schedule a new appointment (Patient, Professional)`
`PUT /appointments/:id: Update appointment details (Patient, Professional).`
`DELETE /appointments/:id: Cancel an appointment (Patient, Professional).`


### Conversation Management:
`GET /conversations/:id: Get messages related to a conversation (Professional).`
`POST /conversations: Start a new conversation (Patient-only).`
`DELETE /conversations/:id: Delete a conversation (Patient-only).`

### Message Management:
`POST /messages/: Send a new message (Professional).`
`DELETE /messages/:id: Delete a message (Professional).`

## License

Nest is [MIT licensed](LICENSE).


Certainly! Below are examples of JSON bodies for each `POST` request based on the provided Prisma schema and the modified endpoints:

----

## Examples of JSON bodies for each `POST` request

#### Authentication:
- **Patient Registration:**
  ```json
  {
    "role": "PATIENT",
    "sex": "MALE",
    "password": "user_password",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "dateOfBirth": "1990-01-01",
    "address": "123 Main Street",
    "city": "Cityville",
    "zipCode": "12345"
  }
  ```

- **Professional Registration:**
  ```json
  {
    "role": "PROFESSIONAL",
    "sex": "FEMALE",
    "password": "professional_password",
    "firstName": "Dr.",
    "lastName": "Smith",
    "email": "dr.smith@example.com",
    "dateOfBirth": "1980-01-01",
    "address": "456 Specialist Avenue",
    "city": "Medicine City",
    "zipCode": "54321"
  }
  ```

- **User Login:**
  ```json
  {
    "email": "john.doe@example.com",
    "password": "user_password"
  }
  ```

- **Professional Login:**
  ```json
  {
    "email": "dr.smith@example.com",
    "password": "professional_password"
  }
  ```

#### User Management:
- **Approve Professional Account:**
  ```json
  {
    "approvalStatus": true
  }
  ```

- **Update User Details:**
  ```json
  {
    "sex": "MALE",
    "firstName": "Updated",
    "lastName": "User",
    "dateOfBirth": "1990-01-01",
    "address": "Updated Address",
    "city": "Updated City",
    "zipCode": "54321",
    "secuNumber": "1234567890",
    "rppsNumber": "9876543210"
  }
  ```

#### Consultation Management:
- **Create a New Consultation:**
  ```json
  {
    "patientId": "patient_user_id",
    "status": "PENDING"
  }
  ```

- **Update Consultation Details:**
  ```json
  {
    "status": "IN_PROGRESS",
    "advice": "Follow the prescribed treatment."
  }
  ```

#### Document Management:
- **Upload a New Document:**
  ```json
  {
    "name": "Medical Report",
    "type": "PDF",
    "url": "https://example.com/medical_report.pdf"
  }
  ```

#### Analysis Management:
- **Upload a New Analysis Result:**
  ```json
  {
    "result": "Normal",
    "criticality": "LOW"
  }
  ```

#### Appointment Management:
- **Schedule a New Appointment:**
  ```json
  {
    "date": "2024-01-15T10:00:00",
    "dermatologistId": "dermatologist_user_id"
  }
  ```

- **Update Appointment Details:**
  ```json
  {
    "date": "2024-01-20T14:30:00"
  }
  ```

#### Conversation Management:
- **Start a New Conversation (Patient-only):**
  ```json
  {
    "professionalId": "professional_user_id"
  }
  ```

#### Message Management:
- **Send a New Message:**
  ```json
  {
    "content": "Hello, how can I help you today?"
  }
  ```

These are generic examples, and you should adapt the data to your specific needs and validation rules.