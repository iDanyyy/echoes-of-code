import { useGameStore } from '../store/gameStore';

const ACTIVITIES = [
  { id: 'sleep', label: 'Sleep', color: 'bg-indigo-900 border-indigo-700 text-indigo-300' },
  { id: 'work', label: 'Work', color: 'bg-cyan-900 border-cyan-700 text-cyan-300' },
  { id: 'study', label: 'Study', color: 'bg-emerald-900 border-emerald-700 text-emerald-300' },
  { id: 'rest', label: 'Rest', color: 'bg-amber-900 border-amber-700 text-amber-300' }
];

export default function SchedulePlanner() {
  const { player, setScheduleHour, time } = useGameStore();
  const schedule = player.schedule || Array(24).fill('sleep');

  const cycleActivity = (hour) => {
    const current = schedule[hour];
    const currentIndex = ACTIVITIES.findIndex(a => a.id === current);
    const nextIndex = (currentIndex + 1) % ACTIVITIES.length;
    setScheduleHour(hour, ACTIVITIES[nextIndex].id);
  };

  return (
    <div className="bg-slate-900 p-6 rounded border border-slate-800 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-cyan-400">24-Hour Schedule Planner</h2>
        <span className="text-sm text-slate-400">Current Hour: {time.hour}:00</span>
      </div>
      <p className="text-xs text-slate-400">
        Click on any hour block to cycle through activities (Sleep, Work, Study, Rest).
      </p>

      <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-12 gap-2">
        {schedule.map((activityId, hour) => {
          const activity = ACTIVITIES.find(a => a.id === activityId) || ACTIVITIES[0];
          const isCurrentHour = time.hour === hour;
          return (
            <button
              key={hour}
              onClick={() => cycleActivity(hour)}
              className={`p-2 rounded border flex flex-col items-center justify-center transition-all ${activity.color} ${
                isCurrentHour ? 'ring-2 ring-white scale-105' : 'opacity-80 hover:opacity-100'
              }`}
            >
              <span className="text-[10px] font-mono text-slate-400">{hour}:00</span>
              <span className="text-xs font-bold uppercase mt-1">{activity.label.slice(0, 3)}</span>
            </button>
          );
        })}
      </div>

      <div className="flex flex-wrap gap-4 pt-2 text-xs text-slate-300">
        {ACTIVITIES.map(act => (
          <div key={act.id} className="flex items-center space-x-1">
            <div className={`w-3 h-3 rounded border ${act.color}`}></div>
            <span>{act.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
