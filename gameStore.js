// gameStore.js — „Echoes of Code” (simulator carieră + strategie firmă)
import { create } from 'zustand';
import {
  WORK_TASKS,
  RANDOM_EVENTS,
  FOUNDING_REQUIREMENTS,
  MIN_DAYS_IN_ROLE,
  ROLE_APPLY_REQ,
  CAREER_INTRO,
  COMPANY_DAY_FOCUS,
  BLACK_MARKET_JOBS,
} from './gameContent';

export { FOUNDING_REQUIREMENTS } from './gameContent';

export const BALANCE = {
  DAYS_PER_MONTH: 30,
  REST_ENERGY_GAIN: 35,
  REST_STRESS_RELIEF: 12,
  BURNOUT_DAYS: 14,
  PROMO_ENERGY_COST: 15,
  STEAL_ENERGY_COST: 25,
  STEAL_STRESS_GAIN: 14,
  STEAL_PAYOUT: 220,
  STEAL_TRACE: [12, 20],
  FOUNDER_GRAY_PAYOUT: [300, 550],
  FOUNDER_GRAY_TRACE: [16, 24],
  HIRE_FEE: 3500,
  RENT_PER_MONTH: 1400,
  REVENUE_PER_SHARE_DAILY: 11,
  REVENUE_PER_EMPLOYEE_DAILY: 22,
  INNOVATE_POINTS_PER_1000: 0.06,
  INNOVATE_EMPLOYEE_BONUS: 0.08,
  SABOTAGE_SHARE_TO_PLAYER: 0.12,
  AUDIT_THRESHOLD: 75,
  TRACE_MAX: 100,
  TRACE_FINE: 5000,
  AUDIT_TRACE_PRESSURE: 4,
  HOSTILITY_STEP: 30,
  RETALIATION_BUDGET_PCT: 0.22,
  DAILY_RETALIATION_DIVISOR: 120,
  SCRUB_COST: 2200,
  SCRUB_ENERGY_COST: 30,
  SCRUB_TRACE_DROP: 18,
  EVENT_CHANCE: 0.28,
  MAX_LOG: 50,
  START_SAVINGS: 800,
};

export const INDUSTRIES = [
  { id: 'web', name: 'Web & Software' },
  { id: 'cyber', name: 'Cyber Security & Networking' },
  { id: 'gamedev', name: 'Game Development & 3D' },
  { id: 'marketing', name: 'Marketing & Design' },
];

export const ROLES = ['Junior', 'Mid', 'Senior', 'Team Lead'];
export const SALARIES = { Junior: 2800, Mid: 4800, Senior: 7500, 'Team Lead': 11000 };

export const HACK_TYPES = {
  ddos: {
    label: 'Atac DDoS',
    industry: 'Web & Software',
    energy: 28,
    damage: [0.8, 1.6],
    trace: [20, 28],
  },
  zeroDay: {
    label: 'Zero-Day pe piața neagră',
    industry: 'Cyber Security & Networking',
    energy: 32,
    damage: [0.9, 1.8],
    trace: [24, 32],
  },
  sourceTheft: {
    label: 'Furt cod / asset-uri',
    industry: 'Game Development & 3D',
    energy: 30,
    damage: [0.7, 1.5],
    trace: [22, 30],
  },
  fakeNews: {
    label: 'Campanie Fake News',
    industry: 'Marketing & Design',
    energy: 22,
    damage: [0.5, 1.2],
    trace: [18, 26],
  },
};

const COMPETITORS = [
  { id: 'c1', name: 'Google', industry: 'Web & Software', marketShare: 45, hostility: 0 },
  { id: 'c2', name: 'CrowdStrike', industry: 'Cyber Security & Networking', marketShare: 30, hostility: 0 },
  { id: 'c3', name: 'Electronic Arts (EA)', industry: 'Game Development & 3D', marketShare: 40, hostility: 0 },
  { id: 'c4', name: 'Microsoft', industry: 'Web & Software', marketShare: 30, hostility: 0 },
  { id: 'c5', name: 'Vercel', industry: 'Web & Software', marketShare: 10, hostility: 0 },
  { id: 'c6', name: 'Palo Alto Networks', industry: 'Cyber Security & Networking', marketShare: 25, hostility: 0 },
  { id: 'c7', name: 'Bitdefender', industry: 'Cyber Security & Networking', marketShare: 15, hostility: 0 },
  { id: 'c8', name: 'Ubisoft', industry: 'Game Development & 3D', marketShare: 25, hostility: 0 },
  { id: 'c9', name: 'Epic Games', industry: 'Game Development & 3D', marketShare: 20, hostility: 0 },
  { id: 'c10', name: 'Adobe', industry: 'Marketing & Design', marketShare: 35, hostility: 0 },
  { id: 'c11', name: 'WPP', industry: 'Marketing & Design', marketShare: 25, hostility: 0 },
  { id: 'c12', name: 'Meta', industry: 'Marketing & Design', marketShare: 30, hostility: 0 },
];

const clamp = (v, min = 0, max = 100) => Math.min(max, Math.max(min, v));
const r1 = (v) => Math.round(v * 100) / 100;

let rng = Math.random;
export const setRng = (fn) => {
  rng = fn;
};
const roll = ([min, max]) => Math.round(min + rng() * (max - min));

let logSeq = 0;
let employeeSeq = 0;

export const industryById = (id) => INDUSTRIES.find((i) => i.id === id);
export const industryName = (id) => industryById(id)?.name ?? '';

