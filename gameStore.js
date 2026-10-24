import { create } from 'zustand';

export const INDUSTRIES = [
  'Web & Software',
  'Cyber Security & Networking',
  'Game Development & 3D',
  'Marketing & Design'
];

const INITIAL_COMPETITORS = [
  { id: 'c1', name: 'Google', industry: 'Web & Software', marketShare: 45, hostility: 0 },
  { id: 'c2', name: 'CrowdStrike', industry: 'Cyber Security & Networking', marketShare: 30, hostility: 0 },
  { id: 'c3', name: 'Electronic Arts (EA)', industry: 'Game Development & 3D', marketShare: 40, hostility: 0 },
  { id: 'c4', name: 'Omnicom Group', industry: 'Marketing & Design', marketShare: 28, hostility: 0 }
];

export const INITIAL_STOCKS = [
  { id: 'st1', symbol: 'GOOG', name: 'Google Corp', price: 150, owned: 0, dividend: 2 },
  { id: 'st2', symbol: 'CRWD', name: 'CrowdStrike Sec', price: 95, owned: 0, dividend: 1.5 },
  { id: 'st3', symbol: 'EA', name: 'EA Games', price: 120, owned: 0, dividend: 1.8 },
  { id: 'st4', symbol: 'OMNI', name: 'Omnicom Group', price: 80, owned: 0, dividend: 1 },
];

export const OFFICE_TIERS = [
  { id: 'Apartment', name: 'Rented Apartment', capacity: 1, overhead: 300, desc: 'Basic laptop setup' },
  { id: 'Garage', name: 'Coworking / Garage', capacity: 3, overhead: 1200, desc: 'First hired developer space' },
  { id: 'SmallOffice', name: 'Small Office', capacity: 10, overhead: 5000, desc: 'HR recruitment & breakroom' },
  { id: 'MediumOffice', name: 'Medium Office', capacity: 35, overhead: 25000, desc: 'Legal Dept & PR studio' }
];

export const CORP_JOBS = [
  { id: 'job1', industry: 'Web & Software', role: 'Junior Frontend Dev', salary: 1200, minSkill: 1, requiredSkillKey: 'frontend' },
  { id: 'job2', industry: 'Web & Software', role: 'Senior React Architect', salary: 4500, minSkill: 4, requiredSkillKey: 'frontend' },
  { id: 'job3', industry: 'Cyber Security & Networking', role: 'SecOps Analyst', salary: 2000, minSkill: 2, requiredSkillKey: 'cyber' },
  { id: 'job4', industry: 'Game Development & 3D', role: 'Gameplay Scripter', salary: 2500, minSkill: 3, requiredSkillKey: 'backend' },
  { id: 'job5', industry: 'Marketing & Design', role: 'UX Growth Lead', salary: 3000, minSkill: 3, requiredSkillKey: 'marketing' },
];

export const CODEX_ENTRIES = {
  'Technical Debt': 'Накопленные проблемы в коде из-за спешки. Чем выше долг, тем больше денег вы теряете на исправление багов каждый день.',
  'Trace Level': 'Ваш цифровой след. Если он достигнет 100%, вас вычислят власти. Снижается через операцию "Cover Tracks".',
  'Zero-Day Exploit': 'Атака на уязвимость, о которой разработчик еще не знает. Высокий риск, но очень эффективна.',
  'DDoS': 'Перегрузка серверов запросами. Средний риск, хорошо подходит для временного вывода конкурента из строя.',
  'Phishing': 'Обман сотрудников для получения доступа. Низкий риск, но требует времени на подготовку.',
  'Market Share': 'Ваша доля рынка. Показывает, насколько ваша компания влиятельна по сравнению с конкурентами.',
  'React': 'Visual UI builder for creating web application frontends rapidly.',
  'Backend': 'The invisible server engine managing database storage and business rules.'
};

