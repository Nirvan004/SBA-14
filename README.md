Overview

This is a RESTful backend service built with Node.js, Express, and MongoDB (via Mongoose). It serves as the secure backend for a user portal, managing user authentication, third-party logins via GitHub, and private user resources such as bookmarks.  
This project demonstrates key backend concepts including:
- Local and OAuth 2.0 authentication  
- JWT-based session management  
- Secure CRUD operations for user-owned resources  
- Ownership-based authorization  
- Data validation with Mongoose schemas
   
Users Can
- Register a new account with email/password  
- Loginlocally and receive a signed JWT  
- Login via GitHub OAuth
- Create, read, update, and delete bookmarks (or other private resources)  
- Access only their own bookmarks (ownership enforced)  

Features
- Authentication & Authorization:  
  - Local registration/login with hashed passwords  
  - GitHub OAuth integration  
  - JWT authentication middleware  
  - Ownership checks to secure private resources  
- Full CRUD functionality for bookmarks:  
  - Create, Read, Update, Delete user-owned bookmarks  
- Data validation:
  - Mongoose schemas enforce required fields and correct formats  
- Error handling:
  - Returns descriptive errors for invalid requests or unauthorized access  
- JSON API responses:  
  - Standardized format for all endpoints  

Tech Stack
- Node.js – JavaScript runtime  
- Express– Web framework for RESTful APIs  
- MongoDB Atlas – Cloud database  
- Mongoose – MongoDB object modeling  
- bcrypt – Password hashing  
- jsonwebtoken (JWT) – Secure token-based authentication  
- Passport & passport-github2 – OAuth 2.0 GitHub integration  
- dotenv – Environment variable management  
- Postman – API testing
  
API Endpoints
User Authentication
POST `/api/users/register` | Register a new user |
POST `/api/users/login` | Login locally and receive JWT |
GET `/api/users/auth/github` | Start GitHub OAuth login |
GET `/api/users/auth/github/callback` | GitHub OAuth callback; returns JWT |

Bookmarks 
-POST `/api/bookmarks` | Create a new bookmark |
-GET `/api/bookmarks` | Get all bookmarks for logged-in user |
-GET `/api/bookmarks/:id` | Get a single bookmark by ID |
-PUT `/api/bookmarks/:id` | Update a bookmark by ID |
-DELETE `/api/bookmarks/:id` | Delete a bookmark by ID |

State Management & Data Handling
- Mongoose models define schemas for **users** and **bookmarks**  
- JWT middleware protects all bookmark routes and attaches user info to requests  
- Only the owner of a bookmark can access, update, or delete it  
- Standardized JSON responses with appropriate HTTP status codes (201, 400, 401, 404, 500)  

Additional Notes
- Built for scalability: easily supports many users and bookmarks  
- JSON responses make it compatible with any frontend framework  
- Can be extended to support other private resources or features  
- Secure integration of third-party login via GitHub OAuth  
- Fully tested with Postman  
