import { useState } from 'react';
import { useGameStore } from './store/gameStore';
import MarketOverview from './components/MarketOverview';
import CodexModal from './components/CodexModal';
import { Cpu, Terminal, ShieldAlert, Briefcase, Play, AlertTriangle, Bug, Shield, Zap, Activity } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('projects');
  const [showCodex, setShowCodex] = useState(false);
  const { 
    gameOver, resetGame, day, nextDay, logs, player, 
    technicalDebt, hacking, startProject, executeHack, coverTracks,
    debugAddMoney, debugReduceStress, activeProjects = []
  } = useGameStore();

  const [speed, setSpeed] = useState(50);
  const [quality, setQuality] = useState(50);
  const [security, setSecurity] = useState(50);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-mono flex flex-col relative">
      {showCodex && <CodexModal onClose={() => setShowCodex(false)} />}
      
      {/* Game Over Overlay */}
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

      {/* Debug Panel */}
      <div className="fixed bottom-36 right-4 z-50 bg-slate-900/90 border border-yellow-500/50 p-2 rounded shadow-lg flex gap-2 items-center text-xs">
        <Bug className="w-4 h-4 text-yellow-400" />
        <span className="text-yellow-400 font-bold">DEBUG:</span>
        <button onClick={() => debugAddMoney(1000)} className="bg-slate-800 hover:bg-slate-700 px-2 py-1 rounded text-cyan-300">+$1000</button>
        <button onClick={() => debugReduceStress(50)} className="bg-slate-800 hover:bg-slate-700 px-2 py-1 rounded text-cyan-300">-50 Stress</button>
        <button onClick={resetGame} className="bg-red-900/50 hover:bg-red-800 px-2 py-1 rounded text-red-300">Reset</button>
      </div>

      {/* Header & HUD */}
      <header className="p-4 border-b border-slate-800 bg-slate-900 flex flex-wrap justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <Cpu className="text-cyan-500 w-8 h-8" />
          <div>
            <h1 className="text-xl font-bold text-white tracking-widest">COMMAND CENTER // DAY {day}</h1>
            <div className="text-xs text-slate-400 flex flex-wrap gap-3 mt-1">
              <span className="text-emerald-400">MONEY: ${player.money}</span>
              <span className="text-cyan-400">ENERGY: {player.energy}%</span>
              <span className="text-yellow-400">STRESS: {player.stress}%</span>
              <span className="text-purple-400">TRACE: {player.trace}%</span>
              <span className="text-red-400">TECH DEBT: {technicalDebt}%</span>
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <button onClick={() => setShowCodex(true)} className="text-cyan-400 hover:text-white border border-cyan-900 bg-slate-950 px-3 py-2 rounded text-sm transition flex items-center gap-1">
            <span>[ ? CODEX ]</span>
          </button>
          <button onClick={nextDay} className="bg-cyan-600 hover:bg-cyan-500 text-white px-5 py-2 rounded font-bold flex items-center gap-2 shadow-lg shadow-cyan-900/50 transition animate-pulse">
            <Play className="w-4 h-4 fill-current" /> AȘTEAPTĂ O ZI (NEXT DAY)
          </button>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="flex border-b border-slate-800 bg-slate-900/50">
        {[
          { id: 'projects', label: 'PROJECTS ENGINE' },
          { id: 'hacking', label: 'HACKING & OPERATIONS' },
          { id: 'market', label: 'MARKET INTELLIGENCE' }
        ].map(tab => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 font-bold text-sm tracking-wider transition ${activeTab === tab.id ? 'bg-slate-800 text-cyan-400 border-b-2 border-cyan-500' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'}`}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 p-6 max-w-5xl mx-auto w-full space-y-6">
        
        {/* TAB 1: PROJECTS ENGINE */}
        {activeTab === 'projects' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900 p-6 rounded-lg border border-slate-800 space-y-6 shadow-xl">
              <h2 className="text-lg font-bold text-cyan-400 flex items-center gap-2">
                <Briefcase className="w-5 h-5" /> Project Designer
              </h2>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-300 flex items-center gap-1"><Zap className="w-4 h-4 text-yellow-400" /> Viteză de Livrare:</span>
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
                    <span className="text-slate-300 flex items-center gap-1"><Bug className="w-4 h-4 text-red-400" /> Calitate Cod:</span>
                    <span className="text-cyan-400 font-bold">{quality}%</span>
                  </div>
                  <input 
                    type="range" min="10" max="100" step="5"
                    value={quality}
                    onChange={(e) => setQuality(Number(e.target.value))}
                    className="w-full accent-cyan-500 bg-slate-950"
                  />
                  <p className="text-xs text-slate-500 mt-1">* Calitatea scăzută generează Datoria Tehnică.</p>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-300 flex items-center gap-1"><Shield className="w-4 h-4 text-blue-400" /> Securitate:</span>
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
                  [ LANSEAZĂ CONTRACT ]
                </button>
              </div>
            </div>

            <div className="bg-slate-900 p-6 rounded-lg border border-slate-800 space-y-4 shadow-xl">
              <h2 className="text-lg font-bold text-cyan-400 flex items-center gap-2">
                <Terminal className="w-5 h-5" /> Proiecte Active & Queue
              </h2>
              <div className="space-y-3">
                {(!activeProjects || activeProjects.length === 0) && (
                  <div className="text-slate-500 text-sm italic p-4 bg-slate-950 rounded border border-slate-800/50 text-center">
                    Niciun contract activ în execuție. Configurează și lansează un proiect din panou.
                  </div>
                )}
                {activeProjects.map((proj) => {
                  const progress = Math.round(((proj.totalDays - proj.remainingDays) / proj.totalDays) * 100);
                  return (
                    <div key={proj.id} className="p-4 bg-slate-950 rounded border border-slate-800 text-xs space-y-2">
                      <div className="flex justify-between font-bold text-slate-300">
                        <span>{proj.name}</span>
                        <span className="text-cyan-400">Zile rămase: {proj.remainingDays}</span>
                      </div>
                      <div className="w-full bg-slate-800 h-2 rounded overflow-hidden">
                        <div className="bg-cyan-500 h-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
                      </div>
                      <div className="text-slate-500 flex justify-between">
                        <span>Progres: {progress}%</span>
                        <span>Venit estimat: ${proj.revenue}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: HACKING & OPERATIONS */}
        {activeTab === 'hacking' && (
          <div className="bg-slate-900 p-6 rounded-lg border border-slate-800 space-y-6 shadow-xl">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <ShieldAlert className="w-6 h-6 text-red-500" /> Hacking & Operations Pipeline
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Step 1 */}
              <div className={`p-4 rounded border ${hacking.step === 0 ? 'border-cyan-500 bg-slate-950' : 'border-slate-800 bg-slate-950/50 opacity-60'}`}>
                <div className="text-xs text-cyan-400 font-bold mb-2">PASUL 1</div>
                <h3 className="font-bold text-white mb-2">Reconnaissance</h3>
                <p className="text-xs text-slate-400 mb-4">Scanează ținta selectată din tab-ul Market Intelligence pentru a detectare uşurinţa atacului.</p>
                <button 
                  onClick={() => hacking.targetId && useGameStore.getState().initiateHack(hacking.targetId)}
                  disabled={hacking.step > 0}
                  className="w-full bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 py-2 rounded text-xs font-bold transition"
                >
                  {hacking.step > 0 ? 'Completat' : 'Inițiază Recon'}
                </button>
              </div>

              {/* Step 2 */}
              <div className={`p-4 rounded border ${hacking.step === 1 ? 'border-cyan-500 bg-slate-950' : 'border-slate-800 bg-slate-950/50 opacity-60'}`}>
                <div className="text-xs text-cyan-400 font-bold mb-2">PASUL 2</div>
                <h3 className="font-bold text-white mb-2">Execution</h3>
                <p className="text-xs text-slate-400 mb-4">Alege vectorul de atac: Phishing, Zero-Day sau DDoS.</p>
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

              {/* Step 3 */}
              <div className={`p-4 rounded border ${hacking.step === 2 ? 'border-cyan-500 bg-slate-950' : 'border-slate-800 bg-slate-950/50 opacity-60'}`}>
                <div className="text-xs text-cyan-400 font-bold mb-2">PASUL 3</div>
                <h3 className="font-bold text-white mb-2">Cover Tracks</h3>
                <p className="text-xs text-slate-400 mb-4">Șterge urmele digitale pentru a reduce nivelul de Trace și riscul de prindere.</p>
                <button 
                  onClick={coverTracks}
                  disabled={hacking.step !== 2}
                  className="w-full bg-red-950 hover:bg-red-900 text-red-200 border border-red-800 py-2 rounded text-xs font-bold transition disabled:opacity-40"
                >
                  Cover Tracks (Risc: {hacking.risk}%)
                </button>
              </div>
            </div>

            {hacking.step === 0 && (
              <div className="p-4 bg-slate-950 rounded border border-slate-800 text-xs text-slate-400 text-center">
                Mergi la tab-ul <span className="text-cyan-400">Market Intelligence</span> și selectează o companie țintă pentru a porni operațiunea.
              </div>
            )}
          </div>
        )}

        {/* TAB 3: MARKET INTELLIGENCE */}
        {activeTab === 'market' && <MarketOverview />}
      </main>

      {/* Neural Terminal / Logs */}
      <div className="h-36 bg-black p-4 overflow-y-auto text-xs text-green-500 border-t border-slate-800 font-mono">
        <div className="text-slate-500 mb-1 font-bold flex items-center gap-2">
          <Activity className="w-3.5 h-3.5" /> // NEURAL TERMINAL & SYSTEM LOGS
        </div>
        {Array.isArray(logs) && logs.map((log, i) => <div key={i} className="mb-1">&gt; {log}</div>)}
      </div>
    </div>
  );
}
