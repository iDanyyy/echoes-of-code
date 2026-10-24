import { useState, useEffect } from 'react';
import { useGameStore, CORP_JOBS } from '../store/gameStore';
import { Briefcase, Award, Zap, ShieldAlert, Cpu } from 'lucide-react';

export default function CareerPortal() {
  const { player, acceptJob, quitJob, addLog } = useGameStore();
  const [activeInterviewJob, setActiveInterviewJob] = useState(null);
  const [miniGameType, setMiniGameType] = useState(null);
  const [score, setScore] = useState(0);
  
  // Mini-game specific states
  const [mathProblem, setMathProblem] = useState({ q: '12 * 8 - 16', ans: 80, options: [80, 96, 64] });
  const [reflexState, setReflexState] = useState({ targetHit: false, timer: null });
  const [mazeStep, setMazeStep] = useState(0);

  const startInterview = (job) => {
    if (player.criminalRecord > 0) {
      addLog(`[HR]: Background check failed! Security clearance denied.`);
      return;
    }
    if (player.skills[job.requiredSkillKey] < job.minSkill) {
      addLog(`[HR]: Insufficient skill level for ${job.role}. Required: ${job.minSkill}`);
      return;
    }
    setActiveInterviewJob(job);
    const types = ['math', 'reflex', 'maze'];
    const chosenType = types[Math.floor(Math.random() * types.length)];
    setMiniGameType(chosenType);
    setScore(0);
    setMazeStep(0);

    if (chosenType === 'reflex') {
      triggerReflexTarget();
    }
  };

  const triggerReflexTarget = () => {
    setReflexState({ targetHit: false, timer: Date.now() });
  };

  const handleReflexClick = () => {
    const reactionTime = Date.now() - reflexState.timer;
    if (reactionTime < 1500) {
      handleMiniGameAction(1);
    } else {
      addLog(`[HR]: Too slow! Reflex test failed.`);
      handleMiniGameAction(-1);
    }
    if (score + 1 < 3) {
      triggerReflexTarget();
    }
  };

  const handleMiniGameAction = (points) => {
    const nextScore = score + points;
    if (nextScore >= 3) {
      acceptJob(activeInterviewJob);
      setActiveInterviewJob(null);
      setMiniGameType(null);
    } else if (nextScore < 0) {
      addLog(`[HR]: Interview failed due to incorrect answers.`);
      setActiveInterviewJob(null);
      setMiniGameType(null);
    } else {
      setScore(nextScore);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 p-6 rounded-lg border border-slate-800 shadow-xl space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-cyan-400" /> Corporate Career Portal
        </h2>

        {player.currentJobId ? (
          <div className="p-4 bg-cyan-950/40 border border-cyan-800 rounded flex justify-between items-center">
            <div>
              <div className="text-xs text-cyan-400 font-bold">CURRENT POSITION</div>
              <div className="text-white font-bold text-lg">{player.currentRole}</div>
            </div>
            <button
              onClick={quitJob}
              className="bg-red-950 hover:bg-red-900 text-red-200 border border-red-800 px-4 py-2 rounded text-xs font-bold transition"
            >
              Demisie (Quit)
            </button>
          </div>
        ) : (
          <p className="text-xs text-slate-400">Aplică la poziții corporatiste pentru salarii stabile. Treci interviul HR prin mini-jocuri tehnice pentru a fi angajat.</p>
        )}
      </div>

      {activeInterviewJob && (
        <div className="p-6 bg-slate-900 border border-cyan-500 rounded-lg space-y-4 shadow-2xl">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold text-cyan-400 flex items-center gap-2">
              <Cpu className="w-5 h-5" /> HR Interview: {activeInterviewJob.role}
            </h3>
            <span className="text-xs text-cyan-300 bg-cyan-950 px-3 py-1 rounded border border-cyan-800 font-bold">
              Progres: {score}/3 puncte
            </span>
          </div>

          {miniGameType === 'math' && (
            <div className="space-y-4 text-xs bg-slate-950 p-4 rounded border border-slate-800">
              <p className="text-slate-300 font-bold">Test logică algoritmică: Cât face expresia <span className="text-cyan-400">{mathProblem.q}</span>?</p>
              <div className="grid grid-cols-3 gap-2">
                {mathProblem.options.map((opt, i) => (
                  <button 
                    key={i} 
                    onClick={() => handleMiniGameAction(opt === mathProblem.ans ? 1 : -1)} 
                    className="p-3 bg-slate-800 hover:bg-slate-700 text-cyan-300 rounded font-bold transition border border-slate-700"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {miniGameType === 'reflex' && (
            <div className="space-y-4 text-xs bg-slate-950 p-4 rounded border border-slate-800 text-center">
              <p className="text-slate-300 font-bold">Test viteză de reacție la bug-uri: Prinde momentul de stabilizare a codului!</p>
              <button 
                onClick={handleReflexClick}
                className="w-full py-6 bg-cyan-700 hover:bg-cyan-600 text-white rounded font-bold transition shadow-lg animate-pulse"
              >
                [ FIX CRITICAL BUG ACUM! ]
              </button>
            </div>
          )}

          {miniGameType === 'maze' && (
            <div className="space-y-4 text-xs bg-slate-950 p-4 rounded border border-slate-800">
              <p className="text-slate-300 font-bold">Ocolire firewall corporatist (Pasul {mazeStep + 1}/3): Alege sub-rețeaua sigură.</p>
              <div className="grid grid-cols-2 gap-2">
                <button 
                  onClick={() => {
                    setMazeStep(s => s + 1);
                    handleMiniGameAction(1);
                  }} 
                  className="p-3 bg-slate-800 hover:bg-slate-700 text-emerald-400 rounded font-bold transition border border-emerald-900/50"
                >
                  &gt; Sub-net 0x4A (Culoar Encriptat)
                </button>
                <button 
                  onClick={() => handleMiniGameAction(-1)} 
                  className="p-3 bg-slate-800 hover:bg-slate-700 text-red-400 rounded font-bold transition border border-red-900/50"
                >
                  &gt; Port 80 (Firewall Activ - Risc)
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {!player.currentJobId && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {CORP_JOBS.map(job => {
            const hasRequiredSkill = player.skills[job.requiredSkillKey] >= job.minSkill;
            return (
              <div key={job.id} className="p-4 bg-slate-900 border border-slate-800 rounded flex flex-col justify-between space-y-4 shadow">
                <div>
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-white text-sm flex items-center gap-2"><Award className="w-4 h-4 text-cyan-400" /> {job.role}</h3>
                    <span className="text-emerald-400 font-bold">${job.salary}/lună</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-2">Industrie: {job.industry} | Min Skill: {job.minSkill} ({job.requiredSkillKey})</p>
                </div>
                <button
                  disabled={!hasRequiredSkill}
                  onClick={() => startInterview(job)}
                  className="w-full bg-cyan-700 hover:bg-cyan-600 disabled:opacity-40 disabled:cursor-not-allowed text-white py-2 rounded text-xs font-bold transition"
                >
                  {hasRequiredSkill ? 'Aplică & Susține Interviul HR' : 'Skill Insuficient'}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