export const FREELANCE_CONTRACTS = [
  { id: 'f1', tier: 1, name: 'HTML Landing Page', pay: 120, duration: 2, requiredSkill: 'frontend', minLevel: 0, risk: 5 },
  { id: 'f2', tier: 1, name: 'Fix CSS Bug in Legacy App', pay: 80, duration: 1, requiredSkill: 'frontend', minLevel: 0, risk: 2 },
  { id: 'f3', tier: 2, name: 'REST API Integration', pay: 650, duration: 4, requiredSkill: 'backend', minLevel: 2, risk: 15 },
  { id: 'f4', tier: 2, name: 'React Dashboard SPA', pay: 1200, duration: 6, requiredSkill: 'frontend', minLevel: 2, risk: 20 },
  { id: 'f5', tier: 3, name: 'Banking Core Microservice', pay: 8500, duration: 12, requiredSkill: 'backend', minLevel: 4, risk: 40 },
];

export const DARKNET_CONTRACTS = [
  { id: 'd1', name: 'Database Leak (Competitor)', pay: 2500, duration: 3, risk: 35, traceGain: 25 },
  { id: 'd2', name: 'Ransomware Injection', pay: 6000, duration: 5, risk: 60, traceGain: 50 },
  { id: 'd3', name: 'DDoS Attack on Rival', pay: 1500, duration: 2, risk: 20, traceGain: 15 },
];

export const SHOP_ITEMS = [
  { id: 's1', name: 'High-End Workstation', type: 'hardware', cost: 1200, bonus: 'Boosts coding speed & reduces bugs' },
  { id: 's2', name: 'Ergonomic Chair', type: 'decor', cost: 350, bonus: 'Reduces daily fatigue accumulation' },
  { id: 's3', name: 'Espresso Machine', type: 'decor', cost: 600, bonus: 'Accelerates energy recovery during rest' },
];

const DEFAULT_SCHEDULE = [
  'sleep', 'sleep', 'sleep', 'sleep', 'sleep', 'sleep', 'sleep', 'rest',
  'work', 'work', 'work', 'work', 'rest', 'work', 'work', 'work',
  'study', 'study', 'rest', 'rest', 'rest', 'sleep', 'sleep', 'sleep'
];

