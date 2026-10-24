# ECHOES OF CODE

## Game Design Document v3.0
### Strategic Tech-Life Simulation / Anti-Clicker Sandbox

**Status:** Direction and vertical-slice specification  
**Previous version:** [GDD.md](./GDD.md) v2.5  
**Target stack:** React, Vite, Tailwind CSS, Zustand  
**Primary language:** English in code and public documentation; Romanian development notes may remain private

---

## 1. Vision

Echoes of Code is a strategic life and technology-business simulator. The player starts with limited money, time and skills, then builds influence through a combination of:

- freelance work and technical learning;
- corporate employment and professional relationships;
- ethical or illegal cyber operations;
- product development and startup management;
- investment, market influence and competitive strategy.

The game is not an idle game or a clicker. Buttons represent decisions, not direct resource generators. Meaningful progress requires time allocation, preparation, execution and consequences.

The low-poly/low-graphics presentation is intentional. The depth comes from systems, events, market reactions and difficult trade-offs rather than from visual production scope.

## 2. Design pillars

### 2.1 Time is the primary resource

Every important action consumes time from a 24-hour schedule or advances the simulation. Money alone cannot solve every problem.

### 2.2 Every advantage has a cost

Fast delivery can create technical debt. Crunch increases fatigue and bugs. Hacking can create money or influence but also trace, criminal exposure and retaliation. Loans create liquidity and financial pressure.

### 2.3 The world reacts

Clients, employers, employees, competitors, investors and the public must react to the player's decisions. The market is not a static list of panels.

### 2.4 Multiple viable careers

The player may specialize as a freelancer, corporate professional, cyber operator, founder, investor or a hybrid. No single route should be mandatory for a successful run.

### 2.5 Decisions over repetition

The game should reward planning and adaptation. Repeated actions are acceptable only when they are part of a larger decision, such as maintaining a product, training a skill or managing a company.

## 3. Core gameplay loop

```text
Plan the day
    -> Allocate hours to activities
    -> Execute the hourly simulation
    -> Consume energy, money and risk resources
    -> Receive work results, events and market changes
    -> Make strategic decisions
    -> Invest, recover or change direction
    -> Start the next day
```

The quality of the game should be evaluated by whether a complete in-game day creates meaningful choices, not by the number of available screens.

## 4. Player resources

| Resource | Function | Typical gains | Typical losses |
| --- | --- | --- | --- |
| Money | Personal and company liquidity | Work, contracts, products, investments | Rent, payroll, equipment, fines, loans |
| Time | Daily action capacity | Resets each day | Activities and commitments |
| Energy | Short-term work capacity | Sleep, rest, equipment | Work, study, hacking |
| Health | Long-term physical condition | Recovery and medical care | Sustained fatigue and illness |
| Stress | Mental pressure | Recovery, social life, therapy | Deadlines, debt, legal and career pressure |
| Skills | Eligibility and effectiveness | Study, practice, courses, projects | Rarely reduced; opportunity cost is the main limiter |
| Reputation | Trust from clients, employers and market | Successful delivery, quality, PR | Bugs, scandals, failed promises |
| Technical debt | Future maintenance and bug pressure | Rushed or low-quality work | Refactoring and quality investment |
| Trace / criminal record | Legal exposure | Illegal operations and failures | Covering tracks, rehabilitation and time |
| Market share | Company influence | Products, quality, marketing and strategy | Competitor actions and failed launches |

Each resource must have visible causes, consequences and recovery paths. Hidden or decorative values should not be exposed as finished mechanics.

## 5. Time and simulation rules

The schedule contains 24 hourly blocks. Initial activities are:

- **Sleep:** restores energy and reduces fatigue;
- **Work:** progresses an active contract, job or company task;
- **Study:** gradually improves a selected skill;
- **Rest / personal life:** reduces stress and supports recovery;
- **Strategic actions:** meetings, hiring, research, investment and operations.

The hourly tick must be the single authoritative entry point for time-based simulation. Daily and monthly events are derived from it, not implemented as unrelated shortcuts.

Minimum sleep is a design pressure, not only a warning label. Sustained fatigue must increase stress, error probability and health risk. Hospitalization and recovery should be introduced after the core tick is stable.

## 6. Career and progression

### Early game