export const makeJobId = (companyId, role) => `${companyId}:${role}`;
export const parseJobId = (jobId) => {
  if (!jobId) return null;
  const [companyId, role] = jobId.split(':');
  return { companyId, role };
};

export const hackForIndustry = (industryName) =>
  Object.entries(HACK_TYPES).find(([, h]) => h.industry === industryName)?.[0] ?? null;

export const interviewChancePct = (player) => {
  const raw = 0.35 + player.skill / 200 + player.reputation / 200 - player.stress / 300;
  return Math.max(5, Math.min(95, Math.round(raw * 100)));
};

export const stealPayoutForRole = (role) => {
  const mult = { Junior: 1, Mid: 1.4, Senior: 1.85, 'Team Lead': 2.2 }[role] ?? 1;
  return Math.round(BALANCE.STEAL_PAYOUT * mult);
};

export const getUnclaimedShare = (s, industryName) => {
  const giants = s.competitors
    .filter((c) => c.industry === industryName)
    .reduce((sum, c) => sum + c.marketShare, 0);
  const mine = s.playerCompany?.industry === industryName ? s.playerCompany.marketShare : 0;
  return Math.max(0, r1(100 - giants - mine));
};

export const competitorsInCareer = (s) => {
  if (!s.player.careerPath) return [];
  const name = industryName(s.player.careerPath);
  return s.competitors.filter((c) => c.industry === name);
};

export const foundingStatus = (s) => {
  const job = parseJobId(s.player.currentJobId);
  const roleIdx = job ? ROLES.indexOf(job.role) : -1;
  const minIdx = ROLES.indexOf(FOUNDING_REQUIREMENTS.minRole);
  const checks = [
    { ok: roleIdx >= minIdx, text: `Rol minim: ${FOUNDING_REQUIREMENTS.minRole}` },
    { ok: s.player.reputation >= FOUNDING_REQUIREMENTS.minReputation, text: `Reputație ${FOUNDING_REQUIREMENTS.minReputation}+` },
    { ok: s.player.skill >= FOUNDING_REQUIREMENTS.minSkill, text: `Skill ${FOUNDING_REQUIREMENTS.minSkill}+` },
    { ok: s.player.careerDays >= FOUNDING_REQUIREMENTS.minCareerDays, text: `${FOUNDING_REQUIREMENTS.minCareerDays} zile în carieră` },
    { ok: s.player.money >= FOUNDING_REQUIREMENTS.minSavings, text: `${FOUNDING_REQUIREMENTS.minSavings}$ economii` },
  ];
  return { checks, ready: checks.every((c) => c.ok) };
};

const createInitialState = () => ({
  player: {
    isFounder: false,
    careerPath: null,
    money: BALANCE.START_SAVINGS,
    energy: 100,
    stress: 0,
    trace: 0,
    skill: 8,
    reputation: 5,
    careerDays: 0,
    daysInRole: 0,
    currentJobId: null,
    stealBlockedDays: 0,
    investorDebt: false,
  },
  industries: INDUSTRIES,
  competitors: COMPETITORS.map((c) => ({ ...c })),
  playerCompany: null,
  burnout: null,
  audit: { active: false, by: null },
  gameOver: null,
  day: 1,
  log: [],
  modal: null,
  flags: { guideSeen: false },
});

const takeFromGiants = (competitors, industry, points) => {
  const total = competitors
    .filter((c) => c.industry === industry)
    .reduce((sum, c) => sum + c.marketShare, 0);
  const want = Math.min(points, total);
  if (want <= 0) return { competitors, taken: 0 };

  let taken = 0;
  const next = competitors.map((c) => {
    if (c.industry !== industry) return c;
    const cut = Math.min(r1((want * c.marketShare) / total), c.marketShare);
    taken += cut;
    return { ...c, marketShare: r1(c.marketShare - cut) };
  });
  return { competitors: next, taken: r1(taken) };
};

const applyTrace = (s, gain, suspectId) => {
  const trace = clamp(s.player.trace + gain);
  let { audit, competitors } = s;
  const notes = [];

  if (trace > BALANCE.AUDIT_THRESHOLD) {
    competitors = competitors.map((c) =>
      c.id === suspectId ? { ...c, hostility: clamp(c.hostility + BALANCE.HOSTILITY_STEP) } : c,
    );
    if (!audit.active) {
      const suspect = competitors.find((c) => c.id === suspectId);
      audit = { active: true, by: suspectId };
      notes.push(`${suspect?.name ?? 'Un gigant'} deschide audit. Trace crește zilnic până ștergi log-urile.`);
    }
  }
  return { trace, audit, competitors, notes };
};

const auditPressure = (s) => (s.audit.active ? BALANCE.AUDIT_TRACE_PRESSURE : 0);

const seizeAssets = (s) => ({
  gameOver: { reason: 'trace', fine: BALANCE.TRACE_FINE },
  playerCompany: null,
  burnout: null,
  modal: null,
  player: {
    ...s.player,
    isFounder: false,
    currentJobId: null,
    money: Math.max(0, s.player.money - BALANCE.TRACE_FINE),
  },
});

