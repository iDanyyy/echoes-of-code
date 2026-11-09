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
  { id: 'f1', tier: 1, client: 'Pixel Orchard', name: 'HTML Landing Page', taskLabel: 'Build Landing Page', pay: 120, duration: 2, requiredSkill: 'frontend', minLevel: 0, risk: 5, clientMood: 'kind', requiredOutput: { development: 20, design: 15 } },
  { id: 'f2', tier: 1, client: 'Northstar Labs', name: 'Fix CSS Bug in Legacy App', taskLabel: 'Fix CSS Bug', pay: 80, duration: 1, requiredSkill: 'frontend', minLevel: 0, risk: 2, clientMood: 'normal', requiredOutput: { development: 8, design: 10 } },
  { id: 'f3', tier: 2, client: 'Cloudline Systems', name: 'REST API Integration', taskLabel: 'Implement REST API', pay: 650, duration: 4, requiredSkill: 'backend', minLevel: 2, risk: 15, clientMood: 'normal', requiredOutput: { development: 40, security: 15 } },
  { id: 'f4', tier: 2, client: 'Brightside Media', name: 'React Dashboard SPA', taskLabel: 'Build React Dashboard', pay: 1200, duration: 6, requiredSkill: 'frontend', minLevel: 2, risk: 20, clientMood: 'demanding', requiredOutput: { development: 55, design: 35, security: 10 } },
  { id: 'f5', tier: 3, client: 'Axiom Finance', name: 'Banking Core Microservice', taskLabel: 'Build Banking Service', pay: 8500, duration: 12, requiredSkill: 'backend', minLevel: 4, risk: 40, clientMood: 'demanding', requiredOutput: { development: 90, security: 60 } },
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

export const STUDY_SKILLS = [
  { id: 'frontend', label: 'Frontend' },
  { id: 'backend', label: 'Backend' },
  { id: 'cyber', label: 'Cybersecurity' },
  { id: 'management', label: 'Management' },
  { id: 'law', label: 'Law & Compliance' },
  { id: 'marketing', label: 'Marketing & PR' }
];

export const SCHEDULE_ACTIVITIES = [
  {
    id: 'sleep',
    category: 'rest',
    label: 'Sleep',
    duration: 1,
    baseActivity: 'sleep',
    energyCost: 0,
    stressChange: -1,
    color: 'indigo'
  },
  {
    id: 'study-python',
    category: 'study',
    label: 'Study Python',
    duration: 3,
    baseActivity: 'study',
    energyCost: 4,
    stressChange: 1,
    color: 'emerald'
  },
  {
    id: 'project-landing-page',
    category: 'work',
    label: 'Landing Page',
    duration: 3,
    baseActivity: 'work',
    energyCost: 6,
    stressChange: 2,
    projectTaskId: 'landing-page',
    color: 'cyan'
  },
  {
    id: 'freelance-css-fix',
    category: 'work',
    label: 'Fix CSS Bug',
    duration: 2,
    baseActivity: 'work',
    energyCost: 5,
    stressChange: 2,
    contractActivity: true,
    color: 'sky'
  },
  {
    id: 'walk',
    category: 'health',
    label: 'Walk Outside',
    duration: 2,
    baseActivity: 'rest',
    energyCost: 2,
    stressChange: -3,
    color: 'amber'
  },
  {
    id: 'movie',
    category: 'rest',
    label: 'Watch a Film',
    duration: 2,
    baseActivity: 'rest',
    energyCost: 1,
    stressChange: -4,
    color: 'violet'
  }
];

export const PROJECT_TASKS = [
  {
    id: 'landing-page',
    label: 'Build Landing Page',
    skill: 'frontend',
    duration: 3,
    outputPerHour: { development: 4, design: 2, security: 0 },
    bugRisk: 0.04
  },
  {
    id: 'css-fix',
    label: 'Fix CSS Bug',
    skill: 'frontend',
    duration: 2,
    outputPerHour: { development: 1, design: 4, security: 0 },
    bugRisk: 0.02
  }
];

