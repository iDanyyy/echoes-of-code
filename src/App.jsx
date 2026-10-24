import { useState } from 'react';
import { useGameStore } from './store/gameStore';
import MarketOverview from './components/MarketOverview';
import CodexModal from './components/CodexModal';
import FreelanceMarket from './components/FreelanceMarket';
import CareerPortal from './components/CareerPortal';
import StartupHQ from './components/StartupHQ';
import FinancialCenter from './components/FinancialCenter';
import SchedulePlanner from './components/SchedulePlanner';
import ResearchLab from './components/ResearchLab';
import { Cpu, Terminal, ShieldAlert, Briefcase, Play, AlertTriangle, Bug, Shield, Zap, Activity, Clock, Heart, Battery } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('projects');
  const [showCodex, setShowCodex] = useState(false);
  const { 
    gameOver, resetGame, time, nextDay, tickHour, logs, player, 
    technicalDebt, hacking, startProject, executeHack, coverTracks,
    debugAddMoney, debugReduceStress, activeProjects = []
  } = useGameStore();

  const [speed, setSpeed] = useState(50);
  const [quality, setQuality] = useState(50);
  const [security, setSecurity] = useState(50);

  const formattedHour = String(time?.hour ?? 8).padStart(2, '0');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-mono flex flex-col relative">
      {showCodex && <CodexModal onClose={() => setShowCodex(false)} />}
      
      {gameOver && (
        <div className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-red-500 p-8 rounded-lg text-center max-w-md">
            <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">GAME OVER</h2>
            <p className="text-red-400 mb-6">{gameOver}</p>
            <button onClick={resetGame} className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition">Restart</button>
          </div>
        </div>
      )}

      <div className="fixed bottom-36 right-4 z-50 bg-slate-900/90 border border-yellow-500/50 p-2 rounded shadow-lg flex gap-2 items-center text-xs">
        <Bug className="w-4 h-4 text-yellow-400" />
        <span className="text-yellow-400 font-bold">DEBUG:</span>
        <button onClick={() => debugAddMoney(1000)} className="bg-slate-800 hover:bg-slate-700 px-2 py-1 rounded text-cyan-300">+$1000</button>
        <button onClick={() => debugReduceStress(50)} className="bg-slate-800 hover:bg-slate-700 px-2 py-1 rounded text-cyan-300">-50 Stress</button>
        <button onClick={resetGame} className="bg-red-900/50 hover:bg-red-800 px-2 py-1 rounded text-red-300">Reset</button>
      </div>

      <header className="p-4 border-b border-slate-800 bg-slate-900 flex flex-wrap justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <Cpu className="text-cyan-500 w-8 h-8" />
          <div>
            <h1 className="text-xl font-bold text-white tracking-widest flex items-center gap-2">
              COMMAND CENTER // DAY {time?.day ?? 1}
              <span className="text-xs bg-cyan-950 border border-cyan-800 text-cyan-300 px-2 py-0.5 rounded flex items-center gap-1 font-normal">
                <Clock className="w-3 h-3" /> {formattedHour}:00 (M{time?.month ?? 1}/{time?.year ?? 2026})
              </span>
            </h1>
            <div className="text-xs text-slate-400 flex flex-wrap gap-3 mt-1">
              <span className="text-emerald-400 font-bold">MONEY: ${player.money}</span>
              <span className="text-cyan-400 flex items-center gap-1"><Battery className="w-3.5 h-3.5" /> ENERGY: {player.energy}%</span>
              <span className="text-rose-400 flex items-center gap-1"><Heart className="w-3.5 h-3.5" /> HEALTH: {player.health}%</span>
              <span className="text-orange-400">FATIGUE: {player.fatigue}%</span>
              <span className="text-yellow-400">STRESS: {player.stress}%</span>
              <span className="text-purple-400">TRACE: {player.trace}%</span>
              <span className="text-red-400">TECH DEBT: {technicalDebt}%</span>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setShowCodex(true)} className="text-cyan-400 hover:text-white border border-cyan-900 bg-slate-950 px-3 py-2 rounded text-sm transition flex items-center gap-1">
            <span>[ ? CODEX ]</span>
          </button>
          <button onClick={tickHour} className="bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 px-3 py-2 rounded text-sm font-bold flex items-center gap-1 transition">
            <Clock className="w-4 h-4" /> +1 HOUR
          </button>
          <button onClick={nextDay} className="bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-2 rounded font-bold flex items-center gap-2 shadow-lg shadow-cyan-900/50 transition">
            <Play className="w-4 h-4 fill-current" /> NEXT DAY (24H)
          </button>
        </div>
      </header>

      <nav className="flex border-b border-slate-800 bg-slate-900/50 overflow-x-auto">
        {[
          { id: 'projects', label: 'PROJECTS ENGINE' },
          { id: 'schedule', label: '24H SCHEDULE' },
          { id: 'finance', label: 'FINANCIAL CENTER' },
          { id: 'startup', label: 'STARTUP HQ & LEGAL' },
          { id: 'career', label: 'CORP CAREER & HR' },
          { id: 'freelance', label: 'FREELANCE & SHOP' },
          { id: 'research', label: 'R&D LAB & TECH' },
          { id: 'hacking', label: 'HACKING & OPERATIONS' },
          { id: 'market', label: 'MARKET INTELLIGENCE' }
        ].map(tab => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-3 font-bold text-xs tracking-wider transition whitespace-nowrap ${activeTab === tab.id ? 'bg-slate-800 text-cyan-400 border-b-2 border-cyan-500' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'}`}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <main className="flex-1 p-6 max-w-5xl mx-auto w-full space-y-6">
        
        {activeTab === 'projects' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900 p-6 rounded-lg border border-slate-800 space-y-6 shadow-xl">
              <h2 className="text-lg font-bold text-cyan-400 flex items-center gap-2">
                <Briefcase className="w-5 h-5" /> Project Designer
              </h2>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-300 flex items-center gap-1"><Zap className="w-4 h-4 text-yellow-400" /> Delivery Speed:</span>
                    <span className="text-cyan-400 font-bold">{speed}%</span>
                  </div>
                  <input 
                    type="range" min="10" max="100" step="5"
                    value={speed}
                    onChange={(e) => setSpeed(Number(e.target.value))}
                    className="w-full accent-cyan-500 bg-slate-950"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-300 flex items-center gap-1"><Bug className="w-4 h-4 text-red-400" /> Code Quality:</span>
                    <span className="text-cyan-400 font-bold">{quality}%</span>
                  </div>
                  <input 
                    type="range" min="10" max="100" step="5"
                    value={quality}
                    onChange={(e) => setQuality(Number(e.target.value))}
                    className="w-full accent-cyan-500 bg-slate-950"
                  />
                  <p className="text-xs text-slate-500 mt-1">* Low code quality triggers Technical Debt.</p>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-300 flex items-center gap-1"><Shield className="w-4 h-4 text-blue-400" /> Security Standards:</span>
                    <span className="text-cyan-400 font-bold">{security}%</span>
                  </div>
                  <input 
                    type="range" min="10" max="100" step="5"
                    value={security}
                    onChange={(e) => setSecurity(Number(e.target.value))}
                    className="w-full accent-cyan-500 bg-slate-950"
                  />
                </div>

                <button 
                  onClick={() => startProject(Math.floor(speed / 10), Math.floor(quality / 10), Math.floor(security / 10))}
                  className="w-full bg-cyan-700 hover:bg-cyan-600 text-white py-3 rounded font-bold tracking-wider transition shadow-lg"
                >
                  [ LAUNCH CONTRACT ]
                </button>
              </div>
            </div>

            <div className="bg-slate-900 p-6 rounded-lg border border-slate-800 space-y-4 shadow-xl">
              <h2 className="text-lg font-bold text-cyan-400 flex items-center gap-2">
                <Terminal className="w-5 h-5" /> Active Projects & Queue
              </h2>
              <div className="space-y-3">
                {(!activeProjects || activeProjects.length === 0) && (
                  <div className="text-slate-500 text-sm italic p-4 bg-slate-950 rounded border border-slate-800/50 text-center">
                    No active contract in execution. Configure parameters and launch a project from the left panel.
                  </div>
                )}
                {activeProjects.map((proj) => {
                  const progress = Math.round(((proj.totalDays - proj.remainingDays) / proj.totalDays) * 100);
                  return (
                    <div key={proj.id} className="p-4 bg-slate-950 rounded border border-slate-800 text-xs space-y-2">
                      <div className="flex justify-between font-bold text-slate-300">
                        <span>{proj.name}</span>
                        <span className="text-cyan-400">Remaining: {proj.remainingDays} days</span>
                      </div>
                      <div className="w-full bg-slate-800 h-2 rounded overflow-hidden">
                        <div className="bg-cyan-500 h-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
                      </div>
                      <div className="text-slate-500 flex justify-between">
                        <span>Progress: {progress}%</span>
                        <span>Estimated Revenue: ${proj.revenue}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'schedule' && <SchedulePlanner />}
        {activeTab === 'finance' && <FinancialCenter />}
        {activeTab === 'startup' && <StartupHQ />}
        {activeTab === 'career' && <CareerPortal />}

        {activeTab === 'freelance' && (
          <div className="bg-slate-900 p-6 rounded-lg border border-slate-800 shadow-xl">
            <FreelanceMarket />
          </div>
        )}

        {activeTab === 'research' && <ResearchLab />}

        {activeTab === 'hacking' && (
          <div className="bg-slate-900 p-6 rounded-lg border border-slate-800 space-y-6 shadow-xl">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <ShieldAlert className="w-6 h-6 text-red-500" /> Hacking & Operations Pipeline
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className={`p-4 rounded border ${hacking.step === 0 ? 'border-cyan-500 bg-slate-950' : 'border-slate-800 bg-slate-950/50 opacity-60'}`}>
                <div className="text-xs text-cyan-400 font-bold mb-2">STEP 1</div>
                <h3 className="font-bold text-white mb-2">Reconnaissance</h3>
                <p className="text-xs text-slate-400 mb-4">Scan target company selected from Market Intelligence tab to detect surface vulnerabilities.</p>
                <button 
                  onClick={() => hacking.targetId && useGameStore.getState().initiateHack(hacking.targetId)}
                  disabled={hacking.step > 0}
                  className="w-full bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 py-2 rounded text-xs font-bold transition disabled:opacity-50"
                >
                  {hacking.step > 0 ? 'Completed' : 'Initiate Recon'}
                </button>
              </div>

              <div className={`p-4 rounded border ${hacking.step === 1 ? 'border-cyan-500 bg-slate-950' : 'border-slate-800 bg-slate-950/50 opacity-60'}`}>
                <div className="text-xs text-cyan-400 font-bold mb-2">STEP 2</div>
                <h3 className="font-bold text-white mb-2">Execution</h3>
                <p className="text-xs text-slate-400 mb-4">Select exploit vector: Phishing, Zero-Day or DDoS attack.</p>
                <div className="space-y-2">
                  {['Phishing', 'Zero-Day', 'DDoS'].map(type => (
                    <button 
                      key={type} 
                      disabled={hacking.step !== 1}
                      onClick={() => executeHack(type)} 
                      className="w-full p-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded text-xs text-left text-white disabled:opacity-40 transition"
                    >
                      &gt; {type}
                    </button>
                  ))}
                </div>
              </div>

              <div className={`p-4 rounded border ${hacking.step === 2 ? 'border-cyan-500 bg-slate-950' : 'border-slate-800 bg-slate-950/50 opacity-60'}`}>
                <div className="text-xs text-cyan-400 font-bold mb-2">STEP 3</div>
                <h3 className="font-bold text-white mb-2">Cover Tracks</h3>
                <p className="text-xs text-slate-400 mb-4">Erase digital footprint to decrease Trace and avoid law enforcement detection.</p>
                <button 
                  onClick={coverTracks}
                  disabled={hacking.step !== 2}
                  className="w-full bg-red-950 hover:bg-red-900 text-red-200 border border-red-800 py-2 rounded text-xs font-bold transition disabled:opacity-40"
                >
                  Cover Tracks (Risk: {hacking.risk}%)
                </button>
              </div>
            </div>

            {hacking.step === 0 && (
              <div className="p-4 bg-slate-950 rounded border border-slate-800 text-xs text-slate-400 text-center">
                Navigate to <span className="text-cyan-400">Market Intelligence</span> tab and target a competitor to begin cyber operations.
              </div>
            )}
          </div>
        )}

        {activeTab === 'market' && <MarketOverview />}
      </main>

      <div className="h-36 bg-black p-4 overflow-y-auto text-xs text-green-500 border-t border-slate-800 font-mono">
        <div className="text-slate-500 mb-1 font-bold flex items-center gap-2">
          <Activity className="w-3.5 h-3.5" /> // NEURAL TERMINAL & SYSTEM LOGS
        </div>
        {Array.isArray(logs) && logs.map((log, i) => <div key={i} className="mb-1">&gt; {log}</div>)}
      </div>
    </div>
  );
}
