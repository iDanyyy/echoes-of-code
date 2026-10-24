import { useGameStore } from '../store/gameStore';
import { Moon, Briefcase, BookOpen, Coffee, Clock } from 'lucide-react';

const ACTIVITIES = [
  { id: 'sleep', label: 'Sleep', icon: Moon, color: 'bg-indigo-950/70 border-indigo-600/50 text-indigo-300 hover:border-indigo-400' },
  { id: 'work', label: 'Work', icon: Briefcase, color: 'bg-cyan-950/70 border-cyan-600/50 text-cyan-300 hover:border-cyan-400' },
  { id: 'study', label: 'Study', icon: BookOpen, color: 'bg-emerald-950/70 border-emerald-600/50 text-emerald-300 hover:border-emerald-400' },
  { id: 'rest', label: 'Rest', icon: Coffee, color: 'bg-amber-950/70 border-amber-600/50 text-amber-300 hover:border-amber-400' }
];

export default function SchedulePlanner() {
  const { player, setScheduleHour, time, tickHour } = useGameStore();
  const schedule = player.schedule || Array(24).fill('sleep');

  const cycleActivity = (hour) => {
    const current = schedule[hour];
    const currentIndex = ACTIVITIES.findIndex(a => a.id === current);
    const nextIndex = (currentIndex + 1) % ACTIVITIES.length;
    setScheduleHour(hour, ACTIVITIES[nextIndex].id);
  };

  const activityStats = {
    sleep: schedule.filter(a => a === 'sleep').length,
    work: schedule.filter(a => a === 'work').length,
    study: schedule.filter(a => a === 'study').length,
    rest: schedule.filter(a => a === 'rest').length,
  };

  return (
    <div className="bg-slate-900 p-6 rounded-lg border border-slate-800 space-y-6 shadow-xl">
      <div className="flex flex-wrap justify-between items-center gap-3 border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-bold text-cyan-400 flex items-center gap-2">
            <Clock className="w-5 h-5" /> 24-Hour Schedule Planner
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Organize daily bandwidth. Fatigue accumulates during crunch work and drains health if sleep drops below 6h.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs bg-slate-950 border border-cyan-800/80 px-3 py-1.5 rounded text-cyan-300 font-mono">
            Active Hour: {String(time.hour).padStart(2, '0')}:00
          </span>
          <button
            onClick={tickHour}
            className="bg-cyan-700 hover:bg-cyan-600 text-white px-3 py-1.5 rounded text-xs font-bold transition flex items-center gap-1 shadow"
          >
            Advance 1 Hour
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 sm:grid-cols-8 md:grid-cols-12 gap-2">
        {schedule.map((activityId, hour) => {
          const act = ACTIVITIES.find(a => a.id === activityId) || ACTIVITIES[0];
          const isCurrent = time.hour === hour;
          const Icon = act.icon;
          return (
            <button
              key={hour}
              type="button"
              onClick={() => cycleActivity(hour)}
              className={`p-2 rounded border flex flex-col items-center justify-center transition-all ${act.color} ${
                isCurrent ? 'ring-2 ring-cyan-400 scale-105 bg-cyan-900/60' : 'opacity-85 hover:opacity-100'
              }`}
            >
              <span className="text-[10px] font-mono text-slate-400">{String(hour).padStart(2, '0')}:00</span>
              <Icon className="w-3.5 h-3.5 my-1" />
              <span className="text-[11px] font-bold uppercase">{act.label.slice(0, 3)}</span>
            </button>
          );
        })}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-slate-800/70 text-xs">
        <div className="flex flex-wrap gap-4">
          {ACTIVITIES.map(act => {
            const Icon = act.icon;
            return (
              <div key={act.id} className="flex items-center gap-1.5 text-slate-300">
                <div className={`p-1 rounded border ${act.color}`}>
                  <Icon className="w-3 h-3" />
                </div>
                <span>{act.label}: <strong className="text-white">{activityStats[act.id]}h</strong>/24h</span>
              </div>
            );
          })}
        </div>

        {activityStats.sleep < 6 && (
          <div className="text-rose-400 font-bold text-xs bg-rose-950/40 border border-rose-800/50 px-2.5 py-1 rounded">
            ⚠ Danger: Sleep is under 6h. Severe crunch fatigue penalty!
          </div>
        )}
      </div>
    </div>
  );
}
