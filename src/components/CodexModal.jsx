import { CODEX_ENTRIES } from '../store/gameStore';

export default function CodexModal({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-900 border border-cyan-900 w-full max-w-2xl rounded-lg shadow-2xl overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b border-slate-800 bg-slate-950">
          <h2 className="text-xl font-bold text-cyan-400 tracking-wider">CODEX // DATABASE</h2>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white font-bold text-xl"
          >
            [X]
          </button>
        </div>
        
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          {Object.entries(CODEX_ENTRIES).map(([term, description]) => (
            <div key={term} className="border-l-2 border-cyan-700 pl-4">
              <h3 className="text-cyan-300 font-bold uppercase text-sm mb-1">{term}</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                {description}
              </p>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-slate-800 bg-slate-950 text-center">
          <p className="text-xs text-slate-500 italic">
            "Knowledge is the only currency that doesn't depreciate."
          </p>
        </div>
      </div>
    </div>
  );
}
