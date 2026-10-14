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

export const useGameStore = create((set, get) => ({
  player: {
    isFounder: false,
    money: 1000,
    energy: 100,
    stress: 0,
    trace: 0,
    currentJobId: null
  },
  industries: INDUSTRIES,
  competitors: INITIAL_COMPETITORS,
  playerCompany: null,
  logs: ['[SYSTEM_INIT]: Neural link established. Welcome to Echoes of Code.'],

  addLog: (message) => {
    set((state) => ({
      logs: [message, ...state.logs.slice(0, 49)]
    }));
  },

  applyForJob: (companyId, role = 'Junior Developer') => {
    const company = get().competitors.find((c) => c.id === companyId);
    const companyName = company ? company.name : 'Unknown Corp';

    set((state) => ({
      player: {
        ...state.player,
        currentJobId: companyId
      }
    }));

    get().addLog(`[CAREER]: Hired at ${companyName} as ${role}.`);
  },

  workDaily: () => {
    const { player, addLog } = get();

    if (player.energy < 15) {
      addLog('[WARN]: Not enough energy to complete shift. Rest required.');
      return false;
    }

    const wage = player.currentJobId ? 180 : 60;
    const energyCost = 20;
    const stressGain = 12;

    set((state) => ({
      player: {
        ...state.player,
        money: state.player.money + wage,
        energy: Math.max(0, state.player.energy - energyCost),
        stress: Math.min(100, state.player.stress + stressGain)
      }
    }));

    addLog(`[SHIFT_COMPLETED]: Earned +$${wage}, -${energyCost} Energy, +${stressGain}% Stress.`);
    return true;
  },

  rest: () => {
    set((state) => ({
      player: {
        ...state.player,
        energy: Math.min(100, state.player.energy + 35),
        stress: Math.max(0, state.player.stress - 25)
      }
    }));
    get().addLog('[BIO_CYCLE]: Rested. Recovered energy and reduced stress.');
  },

  foundCompany: (name, industry) => {
    const { player, addLog } = get();
    const FOUNDATION_COST = 800;

    if (player.isFounder) {
      addLog('[WARN]: You have already founded a company.');
      return false;
    }

    if (player.money < FOUNDATION_COST) {
      addLog(`[WARN]: Insufficient funds. Foundation requires $${FOUNDATION_COST}.`);
      return false;
    }

    set((state) => ({
      player: {
        ...state.player,
        isFounder: true,
        money: state.player.money - FOUNDATION_COST,
        currentJobId: null
      },
      playerCompany: {
        name: name.trim() || 'NeoTech Syndicate',
        industry,
        employees: [],
        budget: 500,
        marketShare: 3
      }
    }));

    addLog(`[VENTURE]: Company "${name}" successfully incorporated in ${industry}.`);
    return true;
  },

  sabotageCompetitor: (competitorId, hackType = 'DDoS / Data Leak') => {
    const { player, competitors, addLog } = get();

    if (player.energy < 25) {
      addLog('[WARN]: Hacker intrusion aborted: Low energy.');
      return false;
    }

    const target = competitors.find((c) => c.id === competitorId);
    if (!target) return false;

    const shareLoss = Math.floor(Math.random() * 5) + 3;
    const traceIncrease = Math.floor(Math.random() * 16) + 15;
    const hostileIncrease = Math.floor(Math.random() * 20) + 10;

    set((state) => ({
      player: {
        ...state.player,
        energy: Math.max(0, state.player.energy - 25),
        trace: Math.min(100, state.player.trace + traceIncrease),
        stress: Math.min(100, state.player.stress + 10)
      },
      competitors: state.competitors.map((comp) => {
        if (comp.id === competitorId) {
          return {
            ...comp,
            marketShare: Math.max(1, comp.marketShare - shareLoss),
            hostility: Math.min(100, comp.hostility + hostileIncrease)
          };
        }
        return comp;
      })
    }));

    addLog(`[CYBER_ATTACK]: Deployed "${hackType}" on ${target.name}. Market Share decreased by ${shareLoss}%. Trace increased by ${traceIncrease}%.`);
    return true;
  },

  clearTrace: () => {
    const { player, addLog } = get();
    const VPN_COST = 250;

    if (player.money < VPN_COST) {
      addLog(`[WARN]: Not enough money to scrub network trace. Requires $${VPN_COST}.`);
      return false;
    }

    set((state) => ({
      player: {
        ...state.player,
        money: state.player.money - VPN_COST,
        trace: Math.max(0, state.player.trace - 40)
      }
    }));

    addLog(`[PROXY]: Logs purged. -40% network trace.`);
    return true;
  }
}));
