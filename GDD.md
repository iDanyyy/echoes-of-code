**ECHOES OF CODE**

**MASTER GAME DESIGN DOCUMENT (GDD) v2.5  
Technical Strategy & Life Simulation Sandbox Engine**

| **Genre & Concept**        | Tech Mogul Life Simulator & Tactical Strategy (Anti-Clicker Sandbox)        |
| -------------------------- | --------------------------------------------------------------------------- |
| **Target Stack**           | React (Vite), Tailwind CSS, Zustand Engine (Web Browser)                    |
| **Core Gameplay Paradigm** | 24-Hour Time Allocation Grid (Bandwidth Engine) & Real-Time Tick Simulation |
| **Document Status**        | Master Architecture Specification v2.5 — Final Implementation Ready         |

**1\. Executive Summary & Core Game Philosophy**

Echoes of Code is a deep, tactical life-simulation and corporate tech strategy game. The player begins as a broke IT student in a rented apartment, choosing between freelance gigs, dark-net hacking operations, or traditional corporate job ladders. Over time, the player transitions into founding their own tech startup, managing HR teams, defending against legal lawsuits, conducting R&D for custom hardware/OS ecosystems, trading stocks, and executing hostile corporate takeovers.

**📌 ANTI-CLICKER FOUNDATION  
**The core game design explicitly rejects instant 'clicker' mechanics (e.g., clicking 'Work' for +\$50). Every action, project, and learning endeavor consumes real time within a 24-Hour Time Allocation Grid. Progression emerges from time management, skill prioritization, team leadership, and risk mitigation.

**2\. Time Engine & Health System (24-Hour Schedule Planner)**

**2.1 The 24-Hour Time Engine (Bandwidth System)**

Time does not advance by clicking buttons. Instead, each day is structured into a 24-Hour Grid. The player sets up a daily Schedule Planner by assigning hourly blocks to activities:

**• Sleep & Rest:** Requires a mandatory minimum of 6 to 8 hours per day. Sleep restores Energy (100%) and reduces Fatigue.

**• Work & Gigs:** Freelance contracts, corporate jobs, or company project development.

**• Education & Practice:** Reading textbooks, taking online courses, or practicing coding (enhances Hard/Soft Skills).

**• Personal Life:** Entertainment, gym, socializing, or therapy (lowers Stress level).

**2.2 Fatigue, Overtime & Medical Collapse**

When project deadlines near, players can crunch by reducing sleep to 3-4 hours and filling schedule slots with work tasks. However, overworking activates the Fatigue Engine:

**• Crunch & Fatigue Accumulation:** Fatigue causes code quality degradation, exponential bug rates, and higher stress build-up.

**• Bug Probability Formula:** Calculated using the formula below:

```
Bug Chance (%) = Base Project Risk × (1 + Fatigue / 100)² - (Coding Skill Level / 10)
```

**• Health & Hospitalization:** If Fatigue remains above 80% for multiple consecutive days, immune system collapse occurs. The player contracts illness, losing 2 to 4 workdays and incurring medical costs. If Health hits 0%, the game triggers a Medical Game Over.

**3\. Student Life, Freelance & Skills Matrix**

**3.1 Skills Matrix**

Skills are divided into Hard Skills and Soft Skills. Skills cannot be gained instantly; they increase gradually through practice or paid courses.

| **Category**    | **Included Skills & Game Mechanics Impact**                                                                                                                                      |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Hard Skills** | Frontend, Backend, Mobile Dev, Cybersecurity, 3D & Game Engines, Hardware / Electronics. (Determines eligible contract tiers, code quality, and R&D capability).                 |
| **Soft Skills** | Communication (interview success), Management (employee retention & productivity), Law & Compliance (court lawsuit success), Marketing & PR (brand reputation & keynote scores). |

**3.2 Freelance Exchanges (3 Accessibility Tiers)**

| **Tier Platform**         | **Access Requirement**          | **Contract Types**                               | **Pay & Risk Profile**                                           |
| ------------------------- | ------------------------------- | ------------------------------------------------ | ---------------------------------------------------------------- |
| Tier 1: WorkLite          | Unlocked at start (Level 0)     | HTML layout, simple scripts, bug fixes           | Low pay (\$50-\$200), high price competition, low skill risk     |
| Tier 2: CodeHub Pro       | Rating > 50, Backend/React Lv.2 | Full-stack apps, API integrations, mobile apps   | Medium pay (\$500-\$2,500), strict deadlines, penalties for bugs |
| Tier 3: Enterprise Direct | Rating > 90, Management Lv.3    | Banking infrastructure, high-load systems, audit | High pay (\$10,000+), advance payments, severe breach lawsuits   |

**3.3 Dark Net Side Jobs & Criminal Record Risks**

