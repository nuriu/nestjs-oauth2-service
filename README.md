
# nestjs-oauth2-service

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

## Example

```bash
# health check
REQUEST:
GET {{base-url}}/health

RESPONSE:
{
    "status": "ok",
    "info": {
        "database": {
            "status": "up"
        },
        "swagger": {
            "status": "up"
        }
    },
    "error": {},
    "details": {
        "database": {
            "status": "up"
        },
        "swagger": {
            "status": "up"
        }
    }
}

# register user
REQUEST:
POST {{base-url}}/user/register

BODY:
{
    "username": "admin",
    "password": "admin"
}

RESPONSE:
{
    "username": "admin",
    "password": "$2b$10$y9FIGcppoAzAZ94LUb4VCu2BQ23YrblI4voKamqk4UnANXvJnDgz2",
    "id": "1272a9b2-359e-4fc1-a455-ae71f36b3e2c",
    "isActive": true,
    "createdAt": "2022-04-03T16:52:35.760Z",
    "updatedAt": "2022-04-03T16:52:35.760Z"
}

# create client,
REQUEST:
POST {{base-url}}/client

BODY:
{
    "clientId": "client_id2",
    "clientSecret": "client_secret2",
    "redirectUris": ["localhost:3000/oauth2/token"],
    "grants": ["authorization_code"]
}

RESPONSE:
{
    "clientId": "client_id2",
    "clientSecret": "client_secret2",
    "redirectUris": [
        "http://localhost:3000/oauth2/token"
    ],
    "grants": [
        "authorization_code"
    ],
    "id": "46e55574-346d-488e-9854-5d4a0b11e12a",
    "isActive": true,
    "createdAt": "2022-04-03T17:07:09.190Z",
    "updatedAt": "2022-04-03T17:07:09.190Z"
}

# retrieve code
REQUEST:
POST {{base-url}}/OAuth2/Authorize

HEADERS:


BODY:
{
  "client_id": "client_id2",
  "redirect_uri": "http://localhost:3000/oauth2/token",
  "grant_type": "authorization_code",
  "response_type": "code",
  "username": "admin",
  "password": "admin"
}
RESPONSE:
{
    "statusCode": 404,
    "message": "Cannot GET /oauth2/token?code=1663a5a904f5f218be7c053d29ab3565eca60e8c",
    "error": "Not Found"
}
# ^^^ use retrieved code parameter at next request
"1663a5a904f5f218be7c053d29ab3565eca60e8c"

# retrieve access token using code
REQUEST:
POST {{base-url}}/oauth2/token

BODY: x-www-form-urlencoded

code=9fa38cca9192edba5f4b28c15627831d82e177b9
grant_type=authorization_code

RESPONSE:
{
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyNzJhOWIyLTM1OWUtNGZjMS1hNDU1LWFlNzFmMzZiM2UyYyIsInVzZXJuYW1lIjoiYWRtaW4iLCJwYXNzd29yZCI6IiQyYiQxMCR5OUZJR2NwcG9BekFaOTRMVWI0VkN1MkJRMjNZcmJsSTR2b0thbXFrNFVuQU5YdkpuRGd6MiIsImlzQWN0aXZlIjp0cnVlLCJjcmVhdGVkQXQiOiIyMDIyLTA0LTAzVDE2OjUyOjM1Ljc2MFoiLCJ1cGRhdGVkQXQiOiIyMDIyLTA0LTAzVDE2OjUyOjM1Ljc2MFoiLCJpYXQiOjE2NDkwMTY2NDYsImV4cCI6MTY0OTAyMDI0Nn0.PrHzbk3zyY1E-W5sU92P349A9cQpJlyJjjpbzXM7W0g",
    "expiresAt": "2022-04-03T21:10:46.923Z",
    "client": {
        "id": "46e55574-346d-488e-9854-5d4a0b11e12a"
    },
    "user": {
        "id": "1272a9b2-359e-4fc1-a455-ae71f36b3e2c"
    },
    "deletedAt": null,
    "id": "b395f340-d3ff-47df-af23-4ca2eadf9bc9",
    "createdAt": "2022-04-03T17:10:46.929Z"
}

# enter guarded profile page using access token
REQUEST:
GET {{base-url}}/user/profile

HEADER:
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyNzJhOWIyLTM1OWUtNGZjMS1hNDU1LWFlNzFmMzZiM2UyYyIsInVzZXJuYW1lIjoiYWRtaW4iLCJwYXNzd29yZCI6IiQyYiQxMCR5OUZJR2NwcG9BekFaOTRMVWI0VkN1MkJRMjNZcmJsSTR2b0thbXFrNFVuQU5YdkpuRGd6MiIsImlzQWN0aXZlIjp0cnVlLCJjcmVhdGVkQXQiOiIyMDIyLTA0LTAzVDE2OjUyOjM1Ljc2MFoiLCJ1cGRhdGVkQXQiOiIyMDIyLTA0LTAzVDE2OjUyOjM1Ljc2MFoiLCJpYXQiOjE2NDkwMTY3MzgsImV4cCI6MTY0OTAyMDMzOH0.J5_-mznQzw6DZAs9RKQXW6XYva2cb189VK8zIgGPOi0

RESPONSE:
{
    "username": "admin"
}

```
