# Deployment Guide for grow+

This guide will help you deploy your grow+ website.

## Prerequisites

1.  **GitHub Account**: Push your code to a GitHub repository.
2.  **Vercel Account**: For hosting the Frontend (React).
3.  **Render Account**: For hosting the Backend (Node.js).
4.  **MongoDB Atlas**: For the database (free tier available).

## Step 1: Push Code to GitHub

1.  Initialize a git repository if you haven't already:
    ```bash
    git init
    git add .
    git commit -m "Initial commit"
    ```
2.  Create a new repository on GitHub.
3.  Push your code:
    ```bash
    git remote add origin <your-github-repo-url>
    git push -u origin main
    ```

## Step 2: Deploy Backend (Render)

1.  Log in to [Render](https://render.com/).
2.  Click **New +** -> **Web Service**.
3.  Connect your GitHub repository.
4.  **Settings**:
    *   **Name**: `growplus-backend`
    *   **Root Directory**: `backend`
    *   **Environment**: `Node`
    *   **Build Command**: `npm install && npm run build`
    *   **Start Command**: `npm start`
5.  **Environment Variables** (Add these in Render Dashboard):
    *   `PORT`: `5002`
    *   `MONGO_URI`: `your_mongodb_atlas_connection_string`
    *   `JWT_SECRET`: `your_strong_secret_key` (Use a strong random string)
    *   `NODE_ENV`: `production`
    *   `FRONTEND_URL`: `https://your-vercel-app.vercel.app` (Update after deploying frontend)
6.  Click **Create Web Service**.
7.  Wait for deployment. Copy the **Service URL** (e.g., `https://growplus-backend.onrender.com`).

## Step 3: Deploy Frontend (Vercel)

1.  Log in to [Vercel](https://vercel.com/).
2.  Click **Add New...** -> **Project**.
3.  Import your GitHub repository.
4.  **Project Settings**:
    *   **Framework Preset**: Vite
    *   **Root Directory**: `frontend` (Click "Edit" and select `frontend`)
5.  **Environment Variables** (Add these in Vercel Dashboard):
    *   `VITE_API_URL`: `https://growplus-backend.onrender.com` (Your backend URL from Step 2)
    *   `VITE_GOOGLE_CLIENT_ID`: `your_google_client_id`
    *   `VITE_GROQ_API_KEY`: `your_groq_api_key`
6.  Click **Deploy**.

## Step 4: Update Backend CORS (Important!)

After deploying frontend, go back to Render and update:
*   `FRONTEND_URL`: `https://your-vercel-app.vercel.app` (Your Vercel URL)

## Step 5: Connect Custom Domain (Optional)

### On Vercel:
1.  Go to your Vercel Project Dashboard.
2.  Click **Settings** -> **Domains**.
3.  Enter your domain and click **Add**.
4.  Vercel will show you DNS records to add.

### DNS Settings:
*   **A Record**: `@` pointing to `76.76.21.21`
*   **CNAME Record**: `www` pointing to `cname.vercel-dns.com`

## Step 6: Final Checklist

- [ ] Backend deployed on Render
- [ ] Frontend deployed on Vercel
- [ ] Environment variables set correctly
- [ ] CORS configured (FRONTEND_URL in backend)
- [ ] Test login/signup functionality
- [ ] Test contact form submission
- [ ] Test Admin Dashboard with grow+ AI

## Environment Variables Summary

### Backend (Render):
```
PORT=5002
MONGO_URI=mongodb+srv://...
JWT_SECRET=your_strong_secret
NODE_ENV=production
FRONTEND_URL=https://your-app.vercel.app
```

### Frontend (Vercel):
```
VITE_API_URL=https://your-backend.onrender.com
VITE_GOOGLE_CLIENT_ID=your_google_client_id
VITE_GROQ_API_KEY=your_groq_api_key
```