Players can take illegal gigs (database leaks, ransomware injection, DDoS attacks) for massive early-game cash flow. However, doing so increases a hidden Criminal Record parameter. When applying for corporate IT jobs, corporate Security Background Checks will detect dark net activity, resulting in interview blacklisting.

**3.4 Interactive Codex & Accessible Glossaries**

To maintain accessibility for non-technical players, complex technical terms feature interactive hover tooltips \[?\] and plain-English analogies in the Codex:

**• React:** Visual UI builder for creating web application frontends rapidly.

**• Backend:** The invisible server engine managing database storage and business rules.

**• Zero-Day Exploit:** An unpatched security vulnerability unknown even to the software developer.

**4\. Corporate Career, Interviews & Mini-Games**

**4.1 Corporate Hierarchy & Background Checks**

Players can apply to corporate positions across four industries (Web/Software, Cybersecurity, GameDev/3D, Marketing). Progressing from Junior Developer to Senior, Lead, and CTO increases monthly salary and unlocks corporate governance events (e.g., choosing whether to rewrite legacy monoliths into microservices).

**4.2 HR Interview Mini-Games**

To make job interviews engaging, HR departments conduct quirky skill tests represented as mini-games:

**• 'Out-of-the-Box Thinking' Test: Maze Mini-Game —** Navigate a data packet square through tight firewall corridors without hitting border walls.

**• 'Bug Reaction Speed' Test: Code Snake Mini-Game —** Collect valid syntax code blocks while avoiding syntax bug nodes.

**• 'Logic Under Pressure' Test: Quick Math / Tic-Tac-Toe —** Solve timed algorithmic math sequences or tactical Tic-Tac-Toe vs corporate AI.

**5\. Office Progression, Equipment Shop & HR/Legal Engine**

**5.1 Workspace & Office Progression**

| **Workspace Tier** | **Max Staff Capacity** | **Monthly Overhead** | **Unlocked Features / Modules**                 |
| ------------------ | ---------------------- | -------------------- | ----------------------------------------------- |
| Rented Apartment   | 1 (Player)             | \$300 / mo           | Basic laptop setup, freelance access            |
| Coworking / Garage | Up to 3 staff          | \$1,200 / mo         | First hired developer, shared server rack       |
| Small Office       | Up to 10 staff         | \$5,000 / mo         | HR recruitment panel, breakroom (lowers stress) |
| Medium Office      | Up to 35 staff         | \$25,000 / mo        | Legal Department, PR/Marketing studio           |
| Corporate HQ + R&D | 100+ staff             | \$150,000+ / mo      | R&D Lab, Data Center, Keynote Stage             |

**5.2 Equipment & Decor Shop**

Players can purchase hardware upgrades and office decor that scale with their workspace tier:

**• Hardware Upgrades:** Budget Laptop → High-End Workstation → Triple-Monitor Ergonomic Rig (boosts work speed, reduces bugs).

**• Decor & Comfort:** Potted Plants (slight stress reduction), Coffee Machine (fatigue recovery), '010101' Pixel Art Painting (prestige/status).

**5.3 HR Management, Loyalty & Legal Lawsuits**

Employee management is divided into specialized tabs: Developers/Designers, Marketing/PR, and Legal Team.

**• Wage Withholding & Strikes:** Withholding wages or enforcing uncompensated crunch causes Loyalty to plummet to 0%. Disloyal employees may strike, quit to join direct rivals, steal proprietary source code (IP Theft), or file labor violation lawsuits against the company.

**• Legal Department & Defense:** When sued, players must either pay massive court fines or hire an in-house Legal Team to negotiate settlements, delay court proceedings, or countersue for slander.

**6\. R&D Lab, Devices, OS & Cloud Infrastructure**

**6.1 Technology Discovery Tree & Custom Devices**

Through the R&D Lab, specialized engineers research proprietary technologies (ARM chipsets, Neural AI algorithms, Custom OS kernels).

**• Hardware & OS Ecosystems:** When manufacturing hardware (e.g., smartwatches, gaming consoles), players choose between launching on a popular third-party OS (guaranteed initial market reach, but subject to 30% OS store commission) or launching on their own proprietary OS (requires high brand fan loyalty, but yields 100% profit margins).

**• Cloud Infrastructure:** Initial server capacity is rented from cloud providers (AWS/Google Cloud). As user traffic scales, building a private Data Center reduces recurring monthly operating costs.

**7\. Marketing, PR & Competitive Market Intelligence**

**7.1 Marketing Channels & Product Keynotes**

Products can be promoted via external ad campaigns (social media ads, influencer sponsorships) or an internal PR Department that organizes high-profile Product Keynotes. Tech journalists evaluate relesed products (0-100 rating) based on bug count, innovation, and pricing, directly determining first-month sales velocity.

**7.2 Competitive Market Intelligence Panels**

The Market Intelligence suite provides live analytics across five competitive rankings:

