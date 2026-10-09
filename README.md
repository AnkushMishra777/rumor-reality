Rumour vs Reality Checker
<p align="center">
<strong>{=html}Evidence-based market intelligence for separating verified developments from market rumours.</strong>{=html}
</p>
<p align="center">
<a href="https://github.com/AnkushMishra777/rumor-reality">{=html} <img src="https://img.shields.io/badge/GitHub-Repository-181717?logo=github" alt="GitHub Repository">{=html} </a>{=html} <img src="https://img.shields.io/badge/Backend-Node.js%20%7C%20Express-339933?logo=nodedotjs&logoColor=white" alt="Node.js and Express">{=html} <img src="https://img.shields.io/badge/Project-Market%20Intelligence-2563eb" alt="Market Intelligence">{=html}
</p>
Overview
Rumour vs Reality Checker is a full-stack market-intelligence project designed to help users investigate significant stock-price movements and understand the news and claims that may be associated with them.
Instead of treating a headline or a sudden price change as proof, the system is designed to bring together market signals, related news, claim verification, and supporting evidence in one analysis workflow. The goal is to make it easier to distinguish confirmed developments from partially supported claims, unverified rumours, and claims contradicted by available evidence.
Important: This project is an informational research tool, not financial advice. Its output depends on the quality, freshness, and availability of its data sources. A score or classification is not a guarantee of accuracy and should not be used as the sole basis for an investment decision.
Why this project?
Financial markets can react quickly to breaking news, social-media claims, company announcements, and speculation. It can be difficult to tell whether a claim is supported by reliable evidence or simply circulating online.
Rumour vs Reality Checker aims to help users:
Investigate notable stock-price movements.
Review news and claims related to a stock.
Evaluate claims against available evidence and sources.
Understand why a claim received a particular classification.
Review analysis signals such as confidence and hype scores where available.
Explore related market intelligence through a single application.
Core workflow
Choose a stock --- enter a supported stock symbol, such as TATAMOTORS.
Inspect the market movement --- review the available price-movement information and any configured movement threshold.
Collect related information --- retrieve relevant news or claims through the configured data providers.
Evaluate evidence --- compare claims with the evidence and source information available to the system.
Review the result --- inspect the classification, scores, explanations, and source details returned by the analysis.
Use your judgement --- verify important information independently before making any financial decision.
Classification model
The analysis workflow uses the following result categories where supported by the current implementation:
Classification                      Meaning
REAL_EVENT                        Available evidence supports the reported event.
PARTIALLY_VERIFIED                Some parts of the claim are supported, but the full claim is not established.
UNVERIFIED_RUMOR                  The available evidence is insufficient to verify the claim.
CONTRADICTED                      Available evidence conflicts with the claim.
These labels describe the system's assessment of the available evidence; they should not be interpreted as certainty. An unverified claim is not automatically false, and a real market movement does not prove that a particular rumour caused it.
Features and project areas
The repository includes a backend and frontend, with backend modules organised around market-intelligence responsibilities.
Stock and market analysis --- endpoints and services for market-related information and analysis.
News and evidence processing --- services for working with news, claims, and supporting evidence.
Sentiment analysis --- a market-sentiment area in the backend.
Market overview --- a dedicated market-overview route.
Provider health --- a route for checking the status of configured data providers.
Watchlist support --- a backend route for watchlist-related functionality.
Matching services --- services that help connect relevant market information and evidence.
Contract tests --- backend API contract tests are included in the repository.
Exact data coverage and available features depend on the current code, configured providers, and environment variables.
Technology stack
Backend
Node.js --- JavaScript runtime.
Express.js --- HTTP API framework.
REST API architecture --- separates API routes from service and controller logic.
Environment variables --- keeps local configuration and secrets outside source control.
Automated tests --- includes a backend contract test.
Frontend
The project contains a separate frontend/ application.
Install and run it using the package manager and scripts defined in frontend/package.json.
Repository structure
The backend has been organised into modules similar to the following:
rumor-reality/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── data/
│   ├── database/
│   ├── routes/
│   ├── services/
│   ├── tests/
│   │   └── contract.test.js
│   ├── utils/
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
├── frontend/
└── README.md
The precise contents may evolve as the project develops.
Getting started
Prerequisites
Install the following before running the project:
Node.js (use a version supported by the project's dependencies)
npm, included with Node.js
Git
1. Clone the repository
git clone https://github.com/AnkushMishra777/rumor-reality.git
cd rumor-reality
2. Set up the backend
cd backend
npm install
Create a local .env file inside backend/ and add the environment variables required by the project's configured data providers and services.
Example template:
PORT=5000
NODE_ENV=development

# Add the provider API keys and configuration required by your implementation.
# Use the exact variable names expected by the backend source code.
Do not copy this example as a complete configuration. Check the backend source code and any project-specific environment example for the exact required variable names. Do not commit .env files, API keys, or other secrets.
Start the backend using the command supported by the project. If server.js is the configured entry point, run:
node server.js
The default port shown above is an example; the actual port depends on the application configuration.
3. Set up the frontend
Open a second terminal:
cd frontend
npm install
Start the frontend using the script defined in frontend/package.json. For example, if the project defines a dev script:
npm run dev
Use the local URL printed by the development server. If the frontend requires an API base URL, configure it using the variable name expected by the frontend source code.
4. Run tests
From the backend directory, inspect the available scripts:
npm run
If the project uses Node's built-in test runner and contract.test.js is configured for it, the test command may be:
node --test
Use the repository's actual test script if one is defined in package.json.
API overview
The backend contains route areas for the following capabilities. The exact HTTP methods, URL paths, parameters, and response schemas should be checked in the current route files before integrating with the API.
API area                            Purpose
Analysis                            Runs or coordinates the rumour-versus-reality analysis workflow.
Market overview                     Provides market overview information.
News                                Retrieves or processes relevant news information.
Evidence                            Handles evidence associated with a claim or analysis.
Sentiment                           Provides market-sentiment functionality.
Provider health                     Reports configured data-provider health information.
Watchlist                           Supports watchlist-related operations.
Stock / market data                 Handles stock and market information.
For implementation details, start with backend/server.js, then inspect the route files under backend/routes/ and the corresponding logic under backend/controllers/ and backend/services/.
Example analysis result
A development test previously returned a sample result for TATAMOTORS that included a reported price move, a confidence score, and a hype score. This is an illustration of the response format, not live market data or a verified statement about the stock's current performance.
When reviewing any result, consider:
The timestamp and period covered by the market data.
The origin, publication time, and credibility of each source.
Whether evidence directly supports the claim or only relates to it.
Whether independent sources corroborate the same information.
Whether a score is a heuristic, a model output, or a calibrated probability.
Configuration and data quality
Market data and news providers can differ in coverage, rate limits, latency, and reliability. Before relying on an analysis:
Confirm that the relevant provider is configured and responding.
Check timestamps to avoid treating old news as new.
Preserve links and source metadata so claims can be independently reviewed.
Handle missing, stale, duplicate, and conflicting information.
Avoid presenting a confidence score as a calibrated probability unless it has been validated as one.
Make it clear when evidence is incomplete.
Security
Keep API keys and credentials in local environment variables or a secrets manager.
Never commit .env, private keys, access tokens, or production credentials.
Validate user input and handle provider failures safely.
Apply appropriate CORS, rate limiting, logging, and request validation before public deployment.
Do not expose sensitive provider credentials to frontend code.
Deployment
The repository has been prepared for a separated frontend/backend deployment approach:
Backend: a Node.js web service can be deployed on a platform such as Render, with the backend directory as the service root.
Frontend: the frontend can be deployed separately on a static/frontend hosting platform such as Vercel, once its API URL and environment variables are configured.
These are deployment options, not a claim that a production deployment is currently live. Configure the production environment variables, allowed frontend origin, health checks, and API base URL before deployment.
Limitations
The quality of an analysis depends on the sources and data providers available to the application.
Market movement and news appearing at the same time do not establish causation.
Rumour classifications can change as new evidence becomes available.
Confidence and hype scores should be treated as analytical signals unless their methodology has been tested and documented.
The project is not a substitute for independent research or professional financial advice.
Roadmap ideas
Potential future improvements include:
Displaying source links, timestamps, and evidence excerpts alongside every verdict.
Showing a timeline that aligns market movements with published news.
Improving duplicate detection and corroboration across independent sources.
Adding historical analysis and saved investigations.
Measuring classification quality against a labelled evaluation dataset.
Adding monitoring for provider failures, stale data, and API latency.
Publishing API documentation with verified request and response examples.
Items in this section are suggestions for future work, not claims that they are already implemented.
Contributing
Contributions and constructive feedback are welcome.
Fork the repository.
Create a feature branch.
Make and test your changes.
Open a pull request describing the change and how it was tested.
Author
Ankush Mishra
GitHub: @AnkushMishra777
Project repository: rumor-reality
Disclaimer
Rumour vs Reality Checker is intended for educational, research, and informational purposes. It does not provide investment recommendations, guarantee the truth of any claim, or establish that a news item caused a stock-price movement. Always verify important information through reliable primary sources and make financial decisions independently.
