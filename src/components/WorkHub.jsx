import { useState } from 'react';
import FreelanceMarket from './FreelanceMarket';
import CareerPortal from './CareerPortal';
import StartupHQ from './StartupHQ';

const WORK_SECTIONS = [
  { id: 'freelance', label: 'Freelance Exchange' },
  { id: 'employed', label: 'Employed' },
  { id: 'company', label: 'Company' }
];

export default function WorkHub() {
  const [activeSection, setActiveSection] = useState('freelance');

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 p-6 rounded-lg border border-slate-800 shadow-xl space-y-4">
        <div>
          <h2 className="text-xl font-bold text-white">Work Hub</h2>
          <p className="text-xs text-slate-400 mt-1">
            Alege cum îți investești timpul: contracte, carieră corporatistă sau propria companie.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {WORK_SECTIONS.map(section => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`px-3 py-2 rounded text-xs font-bold border transition ${
                activeSection === section.id
                  ? 'bg-cyan-950 text-cyan-300 border-cyan-700'
                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
            >
              {section.label}
            </button>
          ))}
        </div>
      </div>

      {activeSection === 'freelance' && (
        <div className="bg-slate-900 p-6 rounded-lg border border-slate-800 shadow-xl">
          <FreelanceMarket />
        </div>
      )}
      {activeSection === 'employed' && <CareerPortal />}
      {activeSection === 'company' && <StartupHQ />}
    </div>
  );
}
