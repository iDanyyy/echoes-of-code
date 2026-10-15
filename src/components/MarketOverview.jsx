import { useState } from 'react';
import { useGameStore } from '../store/gameStore';
import { ShieldAlert } from 'lucide-react';

export default function MarketOverview() {
  const { competitors, foundCompany, playerCompany, initiateHack } = useGameStore();
  const [companyName, setCompanyName] = useState('');

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-cyan-400">Market & Competitors</h2>
      
      {!playerCompany && (
        <div className="bg-slate-900 p-6 rounded border border-slate-800">
          <h3 className="text-lg font-bold mb-4">Incorporate Startup</h3>
          <input 
            className="bg-slate-950 p-2 w-full mb-4 border border-slate-700 rounded text-white"
            placeholder="Company Name..."
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
          <button 
            onClick={() => foundCompany(companyName, 'Web & Software')}
            className="bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-2 rounded w-full font-bold"
          >
            Sign Charter ($800)
          </button>
        </div>
      )}

      <div className="grid gap-4">
        {competitors.map((c) => (
          <div key={c.id} className="bg-slate-900 p-4 rounded border border-slate-800 flex justify-between items-center">
            <div>
              <h4 className="font-bold text-white">{c.name}</h4>
              <p className="text-xs text-slate-400">{c.industry}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-cyan-400 text-sm">{c.marketShare}% Share</p>
              </div>
              <button 
                onClick={() => initiateHack(c.id)}
                className="p-2 bg-red-900/20 hover:bg-red-900/40 text-red-400 border border-red-900 rounded"
                title="Initiate Hack"
              >
                <ShieldAlert className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
