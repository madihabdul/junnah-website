# Junnah — Website and Product Demo

A public-facing introduction to Junnah and a separate interactive product prototype for a proposed university-integrated, Sharia-guided student financial support model.

The homepage includes Junnah's Islamic mission statement, a proposed student-support workflow, an overview of the product demo, and a separate presentation-style concept deck. The prototype remains available as its own view so visitors can understand the mission and model before exploring the software.

## Requirements

- Node.js 18.18+ recommended
- npm
- VS Code (recommended)

## Run locally

1. Extract the project folder.
2. Open the repository folder in VS Code.
3. Open the integrated terminal.
4. Run:

   ```bash
   npm install
   npm run dev
   ```

5. Open the local URL printed by Vite (usually `http://localhost:5173`).

## Build a production preview

```bash
npm run build
npm run preview
```

## Host the website on GitHub Pages

The repository-root GitHub Actions workflow at `.github/workflows/deploy.yml` builds and publishes the Vite site to GitHub Pages whenever changes are pushed to `main`.

1. Commit and push the files to the `main` branch.
2. In GitHub, open **Settings → Pages** and set the build and deployment source to **GitHub Actions**.
3. Open the **Actions** tab and wait for **Deploy Junnah website to GitHub Pages** to complete.

For the repository `madihabdul/junnah-website`, the homepage is `https://madihabdul.github.io/junnah-website/`. The product demo is `https://madihabdul.github.io/junnah-website/?view=demo`, and the concept deck is `https://madihabdul.github.io/junnah-website/?view=deck`. Vite uses the `/junnah-website/` asset path for the GitHub Pages project site and `/` for local development.

## Included

- Investor-facing public homepage with mission, proposed workflow, prototype preview, pilot validation notes, and navigation
- Standalone, keyboard-accessible presentation-style concept deck
- Student portal and application submission modal
- Six synthetic student circumstances
- Case manager queue, verification, notes, and simulated decisions
- University referral and simulated payment confirmation
- Clearly disclosed $25 illustrative one-time application administration fee, due only if approved and separate from financed principal
- Institution-specific university views for Garden State University, River University, and a community college example
- Illustrative capital dashboard
- Donor impact dashboard
- University partnership landing page
- Audience-specific information pages for students, universities, donors, and investors
- Responsive layouts and demo navigation

## Demo walkthrough

Start from the public homepage. Read the mission and workflow, then choose **Explore the demo** or **Open the pitch deck** to see those experiences separately.

1. Open the product demo and choose the Student portal.
2. Select a sample application or click **New application**.
3. Submit a synthetic application using one of the six profiles.
4. Open Case management and select the new case.
5. Mark the university balance verified if needed.
6. Approve the demo case.
7. Open University portal and select that case.
8. Simulate payment confirmation.
9. Check the student and capital dashboards to see updated status.
10. Open **Audience guide** to switch between the four public-facing explanations and follow each page's demo links.
11. Open **University portal** and select an institution card to review its synthetic referrals and institution-specific totals.

## Important limitations

This is a frontend proof of concept. Data is stored in React state and resets when the page reloads. There is no production backend, authentication, payment processing, document upload, live university integration, or live AI.

All people, institutions, financial values, statuses, and transactions are fictional. The prototype is not a financing offer and must not be used to collect real student financial data.

The audience pages are informational demo content. Application entry is synthetic; no real applications, donations, or investments are collected or offered.

The application flow displays a proposed $25 one-time administrative cost-recovery fee only as an illustration. It is shown as due separately if an application is approved, not at submission, and is not included in the requested or repaid financing principal. No fee is collected in the prototype; the amount is not based on validated costs and the fee's structure requires legal, regulatory, and qualified Sharia review before any real use.

Before a live pilot, obtain appropriate legal, regulatory, privacy/security, accounting, university, and qualified Sharia review.