**1\. Corporate Valuation Leaderboard:** Rankings based on market capitalization, monthly revenue, and growth.

**2\. OS Market Share:** Active install base percentages for desktop and mobile OS platforms.

**3\. Device Market Rankings:** Sales volume and hardware specs across competing gadgets.

**4\. Cloud Infrastructure Quality:** Server uptime ratings and enterprise client satisfaction.

**5\. Brand & Design Score:** Public perception metrics based on UI polish and industrial design.

**8\. Financial Center (Bank, Stock Market & Taxes)**

The Financial Center serves as the central hub for monetary management, featuring four interactive sub-modules:

| **Financial Sub-Module**           | **Functional Game Mechanics**                                                                                                           |
| ---------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| **1\. Account & Balance**          | Complete ledger of income streams, overhead costs (rent, server fees, salaries), and net monthly cashflow.                              |
| **2\. Loans & Credit Lines**       | Take out commercial bank loans or equipment leases with interest rates tied to credit score.                                            |
| **3\. Stock Market & Investments** | Trade shares of rival tech corporations, earn quarterly dividends, acquire majority voting stakes, and execute hostile takeovers (M&A). |
| **4\. Taxes & Legal Optimization** | Monthly tax filings. Hiring skilled legal advisors enables legal tax reduction strategies.                                              |

**9\. Technical Architecture & Zustand State Model**

To prevent state desynchronization and support tick-based simulation, \`gameStore.js\` uses the structured state schema below:

```
// gameStore.js — Zustand Master State Architecture Schema
import { create } from 'zustand';

export const useGameStore = create((set, get) => ({
  time: {
    hour: 8, day: 1, month: 1, year: 2026,
    speed: 1, // 0 = Pause, 1 = Normal, 2 = Fast
  },
  player: {
    money: 400, health: 100, fatigue: 0, stress: 0,
    skills: { frontend: 1, backend: 0, cyber: 0, management: 0, law: 0, marketing: 0 },
    criminalRecord: 0,
    currentRole: 'Unemployed', // 'Freelancer', 'Employee', 'CEO'
    workspaceTier: 'Apartment',
    schedule: Array(24).fill('sleep'), // 24-hour activity grid
  },
  shopItems: [], // Purchased hardware & decor
  freelanceMarket: [], // Tier 1, 2, 3 contracts
  companies: [], // Rival companies + player startup
  stocks: [], // Tradable company shares
  lawsuits: [], // Pending court cases
  logs: [], // Neural Terminal output feed

  // Core Simulation Tick (executed every hourly game step)
  tick: () => {
    const { time, player, tickHour } = get();
    // 1. Advance time clock
    // 2. Process current hour activity from schedule
    // 3. Recalculate fatigue, health, and bug rates
    // 4. Progress active company contracts & R&D projects
    // 5. Simulate rival AI actions, employee loyalty & stock prices
    // 6. Check game-over conditions (Health <= 0 or Bankrupt)
  }
}));
```

**10\. Master Development Roadmap & Task Execution**

Implementation is structured into six discrete development phases:

**Phase 1: Time Loop & Core Player Engine (Days 1-2)**

• Clean src/ state and initialize 24-hour tick engine in gameStore.js.  
• Build 24-Hour Schedule Planner UI component.  
• Implement Fatigue, Health, and Hospitalization mechanics.

**Phase 2: Freelance, Dark Net & Equipment Shop (Days 3-4)**

• Build 3-Tier Freelance Exchange with skill filters.  
• Implement Dark Net contracts and Criminal Record tracker.  
• Create Shop UI for hardware/decor upgrades with status bonuses.  
• Integrate Codex hover tooltips \[?\] for tech terms.

**Phase 3: Corporate Career & HR Interview Mini-Games (Days 5-6)**

• Build Job Application portal with Security Clearance check.  
• Develop 3 Interview Mini-Games (Maze, Code Snake, Logic Math).  
• Implement Corporate Promotion ladder and CTO governance events.

**Phase 4: Startup Founding, HR & Legal System (Days 7-8)**

• Build Office Upgrade progression system.  
• Create Staff Management tables (Developers, Marketing, Legal Team).  
• Implement Loyalty, Wage Withholding, Strikes, and Court Lawsuits.

**Phase 5: Financial Center & Stock Exchange (Days 9-10)**

• Implement Banking Hub (Accounts, Loans, Taxes).  
• Build Stock Market trading engine with dividend payouts and M&A takeovers.

**Phase 6: R&D, Hardware, PR & Market Intelligence (Days 11-12)**

• Build R&D Technology Tree (OS, Chips, Cloud).  
• Create Marketing Studio and Keynote Presentation launcher.  
• Implement 5-Category Market Intelligence Leaderboards.  
• Final Cyberpunk Dark Theme polish and visual QA.