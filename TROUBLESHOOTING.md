# Troubleshooting Google Login

If you are seeing **"Access blocked: Authorization Error"**, it means Google does not trust your website domain yet. This is a security setting on Google's side, not a bug in your code.

## 1. Fix "Access Blocked" (Google Cloud Console)

1.  Go to [Google Cloud Credentials](https://console.cloud.google.com/apis/credentials).
2.  Click the **Pencil Icon** to edit your OAuth 2.0 Client ID.
3.  Scroll to **Authorized JavaScript origins**.
4.  Ensure you have **EXACTLY** these entries (no trailing slashes):
    *   `https://brandturn.co.in`
    *   `https://www.brandturn.co.in`
5.  Scroll to **Authorized redirect URIs**.
    *   Add: `https://brandturn.co.in`
    *   Add: `https://www.brandturn.co.in`
6.  Click **Save**.
7.  **WAIT**: It takes 5-10 minutes for Google to update.

## 2. Fix Backend Verification (Render)

For the login to complete successfully after the popup closes, your Backend needs to know your Google Client ID.

1.  Go to your [Render Dashboard](https://dashboard.render.com/).
2.  Click on your **brandturn-backend** service.
3.  Click **Environment**.
4.  Add a new variable:
    *   **Key**: `GOOGLE_CLIENT_ID`
    *   **Value**: (Paste your Google Client ID string here - same one used in Vercel)
5.  Click **Save Changes**.

## 3. Fix Frontend Variable (Vercel)

1.  Go to your [Vercel Dashboard](https://vercel.com/dashboard).
2.  Click on your project -> **Settings** -> **Environment Variables**.
3.  Ensure `VITE_GOOGLE_CLIENT_ID` is present and correct.
4.  If you changed anything, go to **Deployments** and **Redeploy**.

## 4. Final Test

1.  Clear your browser cache or open an **Incognito Window**.
2.  Go to `https://brandturn.co.in`.
3.  Try to login.
