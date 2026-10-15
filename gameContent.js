// Scenarii de muncă, evenimente aleatorii, cerințe carieră — „Echoes of Code”

export const FOUNDING_REQUIREMENTS = {
  minRole: 'Senior',
  minReputation: 45,
  minSkill: 55,
  minCareerDays: 120,
  minSavings: 18000,
  foundingFee: 18000,
};

export const MIN_DAYS_IN_ROLE = { Junior: 45, Mid: 60, Senior: 90, 'Team Lead': 999 };

export const ROLE_APPLY_REQ = {
  Junior: { skill: 5, reputation: 0 },
  Mid: { skill: 30, reputation: 15 },
  Senior: { skill: 55, reputation: 35 },
  'Team Lead': { skill: 75, reputation: 55 },
};

/** Task-uri zilnice per industrie — alegi dificultatea în pop-up */
export const WORK_TASKS = {
  web: [
    {
      id: 'docs',
      label: 'Documentezi un API intern',
      hint: 'Sigur, plictisitor. +reputație mică.',
      energy: 10,
      stress: 4,
      skill: 2,
      rep: 3,
      payMult: 0.85,
      failChance: 0.02,
    },
    {
      id: 'bug',
      label: 'Repari un bug în producție',
      hint: 'Presiune medie. Salariu normal.',
      energy: 18,
      stress: 10,
      skill: 5,
      rep: 5,
      payMult: 1,
      failChance: 0.12,
    },
    {
      id: 'arch',
      label: 'Propui refactor la monolit',
      hint: 'Risc mare dacă e respins.',
      energy: 28,
      stress: 16,
      skill: 9,
      rep: 12,
      payMult: 1.15,
      failChance: 0.28,
    },
  ],
  cyber: [
    {
      id: 'patch',
      label: 'Aplici patch-uri de securitate',
      hint: 'Rutină SOC.',
      energy: 12,
      stress: 6,
      skill: 3,
      rep: 4,
      payMult: 0.9,
      failChance: 0.04,
    },
    {
      id: 'pentest',
      label: 'Rulezi un audit pe staging',
      hint: 'Echilibru risc/recompensă.',
      energy: 20,
      stress: 12,
      skill: 6,
      rep: 7,
      payMult: 1,
      failChance: 0.15,
    },
    {
      id: 'incident',
      label: 'Conduci răspunsul la incident',
      hint: 'Toată echipa te privește.',
      energy: 30,
      stress: 20,
      skill: 10,
      rep: 14,
      payMult: 1.2,
      failChance: 0.32,
    },
  ],
  gamedev: [
    {
      id: 'assets',
      label: 'Optimizezi asset-uri pentru build',
      hint: 'Muncă de fundal.',
      energy: 11,
      stress: 5,
      skill: 2,
      rep: 3,
      payMult: 0.88,
      failChance: 0.03,
    },
    {
      id: 'feature',
      label: 'Implementezi un gameplay loop',
      hint: 'Sprint normal.',
      energy: 19,
      stress: 11,
      skill: 6,
      rep: 6,
      payMult: 1,
      failChance: 0.14,
    },
    {
      id: 'crunch',
      label: 'Crunch înainte de milestone',
      hint: 'Burnout aproape garantat dacă repeți.',
      energy: 32,
      stress: 22,
      skill: 8,
      rep: 10,
      payMult: 1.25,
      failChance: 0.2,
    },
  ],
  marketing: [
    {
      id: 'analytics',
      label: 'Curăți date în dashboard',
      hint: 'Excel și SQL.',
      energy: 10,
      stress: 4,
      skill: 2,
      rep: 2,
      payMult: 0.86,
      failChance: 0.02,
    },
    {
      id: 'campaign',
      label: 'Lansezi A/B test pe landing',
      hint: 'Metrici vizibile luna asta.',
      energy: 18,
      stress: 9,
      skill: 5,
      rep: 6,
      payMult: 1,
      failChance: 0.13,
    },
    {
      id: 'viral',
      label: 'Campanie agresivă pe social',
      hint: 'Poate exploda sau poate arde brandul.',
      energy: 26,
      stress: 18,
      skill: 7,
      rep: 15,
      payMult: 1.1,
      failChance: 0.35,
    },
  ],
};

export const COMPANY_DAY_FOCUS = [
  {
    id: 'ops',
    label: 'Zi operațională (stabilitate)',
    hint: 'Costuri mici, venit modest, −1 stres personal.',
    revenueMult: 1,
    costMult: 0.95,
    stress: -3,
    shareBonus: 0,
  },
  {
    id: 'sales',
    label: 'Push comercial',
    hint: 'Cheltuieli marketing, șansă mică de cotă.',
    revenueMult: 1.15,
    costMult: 1.12,
    stress: 6,
    shareBonus: 0.05,
  },
  {
    id: 'rd',
    label: 'Sprint R&D',
    hint: 'Arzi buget azi pentru produs mai târziu (inovație).',
    revenueMult: 0.75,
    costMult: 1.25,
    stress: 8,
    shareBonus: 0.12,
  },
];

