# VC Scout – AI Startup Discovery Interface

A lightweight VC intelligence tool for discovering, enriching, and organizing startup leads.

## Features
- Company discovery interface
- Dynamic company profile with notes
- Save companies to lists
- Export saved companies (JSON)
- Live enrichment via server API
- Enrichment caching for performance

## Tech Stack
- Next.js (App Router)
- Tailwind CSS
- LocalStorage persistence
- Server API routes

## Enrichment Flow
1. User clicks Enrich
2. Server fetches company website
3. HTML cleaned and summarized
4. Insights returned to UI
5. Results cached per company

## Setup
```bash
npm install
npm run dev
