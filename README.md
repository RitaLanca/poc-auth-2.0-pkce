# OAuth 2.0 PKCE Flow – React POC

This project is a Proof of Concept (POC) demonstrating how to implement OAuth 2.0 Authorization Code Flow with PKCE in a React Single Page Application (SPA), without relying on SDK abstractions.

The goal is to deeply understand the authentication and authorization flow by implementing it manually.

## Objectives
- Understand how OAuth 2.0 works in practice
- Implement PKCE (Proof Key for Code Exchange) from scratch
- Handle the full authentication flow manually (no SDK)
- Retrieve and use access tokens to call protected APIs

---
## What is implemented

### Authentication Flow
- Redirect to /authorize endpoint
- Generate:
  - code_verifier
  - code_challenge (SHA-256 + base64url)
- Handle redirect with authorization_code
- Exchange code for tokens via /oauth/token

### Token Handling
- id_token 
  - Used to extract user information (name, email, etc.)
- access_token 
  - Used to call protected APIs
  - Includes audience and scope

### API Integration
- Configured a custom API (audience)
- Performed authenticated requests using: Authorization: Bearer <access_token>

---
## Tech Stack
- React e React Router
- Vite
- Auth0 (as OAuth Provider)
> ⚠️ The Auth0 React SDK was intentionally not used to better understand the underlying OAuth mechanisms.
- jwt-decode

---
## Key Concepts Covered
- OAuth 2.0 Authorization Code Flow
- PKCE (Proof Key for Code Exchange)
- Access Tokens vs ID Tokens
- Scopes and Audience
- Base64 vs Base64URL encoding
- Token exchange (/oauth/token)

---
## Common Challenges Faced
- Handling invalid_grant errors (expired or reused code, PKCE mismatch)
- Correctly generating and persisting code_verifier
- Encoding issues (btoa with Uint8Array)
- Configuring audience and API authorization in Auth0
- Understanding differences between id_token and access_token

---
## Current Status
✅ PKCE implemented correctly
✅ Authentication flow working
✅ Tokens successfully retrieved
✅ Access token includes audience
✅ Ready
