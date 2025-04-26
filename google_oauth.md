# 📩 Gmail API Authorization Setup (Web App)  
**Goal:** Allow users to authorize our web app to **read their Gmail emails** securely.
use secrets.json file for google client secrets, oauth client id etc.

## 1. Implement OAuth Flow in Web App

### Step 1 : Create a button to authorize gmail
User should see a button called authorise email in the app.
When the user clicks on this button, the app should redirect to the Google OAuth 2.0 Authorization Endpoint.

### Step 2: Generate Authorization URL
Redirect users to the Google OAuth 2.0 Authorization Endpoint:

```plaintext
https://accounts.google.com/o/oauth2/v2/auth
```

**Query Parameters** you must add:
| Key | Value |
|:----|:------|
| client_id | Your Google OAuth Client ID |
| redirect_uri | Your Redirect URI |
| response_type | `code` |
| scope | `https://www.googleapis.com/auth/gmail.readonly` |
| access_type | `offline` (to receive refresh token) |
| prompt | `consent` (forces the consent screen)

✅ **Example Authorization URL**:

```
https://accounts.google.com/o/oauth2/v2/auth?
client_id=YOUR_CLIENT_ID&
redirect_uri=YOUR_REDIRECT_URI&
response_type=code&
scope=https://www.googleapis.com/auth/gmail.readonly&
access_type=offline&
prompt=consent
```

---

### Step 3: Handle Authorization Code

After the user approves, Google redirects them to:

```
http://localhost:3001/oauth2/callback?code=AUTHORIZATION_CODE
```

Capture the `code` from the URL.

---

### Step 4: Exchange Authorization Code for Access Token

Send a **POST** request to:

```
https://oauth2.googleapis.com/token
```

**POST Body Parameters**:
| Key | Value |
|:----|:------|
| client_id | Your Google Client ID |
| client_secret | Your Google Client Secret |
| code | The Authorization Code |
| grant_type | `authorization_code` |
| redirect_uri | Your Redirect URI |

✅ **Sample POST Request**:

```bash
POST https://oauth2.googleapis.com/token
Content-Type: application/x-www-form-urlencoded

client_id=YOUR_CLIENT_ID&
client_secret=YOUR_CLIENT_SECRET&
code=AUTHORIZATION_CODE&
grant_type=authorization_code&
redirect_uri=YOUR_REDIRECT_URI
```

**Response**:

```json
{
  "access_token": "ya29.a0ARrdaM...",
  "expires_in": 3599,
  "refresh_token": "1//0g...",
  "scope": "https://www.googleapis.com/auth/gmail.readonly",
  "token_type": "Bearer"
}
```

✅ Save the `access_token` and `refresh_token`.
As part of this step, just save the `access_token` and `refresh_token` in a local file.
---

# ✅ Final Flow Overview

1. User clicks **Sign in with Google**.
2. Redirect to Google Authorization URL.
3. User grants access.
4. Google redirects back with Authorization Code.
5. App exchanges Code for Access Token (and Refresh Token).

---

# 📌 Notes
- Always store tokens securely (encrypt them if possible).
- Follow [Google’s OAuth 2.0 best practices](https://developers.google.com/identity/protocols/oauth2).

---

# ✨ Useful Links
- [Gmail API Documentation](https://developers.google.com/gmail/api)
- [OAuth 2.0 Documentation](https://developers.google.com/identity/protocols/oauth2)

---

Would you also like me to prepare a **separate markdown mini-guide** showing the code samples in **Python/Node.js** (fetching emails after OAuth)?  
Could be super handy for your dev too! 🚀