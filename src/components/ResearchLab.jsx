import { useState } from 'react';
import { useGameStore } from '../store/gameStore';
import { Cpu, Megaphone, CheckCircle2 } from 'lucide-react';

const TECH_CATALOG = [
  {
    id: 'tech_neural_ai',
    title: 'Neural AI Core',
    cost: 3000,
    desc: 'Automated ML syntax optimizers. Enhances general coding speed and suppresses bug generation.'
  },
  {
    id: 'tech_custom_os',
    title: 'Custom OS Kernel',
    cost: 5000,
    desc: 'Proprietary operating system ecosystem. Bypasses 30% third-party app store fees on corporate software.'
  },
  {
    id: 'tech_private_dc',
    title: 'Private Data Center',
    cost: 10000,
    desc: 'In-house high-load cloud farm. Drastically minimizes monthly cloud infrastructure overhead costs.'
  }
];

export default function ResearchLab() {
  const { player, playerCompany, researchedTechs = [], researchTech, launchKeynote } = useGameStore();
  const [keynoteName, setKeynoteName] = useState('NextGen Platform 1.0');

  const handleKeynote = () => {
    if (!keynoteName.trim() || !launchKeynote) return;
    launchKeynote(keynoteName.trim());
  };

  const isTechUnlocked = (techId) => Array.isArray(researchedTechs) && researchedTechs.includes(techId);

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 p-6 rounded-lg border border-slate-800 shadow-xl space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Cpu className="w-5 h-5 text-cyan-400" /> R&D Technology Tree & Lab
        </h2>
        <p className="text-xs text-slate-400">
          Research proprietary tech breakthroughs (Hardware architectures, OS Kernels, Private Cloud AI) to establish industry monopoly.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {TECH_CATALOG.map((tech) => {
            const unlocked = isTechUnlocked(tech.id);
            const canAfford = (player?.money ?? 0) >= tech.cost;

            return (
              <div 
                key={tech.id} 
                className={`p-4 rounded border flex flex-col justify-between space-y-3 ${
                  unlocked 
                    ? 'bg-slate-950/80 border-emerald-600/50' 
                    : 'bg-slate-950 border-slate-800'
                }`}
              >
                <div>
                  <div className="flex justify-between items-start gap-2">
                    <h3 className="font-bold text-white text-sm">{tech.title}</h3>
                    {unlocked && (
                      <span className="text-emerald-400 flex items-center gap-1 text-[11px] font-bold">
                        <CheckCircle2 className="w-3.5 h-3.5" /> UNLOCKED
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 mt-2">{tech.desc}</p>
                </div>

                <div>
                  {unlocked ? (
                    <div className="w-full text-center py-2 bg-emerald-950/40 border border-emerald-800/40 text-emerald-300 rounded text-xs font-bold">
                      Integrated in Pipeline
                    </div>
                  ) : (
                    <button 
                      onClick={() => researchTech && researchTech(tech.id, tech.cost)}
                      disabled={!canAfford}
                      className="w-full bg-cyan-700 hover:bg-cyan-600 disabled:opacity-40 disabled:cursor-not-allowed text-white py-2 rounded text-xs font-bold transition shadow"
                    >
                      Research (${tech.cost})
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-slate-900 p-6 rounded-lg border border-slate-800 shadow-xl space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Megaphone className="w-5 h-5 text-cyan-400" /> PR Studio & Worldwide Keynote Stage
        </h2>
        <p className="text-xs text-slate-400">
          Broadcast major launch events to journalists and consumers to rapidly acquire market share.
        </p>
        
        <div className="p-4 bg-slate-950 rounded border border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="space-y-1 w-full sm:w-auto">
            <h3 className="font-bold text-white text-sm">Product Announcement Keynote</h3>
            <p className="text-xs text-slate-400">
              Live broadcast across tech media platforms. Requires an established startup company.
            </p>
            <input 
              type="text"
              value={keynoteName}
              onChange={(e) => setKeynoteName(e.target.value)}
              placeholder="Product Name..."
              className="mt-2 bg-slate-900 border border-slate-700 px-3 py-1.5 rounded text-xs text-white w-full sm:w-64 focus:border-cyan-500 outline-none"
            />
          </div>
          
          <button 
            onClick={handleKeynote} 
            disabled={!playerCompany || (player?.money ?? 0) < 2500}
            className="w-full sm:w-auto bg-cyan-700 hover:bg-cyan-600 disabled:opacity-40 disabled:cursor-not-allowed text-white px-5 py-2.5 rounded text-xs font-bold transition whitespace-nowrap shadow"
          >
            Launch Keynote ($2500)
          </button>
        </div>
      </div>
    </div>
  );
}
