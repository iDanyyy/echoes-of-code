# Echoes of Code

Echoes of Code is a cyberpunk strategic tech-life simulator built around time management, professional progression, startup decisions and competitive influence.

The project deliberately moves away from clicker mechanics. The player does not generate money by repeatedly pressing a work button. Instead, each day is planned through a 24-hour schedule, and progress comes from choosing how to spend limited time, money, energy and risk.

## Current status

**Early playable prototype / vertical-slice foundation**

The repository already contains a working browser prototype with:

- React, Vite, Tailwind CSS and Zustand;
- a cyberpunk command-center interface;
- a 24-hour schedule planner;
- energy, health, fatigue and stress indicators;
- freelance contracts and a dark-net route;
- a corporate career portal with interview mini-games;
- startup founding, office upgrades and basic hiring;
- loans and a simple stock exchange;
- hacking operations, trace and criminal-record concepts;
- a Codex for technical terms;
- initial R&D, PR and market-intelligence surfaces.

The current milestone proves the direction and user experience. It is intentionally not presented as the finished implementation of the full game design document.

## Design direction

The long-term goal is a strategic simulator where:

1. the player plans a day;
2. hourly activities consume time and change resources;
3. work, learning and operations create opportunities and risks;
4. products, companies and competitors react to player decisions;
5. the player can pursue different paths as a freelancer, employee, cyber operator, founder or investor.

The detailed direction is documented in [GDD_v3.0.md](./GDD_v3.0.md). [GDD.md](./GDD.md) remains as the previous v2.5 design reference.

## Next development focus

The next milestone is to consolidate the core loop before adding more screens:

- connect study to skill progression;
- implement one complete product-development flow;
- make market and competitor reactions affect the player;
- add tests for the time engine and economy;
- connect or clearly mark the R&D and keynote surfaces;
- remove duplicate legacy modules;
- remove or gate debug controls from normal gameplay.

## Known limitations

Several visible modules are currently prototypes or presentation surfaces. R&D, advanced finance, taxes, M&A, full employee management, the five market leaderboards, hospitalisation, advanced product development and competitor AI are not complete.

The project is being developed incrementally. The priority is a coherent 30-day playable scenario rather than adding more independent menus.

## Running locally

Requirements:

- Node.js 18 or newer;
- npm.

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Create a production build:

```bash
npm run build
```

## Repository notes

Generated dependencies, build output, local environment files, logs, coverage data and private development notes are excluded through [.gitignore](./.gitignore).
