import { useState } from 'react';
import { useGameStore, FREELANCE_CONTRACTS, DARKNET_CONTRACTS, SHOP_ITEMS } from '../store/gameStore';
import { Briefcase, Skull, ShoppingCart, CheckCircle } from 'lucide-react';

export default function FreelanceMarket() {
  const [subTab, setSubTab] = useState('freelance');
  const { player, activeFreelance, acceptFreelance, acceptDarknet, buyShopItem, inventory } = useGameStore();

  return (
    <div className="space-y-6">
      <div className="flex border-b border-slate-800 bg-slate-900/50 rounded p-1">
        {[
          { id: 'freelance', label: 'Freelance Exchange' },
          { id: 'darknet', label: 'Dark Net Gigs' },
          { id: 'shop', label: 'Equipment Shop' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setSubTab(tab.id)}
            className={`flex-1 py-2 text-xs font-bold transition rounded ${subTab === tab.id ? 'bg-slate-800 text-cyan-400' : 'text-slate-400 hover:text-white'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeFreelance && (
        <div className="p-4 bg-cyan-950/40 border border-cyan-800/60 rounded flex justify-between items-center text-xs">
          <div>
            <span className="text-cyan-400 font-bold">ACTIVE CONTRACT: </span>
            <span className="text-white">{activeFreelance.name}</span>
          </div>
          <div className="text-slate-400">Zile rămase: {activeFreelance.remainingDays}</div>
        </div>
      )}

      {subTab === 'freelance' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {FREELANCE_CONTRACTS.map(contract => (
            <div key={contract.id} className="p-4 bg-slate-900 border border-slate-800 rounded flex flex-col justify-between space-y-4">
              <div>
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-white text-sm flex items-center gap-2"><Briefcase className="w-4 h-4 text-cyan-400" /> {contract.name}</h3>
                  <span className="text-emerald-400 font-bold">${contract.pay}</span>
                </div>
                <p className="text-xs text-slate-400 mt-2">Durată: {contract.duration} zile | Skill: {contract.requiredSkill}</p>
              </div>
              <button
                disabled={activeFreelance !== null}
                onClick={() => acceptFreelance(contract)}
                className="w-full bg-cyan-700 hover:bg-cyan-600 disabled:opacity-40 disabled:cursor-not-allowed text-white py-2 rounded text-xs font-bold transition"
              >
                {activeFreelance ? 'Ocupat' : 'Acceptă Contract'}
              </button>
            </div>
          ))}
        </div>
      )}

      {subTab === 'darknet' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {DARKNET_CONTRACTS.map(contract => (
            <div key={contract.id} className="p-4 bg-slate-900 border border-red-900/50 rounded flex flex-col justify-between space-y-4">
              <div>
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-red-400 text-sm flex items-center gap-2"><Skull className="w-4 h-4 text-red-500" /> {contract.name}</h3>
                  <span className="text-emerald-400 font-bold">${contract.pay}</span>
                </div>
                <p className="text-xs text-slate-400 mt-2">Risc: {contract.risk}% | Trace +{contract.traceGain}%</p>
              </div>
              <button
                disabled={activeFreelance !== null}
                onClick={() => acceptDarknet(contract)}
                className="w-full bg-red-950 hover:bg-red-900 disabled:opacity-40 disabled:cursor-not-allowed text-red-200 border border-red-800 py-2 rounded text-xs font-bold transition"
              >
                {activeFreelance ? 'Ocupat' : 'Execută Dark Gig'}
              </button>
            </div>
          ))}
        </div>
      )}

      {subTab === 'shop' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {SHOP_ITEMS.map(item => {
            const owned = inventory.some(i => i.id === item.id);
            return (
              <div key={item.id} className="p-4 bg-slate-900 border border-slate-800 rounded flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-bold text-white text-sm flex items-center gap-2"><ShoppingCart className="w-4 h-4 text-cyan-400" /> {item.name}</h3>
                  <p className="text-xs text-slate-400 mt-2">{item.bonus}</p>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-emerald-400 font-bold">${item.cost}</span>
                  {owned ? (
                    <span className="text-xs text-emerald-400 flex items-center gap-1 font-bold"><CheckCircle className="w-4 h-4" /> Deținut</span>
                  ) : (
                    <button
                      disabled={player.money < item.cost}
                      onClick={() => buyShopItem(item)}
                      className="bg-cyan-700 hover:bg-cyan-600 disabled:opacity-40 disabled:cursor-not-allowed text-white px-3 py-1.5 rounded text-xs font-bold transition"
                    >
                      Cumpără
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