- student or junior professional;
- basic freelance contracts;
- foundational skills;
- first corporate application;
- first legal or illegal opportunity.

### Mid game

- specialized freelance work or career advancement;
- first team members;
- startup founding;
- first product or service;
- contracts with meaningful reputation and delivery risk.

### Late game

- larger teams and offices;
- proprietary software, hardware or infrastructure;
- market competition and public reputation;
- stock influence, acquisitions and defensive strategy;
- leadership decisions with company-wide consequences.

Progression must come from choices and accumulated consequences, not only from buying increasingly expensive upgrades.

## 7. Freelance, corporate and cyber routes

Freelance contracts are divided into accessibility tiers. Each tier must have explicit skill, rating, reputation and time requirements.

Corporate employment provides stability, salary and promotion opportunities, but limits time and may create conflicts with personal projects or illegal activity.

Cyber operations provide asymmetric influence. They must remain abstract and game-mechanical, focusing on risk, preparation, trace, evidence and consequences rather than real-world operational instructions.

## 8. Product and startup strategy

The first complete product system should support one product category, such as a SaaS platform. It must contain:

- development cost and time;
- skill and team requirements;
- quality and technical debt;
- bug probability;
- launch timing;
- pricing and marketing;
- customer response;
- revenue and reputation;
- competitor reaction.

Later products may include custom operating systems, devices and private infrastructure. These are expansion layers, not prerequisites for proving the core game loop.

Startup decisions include:

- when to found the company;
- which market to enter;
- whether to hire or remain independent;
- how much to invest in quality;
- whether to launch early or delay;
- whether to use outside capital or loans;
- how to respond to competitors and crises.

## 9. Market and financial strategy

The market should evolve over time through a small number of understandable variables:

- competitor valuation and market share;
- product quality and demand;
- reputation and public events;
- stock price movement;
- debt and cash flow;
- player influence.

The stock exchange begins as a simple reactive market. Dividends, voting stakes, hostile takeovers and advanced intelligence are expansion systems after price movement and financial accounting are reliable.

## 10. Events and consequences

Events should create decisions, not random noise. Each event needs:

1. a trigger;
2. visible context;
3. at least two meaningful responses;
4. immediate and delayed consequences;
5. a log entry explaining the result.

Examples include client disputes, critical bugs, employee dissatisfaction, investment opportunities, legal claims, competitor retaliation and product coverage.

## 11. Vertical slice target

The first complete playable slice should include:

1. a reliable 24-hour schedule and hourly tick;
2. sleep, energy, fatigue, stress and health;
3. one freelance route with skill requirements;
4. one corporate route with an interview and salary;
5. one bounded cyber operation with trace consequences;
6. startup founding and one employee type;
7. one product that can be developed and launched;
8. a simple reactive market;
9. at least one event with a real choice;
10. a coherent 30-day playable scenario.

The slice is complete when a player can start, make different strategic choices, experience consequences and reach a meaningful short-term outcome without relying on debug controls.

## 12. Implementation principles

- Zustand is the source of truth for simulation state.
- Time, economy and formulas remain in the store or dedicated domain modules.
- Components present state and dispatch domain actions.
- Every displayed action must have a real implementation or be clearly marked as planned.
- Invalid actions must produce an explicit player-facing log.
- Economic values must use one consistent calendar and accounting model.
- New systems should be added only after their interaction with the core loop is specified.

## 13. Development roadmap

### Phase A — Core simulation

- repair the hourly tick API;
- implement calendar rollover;
- connect schedule activities to work and study;
- correct salary, overhead and contract accounting;
- add focused tests for time and money.

### Phase B — Vertical-slice product

- create the first product entity;
- connect work hours to product progress;
- implement quality, debt, bugs, launch and revenue;
- add one market reaction loop.

### Phase C — Strategic consequences

- add events with choices;
- improve reputation and competitor reactions;
- connect cyber operations to market and legal risk;
- add employee loyalty and basic management decisions.

### Phase D — Expansion systems

- richer R&D tree;
- advanced finance and taxes;
- multiple products and infrastructure;
- stock influence and M&A;
- extended market intelligence.

## 14. Definition of done for the current milestone

The current repository is an early playable prototype, not a final implementation of every system in this document. The milestone is successful if it demonstrates the direction, visual language and initial interaction surfaces while the core simulation is consolidated in the next development phase.