export const useGameStore = create((set, get) => ({
  time: {
    hour: 8,
    day: 1,
    month: 1,
    year: 2026,
    speed: 1,
  },
  player: {
    isFounder: false,
    money: 400,
    energy: 100,
    health: 100,
    fatigue: 0,
    stress: 0,
    trace: 0,
    currentJobId: null,
    skills: { frontend: 1, backend: 0, cyber: 0, management: 0, law: 0, marketing: 0 },
    criminalRecord: 0,
    currentRole: 'Unemployed',
    workspaceTier: 'Apartment',
    schedule: DEFAULT_SCHEDULE,
  },
  day: 1,
  gameOver: null,
  industries: INDUSTRIES,
  competitors: INITIAL_COMPETITORS,
  playerCompany: null,
  logs: ['[SYSTEM_INIT]: Neural link established. GDD v2.5 Sandbox engine active.'],
  
  technicalDebt: 0,
  activeProjects: [],
  activeFreelance: null,
  inventory: [],
  employees: [],
  lawsuits: [],
  stocks: INITIAL_STOCKS,
  loans: [],
  researchedTechs: [],
  
  hacking: {
    step: 0,
    targetId: null,
    type: null,
    risk: 0
  },

  resetGame: () => {
    set({
      time: { hour: 8, day: 1, month: 1, year: 2026, speed: 1 },
      player: { 
        isFounder: false, 
        money: 400, 
        energy: 100, 
        health: 100, 
        fatigue: 0, 
        stress: 0, 
        trace: 0, 
        currentJobId: null,
        skills: { frontend: 1, backend: 0, cyber: 0, management: 0, law: 0, marketing: 0 },
        criminalRecord: 0,
        currentRole: 'Unemployed',
        workspaceTier: 'Apartment',
        schedule: DEFAULT_SCHEDULE
      },
      day: 1,
      gameOver: null,
      competitors: INITIAL_COMPETITORS,
      playerCompany: null,
      logs: ['[SYSTEM_RESET]: Neural link re-established. Fresh simulation started.'],
      technicalDebt: 0,
      activeProjects: [],
      activeFreelance: null,
      inventory: [],
      employees: [],
      lawsuits: [],
      stocks: INITIAL_STOCKS,
      loans: [],
      researchedTechs: [],
      hacking: { step: 0, targetId: null, type: null, risk: 0 }
    });
  },

  addLog: (message) => {
    set((state) => ({
      logs: [message, ...state.logs.slice(0, 49)]
    }));
  },

  setScheduleHour: (hour, activity) => {
    set((state) => {
      const newSchedule = [...state.player.schedule];
      newSchedule[hour] = activity;
      return {
        player: {
          ...state.player,
          schedule: newSchedule
        }
      };
    });
  },

  checkIntegrity: () => {
    const { player, addLog } = get();
    let gameOverReason = null;

    if (player.money < 0) {
      gameOverReason = 'BANKRUPT: Insufficient funds to continue operations.';
    } else if (player.stress >= 100) {
      gameOverReason = 'BURNOUT: Complete mental collapse.';
    } else if (player.trace >= 100) {
      gameOverReason = 'BUSTED: Cybercrime authorities tracked and raided your premises.';
    } else if (player.health <= 0) {
      gameOverReason = 'MEDICAL EMERGENCY: Complete health collapse due to extreme exhaustion.';
    }

    if (gameOverReason) {
      set({ gameOver: gameOverReason });
      addLog(`[CRITICAL]: ${gameOverReason}`);
    }
  },

  tickHour: () => {
    get().tick();
  },

  tick: () => {
    const { time, player, addLog, checkIntegrity, activeProjects, activeFreelance, employees, lawsuits, playerCompany, stocks, loans } = get();
    let nextHour = time.hour + 1;
    let nextDay = time.day;
    let nextMonth = time.month;
    let nextYear = time.year;

    if (nextHour >= 24) {
      nextHour = 0;
      nextDay += 1;
    }

    const currentActivity = player.schedule[time.hour] || 'rest';
    let newFatigue = player.fatigue;
    let newHealth = player.health;
    let newStress = player.stress;
    let newEnergy = player.energy;

    const hasChair = get().inventory.some(i => i.id === 's2');
    const hasEspresso = get().inventory.some(i => i.id === 's3');

    // 24-Hour activity simulation step
    if (currentActivity === 'sleep') {
      newFatigue = Math.max(0, player.fatigue - (hasChair ? 12 : 10));
      newEnergy = Math.min(100, player.energy + (hasEspresso ? 20 : 15));
      newStress = Math.max(0, player.stress - 2);
    } else if (currentActivity === 'work') {
      newFatigue = Math.min(100, player.fatigue + 4);
      newEnergy = Math.max(0, player.energy - 6);
      newStress = Math.min(100, player.stress + 2);
    } else if (currentActivity === 'study') {
      newFatigue = Math.min(100, player.fatigue + 3);
      newEnergy = Math.max(0, player.energy - 4);
      newStress = Math.max(0, player.stress - 1);
    } else {
      newFatigue = Math.min(100, player.fatigue + 1);
      newEnergy = Math.max(0, player.energy - 2);
      newStress = Math.max(0, player.stress - 3);
    }

    // Health reduction when critical fatigue threshold is reached
    if (newFatigue > 80) {
      newHealth = Math.max(0, player.health - 2);
    } else if (newFatigue < 30 && player.health < 100) {
      newHealth = Math.min(100, player.health + 1);
    }

    let updatedProjects = [...activeProjects];
    let updatedFreelance = activeFreelance;
    let earnedMoney = 0;
    let newMoney = player.money;

    if (player.currentJobId) {
      const jobObj = CORP_JOBS.find(j => j.id === player.currentJobId);
      if (jobObj) {
        earnedMoney += Math.floor(jobObj.salary / 30 / 24);
      }
    }

    if (playerCompany) {
      earnedMoney += Math.floor((playerCompany.marketShare * 200) / 30 / 24);
    }

    newMoney += earnedMoney;

    // Daily midnight routine calculation
    if (nextHour === 0 && nextDay !== time.day) {
      const officeTierObj = OFFICE_TIERS.find(o => o.id === player.workspaceTier) || OFFICE_TIERS[0];
      const payroll = employees.reduce((sum, e) => sum + e.salary, 0);
      const bugCosts = Math.floor(get().technicalDebt * 5);
      const loanInterest = loans.reduce((sum, l) => sum + Math.floor((l.amount * l.interest) / 30), 0);
      const dailyExpenses = Math.floor(officeTierObj.overhead / 30) + Math.floor(payroll / 30) + bugCosts + loanInterest;
      
      newMoney -= dailyExpenses;
      newStress = Math.min(100, newStress + 3);

      const remainingProjects = [];
      for (const proj of activeProjects) {
        const remainingDays = proj.remainingDays - 1;
        if (remainingDays <= 0) {
          newMoney += proj.revenue;
          addLog(`[PROJECT]: Finished "${proj.name}". Collected $${proj.revenue}.`);
        } else {
          remainingProjects.push({ ...proj, remainingDays });
        }
      }
      updatedProjects = remainingProjects;

      if (updatedFreelance) {
        const remainingDays = updatedFreelance.remainingDays - 1;
        if (remainingDays <= 0) {
          newMoney += updatedFreelance.pay;
          if (updatedFreelance.traceGain) {
            set(state => ({ player: { ...state.player, trace: Math.min(100, state.player.trace + updatedFreelance.traceGain), criminalRecord: state.player.criminalRecord + 1 } }));
            addLog(`[DARKNET]: Contract completed. Trace increased by ${updatedFreelance.traceGain}%.`);
          } else {
            addLog(`[FREELANCE]: Completed "${updatedFreelance.name}". Earned $${updatedFreelance.pay}.`);
          }
          updatedFreelance = null;
        } else {
          updatedFreelance = { ...updatedFreelance, remainingDays };
        }
      }

      if (nextDay % 30 === 1) {
        let dividends = 0;
        stocks.forEach(st => {
          dividends += st.owned * st.dividend * 10;
        });
        if (dividends > 0) {
          newMoney += dividends;
          addLog(`[FINANCE]: Received monthly stock dividends: +$${dividends}.`);
        }
      }

      addLog(`[DAY_UPDATE]: Day ${nextDay}. Daily overhead & debt costs: -$${dailyExpenses}.`);

      if (Math.random() < 0.12 && !lawsuits.length && player.isFounder) {
        const newLawsuit = { id: Date.now(), title: 'IP Patent Infringement', fine: 3500, daysLeft: 5 };
        set(state => ({ lawsuits: [...state.lawsuits, newLawsuit] }));
        addLog(`[LEGAL]: Lawsuit filed against your startup! Potential fine: $3500.`);
      }
    }

    set({
      time: { ...time, hour: nextHour, day: nextDay, month: nextMonth, year: nextYear },
      day: nextDay,
      player: {
        ...player,
        money: newMoney,
        fatigue: newFatigue,
        health: newHealth,
        stress: newStress,
        energy: newEnergy
      },
      activeProjects: updatedProjects,
      activeFreelance: updatedFreelance
    });

    checkIntegrity();
  },

  nextDay: () => {
    for (let i = 0; i < 24; i++) {
      get().tick();
    }
  },

  startProject: (speed, quality, security) => {
    const { addLog, checkIntegrity, inventory } = get();
    const hasWorkstation = inventory.some(i => i.id === 's1');
    const effectiveSpeed = hasWorkstation ? speed + 1 : speed;

    const debtGain = Math.max(0, (effectiveSpeed * 3) - quality - security);
    const revenue = (effectiveSpeed * 100) + (quality * 50);
    const duration = Math.max(1, Math.floor(11 - effectiveSpeed));

    const newProject = {
      id: Date.now(),
      name: `Contract Pipeline #${Math.floor(Math.random() * 8999 + 1000)}`,
      remainingDays: duration,
      totalDays: duration,
      revenue
    };
    
    set((state) => ({
      technicalDebt: state.technicalDebt + debtGain,
      activeProjects: [...state.activeProjects, newProject]
    }));

    addLog(`[PROJECT]: Started new contract. Duration: ${duration} days. Est Revenue: $${revenue}.`);
    checkIntegrity();
  },

  acceptFreelance: (contract) => {
    const { addLog } = get();
    set({
      activeFreelance: { ...contract, remainingDays: contract.duration }
    });
    addLog(`[FREELANCE]: Accepted contract "${contract.name}". Duration: ${contract.duration} days.`);
  },

  acceptDarknet: (contract) => {
    const { addLog } = get();
    set({
      activeFreelance: { ...contract, remainingDays: contract.duration }
    });
    addLog(`[DARKNET]: Accepted illegal contract "${contract.name}". High risk!`);
  },

  buyShopItem: (item) => {
    const { player, inventory, addLog } = get();
    if (player.money < item.cost) {
      addLog(`[SHOP]: Insufficient funds for ${item.name}.`);
      return;
    }
    set({
      player: { ...player, money: player.money - item.cost },
      inventory: [...inventory, item]
    });
    addLog(`[SHOP]: Purchased ${item.name} for $${item.cost}.`);
  },

  acceptJob: (job) => {
    const { player, addLog } = get();
    if (player.criminalRecord > 0) {
      addLog(`[HR]: Background check failed! Criminal record detected for ${job.role}.`);
      return false;
    }
    if (player.skills[job.requiredSkillKey] < job.minSkill) {
      addLog(`[HR]: Insufficient skill level for ${job.role}.`);
      return false;
    }
    set({
      player: {
        ...player,
        currentJobId: job.id,
        currentRole: job.role
      }
    });
    addLog(`[CAREER]: Hired as ${job.role}!`);
    return true;
  },

  quitJob: () => {
    const { addLog } = get();
    set((state) => ({
      player: {
        ...state.player,
        currentJobId: null,
        currentRole: 'Unemployed'
      }
    }));
    addLog(`[CAREER]: Resigned from corporate position.`);
  },

  foundCompany: (name, industry) => {
    const { player, addLog } = get();
    const COST = 2000;
    if (player.money < COST) {
      addLog(`[STARTUP]: Insufficient funds to incorporate ($${COST} required).`);
      return false;
    }
    set({
      player: {
        ...player,
        isFounder: true,
        money: player.money - COST,
        currentJobId: null,
        currentRole: 'CEO'
      },
      playerCompany: {
        name,
        industry,
        marketShare: 5
      }
    });
    addLog(`[STARTUP]: Successfully incorporated "${name}" in ${industry}!`);
    return true;
  },

  upgradeOffice: (tierId) => {
    const { player, addLog } = get();
    const tierObj = OFFICE_TIERS.find(o => o.id === tierId);
    if (!tierObj) return;
    const cost = 5000;
    if (player.money < cost) {
      addLog(`[OFFICE]: Insufficient funds to upgrade workspace.`);
      return;
    }
    set(state => ({
      player: { ...state.player, money: state.player.money - cost, workspaceTier: tierId }
    }));
    addLog(`[OFFICE]: Upgraded workspace to ${tierObj.name}.`);
  },

  hireEmployee: (role, salary) => {
    const { employees, player, addLog } = get();
    const tierObj = OFFICE_TIERS.find(o => o.id === player.workspaceTier) || OFFICE_TIERS[0];
    if (employees.length >= tierObj.capacity) {
      addLog(`[HR]: Office capacity reached! Upgrade workspace to hire more staff.`);
      return;
    }
    const newEmp = { id: Date.now(), role, salary, loyalty: 100 };
    set({ employees: [...employees, newEmp] });
    addLog(`[HR]: Hired ${role} with salary $${salary}/mo.`);
  },

  resolveLawsuit: (id, payFine) => {
    const { lawsuits, player, addLog } = get();
    const lawsuit = lawsuits.find(l => l.id === id);
    if (!lawsuit) return;

    if (payFine) {
      if (player.money < lawsuit.fine) {
        addLog(`[LEGAL]: Insufficient funds to pay court settlement.`);
        return;
      }
      set(state => ({
        player: { ...state.player, money: state.player.money - lawsuit.fine },
        lawsuits: state.lawsuits.filter(l => l.id !== id)
      }));
      addLog(`[LEGAL]: Settled lawsuit for $${lawsuit.fine}.`);
    } else {
      set(state => ({
        lawsuits: state.lawsuits.filter(l => l.id !== id)
      }));
      addLog(`[LEGAL]: Fought lawsuit in court successfully.`);
    }
  },

  researchTech: (techId, cost) => {
    const { player, researchedTechs = [], addLog } = get();
    if (player.money < cost) {
      addLog(`[R&D]: Insufficient funds to research ${techId}.`);
      return;
    }
    set(state => ({
      player: { ...state.player, money: state.player.money - cost },
      researchedTechs: [...(state.researchedTechs || []), techId]
    }));
    addLog(`[R&D]: Successfully unlocked technology "${techId}".`);
  },

  launchKeynote: (productName) => {
    const { playerCompany, addLog } = get();
    if (!playerCompany) {
      addLog(`[PR]: You must establish a startup company before broadcasting keynotes.`);
      return;
    }
    const gain = Math.floor(Math.random() * 5 + 3);
    set(state => ({
      playerCompany: {
        ...state.playerCompany,
        marketShare: Math.min(100, state.playerCompany.marketShare + gain)
      }
    }));
    addLog(`[PR]: Worldwide Keynote for "${productName}" gained +${gain}% market share!`);
  },

  buyStock: (stockId) => {
    const { stocks, player, addLog } = get();
    const stock = stocks.find(s => s.id === stockId);
    if (!stock || player.money < stock.price) {
      addLog(`[STOCK]: Insufficient funds to buy ${stock?.symbol}.`);
      return;
    }
    set(state => ({
      player: { ...state.player, money: state.player.money - stock.price },
      stocks: state.stocks.map(s => s.id === stockId ? { ...s, owned: s.owned + 1 } : s)
    }));
    addLog(`[STOCK]: Purchased 1 share of ${stock.symbol} for $${stock.price}.`);
  },

  sellStock: (stockId) => {
    const { stocks, addLog } = get();
    const stock = stocks.find(s => s.id === stockId);
    if (!stock || stock.owned <= 0) {
      addLog(`[STOCK]: You do not own any shares of ${stock?.symbol}.`);
      return;
    }
    set(state => ({
      player: { ...state.player, money: state.player.money + stock.price },
      stocks: state.stocks.map(s => s.id === stockId ? { ...s, owned: s.owned - 1 } : s)
    }));
    addLog(`[STOCK]: Sold 1 share of ${stock.symbol} for $${stock.price}.`);
  },

  takeLoan: (amount, interest) => {
    const { loans, addLog } = get();
    const newLoan = { id: Date.now(), amount, interest };
    set(state => ({
      player: { ...state.player, money: state.player.money + amount },
      loans: [...loans, newLoan]
    }));
    addLog(`[BANK]: Secured commercial loan of $${amount} at ${interest * 100}% interest.`);
  },

  repayLoan: (loanId) => {
    const { loans, player, addLog } = get();
    const loan = loans.find(l => l.id === loanId);
    if (!loan || player.money < loan.amount) {
      addLog(`[BANK]: Insufficient funds to repay loan.`);
      return;
    }
    set(state => ({
      player: { ...state.player, money: state.player.money - loan.amount },
      loans: state.loans.filter(l => l.id !== loanId)
    }));
    addLog(`[BANK]: Repaid loan of $${loan.amount}.`);
  },

  initiateHack: (targetId) => {
    set({ hacking: { step: 1, targetId, type: null, risk: 0 } });
    get().addLog(`[HACK]: Reconnaissance started on ${targetId}.`);
  },

  executeHack: (type) => {
    const risk = type === 'Zero-Day' ? 40 : type === 'DDoS' ? 20 : 10;
    set((state) => ({
      hacking: { ...state.hacking, step: 2, type, risk }
    }));
    get().addLog(`[HACK]: Execution phase: ${type}. Risk: ${risk}%`);
  },

  coverTracks: () => {
    const { hacking, addLog, checkIntegrity } = get();
    const success = Math.random() * 100 > hacking.risk;
    
    if (success) {
      set((state) => ({
        player: { ...state.player, trace: Math.max(0, state.player.trace - 20) },
        hacking: { step: 0, targetId: null, type: null, risk: 0 }
      }));
      addLog(`[HACK]: Success! Tracks covered.`);
    } else {
      set((state) => ({
        player: { ...state.player, trace: Math.min(100, state.player.trace + 30) },
        hacking: { step: 0, targetId: null, type: null, risk: 0 }
      }));
      addLog(`[HACK]: Failed! Trace increased.`);
    }
    checkIntegrity();
  },

  debugAddMoney: (amount = 1000) => {
    set((state) => ({
      player: { ...state.player, money: state.player.money + amount }
    }));
    get().addLog(`[DEBUG]: Added $${amount}.`);
  },

  debugReduceStress: (amount = 50) => {
    set((state) => ({
      player: { ...state.player, stress: Math.max(0, state.player.stress - amount) }
    }));
    get().addLog(`[DEBUG]: Reduced stress by ${amount}.`);
  }
}));
