# Identity Reconciliation API

A powerful backend service for identifying and reconciling user contacts based on email addresses and phone numbers. This API intelligently links related contacts together, establishing primary-secondary relationships to maintain data integrity and deduplication.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Database Setup](#database-setup)
- [Running the Server](#running-the-server)
- [API Documentation](#api-documentation)
- [Example Usage](#example-usage)
- [Architecture](#architecture)

## Features

- **Contact Identification**: Identify contacts by email and/or phone number
- **Intelligent Reconciliation**: Automatically links related contacts and identifies relationships
- **Primary-Secondary Management**: Establishes primary contacts with linked secondary contacts
- **Deduplication**: Prevents duplicate contact entries by intelligently merging contact data
- **Type-Safe**: Built with TypeScript and Zod validation
- **Database Persistence**: Uses PostgreSQL with Drizzle ORM for reliable data storage
- **RESTful API**: Simple and intuitive HTTP API endpoints

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Database**: PostgreSQL with [Neon](https://neon.tech/)
- **ORM**: [Drizzle ORM](https://orm.drizzle.team/)
- **Validation**: [Zod](https://zod.dev/)
- **Package Manager**: pnpm

## Prerequisites

Before getting started, ensure you have:

- **Node.js** >= 18.x
- **pnpm** >= 8.x (or npm/yarn)
- **PostgreSQL** database (local or cloud-based like [Neon](https://neon.tech/))
- A `.env.local` file with the database connection URL

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/JeetDas5/Identity-Reconciliation.git
   cd identity-reconcilation
   ```

2. **Install dependencies**:
   ```bash
   pnpm install
   ```

## Configuration

1. **Create a `.env.local` file** in the root directory:

   ```bash
   cp .env.example .env.local
   ```

2. **Set up environment variables**:

   ```env
   DATABASE_URL=postgresql://user:password@host:port/database

   ```

## Database Setup

1. **Apply migrations** to create the database schema:

   ```bash
   pnpm run db:push
   ```

   This command will create the necessary tables in your PostgreSQL database using Drizzle ORM.

## Running the Server

### Development Mode

```bash
pnpm run dev
```

The server will start on `http://localhost:3000`

### Production Build

```bash
pnpm run build
pnpm run start
```

## API Documentation

### Identify Contact Endpoint

**Endpoint**: `POST /api/identity`

**Description**: Identifies a contact by email and/or phone number. Automatically reconciles related contacts and returns consolidated contact information.

#### Request

**URL**: `http://localhost:3000/api/identity`

**Method**: `POST`

**Headers**:

```
Content-Type: application/json
```

**Request Body**:

```json
{
  "email": "user@example.com",
  "phoneNumber": "+1234567890"
}
```

**Request Parameters**:

- `email` (string, optional): Email address of the contact
- `phoneNumber` (string, optional): Phone number of the contact
- **Note**: At least one of `email` or `phoneNumber` must be provided

#### Response

**Status Code**: `200 OK`

**Response Body**:

```json
{
  "contact": {
    "primaryContactId": 1,
    "emails": ["user@example.com", "user.old@example.com"],
    "phoneNumbers": ["+1234567890"],
    "secondaryContactIds": [2, 3]
  }
}
```

**Response Fields**:

- `primaryContactId` (number): The ID of the primary/main contact
- `emails` (array): All unique emails linked to this contact group
- `phoneNumbers` (array): All unique phone numbers linked to this contact group
- `secondaryContactIds` (array): IDs of all secondary contacts linked to the primary

#### Error Responses

**Status Code**: `400 Bad Request`

- **Condition**: Missing both email and phoneNumber or invalid email format
- **Response**:
  ```json
  {
    "error": [
      {
        "code": "invalid_type",
        "expected": "string",
        "received": "undefined",
        "path": ["email"],
        "message": "Required"
      }
    ]
  }
  ```

**Status Code**: `500 Internal Server Error`

- **Condition**: Server-side error during processing
- **Response**:
  ```json
  {
    "error": "Internal Server Error"
  }
  ```

## Example Usage

### cURL

```bash
curl -X POST http://localhost:3000/api/identity \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "phoneNumber": "+1234567890"
  }'
```

### JavaScript/Fetch

```javascript
const response = await fetch("http://localhost:3000/api/identity", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    email: "john@example.com",
    phoneNumber: "+1234567890",
  }),
});

const data = await response.json();
console.log(data);
```

### Python

```python
import requests

response = requests.post(
    'http://localhost:3000/api/identity',
    json={
        'email': 'john@example.com',
        'phoneNumber': '+1234567890'
    }
)

print(response.json())
```

### Example Workflow

1. **First Request** - New contact with email:

   ```bash
   curl -X POST http://localhost:3000/api/identity \
     -H "Content-Type: application/json" \
     -d '{"email": "john@example.com"}'
   ```

   **Response**:

   ```json
   {
     "contact": {
       "primaryContactId": 1,
       "emails": ["john@example.com"],
       "phoneNumbers": [],
       "secondaryContactIds": []
     }
   }
   ```

2. **Second Request** - Same person with phone number:

   ```bash
   curl -X POST http://localhost:3000/api/identity \
     -H "Content-Type: application/json" \
     -d '{"phoneNumber": "+1234567890"}'
   ```

   **Response**:

   ```json
   {
     "contact": {
       "primaryContactId": 1,
       "emails": ["john@example.com"],
       "phoneNumbers": ["+1234567890"],
       "secondaryContactIds": [2]
     }
   }
   ```

3. **Third Request** - Email update (different person, same email):
   ```bash
   curl -X POST http://localhost:3000/api/identity \
     -H "Content-Type: application/json" \
     -d '{"email": "john@example.com", "phoneNumber": "+9876543210"}'
   ```
   **Response**: Links the contacts based on the shared email

## Architecture

### Database Schema

**Table**: `contacts`

| Column            | Type         | Description                                 |
| ----------------- | ------------ | ------------------------------------------- |
| `id`              | serial (PK)  | Unique contact identifier                   |
| `email`           | text         | Contact email address                       |
| `phone_number`    | text         | Contact phone number                        |
| `linked_id`       | integer (FK) | Reference to primary contact (if secondary) |
| `link_precedence` | varchar      | `'primary'` or `'secondary'`                |
| `created_at`      | timestamp    | Contact creation timestamp                  |
| `updated_at`      | timestamp    | Last update timestamp                       |
| `deleted_at`      | timestamp    | Soft delete timestamp (nullable)            |

### Reconciliation Logic

1. **Search Phase**: Finds all existing contacts matching the provided email or phone number
2. **Link Analysis**: Traces linked contacts to identify the entire contact group
3. **Primary Selection**: Selects the oldest contact in the group as primary
4. **Consolidation**: Updates any other primary contacts in the group to secondary status
5. **New Entry Check**: Creates secondary contact if email/phone is new to the group
6. **Response Generation**: Returns consolidated contact information

### File Structure

```
├── app/
│   ├── api/
│   │   └── identity/
│   │       └── route.ts          # API endpoint handler
│   ├── layout.tsx
│   └── page.tsx
├── db/
│   ├── schema.ts                 # Database schema definitions
│   └── index.ts                  # Database client initialization
├── lib/
│   ├── helper.ts                 # Response builder utility
│   └── validation.ts             # Zod validation schemas
├── services/
│   └── contact.service.ts        # Contact identification logic
├── types/
│   └── contact.types.ts          # TypeScript type definitions
└── drizzle.config.ts             # Drizzle ORM configuration
```

## Development

### ESLint

Run linting:

```bash
pnpm run lint
```

### Database Migrations

After modifying `db/schema.ts`, push the new schema:

```bash
pnpm run db:push
```

Built with ❤️ by [Jeet Das] - [GitHub](https://github.com/JeetDas5)