export const useGameStore = create((set, get) => {
  const commit = (patch, messages, kind = 'info') => {
    const list = (Array.isArray(messages) ? messages : [messages]).filter(Boolean).map((t) => [kind, t]);
    let next = { ...get(), ...patch };

    if (!next.gameOver && next.player.trace >= BALANCE.TRACE_MAX) {
      const seized = seizeAssets(next);
      patch = { ...patch, ...seized };
      next = { ...next, ...seized };
      list.push(['err', `Trace 100%: amendă ${BALANCE.TRACE_FINE}$, echipament confiscat. Game over.`]);
    }

    set({
      ...patch,
      log: [...next.log, ...list.map(([k, t]) => ({ id: ++logSeq, day: next.day, kind: k, text: t }))].slice(
        -BALANCE.MAX_LOG,
      ),
    });
    return { ok: true };
  };

  const reject = (message) => {
    const s = get();
    set({ log: [...s.log, { id: ++logSeq, day: s.day, kind: 'err', text: message }].slice(-BALANCE.MAX_LOG) });
    return { ok: false };
  };

  const openModal = (modal) => set({ modal });
  const closeModal = () => set({ modal: null });

  const tickPlayerCooldowns = (player) => ({
    ...player,
    stealBlockedDays: Math.max(0, player.stealBlockedDays - 1),
  });

  const advanceCalendar = (s, extraPatch = {}) => {
    const { player: playerPatch, ...restPatch } = extraPatch;
    const merged = tickPlayerCooldowns({
      ...s.player,
      trace: clamp(s.player.trace + auditPressure(s)),
      ...playerPatch,
    });
    return {
      ...restPatch,
      day: s.day + 1,
      player: {
        ...merged,
        careerDays: merged.careerDays + (s.player.careerPath ? 1 : 0),
        daysInRole: merged.currentJobId ? merged.daysInRole + 1 : 0,
      },
    };
  };

  const maybeQueueEvent = (s) => {
    if (s.gameOver || s.modal) return null;
    if (rng() > BALANCE.EVENT_CHANCE) return null;
    const pool = RANDOM_EVENTS.filter((e) => e.when(s));
    if (!pool.length) return null;
    const ev = pool[Math.floor(rng() * pool.length)];
    return {
      type: 'event',
      eventId: ev.id,
      title: ev.title,
      body: ev.body,
      choices: ev.choices.map((c) => ({ id: c.id, label: c.label, hint: c.hint })),
    };
  };

  const afterAction = (patch, messages, kind) => {
    commit(patch, messages, kind);
    const s = get();
    const evModal = maybeQueueEvent(s);
    if (evModal) openModal(evModal);
  };

  const resolveEvent = (s, choiceId) => {
    const id = s.modal?.eventId;
    const msgs = [];
    let patch = {};

    switch (id) {
      case 'oncall':
        if (choiceId === 'yes') {
          patch.player = {
            ...s.player,
            energy: s.player.energy - 25,
            stress: clamp(s.player.stress + 8),
            money: s.player.money + 400,
            reputation: clamp(s.player.reputation + 10),
          };
          msgs.push('Ai salvat release-ul. Bonus 400$, dar ești epuizat.');
        } else {
          patch.player = { ...s.player, reputation: clamp(s.player.reputation - 8) };
          msgs.push('Ai refuzat gardă. Șeful a notat.');
        }
        break;
      case 'recruiter':
        if (choiceId === 'interview' && rng() < 0.5) {
          const rivals = competitorsInCareer(s);
          const co = rivals[Math.floor(rng() * rivals.length)];
          patch.player = { ...s.player, currentJobId: makeJobId(co.id, 'Mid'), daysInRole: 0 };
          msgs.push(`Ofertă de la ${co.name}: Mid Developer.`);
        } else if (choiceId === 'interview') {
          patch.player = { ...s.player, stress: clamp(s.player.stress + 5) };
          msgs.push('Interviu fără ofertă. +stres.');
        }
        break;
      case 'audit_rumor':
        if (choiceId === 'lay_low') {
          patch.player = { ...s.player, stealBlockedDays: 7, trace: clamp(s.player.trace - 5) };
          msgs.push('Stai curat 7 zile — nu poți fura date.');
        } else {
          patch.player = {
            ...s.player,
            money: s.player.money - 800,
            energy: s.player.energy - 10,
            trace: clamp(s.player.trace - 15),
          };
          msgs.push('Consultant plătit: Trace −15%, −800$.');
        }
        break;
      case 'conference':
        if (choiceId === 'speak') {
          patch.player = {
            ...s.player,
            energy: s.player.energy - 20,
            reputation: clamp(s.player.reputation + 18),
            skill: clamp(s.player.skill + 6),
          };
          msgs.push('Talk reușit: +reputație, +skill.');
        }
        break;
      case 'rival_launch': {
        const co = s.playerCompany;
        if (choiceId === 'counter') {
          if (co.budget < 3000) {
            msgs.push('Buget insuficient pentru contra-lansare.');
          } else if (rng() < 0.45) {
            patch.playerCompany = { ...co, budget: co.budget - 3000, marketShare: r1(co.marketShare + 0.15) };
            msgs.push('Contra-lansare reușită: +0.15% cotă.');
          } else {
            patch.playerCompany = { ...co, budget: co.budget - 3000, marketShare: r1(Math.max(0, co.marketShare - 0.1)) };
            msgs.push('Contra-lansare eșuată: ai pierdut bani și cotă.');
          }
        } else {
          const rival = competitorsInCareer(s)[0];
          patch.playerCompany = { ...co, marketShare: r1(Math.max(0, co.marketShare - 0.2)) };
          if (rival) {
            patch.competitors = s.competitors.map((c) =>
              c.id === rival.id ? { ...c, marketShare: r1(c.marketShare + 0.3) } : c,
            );
          }
          msgs.push('Ai așteptat. Rivalul a câștigat teren.');
        }
        break;
      }
      case 'layoff':
        if (choiceId === 'network') {
          if (rng() < 0.4) {
            patch.player = { ...s.player, energy: s.player.energy - 15 };
            msgs.push('Ai păstrat jobul, dar ai ars energie pe politică.');
          } else {
            patch.player = { ...s.player, currentJobId: null, daysInRole: 0, stress: clamp(s.player.stress + 15) };
            msgs.push('Restructurare: ești pe piața muncii.');
          }
        } else {
          patch.player = {
            ...s.player,
            currentJobId: null,
            daysInRole: 0,
            money: s.player.money + 3000,
            reputation: clamp(s.player.reputation + 5),
          };
          msgs.push('Severance 3000$. Cauți job nou.');
        }
        break;
      case 'investor':
        if (choiceId === 'take') {
          patch.playerCompany = { ...s.playerCompany, budget: s.playerCompany.budget + 8000 };
          patch.player = { ...s.player, investorDebt: true, stress: clamp(s.player.stress + 10) };
          msgs.push('Investitor: +8000$ buget, costuri crescute pe viitor.');
        }
        break;
      default:
        break;
    }
    closeModal();
    afterAction(advanceCalendar(s, patch), msgs);
  };

  return {
    ...createInitialState(),

    closeModal,

    /** La primul load: alegere industrie */
    ensureIntroModals: () => {
      const s = get();
      if (s.gameOver || s.modal) return;
      if (!s.flags.guideSeen) {
        openModal({
          type: 'guide',
          title: 'Regulament & termeni',
          body: '',
          choices: [{ id: 'ok', label: 'Am înțeles regulile', hint: 'Apoi alegi sfera de carieră' }],
        });
        return;
      }
      if (s.player.careerPath) return;
      openModal({
        type: 'career',
        title: CAREER_INTRO.title,
        body: CAREER_INTRO.body,
        choices: INDUSTRIES.map((i) => ({
          id: i.id,
          label: i.name,
          hint: 'Joburi și rivali doar în această sferă',
        })),
      });
    },

    openGuideModal: () => {
      openModal({
        type: 'guide',
        title: 'Regulament & termeni',
        body: '',
        choices: [{ id: 'ok', label: 'Închide', hint: 'Poți redeschide oricând din header' }],
      });
    },

    ensureCareerModal: () => get().ensureIntroModals(),

    pickCareer: (industryId) => {
      const ind = industryById(industryId);
      if (!ind) return reject('Industrie invalidă.');
      closeModal();
      return commit(
        { player: { ...get().player, careerPath: industryId } },
        `Carieră în ${ind.name}. Studiază piața și aplică la un gigant.`,
      );
    },

    openApplyModal: (companyId, role) => {
      const s = get();
      if (!s.player.careerPath) return reject('Alege mai întâi sfera.');
      if (s.player.isFounder) return reject('Demisionează mental — ești fondator.');
      const req = ROLE_APPLY_REQ[role];
      const company = s.competitors.find((c) => c.id === companyId);
      if (!company || company.industry !== industryName(s.player.careerPath)) {
        return reject('Compania nu e în sfera ta.');
      }
      const pct = interviewChancePct(s.player);
      openModal({
        type: 'apply',
        companyId,
        role,
        title: `Interviu · ${company.name}`,
        body: `Post: ${role}. Cerințe: skill ${req.skill}, reputație ${req.reputation}. Ai skill ${s.player.skill}, rep ${s.player.reputation}. Șansă estimată de angajare: ${pct}%.`,
        choices: [
          { id: 'standard', label: 'Participi la interviu', hint: `${pct}% șansă · respins = +stres, +1 zi` },
          { id: 'cancel', label: 'Renunță', hint: 'Închide' },
        ],
      });
    },

    openWorkModal: () => {
      const s = get();
      const job = parseJobId(s.player.currentJobId);
      if (!job) return reject('Nu ai job.');
      const tasks = WORK_TASKS[s.player.careerPath] ?? WORK_TASKS.web;
      openModal({
        type: 'work',
        title: `Zi de lucru · ${job.role}`,
        body: 'Alege task-ul de azi. Dificultatea mare poate avansa cariera, dar eșecul lovește reputația.',
        choices: tasks.map((t) => ({
          id: t.id,
          label: t.label,
          hint: t.hint,
          disabled: s.player.energy < t.energy,
        })),
      });
    },

    openPromotionModal: () => {
      const s = get();
      const job = parseJobId(s.player.currentJobId);
      if (!job) return reject('Nu ai job.');
      const idx = ROLES.indexOf(job.role);
      if (idx >= ROLES.length - 1) return reject('Ești deja Team Lead.');
      const need = MIN_DAYS_IN_ROLE[job.role];
      if (s.player.daysInRole < need) {
        return reject(`Ai nevoie de ${need - s.player.daysInRole} zile în rolul ${job.role} înainte de promovare.`);
      }
      openModal({
        type: 'promotion',
        title: 'Review anual',
        body: `Vrei ${ROLES[idx + 1]}? Stresul tău (${s.player.stress}%) și reputația (${s.player.reputation}) contează.`,
        choices: [
          { id: 'pitch', label: 'Prezinți impact măsurabil', hint: '−15 energie, șansă mare dacă skill/rep ok' },
          { id: 'politics', label: 'Negociezi cu HR', hint: '−10 energie, șansă medie, +stres' },
          { id: 'cancel', label: 'Amână', hint: '—' },
        ],
      });
    },

    openHackHubModal: () => {
      const s = get();
      if (!s.player.careerPath) return reject('Alege mai întâi sfera.');
      if (s.burnout) return reject('Ești în burnout — nu poți lucra illegal.');
      if (s.player.stealBlockedDays > 0) {
        return reject(`Perioadă de prudență: hack blocat ${s.player.stealBlockedDays} zile (după zvon de audit).`);
      }

      const job = parseJobId(s.player.currentJobId);
      const choices = BLACK_MARKET_JOBS.map((j) => ({
        id: `bm_${j.id}`,
        label: j.label,
        hint: j.hint,
        disabled: s.player.energy < j.energy || s.player.skill < j.minSkill,
      }));

      if (job) {
        const pay = stealPayoutForRole(job.role);
        choices.unshift({
          id: 'internal_steal',
          label: 'Furt date interne (angajator)',
          hint: `+~${pay}$, Trace +${BALANCE.STEAL_TRACE.join('–')}% · energie ${BALANCE.STEAL_ENERGY_COST}`,
          disabled: s.player.energy < BALANCE.STEAL_ENERGY_COST,
        });
      }

      if (s.player.isFounder) {
        choices.unshift({
          id: 'founder_gray',
          label: 'Venituri „gri” prin shell company',
          hint: `+${BALANCE.FOUNDER_GRAY_PAYOUT.join('–')}$ buget firmă, Trace +${BALANCE.FOUNDER_GRAY_TRACE.join('–')}%`,
          disabled: s.player.energy < 20,
        });
      }

      openModal({
        type: 'hackHub',
        title: 'Piața neagră / Hack',
        body: job
          ? `Ai acces la serverele ${s.competitors.find((c) => c.id === job.companyId)?.name ?? 'angajatorului'} — risc maxim, câștig mare. Contractele externe sunt alternative mai slabe.`
          : 'Fără job legal poți lua doar contracte murdare. Trace crește; peste 75% vine audit.',
        choices: [...choices, { id: 'cancel', label: 'Renunță', hint: '—' }],
      });
    },

    openStealModal: () => get().openHackHubModal(),

    openFoundModal: () => {
      const { checks, ready } = foundingStatus(get());
      openModal({
        type: 'found',
        title: 'Înființare startup',
        body: `Taxă ${FOUNDING_REQUIREMENTS.foundingFee}$. Cerințe: ${checks.map((c) => (c.ok ? '✓' : '✗') + ' ' + c.text).join(' · ')}`,
        choices: ready
          ? [{ id: 'start', label: 'Continuă (nume firmă)', hint: 'Formular' }]
          : [{ id: 'cancel', label: 'Încă nu e momentul', hint: 'Crește cariera' }],
      });
    },

    openCompanyDayModal: () => {
      openModal({
        type: 'companyDay',
        title: 'Strategie zilnică · firmă',
        body: 'Nu e clicker: alegi focusul zilei. Veniturile depind de cotă (mică la început).',
        choices: COMPANY_DAY_FOCUS.map((f) => ({
          id: f.id,
          label: f.label,
          hint: f.hint,
        })),
      });
    },

    openSabotageModal: (competitorId, hackType) => {
      const s = get();
      const target = s.competitors.find((c) => c.id === competitorId);
      const hack = HACK_TYPES[hackType];
      if (!target || !hack) return reject('Țintă invalidă.');
      openModal({
        type: 'sabotage',
        competitorId,
        hackType,
        title: hack.label,
        body: `Țintă: ${target.name} (${target.marketShare}% cotă). Trace masiv. Strategie pe termen lung, nu spam.`,
        choices: [
          { id: 'confirm', label: 'Lansează operațiunea', hint: `−${hack.energy} energie` },
          { id: 'cancel', label: 'Renunță', hint: '—' },
        ],
      });
    },

    openInnovateModal: () => {
      openModal({
        type: 'innovate',
        title: 'Lansare produs',
        body: 'Investiție mare, creștere mică de cotă. E normal să dureze luni să muți giganții.',
        choices: [
          { id: '5000', label: 'Sprint 5000$', hint: '~0.3% cotă (cu echipă mai mult)' },
          { id: '15000', label: 'Lansare 15000$', hint: '~0.9% cotă' },
          { id: 'cancel', label: 'Amână', hint: '—' },
        ],
      });
    },

    resolveModalChoice: (choiceId) => {
      const s = get();
      if (!s.modal) return;

      if (s.modal.type === 'career') return get().pickCareer(choiceId);

      if (s.modal.type === 'guide' && choiceId === 'ok') {
        const first = !get().flags.guideSeen;
        closeModal();
        set({ flags: { ...get().flags, guideSeen: true } });
        if (first) get().ensureIntroModals();
        return;
      }

      if (choiceId === 'cancel') return closeModal();

      if (s.modal.type === 'event') return resolveEvent(s, choiceId);

      if (s.modal.type === 'hackHub') {
        closeModal();
        if (choiceId === 'internal_steal') {
          const job = parseJobId(s.player.currentJobId);
          if (!job) return reject('Nu ai job — folosește contracte pe piața neagră.');
          if (s.player.energy < BALANCE.STEAL_ENERGY_COST) return reject('Prea obosit.');
          const pay = stealPayoutForRole(job.role);
          const gain = roll(BALANCE.STEAL_TRACE);
          const t = applyTrace(s, gain, job.companyId);
          const employer = s.competitors.find((c) => c.id === job.companyId);
          return afterAction(
            advanceCalendar(s, {
              player: {
                ...s.player,
                money: s.player.money + pay,
                energy: s.player.energy - BALANCE.STEAL_ENERGY_COST,
                stress: clamp(s.player.stress + BALANCE.STEAL_STRESS_GAIN),
                trace: t.trace,
              },
              competitors: t.competitors,
              audit: t.audit,
            }),
            [`Hack intern @ ${employer?.name}: +${pay}$, Trace +${gain}%.`, ...t.notes],
            'warn',
          );
        }

        if (choiceId === 'founder_gray') {
          if (!s.player.isFounder || !s.playerCompany) return reject('Doar ca fondator.');
          if (s.player.energy < 20) return reject('Prea obosit.');
          const pay = roll(BALANCE.FOUNDER_GRAY_PAYOUT);
          const gain = roll(BALANCE.FOUNDER_GRAY_TRACE);
          const t = applyTrace(s, gain, s.competitors.find((c) => c.industry === s.playerCompany.industry)?.id ?? 'c1');
          return afterAction(
            advanceCalendar(s, {
              player: { ...s.player, energy: s.player.energy - 20, trace: t.trace, stress: clamp(s.player.stress + 10) },
              playerCompany: { ...s.playerCompany, budget: s.playerCompany.budget + pay },
              competitors: t.competitors,
              audit: t.audit,
            }),
            [`Scheme gri: +${pay}$ buget, Trace +${gain}%.`, ...t.notes],
            'warn',
          );
        }

        if (choiceId.startsWith('bm_')) {
          const bid = choiceId.slice(3);
          const contract = BLACK_MARKET_JOBS.find((j) => j.id === bid);
          if (!contract) return;
          if (s.player.energy < contract.energy) return reject('Energie insuficientă.');
          if (s.player.skill < contract.minSkill) return reject(`Skill minim ${contract.minSkill}.`);
          const pay = roll(contract.payout);
          const gain = roll(contract.trace);
          const suspect = s.competitors.find((c) => c.industry === industryName(s.player.careerPath));
          const t = applyTrace(s, gain, suspect?.id ?? 'c1');
          return afterAction(
            advanceCalendar(s, {
              player: {
                ...s.player,
                money: s.player.isFounder ? s.player.money : s.player.money + pay,
                energy: s.player.energy - contract.energy,
                stress: clamp(s.player.stress + contract.stress),
                trace: t.trace,
              },
              playerCompany:
                s.player.isFounder && s.playerCompany
                  ? { ...s.playerCompany, budget: s.playerCompany.budget + pay }
                  : s.playerCompany,
              competitors: t.competitors,
              audit: t.audit,
            }),
            [`Contract: ${contract.label} → +${pay}$, Trace +${gain}%.`, ...t.notes],
            'warn',
          );
        }
        return;
      }

      if (s.modal.type === 'apply') {
        if (choiceId === 'cancel') return closeModal();
        const { companyId, role } = s.modal;
        const req = ROLE_APPLY_REQ[role];
        const company = s.competitors.find((c) => c.id === companyId);
        closeModal();
        if (s.player.skill < req.skill || s.player.reputation < req.reputation) {
          return reject('Nu treci de screening. Crește skill/reputație (vezi Regulament).');
        }
        const chance = interviewChancePct(s.player) / 100;
        if (rng() < chance) {
          return afterAction(
            advanceCalendar(s, {
              player: { ...s.player, currentJobId: makeJobId(companyId, role), daysInRole: 0 },
            }),
            `Angajat la ${company.name} ca ${role} (${SALARIES[role]}$/lună).`,
          );
        }
        return afterAction(
          advanceCalendar(s, { player: { ...s.player, stress: clamp(s.player.stress + 8) } }),
          'Respins la interviu (+stres).',
          'warn',
        );
      }

      if (s.modal.type === 'work') {
        const tasks = WORK_TASKS[s.player.careerPath] ?? WORK_TASKS.web;
        const task = tasks.find((t) => t.id === choiceId);
        closeModal();
        if (!task) return;
        const job = parseJobId(s.player.currentJobId);
        if (s.player.energy < task.energy) return reject('Energie insuficientă.');

        const basePay = Math.round((SALARIES[job.role] / BALANCE.DAYS_PER_MONTH) * task.payMult);
        let stress = clamp(s.player.stress + task.stress);
        let skill = clamp(s.player.skill + task.skill);
        let reputation = clamp(s.player.reputation + task.rep);
        let msgs = [];
        let burnout = s.burnout;
        let player = {
          ...s.player,
          energy: s.player.energy - task.energy,
          stress,
          skill,
          reputation,
          money: s.player.money + basePay,
        };

        const failRoll = task.failChance + (s.player.stress > 70 ? 0.08 : 0);
        if (rng() < failRoll) {
          reputation = clamp(reputation - 12);
          stress = clamp(stress + 10);
          player = { ...player, reputation, stress };
          msgs.push(`Task eșuat (${task.label}): −reputație, stres.`);
        } else {
          msgs.push(`Task reușit: +${basePay}$, skill/rep cresc ușor.`);
        }

        if (stress >= 100) {
          burnout = { daysLeft: BALANCE.BURNOUT_DAYS, previousJobId: player.currentJobId };
          player.currentJobId = null;
          player.daysInRole = 0;
          msgs.push(`BURNOUT ${BALANCE.BURNOUT_DAYS} zile — fără job.`);
        }

        return afterAction(advanceCalendar(s, { player, burnout }), msgs, stress >= 100 ? 'warn' : 'info');
      }

      if (s.modal.type === 'promotion') {
        closeModal();
        const job = parseJobId(s.player.currentJobId);
        const idx = ROLES.indexOf(job.role);
        if (choiceId === 'cancel') return;
        const energyCost = choiceId === 'pitch' ? 15 : 10;
        if (s.player.energy < energyCost) return reject('Prea obosit.');

        let chance = 0.15 + s.player.reputation / 150 + s.player.skill / 200 - s.player.stress / 250;
        if (choiceId === 'pitch') chance += 0.12;

        const energy = s.player.energy - energyCost;
        if (rng() < chance) {
          const role = ROLES[idx + 1];
          return afterAction(
            advanceCalendar(s, {
              player: { ...s.player, energy, currentJobId: makeJobId(job.companyId, role), daysInRole: 0 },
            }),
            `Promovat la ${role}!`,
          );
        }
        return afterAction(
          advanceCalendar(s, {
            player: { ...s.player, energy, stress: clamp(s.player.stress + (choiceId === 'politics' ? 10 : 6)) },
          }),
          'Promovare refuzată.',
          'warn',
        );
      }

      if (s.modal.type === 'companyDay') {
        const focus = COMPANY_DAY_FOCUS.find((f) => f.id === choiceId);
        closeModal();
        if (!focus) return;
        const co = s.playerCompany;
        const costMult = focus.costMult * (s.player.investorDebt ? 1.05 : 1);
        const payroll = co.employees.reduce((sum, e) => sum + e.salary, 0) / BALANCE.DAYS_PER_MONTH;
        const rent = BALANCE.RENT_PER_MONTH / BALANCE.DAYS_PER_MONTH;
        let revenue =
          co.marketShare * BALANCE.REVENUE_PER_SHARE_DAILY * focus.revenueMult +
          co.employees.length * BALANCE.REVENUE_PER_EMPLOYEE_DAILY * focus.revenueMult;
        let budget = Math.round(co.budget + revenue - payroll * costMult - rent * costMult);
        const msgs = [`Focus: ${focus.label}. Venit ~${Math.round(revenue)}$, costuri ~${Math.round(payroll * costMult + rent * costMult)}$.`];

        let marketShare = co.marketShare;
        if (focus.shareBonus > 0 && rng() < 0.35) {
          const { competitors, taken } = takeFromGiants(s.competitors, co.industry, focus.shareBonus);
          marketShare = r1(marketShare + taken);
          return afterAction(
            advanceCalendar(s, {
              player: { ...s.player, stress: clamp(s.player.stress + focus.stress) },
              competitors,
              playerCompany: { ...co, budget, marketShare },
            }),
            [...msgs, `Push comercial reușit: +${taken}% cotă.`],
          );
        }

        s.competitors
          .filter((c) => c.industry === co.industry && c.hostility > 0)
          .forEach((c) => {
            if (rng() < c.hostility / BALANCE.DAILY_RETALIATION_DIVISOR) {
              const loss = Math.round(budget * (c.hostility / 100) * BALANCE.RETALIATION_BUDGET_PCT);
              budget -= loss;
              msgs.push(`${c.name} contraatacă: −${loss}$.`);
            }
          });

        const calm = s.player.trace <= BALANCE.AUDIT_THRESHOLD;
        const competitors = calm
          ? s.competitors.map((c) => (c.hostility > 0 ? { ...c, hostility: clamp(c.hostility - 1) } : c))
          : s.competitors;

        if (budget < 0) {
          return afterAction(
            advanceCalendar(s, {
              gameOver: { reason: 'bankrupt' },
              playerCompany: null,
              player: { ...s.player, isFounder: false, money: 0, stress: clamp(s.player.stress + focus.stress) },
              competitors,
            }),
            [...msgs, 'Faliment. Game over.'],
            'err',
          );
        }

        return afterAction(
          advanceCalendar(s, {
            player: { ...s.player, stress: clamp(s.player.stress + focus.stress) },
            competitors,
            playerCompany: { ...co, budget, marketShare },
          }),
          msgs,
        );
      }

      if (s.modal.type === 'innovate') {
        closeModal();
        const amount = choiceId === '5000' ? 5000 : choiceId === '15000' ? 15000 : 0;
        if (!amount) return;
        const co = s.playerCompany;
        if (amount > co.budget) return reject('Buget insuficient.');
        const efficiency = 1 + co.employees.length * BALANCE.INNOVATE_EMPLOYEE_BONUS;
        const points = r1((amount / 1000) * BALANCE.INNOVATE_POINTS_PER_1000 * efficiency);
        const { competitors, taken } = takeFromGiants(s.competitors, co.industry, points);
        return afterAction(
          advanceCalendar(s, {
            competitors,
            playerCompany: {
              ...co,
              budget: co.budget - amount,
              marketShare: r1(co.marketShare + taken),
            },
          }),
          `Produs lansat (${amount}$): +${taken}% cotă.`,
        );
      }

      if (s.modal.type === 'sabotage' && choiceId === 'confirm') {
        const { competitorId, hackType } = s.modal;
        closeModal();
        const target = s.competitors.find((c) => c.id === competitorId);
        const hack = HACK_TYPES[hackType];
        if (s.player.energy < hack.energy) return reject('Prea obosit.');
        const damage = Math.min(roll(hack.damage), target.marketShare);
        const traceGain = roll(hack.trace);
        const gain = r1(damage * BALANCE.SABOTAGE_SHARE_TO_PLAYER);
        const withDamage = {
          ...s,
          competitors: s.competitors.map((c) =>
            c.id === target.id ? { ...c, marketShare: r1(c.marketShare - damage) } : c,
          ),
        };
        const t = applyTrace(withDamage, traceGain, target.id);
        let budget = s.playerCompany.budget;
        const msgs = [`${hack.label} vs ${target.name}: −${damage}% cotă, Trace +${traceGain}%.`, ...t.notes];
        if (t.trace > BALANCE.AUDIT_THRESHOLD && rng() < t.competitors.find((c) => c.id === target.id).hostility / 100) {
          const loss = Math.round(budget * 0.1);
          budget -= loss;
          msgs.push(`${target.name} lovește bugetul: −${loss}$.`);
        }
        return afterAction(
          advanceCalendar(s, {
            competitors: t.competitors,
            audit: t.audit,
            player: { ...s.player, energy: s.player.energy - hack.energy, trace: t.trace },
            playerCompany: {
              ...s.playerCompany,
              budget,
              marketShare: r1(s.playerCompany.marketShare + gain),
            },
          }),
          msgs,
          'warn',
        );
      }

      if (s.modal.type === 'found' && choiceId === 'start') {
        closeModal();
        return get().beginFoundNameModal();
      }
    },

    beginFoundNameModal: () => {
      openModal({
        type: 'foundName',
        title: 'Numele firmei',
        body: 'Ultimul pas. Banii personali devin buget (minus taxa).',
        choices: [],
      });
    },

    foundCompany: (name) => {
      const s = get();
      const { ready } = foundingStatus(s);
      if (!ready) return reject('Nu îndeplinești cerințele.');
      const clean = (name ?? '').trim();
      if (!clean) return reject('Nume invalid.');
      const industry = industryName(s.player.careerPath);
      const fee = FOUNDING_REQUIREMENTS.foundingFee;
      const budget = s.player.money - fee;
      const startShare = Math.min(0.25, getUnclaimedShare(s, industry) * 0.05);

      closeModal();
      return commit(
        {
          player: { ...s.player, isFounder: true, currentJobId: null, money: 0 },
          playerCompany: { name: clean, industry, employees: [], budget, marketShare: r1(startShare) },
          burnout: null,
        },
        `${clean} înregistrată. Cotă inițială ${r1(startShare)}% — creșterea va fi lentă.`,
      );
    },

    hireEmployee: (role) => {
      const s = get();
      if (!s.player.isFounder) return reject('Nu ai firmă.');
      if (!SALARIES[role]) return reject('Rol invalid.');
      if (s.playerCompany.budget < BALANCE.HIRE_FEE) return reject(`Angajare: ${BALANCE.HIRE_FEE}$.`);

      const employee = { id: `e${++employeeSeq}`, role, salary: SALARIES[role] };
      return commit(
        {
          playerCompany: {
            ...s.playerCompany,
            budget: s.playerCompany.budget - BALANCE.HIRE_FEE,
            employees: [...s.playerCompany.employees, employee],
          },
        },
        `Angajat ${role} (salariu lunar ${SALARIES[role]}$).`,
      );
    },

    rest: () => {
      const s = get();
      if (s.gameOver) return reject('Game over.');
      let player = {
        ...s.player,
        energy: clamp(s.player.energy + BALANCE.REST_ENERGY_GAIN),
        stress: clamp(s.player.stress - BALANCE.REST_STRESS_RELIEF),
      };
      const msgs = ['Zi liberă: energie și calm.'];
      let burnout = s.burnout;
      if (burnout) {
        const daysLeft = burnout.daysLeft - 1;
        if (daysLeft <= 0) {
          player.currentJobId = burnout.previousJobId;
          burnout = null;
          msgs.push('Burnout terminat — te întorci la job.');
        } else burnout = { ...burnout, daysLeft };
      }
      return afterAction(advanceCalendar(s, { player, burnout }), msgs);
    },

    scrubLogs: () => {
      const s = get();
      if (s.player.trace <= 0) return reject('Trace 0.');
      if (s.player.energy < BALANCE.SCRUB_ENERGY_COST) return reject('Prea obosit.');
      const founder = s.player.isFounder;
      const funds = founder ? s.playerCompany.budget : s.player.money;
      if (funds < BALANCE.SCRUB_COST) return reject(`Scrub: ${BALANCE.SCRUB_COST}$.`);

      const trace = clamp(s.player.trace - BALANCE.SCRUB_TRACE_DROP);
      const audit = trace <= BALANCE.AUDIT_THRESHOLD ? { active: false, by: null } : s.audit;
      return afterAction(
        advanceCalendar(s, {
          audit,
          player: {
            ...s.player,
            trace,
            energy: s.player.energy - BALANCE.SCRUB_ENERGY_COST,
            money: founder ? s.player.money : s.player.money - BALANCE.SCRUB_COST,
          },
          playerCompany: founder
            ? { ...s.playerCompany, budget: s.playerCompany.budget - BALANCE.SCRUB_COST }
            : s.playerCompany,
        }),
        [`Trace redus, −${BALANCE.SCRUB_COST}$.`],
      );
    },

    resetGame: () => set(createInitialState()),
  };
});
