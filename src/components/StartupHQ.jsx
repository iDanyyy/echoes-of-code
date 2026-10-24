import { useState } from 'react';
import { useGameStore, OFFICE_TIERS, INDUSTRIES } from '../store/gameStore';
import { Building, Users, Scale, PlusCircle } from 'lucide-react';

export default function StartupHQ() {
  const { player, playerCompany, foundCompany, upgradeOffice, employees, hireEmployee, lawsuits, resolveLawsuit } = useGameStore();
  const [startupName, setStartupName] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState(INDUSTRIES[0]);

  const currentOffice = OFFICE_TIERS.find(o => o.id === player.workspaceTier) || OFFICE_TIERS[0];

  return (
    <div className="space-y-6">
      {!player.isFounder ? (
        <div className="bg-slate-900 p-6 rounded-lg border border-cyan-800 shadow-xl space-y-4">
          <h2 className="text-xl font-bold text-cyan-400 flex items-center gap-2">
            <Building className="w-6 h-6" /> Founding Startup Enterprise
          </h2>
          <p className="text-xs text-slate-400">Înființează propria ta companie de tehnologie. Cost încorporare: $2000.</p>
          
          <div className="space-y-3">
            <div>
              <label className="text-xs text-slate-300 block mb-1">Nume Companie:</label>
              <input
                type="text"
                value={startupName}
                onChange={e => setStartupName(e.target.value)}
                placeholder="Ex: CyberCorp AI"
                className="w-full bg-slate-950 border border-slate-700 p-2 rounded text-xs text-white"
              />
            </div>

            <div>
              <label className="text-xs text-slate-300 block mb-1">Industrie Principală:</label>
              <select
                value={selectedIndustry}
                onChange={e => setSelectedIndustry(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 p-2 rounded text-xs text-white"
              >
                {INDUSTRIES.map(ind => (
                  <option key={ind} value={ind}>{ind}</option>
                ))}
              </select>
            </div>

            <button
              disabled={!startupName.trim() || player.money < 2000}
              onClick={() => foundCompany(startupName, selectedIndustry)}
              className="w-full bg-cyan-700 hover:bg-cyan-600 disabled:opacity-40 disabled:cursor-not-allowed text-white py-2 rounded text-xs font-bold transition"
            >
              Încorporează Startup ($2000)
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-slate-900 p-6 rounded-lg border border-slate-800 shadow-xl flex justify-between items-center">
            <div>
              <div className="text-xs text-cyan-400 font-bold">STARTUP ACTIVE</div>
              <h2 className="text-xl font-bold text-white">{playerCompany?.name}</h2>
              <p className="text-xs text-slate-400">Industrie: {playerCompany?.industry} | Market Share: {playerCompany?.marketShare}%</p>
            </div>
            <div className="text-right">
              <div className="text-xs text-slate-400">Workspace Curent:</div>
              <div className="text-cyan-400 font-bold">{currentOffice.name}</div>
            </div>
          </div>

          <div className="bg-slate-900 p-6 rounded-lg border border-slate-800 shadow-xl space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Building className="w-5 h-5 text-cyan-400" /> Office & Workspace Upgrades
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {OFFICE_TIERS.map(tier => {
                const isCurrent = player.workspaceTier === tier.id;
                return (
                  <div key={tier.id} className={`p-4 rounded border flex flex-col justify-between space-y-3 ${isCurrent ? 'border-cyan-500 bg-slate-950' : 'border-slate-800 bg-slate-950/50'}`}>
                    <div>
                      <h4 className="font-bold text-white text-sm">{tier.name}</h4>
                      <p className="text-xs text-slate-400 mt-1">{tier.desc}</p>
                      <p className="text-xs text-emerald-400 mt-1">Capacitate: {tier.capacity} staff | Overhead: ${tier.overhead}/lună</p>
                    </div>
                    {!isCurrent && (
                      <button
                        onClick={() => upgradeOffice(tier.id)}
                        className="w-full bg-cyan-700 hover:bg-cyan-600 text-white py-1.5 rounded text-xs font-bold transition"
                      >
                        Upgrade ($5000)
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-slate-900 p-6 rounded-lg border border-slate-800 shadow-xl space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Users className="w-5 h-5 text-cyan-400" /> HR & Staff Management ({employees.length}/{currentOffice.capacity})
              </h3>
              <button
                disabled={employees.length >= currentOffice.capacity}
                onClick={() => hireEmployee('Junior Developer', 1500)}
                className="bg-cyan-700 hover:bg-cyan-600 disabled:opacity-40 disabled:cursor-not-allowed text-white px-3 py-1.5 rounded text-xs font-bold flex items-center gap-1 transition"
              >
                <PlusCircle className="w-4 h-4" /> Angajează Dev ($1500/mo)
              </button>
            </div>

            <div className="space-y-2">
              {employees.length === 0 && (
                <p className="text-xs text-slate-500 italic">Niciun angajat curent. Extinde echipa pentru productivitate sporită.</p>
              )}
              {employees.map(emp => (
                <div key={emp.id} className="p-3 bg-slate-950 rounded border border-slate-800 flex justify-between items-center text-xs">
                  <div>
                    <span className="font-bold text-white">{emp.role}</span>
                    <span className="text-slate-400 ml-3">Salariu: ${emp.salary}/lună</span>
                  </div>
                  <span className="text-emerald-400 font-bold">Loyalty: {emp.loyalty}%</span>
                </div>
              ))}
            </div>
          </div>

          {lawsuits.length > 0 && (
            <div className="bg-red-950/40 p-6 rounded-lg border border-red-800 shadow-xl space-y-4">
              <h3 className="text-lg font-bold text-red-400 flex items-center gap-2">
                <Scale className="w-5 h-5 text-red-500" /> Legal Department & Lawsuits
              </h3>
              {lawsuits.map(law => (
                <div key={law.id} className="p-4 bg-slate-950 rounded border border-red-900 flex justify-between items-center text-xs">
                  <div>
                    <span className="font-bold text-red-300">{law.title}</span>
                    <p className="text-slate-400 mt-1">Amendă cerută: ${law.fine} | Termen: {law.daysLeft} zile</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => resolveLawsuit(law.id, true)} className="bg-red-900 hover:bg-red-800 text-white px-3 py-1.5 rounded font-bold transition">
                      Plătește Amendă
                    </button>
                    <button onClick={() => resolveLawsuit(law.id, false)} className="bg-slate-800 hover:bg-slate-700 text-cyan-300 px-3 py-1.5 rounded font-bold transition">
                      Contestă în Instanță
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