/** Evenimente — `when(s)` filtrează eligibilitatea */
export const RANDOM_EVENTS = [
  {
    id: 'oncall',
    title: 'Apel de gardă duminica',
    body: 'Producția cade. Managerul întreabă discret cine e disponibil.',
    when: (s) => s.player.currentJobId && !s.player.isFounder,
    choices: [
      {
        id: 'yes',
        label: 'Intri în call (overtime)',
        hint: '−25 energie, +8 stres, +400$ bonus, +10 reputație',
      },
      {
        id: 'no',
        label: 'Refuzi politicos',
        hint: '−8 reputație, +5 energie mâine',
      },
    ],
  },
  {
    id: 'recruiter',
    title: 'Mesaj pe LinkedIn',
    body: 'Un recruiter din industria ta propune interviu la un rival.',
    when: (s) => s.player.careerPath && s.player.currentJobId && !s.player.isFounder,
    choices: [
      {
        id: 'interview',
        label: 'Accepți interviul',
        hint: '50% șansă de ofertă Mid+1 nivel salarial la alt gigant',
      },
      {
        id: 'ignore',
        label: 'Ignori',
        hint: 'Nimic nu se schimbă',
      },
    ],
  },
  {
    id: 'audit_rumor',
    title: 'Zvon de audit IT',
    body: 'Securitatea anunță verificări ale log-urilor de acces săptămâna viitoare.',
    when: (s) => s.player.trace >= 20 && !s.player.isFounder,
    choices: [
      {
        id: 'lay_low',
        label: 'Stai liniștit o săptămână',
        hint: 'Nu poți fura date 7 zile; Trace −5',
      },
      {
        id: 'panic',
        label: 'Plătești un consultant să șteargă urme',
        hint: '−800$, Trace −15, −10 energie',
      },
    ],
  },
  {
    id: 'conference',
    title: 'CFP deschis',
    body: 'O conferință din nișa ta caută speakeri juniori.',
    when: (s) => s.player.skill >= 40 && !s.player.isFounder,
    choices: [
      {
        id: 'speak',
        label: 'Pregătești un talk',
        hint: '−20 energie, +18 reputație, +6 skill',
      },
      {
        id: 'skip',
        label: 'Nu ai timp',
        hint: '—',
      },
    ],
  },
  {
    id: 'rival_launch',
    title: 'Lansare rival',
    body: 'Un gigant din industria ta lansează un produs care mușcă din piața nealocată.',
    when: (s) => s.player.isFounder && s.playerCompany,
    choices: [
      {
        id: 'counter',
        label: 'Contra-lansare grăbită',
        hint: '−3000$ buget, +0.15% cotă sau −0.1% dacă eșuează',
      },
      {
        id: 'wait',
        label: 'Aștepți și observi',
        hint: '−0.2% cotă ta, rival +0.3%',
      },
    ],
  },
  {
    id: 'layoff',
    title: 'Val de concedieri',
    body: 'Angajatorul ta anunță restructurare. Rolul tău e pe listă incertă.',
    when: (s) => s.player.currentJobId && s.player.stress >= 60 && !s.player.isFounder,
    choices: [
      {
        id: 'network',
        label: 'Activezi rețeaua',
        hint: '−15 energie, 40% păstrezi jobul; altfel ești disponibil pe piață',
      },
      {
        id: 'accept',
        label: 'Te pregătești de plecare',
        hint: 'Pierzi jobul, +3000$ severance, +5 reputație',
      },
    ],
  },
  {
    id: 'investor',
    title: 'Angel investor',
    body: 'Un investitor vrea 15% equity virtual pentru cash — fără diluție reală, doar obligații.',
    when: (s) => s.player.isFounder && s.playerCompany && s.playerCompany.marketShare >= 0.5,
    choices: [
      {
        id: 'take',
        label: 'Accepti 8000$',
        hint: '+8000$ buget, +10 stres, viitoarele zile +5% costuri',
      },
      {
        id: 'decline',
        label: 'Refuzi',
        hint: 'Crești încet organic',
      },
    ],
  },
];

export const CAREER_INTRO = {
  title: 'Alege-ți sfera',
  body: 'Ești la început de carieră în tech. Industria pe care o alegi acum îți definește joburile, rivalii și tipul de muncă zilnică. Nu poți schimba ușor domeniul mai târziu.',
};

/** Meta pentru ghid (sincronizat manual cu gameStore BALANCE / SALARIES) */
export const GUIDE_META = {
  ROLES: ['Junior', 'Mid', 'Senior', 'Team Lead'],
  SALARIES: { Junior: 2800, Mid: 4800, Senior: 7500, 'Team Lead': 11000 },
  BALANCE: {
    DAYS_PER_MONTH: 30,
    BURNOUT_DAYS: 14,
    AUDIT_THRESHOLD: 75,
    AUDIT_TRACE_PRESSURE: 4,
    TRACE_MAX: 100,
    TRACE_FINE: 5000,
  },
};

/** Contracte pe piața neagră (fără job sau ca extra) */
export const BLACK_MARKET_JOBS = [
  {
    id: 'phish',
    label: 'Kit phishing pentru spammer',
    hint: 'Câștig mic, Trace moderat',
    payout: [90, 160],
    trace: [8, 14],
    energy: 16,
    stress: 7,
    minSkill: 0,
  },
  {
    id: 'logs',
    label: 'Vânzare log-uri furate (terți)',
    hint: 'Risc mediu',
    payout: [220, 400],
    trace: [14, 22],
    energy: 22,
    stress: 11,
    minSkill: 15,
  },
  {
    id: 'exploit',
    label: 'Exploit 0-day pentru broker',
    hint: 'Skill 30+, Trace mare',
    payout: [450, 750],
    trace: [22, 30],
    energy: 28,
    stress: 16,
    minSkill: 30,
  },
];
