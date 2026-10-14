import React, { useState } from 'react';
import { useGameStore } from '../store/gameStore';
import { 
  DollarSign, 
  Zap, 
  Flame, 
  ShieldAlert, 
  Briefcase, 
  Building2, 
  Terminal, 
  Skull, 
  Coffee, 
  PlusCircle, 
  Shield 
} from 'lucide-react';

export default function MarketOverview() {
  const {
    player,
    industries,
    competitors,
    playerCompany,
    logs,
    workDaily,
    rest,
    applyForJob,
    foundCompany,
    sabotageCompetitor,
    clearTrace
  } = useGameStore();

  const [companyName, setCompanyName] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState(industries[0]);
  const [showFoundModal, setShowFoundModal] = useState(false);

  const handleFound = (e) => {
    e.preventDefault();
    if (!companyName.trim()) return;
    const ok = foundCompany(companyName, selectedIndustry);
    if (ok) {
      setCompanyName('');
      setShowFoundModal(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* HUD - Player Resurse */}
      <section className="bg-cyber-panel border border-cyber-border rounded-lg p-5 shadow-lg shadow-black/40">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-cyber-border pb-4 mb-4">
          <div>
            <h2 className="text-xl font-bold tracking-wider text-cyber-accent uppercase flex items-center gap-2">
              <Terminal className="w-5 h-5" /> Agent Status
            </h2>
            <p className="text-xs text-gray-400">
              Role: {player.isFounder ? 'CEO & Founder' : (player.currentJobId ? 'Employed Specialist' : 'Freelancer / Rogue Hacker')}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={workDaily}
              className="px-4 py-2 bg-emerald-600/20 text-cyber-green border border-cyber-green/40 hover:bg-cyber-green/20 rounded transition text-sm flex items-center gap-2"
            >
              <Briefcase className="w-4 h-4" /> Work Daily
            </button>
            <button
              onClick={rest}
              className="px-4 py-2 bg-blue-600/20 text-cyber-accent border border-cyber-accent/40 hover:bg-cyber-accent/20 rounded transition text-sm flex items-center gap-2"
            >
              <Coffee className="w-4 h-4" /> Sleep / Rest
            </button>
            <button
              onClick={clearTrace}
              className="px-4 py-2 bg-purple-600/20 text-purple-300 border border-purple-500/40 hover:bg-purple-600/30 rounded transition text-sm flex items-center gap-2"
            >
              <Shield className="w-4 h-4" /> Clear Trace ($250)
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-cyber-dark/60 p-3 rounded border border-cyber-border/70">
            <div className="flex items-center gap-2 text-xs text-gray-400 mb-1">
              <DollarSign className="w-4 h-4 text-cyber-green" /> Liquidity
            </div>
            <span className="text-2xl font-bold text-cyber-green">${player.money}</span>
          </div>

          <div className="bg-cyber-dark/60 p-3 rounded border border-cyber-border/70">
            <div className="flex items-center gap-2 text-xs text-gray-400 mb-1">
              <Zap className="w-4 h-4 text-amber-400" /> Energy
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-bold text-amber-400">{player.energy}%</span>
            </div>
            <div className="w-full bg-gray-800 h-1.5 rounded-full mt-2 overflow-hidden">
              <div className="bg-amber-400 h-full transition-all" style={{ width: `${player.energy}%` }}></div>
            </div>
          </div>

          <div className="bg-cyber-dark/60 p-3 rounded border border-cyber-border/70">
            <div className="flex items-center gap-2 text-xs text-gray-400 mb-1">
              <Flame className="w-4 h-4 text-cyber-danger" /> Stress
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-bold text-cyber-danger">{player.stress}%</span>
            </div>
            <div className="w-full bg-gray-800 h-1.5 rounded-full mt-2 overflow-hidden">
              <div className="bg-cyber-danger h-full transition-all" style={{ width: `${player.stress}%` }}></div>
            </div>
          </div>

          <div className="bg-cyber-dark/60 p-3 rounded border border-cyber-border/70">
            <div className="flex items-center gap-2 text-xs text-gray-400 mb-1">
              <ShieldAlert className="w-4 h-4 text-purple-400" /> Trace Detection
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-bold text-purple-400">{player.trace}%</span>
            </div>
            <div className="w-full bg-gray-800 h-1.5 rounded-full mt-2 overflow-hidden">
              <div className="bg-purple-500 h-full transition-all" style={{ width: `${player.trace}%` }}></div>
            </div>
          </div>
        </div>
      </section>

      {/* Startup / Player Company Status */}
      <section className="bg-cyber-panel border border-cyber-border rounded-lg p-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-gray-200 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-cyber-accent" /> Player Company
            </h3>
            <p className="text-xs text-gray-400 mt-1">
              {playerCompany ? `${playerCompany.name} [${playerCompany.industry}]` : 'You do not own an enterprise yet.'}
            </p>
          </div>

          {!player.isFounder && (
            <button
              onClick={() => setShowFoundModal(true)}
              className="px-4 py-2 bg-cyber-accent/20 border border-cyber-accent text-cyber-accent hover:bg-cyber-accent/30 rounded text-sm flex items-center gap-2 transition"
            >
              <PlusCircle className="w-4 h-4" /> Incorporate Startup ($800)
            </button>
          )}
        </div>

        {playerCompany && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 pt-4 border-t border-cyber-border">
            <div className="bg-cyber-dark/40 p-3 rounded">
              <span className="text-xs text-gray-400 block">Company Capital</span>
              <span className="text-xl font-bold text-cyber-green">${playerCompany.budget}</span>
            </div>
            <div className="bg-cyber-dark/40 p-3 rounded">
              <span className="text-xs text-gray-400 block">Market Share</span>
              <span className="text-xl font-bold text-cyber-accent">{playerCompany.marketShare}%</span>
            </div>
            <div className="bg-cyber-dark/40 p-3 rounded">
              <span className="text-xs text-gray-400 block">Headcount</span>
              <span className="text-xl font-bold text-gray-200">{playerCompany.employees.length} Engineers</span>
            </div>
          </div>
        )}

        {/* Modal fondare companie */}
        {showFoundModal && (
          <form onSubmit={handleFound} className="mt-4 p-4 border border-cyber-accent/40 bg-cyber-dark/90 rounded-lg space-y-4">
            <h4 className="text-sm font-bold text-cyber-accent tracking-wide uppercase">New Corporate Entity</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-400 mb-1">Company Name</label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g. Cyberdyne Systems"
                  className="w-full bg-[#05080c] border border-cyber-border rounded px-3 py-2 text-sm text-gray-200 focus:outline-none focus:border-cyber-accent"
                  required
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">Industry Vertical</label>
                <select
                  value={selectedIndustry}
                  onChange={(e) => setSelectedIndustry(e.target.value)}
                  className="w-full bg-[#05080c] border border-cyber-border rounded px-3 py-2 text-sm text-gray-200 focus:outline-none focus:border-cyber-accent"
                >
                  {industries.map((ind) => (
                    <option key={ind} value={ind}>{ind}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowFoundModal(false)}
                className="px-3 py-1.5 text-xs text-gray-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 bg-cyber-accent text-black font-semibold text-xs rounded hover:bg-cyber-accent/80 transition"
              >
                Sign Charter ($800)
              </button>
            </div>
          </form>
        )}
      </section>

      {/* World Market (Competitors) */}
      <section className="bg-cyber-panel border border-cyber-border rounded-lg p-5">
        <h3 className="text-lg font-bold text-gray-200 mb-4 flex items-center justify-between">
          <span>Global Market Competition</span>
          <span className="text-xs text-gray-400 font-normal">Sectors Monitored: {industries.length}</span>
        </h3>

        <div className="space-y-4">
          {competitors.map((comp) => {
            const isEmployedHere = player.currentJobId === comp.id;

            return (
              <div 
                key={comp.id}
                className="bg-cyber-dark/70 border border-cyber-border/80 rounded-lg p-4 flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <span className="text-base font-bold text-white">{comp.name}</span>
                    <span className="text-xs px-2 py-0.5 rounded bg-gray-800 text-gray-300 border border-gray-700">
                      {comp.industry}
                    </span>
                    {isEmployedHere && (
                      <span className="text-xs px-2 py-0.5 rounded bg-cyber-green/20 text-cyber-green border border-cyber-green/40">
                        Employer
                      </span>
                    )}
                  </div>

                  {/* Market Share Progress Bar */}
                  <div className="mt-3">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-400">Market Share Dominance</span>
                      <span className="text-cyber-accent font-semibold">{comp.marketShare}%</span>
                    </div>
                    <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-cyan-500 to-cyber-accent h-full transition-all duration-500"
                        style={{ width: `${Math.min(100, comp.marketShare)}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Hostility Tracker */}
                  <div className="mt-2 text-xs text-gray-500 flex items-center gap-2">
                    <span>Hostility against you:</span>
                    <span className={comp.hostility > 40 ? 'text-cyber-danger font-bold' : 'text-gray-400'}>
                      {comp.hostility}%
                    </span>
                  </div>
                </div>

                {/* Corporate Actions */}
                <div className="flex items-center gap-2 self-end md:self-center">
                  {!isEmployedHere && (
                    <button
                      onClick={() => applyForJob(comp.id, 'Software Engineer')}
                      className="px-3 py-1.5 text-xs bg-gray-800 hover:bg-gray-700 border border-gray-600 rounded text-gray-200 transition"
                    >
                      Apply for Job
                    </button>
                  )}

                  <button
                    onClick={() => sabotageCompetitor(comp.id, 'Corporate Zero-Day Exploit')}
                    className="px-3 py-1.5 text-xs bg-cyber-danger/20 hover:bg-cyber-danger/30 text-cyber-danger border border-cyber-danger/40 rounded transition flex items-center gap-1.5"
                  >
                    <Skull className="w-3.5 h-3.5" /> Sabotage
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Terminal / Live Feed Logs */}
      <section className="bg-cyber-panel border border-cyber-border rounded-lg p-4 font-mono text-xs">
        <div className="text-gray-400 mb-2 border-b border-cyber-border/60 pb-1 flex items-center justify-between">
          <span className="uppercase tracking-wide text-cyber-accent">Neural Output / Event Log</span>
          <span>Buffer: {logs.length} events</span>
        </div>
        <div className="max-h-36 overflow-y-auto space-y-1">
          {logs.map((log, index) => (
            <div key={index} className="text-gray-300">
              <span className="text-cyber-green">&gt;</span> {log}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
