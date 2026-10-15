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

export const CODEX_ENTRIES = {
  'Technical Debt': 'Накопленные проблемы в коде из-за спешки. Чем выше долг, тем больше денег вы теряете на исправление багов каждый день.',
  'Trace Level': 'Ваш цифровой след. Если он достигнет 100%, вас вычислят власти. Снижается через операцию "Cover Tracks".',
  'Zero-Day Exploit': 'Атака на уязвимость, о которой разработчик еще не знает. Высокий риск, но очень эффективна.',
  'DDoS': 'Перегрузка серверов запросами. Средний риск, хорошо подходит для временного вывода конкурента из строя.',
  'Phishing': 'Обман сотрудников для получения доступа. Низкий риск, но требует времени на подготовку.',
  'Market Share': 'Ваша доля рынка. Показывает, насколько ваша компания влиятельна по сравнению с конкурентами.'
};

export const FREELANCE_CONTRACTS = [
  { id: 'f1', tier: 1, name: 'HTML Landing Page', pay: 120, duration: 2, requiredSkill: 'frontend', minLevel: 0, risk: 5 },
  { id: 'f2', tier: 1, name: 'Fix CSS Bug in Legacy App', pay: 80, duration: 1, requiredSkill: 'frontend', minLevel: 0, risk: 2 },
  { id: 'f3', tier: 2, name: 'REST API Integration', pay: 650, duration: 4, requiredSkill: 'backend', minLevel: 2, risk: 15 },
  { id: 'f4', tier: 2, name: 'React Dashboard SPA', pay: 1200, duration: 6, requiredSkill: 'frontend', minLevel: 2, risk: 20 },
  { id: 'f5', tier: 3, name: 'Banking Core Microservice', pay: 8500, duration: 12, requiredSkill: 'backend', minLevel: 4, risk: 40 },
];

export const SHOP_ITEMS = [
  { id: 's1', name: 'High-End Workstation', type: 'hardware', cost: 1200, bonus: 'Boosts coding speed & reduces bugs' },
  { id: 's2', name: 'Ergonomic Chair', type: 'decor', cost: 350, bonus: 'Reduces daily fatigue accumulation' },
  { id: 's3', name: 'Espresso Machine', type: 'decor', cost: 600, bonus: 'Accelerates energy recovery during rest' },
];

export const useGameStore = create((set, get) => ({
  time: {
    hour: 8,
    day: 1,
    month: 1,
    year: 2026,
    speed: 1, // 0 = Pause, 1 = Normal, 2 = Fast
  },
  player: {
    isFounder: false,
    money: 1000,
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
    schedule: Array(24).fill('sleep'),
  },
  day: 1,
  gameOver: null,
  industries: INDUSTRIES,
  competitors: INITIAL_COMPETITORS,
  playerCompany: null,
  logs: ['[SYSTEM_INIT]: Neural link established. Welcome to Echoes of Code (v2.5 Engine).'],
  
  technicalDebt: 0,
  activeProjects: [],
  activeFreelance: null,
  inventory: [],
  
  hacking: {
    step: 0, // 0: Idle, 1: Recon, 2: Execution, 3: Cover
    targetId: null,
    type: null,
    risk: 0
  },

  resetGame: () => {
    set({
      time: { hour: 8, day: 1, month: 1, year: 2026, speed: 1 },
      player: { 
        isFounder: false, 
        money: 1000, 
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
        schedule: Array(24).fill('sleep')
      },
      day: 1,
      gameOver: null,
      competitors: INITIAL_COMPETITORS,
      playerCompany: null,
      logs: ['[SYSTEM_RESET]: Neural link re-established.'],
      technicalDebt: 0,
      activeProjects: [],
      activeFreelance: null,
      inventory: [],
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
      gameOverReason = 'BANKRUPT: Insufficient funds.';
    } else if (player.stress >= 100) {
      gameOverReason = 'BURNOUT: Mental collapse.';
    } else if (player.trace >= 100) {
      gameOverReason = 'BUSTED: Authorities tracked you.';
    } else if (player.health <= 0) {
      gameOverReason = 'MEDICAL EMERGENCY: Health collapse.';
    }

    if (gameOverReason) {
      set({ gameOver: gameOverReason });
      addLog(`[CRITICAL]: ${gameOverReason}`);
    }
  },

  tick: () => {
    const { time, player, addLog, checkIntegrity, activeProjects, activeFreelance } = get();
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

    if (currentActivity === 'sleep') {
      newFatigue = Math.max(0, player.fatigue - 10);
      newEnergy = Math.min(100, player.energy + 15);
    } else if (currentActivity === 'work') {
      newFatigue = Math.min(100, player.fatigue + 4);
      newEnergy = Math.max(0, player.energy - 6);
      newStress = Math.min(100, player.stress + 2);
    } else if (currentActivity === 'study') {
      newFatigue = Math.min(100, player.fatigue + 3);
      newEnergy = Math.max(0, player.energy - 4);
    } else {
      // rest / personal
      newFatigue = Math.min(100, player.fatigue + 1);
      newEnergy = Math.max(0, player.energy - 2);
      newStress = Math.max(0, player.stress - 3);
    }

    if (newFatigue > 80) {
      newHealth = Math.max(0, player.health - 2);
    }

    let updatedProjects = [...activeProjects];
    let updatedFreelance = activeFreelance;
    let earnedMoney = 0;
    let newMoney = player.money;

    if (nextDay !== time.day) {
      const bugCosts = Math.floor(get().technicalDebt * 5);
      const dailyExpenses = 50 + bugCosts;
      newMoney -= dailyExpenses;
      newStress = Math.min(100, player.stress + 5);

      const remainingProjects = [];
      for (const proj of activeProjects) {
        const remainingDays = proj.remainingDays - 1;
        if (remainingDays <= 0) {
          earnedMoney += proj.revenue;
          addLog(`[PROJECT]: Finished "${proj.name}". Collected $${proj.revenue}.`);
        } else {
          remainingProjects.push({ ...proj, remainingDays });
        }
      }
      updatedProjects = remainingProjects;

      if (updatedFreelance) {
        const remainingDays = updatedFreelance.remainingDays - 1;
        if (remainingDays <= 0) {
          earnedMoney += updatedFreelance.pay;
          newMoney += updatedFreelance.pay;
          addLog(`[FREELANCE]: Completed "${updatedFreelance.name}". Earned $${updatedFreelance.pay}.`);
          updatedFreelance = null;
        } else {
          updatedFreelance = { ...updatedFreelance, remainingDays };
        }
      }

      newMoney += earnedMoney;
      addLog(`[DAY_UPDATE]: Day ${nextDay}. Expenses: -$${dailyExpenses}.`);
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
    const { addLog, checkIntegrity } = get();
    const debtGain = Math.max(0, (speed * 3) - quality - security);
    const revenue = (speed * 100) + (quality * 50);
    const duration = Math.max(1, Math.floor(11 - speed));

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

  foundCompany: (name, industry) => {
    if (get().gameOver) return;
    const { player, addLog } = get();
    const FOUNDATION_COST = 800;

    if (player.money < FOUNDATION_COST) {
      addLog(`[WARN]: Insufficient funds.`);
      return false;
    }

    set((state) => ({
      player: {
        ...state.player,
        isFounder: true,
        money: state.player.money - FOUNDATION_COST,
        currentJobId: null,
        currentRole: 'CEO'
      },
      playerCompany: {
        name: name.trim() || 'NeoTech Syndicate',
        industry,
        employees: [],
        budget: 500,
        marketShare: 3
      }
    }));

    addLog(`[VENTURE]: Company "${name}" incorporated.`);
    return true;
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
