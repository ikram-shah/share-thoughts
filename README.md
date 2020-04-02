<h1 align="center">
  SHARETHOUGHTS
</h1>
<p align="center">
  <a href="https://api.netlify.com/api/v1/badges/20eccbc9-15ba-4634-9a76-56eaead19b5a/deploy-status" alt="Vue">
        <img src="https://api.netlify.com/api/v1/badges/20eccbc9-15ba-4634-9a76-56eaead19b5a/deploy-status" /></a>
  <a href="https://github.com/ikram-shah/share-thoughts/workflows/Vue%20CI/badge.svg" alt="Flask">
        <img src="https://github.com/ikram-shah/share-thoughts/workflows/Vue%20CI/badge.svg" /></a>
  <a href="https://github.com/ikram-shah/share-thoughts/workflows/Sockets%20CI/badge.svg" alt="Rails">
        <img src="https://github.com/ikram-shah/share-thoughts/workflows/Sockets%20CI/badge.svg" /></a>
</p>

<p align="center">
Sharethoughts is a simple application where user can share their thoughts (like, own Quotes) and user can track availability status of other users.
</p>

[**DEMO**](https://sharethoughts.netlify.app/)

### Features
- [x] User Registration  
- [x] Authentication System
- [x] Presence Service
- [x] View all users, Last seen
- [x] Create and View all Feeds
- [ ] Reset Password

### Tech Stack
1. Frontend - **VueJS**
    - Buefy: UI components based on Bulma  
    - VueX: State Management
    - Vue Router
    - Jest
2. Backend Services - **Node.js**
    - API's (Netlify Functions)
    - Data Streaming (Web Sockets)
3. Database - **FaunaDB**

### Deployments
1. Frontend - Netlify Deployment
2. Backend
    - API: Netlify Functions
    - Data Streaming: Heroku

## Architecture

<p align="center">
  <img  src="https://github.com/ikram-shah/share-thoughts/blob/master/.github/slides/all_components.png" width="70%" />
  <img src="https://github.com/ikram-shah/share-thoughts/blob/master/.github/slides/signup.png" width="49%" /> 
   <img src="https://github.com/ikram-shah/share-thoughts/blob/master/.github/slides/login.png" width="49%" /> 
   <img src="https://github.com/ikram-shah/share-thoughts/blob/master/.github/slides/logout.png" width="49%" /> 
   <img src="https://github.com/ikram-shah/share-thoughts/blob/master/.github/slides/feeds.png" width="49%" /> 
   <img src="https://github.com/ikram-shah/share-thoughts/blob/master/.github/slides/users_and_status.png" width="49%" /> 
</p>


## Project setup
**NOTE:** Setup environment variables by referring to .env file
### Frontend (VueJS)

**To Run**
```
npm ci
```
```
npm run serve
```
**To Build**
```
npm run build
```

### Backend Services (VueJS)

- **API's**
  ```
  npm ci
  ```
  ```
  npm run start:server
  ```
  **To Build**
  ```
  npm run build:functions
  ```
- **Data Streaming (WebSockets)**
  ```
  cd sockets
  ```
  ```
  npm ci
  ```
  ```
  node server
  ```