const getActivityById = (activityId) =>
  SCHEDULE_ACTIVITIES.find(activity => activity.id === activityId);

const getBaseActivityId = (activityId) =>
  getActivityById(activityId)?.baseActivity || activityId;

const getProjectTaskByActivityId = (activityId) => {
  const taskId = getActivityById(activityId)?.projectTaskId;
  return PROJECT_TASKS.find(task => task.id === taskId);
};

const createInitialSchedule = () => Array(24).fill('sleep');

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
    money: 5000,
    energy: 100,
    health: 100,
    fatigue: 0,
    stress: 0,
    trace: 0,
    currentJobId: null,
    skills: { frontend: 1, backend: 0, cyber: 0, management: 0, law: 0, marketing: 0 },
    studySkill: 'frontend',
    studyProgress: { frontend: 0, backend: 0, cyber: 0, management: 0, law: 0, marketing: 0 },
    criminalRecord: 0,
    reputation: 0,
    currentRole: 'Unemployed',
    workspaceTier: 'Apartment',
    schedule: createInitialSchedule(),
  },
  day: 1,
  gameOver: null,
  industries: INDUSTRIES,
  competitors: INITIAL_COMPETITORS,
  playerCompany: null,
  logs: ['[SYSTEM_INIT]: Neural link established. Phase 5 modules loaded.'],
  
  technicalDebt: 0,
  activeProjects: [],
  activeFreelance: null,
  lastDeliveryFeedback: null,
  feedbackJournal: [],
  inventory: [],
  employees: [],
  lawsuits: [],
  stocks: INITIAL_STOCKS,
  loans: [],
  
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
        money: 5000, 
        energy: 100, 
        health: 100, 
        fatigue: 0, 
        stress: 0, 
        trace: 0, 
        currentJobId: null,
        skills: { frontend: 1, backend: 0, cyber: 0, management: 0, law: 0, marketing: 0 },
        studySkill: 'frontend',
        studyProgress: { frontend: 0, backend: 0, cyber: 0, management: 0, law: 0, marketing: 0 },
        criminalRecord: 0,
        reputation: 0,
        currentRole: 'Unemployed',
        workspaceTier: 'Apartment',
        schedule: createInitialSchedule()
      },
      day: 1,
      gameOver: null,
      competitors: INITIAL_COMPETITORS,
      playerCompany: null,
      logs: ['[SYSTEM_RESET]: Neural link re-established.'],
      technicalDebt: 0,
      activeProjects: [],
      activeFreelance: null,
      lastDeliveryFeedback: null,
      feedbackJournal: [],
      inventory: [],
      employees: [],
      lawsuits: [],
      stocks: INITIAL_STOCKS,
      loans: [],
      hacking: { step: 0, targetId: null, type: null, risk: 0 }
    });
  },

  addLog: (message) => {
    set((state) => ({
      logs: [message, ...state.logs.slice(0, 49)]
    }));
  },

  setScheduleHour: (hour, activity) => {
    if (!Number.isInteger(hour) || hour < 0 || hour > 23) return;

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

  scheduleActivity: (activityId) => {
    const activity = getActivityById(activityId);
    if (!activity || activity.id === 'sleep') return false;

    const { player, addLog, activeProjects, activeFreelance } = get();
    if (activity.projectTaskId && activeProjects.length === 0) {
      addLog(`[SCHEDULE]: Start a project before scheduling "${activity.label}".`);
      return false;
    }
    if (activity.contractActivity && !activeFreelance) {
      addLog(`[SCHEDULE]: Accept a freelance contract before scheduling "${activity.label}".`);
      return false;
    }
    const schedule = player.schedule || createInitialSchedule();
    const existingHours = schedule.reduce(
      (hours, scheduledActivity, hour) => scheduledActivity === activityId ? [...hours, hour] : hours,
      []
    );

    if (existingHours.length > 0) {
      addLog(`[SCHEDULE]: "${activity.label}" is already scheduled.`);
      return false;
    }

    let startHour = -1;
    for (let hour = 0; hour <= schedule.length - activity.duration; hour += 1) {
      const isAvailable = schedule
        .slice(hour, hour + activity.duration)
        .every(scheduledActivity => scheduledActivity === 'sleep');
      if (isAvailable) {
        startHour = hour;
        break;
      }
    }

    if (startHour < 0) {
      addLog(`[SCHEDULE]: Not enough consecutive free hours for "${activity.label}".`);
      return false;
    }

    const nextSchedule = [...schedule];
    nextSchedule.fill(activity.id, startHour, startHour + activity.duration);
    set(state => ({
      player: {
        ...state.player,
        schedule: nextSchedule
      }
    }));
    addLog(`[SCHEDULE]: Added "${activity.label}" for ${activity.duration}h.`);
    return true;
  },

  removeScheduledActivity: (activityId) => {
    const activity = getActivityById(activityId);
    if (!activity || activity.id === 'sleep') return false;

    const { player, addLog } = get();
    const schedule = player.schedule || createInitialSchedule();
    const hasActivity = schedule.some(scheduledActivity => scheduledActivity === activityId);
    if (!hasActivity) return false;

    set(state => ({
      player: {
        ...state.player,
        schedule: state.player.schedule.map(
          scheduledActivity => scheduledActivity === activityId ? 'sleep' : scheduledActivity
        )
      }
    }));
    addLog(`[SCHEDULE]: Removed "${activity.label}" from today's plan.`);
    return true;
  },

  setStudySkill: (skillId) => {
    if (!STUDY_SKILLS.some(skill => skill.id === skillId)) return;

    set((state) => ({
      player: {
        ...state.player,
        studySkill: skillId
      }
    }));
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
    const { time, player, gameOver, addLog, checkIntegrity, activeProjects, activeFreelance, employees, lawsuits, playerCompany, stocks, loans } = get();
    if (gameOver) return;

    let nextHour = time.hour + 1;
    let nextDay = time.day;
    let nextMonth = time.month;
    let nextYear = time.year;

    if (nextHour >= 24) {
      nextHour = 0;
      if (nextDay >= 30) {
        nextDay = 1;
        if (nextMonth >= 12) {
          nextMonth = 1;
          nextYear += 1;
        } else {
          nextMonth += 1;
        }
      } else {
        nextDay += 1;
      }
    }

    const scheduledActivityId = player.schedule[time.hour] || 'rest';
    const currentActivity = getBaseActivityId(scheduledActivityId);
    const currentProjectTask = getProjectTaskByActivityId(scheduledActivityId);
    const isFreelanceHour = scheduledActivityId === 'freelance-css-fix';
    const isNewDay = nextHour === 0;
    let newFatigue = player.fatigue;
    let newHealth = player.health;
    let newStress = player.stress;
    let newEnergy = player.energy;
    let newTrace = player.trace;
    let newCriminalRecord = player.criminalRecord;
    const newSkills = { ...player.skills };
    const newStudyProgress = { ...player.studyProgress };

    const hasChair = get().inventory.some(i => i.id === 's2');
    const hasEspresso = get().inventory.some(i => i.id === 's3');

    if (currentActivity === 'sleep') {
      newFatigue = Math.max(0, player.fatigue - (hasChair ? 12 : 10));
      newEnergy = Math.min(100, player.energy + (hasEspresso ? 20 : 15));
    } else if (currentActivity === 'work') {
      newFatigue = Math.min(100, player.fatigue + 4);
      newEnergy = Math.max(0, player.energy - 6);
      newStress = Math.min(100, player.stress + 2);
    } else if (currentActivity === 'study') {
      newFatigue = Math.min(100, player.fatigue + 3);
      newEnergy = Math.max(0, player.energy - 4);
      const studySkill = player.studySkill || 'frontend';
      const currentProgress = (newStudyProgress[studySkill] || 0) + 25;
      if (currentProgress >= 100) {
        newSkills[studySkill] = Math.min(10, (newSkills[studySkill] || 0) + 1);
        newStudyProgress[studySkill] = 0;
        addLog(`[STUDY]: ${studySkill} skill increased to level ${newSkills[studySkill]}.`);
      } else {
        newStudyProgress[studySkill] = currentProgress;
      }
    } else {
      newFatigue = Math.min(100, player.fatigue + 1);
      newEnergy = Math.max(0, player.energy - 2);
      newStress = Math.max(0, player.stress - 3);
    }

    if (newFatigue > 80) {
      newHealth = Math.max(0, player.health - 2);
    }

    let updatedProjects = [...activeProjects];
    let updatedFreelance = activeFreelance ? { ...activeFreelance } : null;
    let earnedMoney = 0;
    let newMoney = player.money;

    if (currentActivity === 'work') {
      if (currentProjectTask) {
        const skillLevel = newSkills[currentProjectTask.skill] || 0;
        const skillCoefficient = Math.min(1.5, 0.55 + skillLevel * 0.15);
        const energyCoefficient = 0.7 + newEnergy / 333;
        const stressCoefficient = Math.max(0.55, 1 - newStress / 250);
        const projectTaskOutput = Object.entries(currentProjectTask.outputPerHour).reduce(
          (output, [dimension, points]) => ({
            ...output,
            [dimension]: Math.round(points * skillCoefficient * energyCoefficient * stressCoefficient * 10) / 10
          }),
          {}
        );

        updatedProjects = activeProjects.map(project => {
          if (project.status === 'complete') return project;
          const progress = {
            ...project.progress,
            development: Math.min(project.requirements.development, project.progress.development + (projectTaskOutput.development || 0)),
            design: Math.min(project.requirements.design, project.progress.design + (projectTaskOutput.design || 0)),
            security: Math.min(project.requirements.security, project.progress.security + (projectTaskOutput.security || 0))
          };
          const completed = Object.keys(project.requirements)
            .every(dimension => progress[dimension] >= project.requirements[dimension]);
          if (completed && project.status !== 'complete') {
            addLog(`[PROJECT]: "${project.name}" reached its development requirements.`);
          }
          return {
            ...project,
            progress,
            status: completed ? 'complete' : 'active',
            bugs: project.bugs + (Math.random() < currentProjectTask.bugRisk * (1 + newStress / 100) ? 1 : 0)
          };
        });
      }

      const completedProjects = [];
      updatedProjects = updatedProjects.reduce((projects, project) => {
        if (project.progress) {
          projects.push(project);
          return projects;
        }
        const remainingWorkHours = (project.remainingWorkHours ?? project.remainingDays * 8) - 1;
        if (remainingWorkHours <= 0) {
          completedProjects.push(project);
          earnedMoney += project.revenue;
          return projects;
        }

        projects.push({
          ...project,
          remainingWorkHours,
          remainingDays: Math.ceil(remainingWorkHours / 8)
        });
        return projects;
      }, []);

      completedProjects.forEach(project => {
        addLog(`[PROJECT]: Finished "${project.name}". Collected $${project.revenue}.`);
      });

      if (updatedFreelance && isFreelanceHour) {
        const requiredOutput = updatedFreelance.requiredOutput || { development: 1 };
        const skillLevel = newSkills[updatedFreelance.requiredSkill] || 0;
        const skillCoefficient = Math.min(1.5, 0.55 + skillLevel * 0.15);
        const energyCoefficient = 0.7 + newEnergy / 333;
        const stressCoefficient = Math.max(0.55, 1 - newStress / 250);
        const outputCoefficient = skillCoefficient * energyCoefficient * stressCoefficient;
        const progress = Object.entries(requiredOutput).reduce((result, [dimension, required]) => ({
          ...result,
          [dimension]: Math.min(
            required,
            (updatedFreelance.progress?.[dimension] || 0) + (required / updatedFreelance.hoursRequired) * outputCoefficient
          )
        }), { ...(updatedFreelance.progress || {}) });
        const progressTotal = Object.entries(requiredOutput).reduce(
          (total, [dimension, required]) => total + ((progress[dimension] || 0) / required),
          0
        );
        const quality = Math.round((progressTotal / Object.keys(requiredOutput).length) * 100);

        const remainingWorkHours = (updatedFreelance.remainingWorkHours ?? updatedFreelance.remainingDays * 8) - 1;
        updatedFreelance = {
          ...updatedFreelance,
          hoursWorked: Math.min(updatedFreelance.hoursRequired, updatedFreelance.hoursWorked + 1),
          remainingWorkHours,
          remainingDays: Math.ceil(Math.max(0, remainingWorkHours) / 8),
          progress,
          quality,
          bugs: updatedFreelance.bugs + (
            Math.random() < updatedFreelance.risk / 1000 * (1 + newStress / 100) ? 1 : 0
          )
        };
      }
    }

    if (isNewDay) {
      if (player.currentJobId) {
        const jobObj = CORP_JOBS.find(j => j.id === player.currentJobId);
        if (jobObj) {
          earnedMoney += Math.round(jobObj.salary / 30);
        }
      }

      if (playerCompany) {
        earnedMoney += Math.round((playerCompany.marketShare * 200) / 30);
      }

      const officeTierObj = OFFICE_TIERS.find(o => o.id === player.workspaceTier) || OFFICE_TIERS[0];
      const payroll = Math.round(employees.reduce((sum, e) => sum + e.salary, 0) / 30);
      const bugCosts = Math.floor(get().technicalDebt * 5);
      const rent = Math.round(officeTierObj.overhead / 30);
      const loanInterest = Math.round(loans.reduce((sum, l) => sum + l.amount * l.interest, 0) / 30);
      const dailyExpenses = rent + payroll + bugCosts + loanInterest;

      newMoney -= dailyExpenses;
      newStress = Math.min(100, player.stress + 5);

      if (nextDay === 1 && nextMonth % 3 === 1) {
        let dividends = 0;
        stocks.forEach(st => {
          dividends += st.owned * st.dividend * 10;
        });
        if (dividends > 0) {
          earnedMoney += dividends;
          addLog(`[FINANCE]: Received monthly stock dividends: +$${dividends}.`);
        }
      }

      addLog(`[DAY_UPDATE]: Day ${nextDay}. Expenses & Interest: -$${dailyExpenses}.`);

      if (updatedFreelance && nextDay >= updatedFreelance.deadlineDay) {
        const daysLate = Math.max(0, nextDay - updatedFreelance.deadlineDay);
        if (daysLate === 0) {
          addLog(`[FREELANCE]: Deadline reached for "${updatedFreelance.name}". Deliver now or accept a penalty.`);
        } else if (!updatedFreelance.deadlineNoticeSent) {
          updatedFreelance = {
            ...updatedFreelance,
            deadlineNoticeSent: true,
            daysLate
          };
          addLog(`[FREELANCE]: "${updatedFreelance.name}" is ${daysLate} day late. Payment penalties are active.`);
        } else {
          updatedFreelance = { ...updatedFreelance, daysLate };
        }
      }

      if (playerCompany && Math.random() < 0.15 && !lawsuits.length) {
        const newLawsuit = { id: Date.now(), title: 'IP Patent Infringement', fine: 3500, daysLeft: 5 };
        set(state => ({ lawsuits: [...state.lawsuits, newLawsuit] }));
        addLog(`[LEGAL]: Lawsuit filed against your startup! Fine: $3500.`);
      }
    }

    newMoney += earnedMoney;

    set({
      time: { ...time, hour: nextHour, day: nextDay, month: nextMonth, year: nextYear },
      day: nextDay,
      player: {
        ...player,
        money: newMoney,
        fatigue: newFatigue,
        health: newHealth,
        stress: newStress,
        energy: newEnergy,
        trace: newTrace,
        criminalRecord: newCriminalRecord,
        reputation: player.reputation,
        skills: newSkills,
        studyProgress: newStudyProgress
      },
      activeProjects: updatedProjects,
      activeFreelance: updatedFreelance
    });

    checkIntegrity();
  },

  tickHour: () => {
    get().tick();
  },

  nextDay: () => {
    for (let i = 0; i < 24; i++) {
      get().tickHour();
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
      remainingWorkHours: duration * 8,
      totalWorkHours: duration * 8,
      totalDays: duration,
      revenue,
      status: 'active',
      requirements: { development: 50, design: 30, security: 30 },
      progress: { development: 0, design: 0, security: 0 },
      bugs: 0
    };
    
    set((state) => ({
      technicalDebt: state.technicalDebt + debtGain,
      activeProjects: [...state.activeProjects, newProject]
    }));

    addLog(`[PROJECT]: Started new contract. Duration: ${duration} days. Est Revenue: $${revenue}.`);
    checkIntegrity();
  },

  acceptFreelance: (contract) => {
    const { addLog, time, activeFreelance } = get();
    if (activeFreelance) {
      addLog('[FREELANCE]: Finish the active contract before accepting another.');
      return false;
    }
    const deadlineDay = time.day + contract.duration;
    set({
      activeFreelance: {
        ...contract,
        deadlineDay,
        hoursRequired: contract.duration * 8,
        hoursWorked: 0,
        remainingDays: contract.duration,
        remainingWorkHours: contract.duration * 8,
        clientTrust: 70,
        progress: Object.keys(contract.requiredOutput || { development: 1 }).reduce(
          (progress, dimension) => ({ ...progress, [dimension]: 0 }),
          {}
        ),
        quality: 0,
        bugs: 0,
        daysLate: 0,
        status: 'active'
      }
    });
    addLog(`[FREELANCE]: Accepted "${contract.name}" for ${contract.client}. Deadline: day ${deadlineDay}.`);
  },

  deliverFreelance: () => {
    const { activeFreelance, player, time, addLog } = get();
    if (!activeFreelance) return false;

    const quality = activeFreelance.quality || 0;
    const daysLate = Math.max(activeFreelance.daysLate || 0, time.day - activeFreelance.deadlineDay);
    const latePenalty = Math.min(80, daysLate * 8);
    const qualityPenalty = quality < 70 ? 20 : quality < 90 ? 8 : 0;
    const moodPenalty = activeFreelance.clientMood === 'demanding' && quality < 90 ? 8 : 0;
    const trustChange = -(latePenalty + qualityPenalty + moodPenalty);
    const reputationChange = quality >= 90 && daysLate === 0 ? 5 : quality < 70 || daysLate > 0 ? -3 : 1;
    const payment = Math.max(0, Math.round(activeFreelance.pay * (1 - latePenalty / 100) * (quality < 50 ? 0.6 : quality < 80 ? 0.85 : 1)));
    const feedback = {
      id: Date.now(),
      client: activeFreelance.client || 'Client',
      project: activeFreelance.name,
      quality,
      daysLate,
      payment,
      promisedPay: activeFreelance.pay,
      latePenalty,
      trustChange,
      reputationChange,
      bugs: activeFreelance.bugs || 0,
      message: daysLate > 0
        ? `You delivered ${daysLate} day${daysLate === 1 ? '' : 's'} late.`
        : quality < 70
          ? 'The delivery arrived on time, but the quality is below expectations.'
          : activeFreelance.clientMood === 'demanding' && quality < 90
            ? 'The delivery works, but the client expected a more polished result.'
            : 'The client accepted the delivery and praised the result.'
    };

    set(state => ({
      player: {
        ...state.player,
        money: player.money + payment,
        reputation: player.reputation + reputationChange,
        schedule: state.player.schedule.map(
          activityId => activityId === 'freelance-css-fix' ? 'sleep' : activityId
        )
      },
      activeFreelance: null,
      lastDeliveryFeedback: feedback,
      feedbackJournal: [feedback, ...state.feedbackJournal].slice(0, 20)
    }));
    addLog(`[FREELANCE]: Delivered "${activeFreelance.name}" for $${payment}. Trust change: ${trustChange}.`);
    return true;
  },

  acceptDarknet: (contract) => {
    const { addLog } = get();
    set({
      activeFreelance: {
        ...contract,
        remainingDays: contract.duration,
        remainingWorkHours: contract.duration * 8
      }
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
