# Deployment Guide: Magia Auto Detail LLC

This project consists of two parts: a **TanStack Start (React)** frontend and a **Convex** backend. To make the site live 24/7, you need to deploy both.

## Part 1: Deploy the Backend (Convex)

1.  **Install Convex CLI** (if not already done):
    ```bash
    npm install -g convex
    ```
2.  **Login and Deploy**:
    From your terminal inside the `app` directory:
    ```bash
    npx convex deploy
    ```
    *This will create a new Convex project and give you a **Production Deployment URL** (e.g., `https://happy-otter-123.convex.cloud`).*

3.  **Set Environment Variables**:
    Go to your [Convex Dashboard](https://dashboard.convex.dev):
    - Select your project.
    - Go to **Settings** > **Environment Variables**.
    - Add your **Resend API Key**:
      - Name: `RESEND_API_KEY`
      - Value: `[Your-Resend-API-Key]`

---

## Part 2: Deploy the Frontend (Vercel / Netlify)

We recommend **Vercel** for TanStack Start projects.

1.  **Connect your Repository**:
    Connect your GitHub repository to Vercel.
2.  **Configuration**:
    - **Framework Preset**: Vite (or TanStack Start if available).
    - **Build Command**: `npm run build`
    - **Install Command**: `npm install`
    - **Output Directory**: `.output` (TanStack Start default) or `dist`.
3.  **Environment Variables**:
    Add the following environment variable to your Vercel project:
    - Name: `VITE_CONVEX_URL`
    - Value: `[Your-Production-Convex-URL-from-Part-1]`

---

## Part 3: Custom Domain (Optional)

1.  In Vercel, go to **Settings** > **Domains**.
2.  Add `magiaautodetailllc.com`.
3.  Follow the instructions to update your DNS records (A record and CNAME) at your domain registrar (e.g., Namecheap, GoDaddy).

---

## Summary Checklist
- [ ] Convex backend deployed.
- [ ] `RESEND_API_KEY` added to Convex Dashboard.
- [ ] Frontend deployed to Vercel.
- [ ] `VITE_CONVEX_URL` added to Vercel.
- [ ] Domain mapped.

Your site will then be live 24/7!
