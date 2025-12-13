# Deployment Guide for BrandTurn

This guide will help you publish your website to `brandturn.co.in`.

## Prerequisites

1.  **GitHub Account**: You need to push this code to a GitHub repository.
2.  **Vercel Account**: For hosting the Frontend (React).
3.  **Render Account**: For hosting the Backend (Node.js).
4.  **GoDaddy Account**: To configure your domain.

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
    *   **Name**: `brandturn-backend` (or similar)
    *   **Root Directory**: `backend`
    *   **Environment**: `Node`
    *   **Build Command**: `npm install && npm run build`
    *   **Start Command**: `npm start`
5.  **Environment Variables** (Scroll down to "Advanced"):
    *   Add `JWT_SECRET`: `your_secret_key_here` (Use a strong random string)
    *   Add `NODE_ENV`: `production`
    *   (Optional) `MONGO_URI`: If you want to override the hardcoded one.
6.  Click **Create Web Service**.
7.  Wait for the deployment to finish. Copy the **Service URL** (e.g., `https://brandturn-backend.onrender.com`).

## Step 3: Deploy Frontend (Vercel)

1.  Log in to [Vercel](https://vercel.com/).
2.  Click **Add New...** -> **Project**.
3.  Import your GitHub repository.
4.  **Project Settings**:
    *   **Framework Preset**: Vite (should be detected automatically).
    *   **Root Directory**: Click "Edit" and select `frontend`.
5.  **Environment Variables**:
    *   Key: `VITE_API_URL`
    *   Value: The Backend URL you copied from Render (e.g., `https://brandturn-backend.onrender.com`). **Do not add a trailing slash.**
6.  Click **Deploy**.

## Step 4: Connect Domain (GoDaddy)

1.  Go to your Vercel Project Dashboard.
2.  Click **Settings** -> **Domains**.
3.  Enter `brandturn.co.in` and click **Add**.
4.  Vercel will show you DNS records to add.
    *   **A Record**: `@` pointing to `76.76.21.21`
    *   **CNAME Record**: `www` pointing to `cname.vercel-dns.com`
5.  Log in to GoDaddy, go to **DNS Management** for your domain.
6.  Add/Update these records.
7.  Wait for propagation (usually minutes, up to 24h).

## Step 5: Final Check

1.  Visit `https://brandturn.co.in`.
2.  Try logging in/registering to ensure the frontend can talk to the backend.
