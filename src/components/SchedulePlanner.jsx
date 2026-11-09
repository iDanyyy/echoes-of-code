import { STUDY_SKILLS, SCHEDULE_ACTIVITIES, useGameStore } from '../store/gameStore';
import { BookOpen, Check, Clock, Coffee, HeartPulse, Moon, Plus, Trash2 } from 'lucide-react';

const CATEGORY_STYLES = {
  study: {
    card: 'border-emerald-800/70 bg-emerald-950/30 text-emerald-200',
    block: 'border-emerald-500/70 bg-emerald-900/80 text-emerald-100',
    icon: BookOpen
  },
  work: {
    card: 'border-cyan-800/70 bg-cyan-950/30 text-cyan-200',
    block: 'border-cyan-400/70 bg-cyan-900/80 text-cyan-100',
    icon: BriefcaseIcon
  },
  health: {
    card: 'border-amber-800/70 bg-amber-950/30 text-amber-200',
    block: 'border-amber-400/70 bg-amber-900/80 text-amber-100',
    icon: HeartPulse
  },
  rest: {
    card: 'border-violet-800/70 bg-violet-950/30 text-violet-200',
    block: 'border-violet-400/70 bg-violet-900/80 text-violet-100',
    icon: Coffee
  }
};

function BriefcaseIcon({ className }) {
  return <span className={className} aria-hidden="true">▣</span>;
}

function getActivity(activityId, activities = SCHEDULE_ACTIVITIES) {
  return activities.find(activity => activity.id === activityId) || SCHEDULE_ACTIVITIES[0];
}

function getRuns(schedule, startHour, endHour) {
  const runs = [];
  let hour = startHour;

  while (hour < endHour) {
    const activityId = schedule[hour] || 'sleep';
    const runStart = hour;
    while (hour < endHour && (schedule[hour] || 'sleep') === activityId) {
      hour += 1;
    }
    runs.push({ activityId, start: runStart, duration: hour - runStart });
  }

  return runs;
}

function TimelineRow({ schedule, startHour, endHour, currentHour, onRemove, activities }) {
  return (
    <div className="space-y-1">
      <div className="grid grid-cols-12 gap-1 text-[10px] text-slate-500">
        {Array.from({ length: endHour - startHour }, (_, index) => {
          const hour = startHour + index;
          return <span key={hour} className="text-center">{String(hour).padStart(2, '0')}</span>;
        })}
      </div>
      <div className="grid grid-cols-12 gap-1 min-h-14">
        {getRuns(schedule, startHour, endHour).map(run => {
          const activity = getActivity(run.activityId, activities);
          const styles = CATEGORY_STYLES[activity.category] || CATEGORY_STYLES.rest;
          const isCurrent = currentHour >= run.start && currentHour < run.start + run.duration;

          return (
            <button
              key={`${run.start}-${run.activityId}`}
              type="button"
              onClick={() => run.activityId !== 'sleep' && onRemove(run.activityId)}
              disabled={run.activityId === 'sleep'}
              style={{ gridColumn: `span ${run.duration}` }}
              className={`min-w-0 rounded border px-2 py-2 text-left transition ${styles.block} ${
                isCurrent ? 'ring-2 ring-white/80' : ''
              } ${run.activityId === 'sleep' ? 'cursor-default opacity-75' : 'hover:brightness-125'}`}
              title={`${activity.label} · ${run.duration}h`}
            >
              <span className="flex items-center gap-1 text-[10px] font-bold uppercase">
                {run.activityId === 'sleep' ? <Moon className="h-3 w-3 shrink-0" /> : null}
                <span className="truncate">{activity.label}</span>
              </span>
              <span className="mt-1 block text-[10px] opacity-70">{run.duration}h</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function SchedulePlanner() {
  const {
    player,
    activeProjects,
    activeFreelance,
    scheduleActivity,
    removeScheduledActivity,
    setStudySkill,
    time,
    tickHour
  } = useGameStore();
  const schedule = player.schedule || Array(24).fill('sleep');
  const scheduledIds = new Set(schedule.filter(activityId => activityId !== 'sleep'));
  const sleepHours = schedule.filter(activityId => activityId === 'sleep').length;
  const studySkill = player.studySkill || 'frontend';
  const contractTask = activeFreelance
    ? {
      id: 'freelance-css-fix',
      category: 'work',
      label: activeFreelance.taskLabel || 'Contract Work',
      duration: 2,
      energyCost: 5,
      stressChange: 2,
      contractActivity: true,
      color: 'sky'
    }
    : null;
  const availableActivities = contractTask
    ? SCHEDULE_ACTIVITIES.map(activity => activity.id === 'freelance-css-fix' ? contractTask : activity)
    : SCHEDULE_ACTIVITIES;
  const schedulableActivities = availableActivities.filter(activity => (
    activity.id !== 'sleep' &&
    (!activity.projectTaskId || activeProjects.length > 0) &&
    (!activity.contractActivity || activeFreelance)
  ));

  const categoryHours = schedulableActivities.reduce((totals, activity) => {
    const hours = schedule.filter(activityId => activityId === activity.id).length;
    totals[activity.category] = (totals[activity.category] || 0) + hours;
    return totals;
  }, {});

  return (
    <div className="space-y-6 rounded-lg border border-slate-800 bg-slate-900 p-6 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <h2 className="flex items-center gap-2 text-xl font-bold text-cyan-400">
            <Clock className="h-5 w-5" /> 24-Hour Schedule Planner
          </h2>
          <p className="mt-1 text-xs text-slate-400">
            Select a task to place its full duration in the first available time block.
            Click a colored block to remove it.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="rounded border border-cyan-800/80 bg-slate-950 px-3 py-1.5 text-xs text-cyan-300">
            Active hour: {String(time.hour).padStart(2, '0')}:00
          </span>
          <button
            onClick={tickHour}
            className="flex items-center gap-1 rounded bg-cyan-700 px-3 py-1.5 text-xs font-bold text-white transition hover:bg-cyan-600"
          >
            Advance 1 hour
          </button>
        </div>
      </div>

      <div className="grid gap-3 rounded border border-slate-800 bg-slate-950/60 p-3 lg:grid-cols-[minmax(15rem,0.8fr)_minmax(0,2fr)]">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wide text-slate-200">Available tasks</h3>
            <span className="text-[10px] text-slate-500">Click to schedule</span>
          </div>
          <div className="space-y-2">
            {schedulableActivities.map(activity => {
              const styles = CATEGORY_STYLES[activity.category] || CATEGORY_STYLES.rest;
              const Icon = styles.icon;
              const isScheduled = scheduledIds.has(activity.id);
              return (
                <button
                  key={activity.id}
                  type="button"
                  onClick={() => isScheduled
                    ? removeScheduledActivity(activity.id)
                    : scheduleActivity(activity.id)}
                  className={`flex w-full items-center gap-2 rounded border p-2 text-left text-xs transition ${styles.card} ${
                    isScheduled ? 'ring-1 ring-white/40' : 'hover:brightness-125'
                  }`}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-bold">{activity.label}</span>
                    <span className="text-[10px] opacity-70">
                      {activity.duration}h · Energy -{activity.energyCost} · Stress {activity.stressChange > 0 ? '+' : ''}{activity.stressChange}
                    </span>
                  </span>
                  {isScheduled ? <Check className="h-4 w-4 shrink-0" /> : <Plus className="h-4 w-4 shrink-0" />}
                </button>
              );
            })}
          </div>
          <div className="rounded border border-slate-800 bg-slate-900 p-3 text-xs">
            <div className="mb-2 flex items-center gap-2 text-emerald-300">
              <BookOpen className="h-4 w-4" /> Study focus
            </div>
            <select
              value={studySkill}
              onChange={event => setStudySkill(event.target.value)}
              className="w-full rounded border border-emerald-800/70 bg-slate-950 px-2 py-1.5 text-emerald-200"
            >
              {STUDY_SKILLS.map(skill => <option key={skill.id} value={skill.id}>{skill.label}</option>)}
            </select>
            <p className="mt-2 text-slate-400">
              Level {player.skills[studySkill] || 0} · {player.studyProgress?.[studySkill] || 0}% to next level
            </p>
          </div>
        </div>

        <div className="min-w-0 space-y-4">
          <TimelineRow
            schedule={schedule}
            startHour={0}
            endHour={12}
            currentHour={time.hour}
            onRemove={removeScheduledActivity}
            activities={availableActivities}
          />
          <TimelineRow
            schedule={schedule}
            startHour={12}
            endHour={24}
            currentHour={time.hour}
            onRemove={removeScheduledActivity}
            activities={availableActivities}
          />
        </div>
      </div>

      <div className="rounded border border-cyan-900/70 bg-cyan-950/20 p-4">
        <div className="mb-3 flex items-center justify-between gap-3">
          <h3 className="text-sm font-bold uppercase tracking-wide text-cyan-300">Project progress</h3>
          <span className="text-[10px] text-slate-500">Updated as project tasks run</span>
        </div>
        {activeProjects.length === 0 ? (
          <p className="text-xs text-slate-500">
            No active project. Start one from the Projects Engine to unlock project tasks.
          </p>
        ) : (
          <div className="space-y-3">
            {activeProjects.map(project => (
              <div key={project.id} className="space-y-2">
                <div className="flex flex-wrap justify-between gap-2 text-xs">
                  <span className="font-bold text-white">{project.name}</span>
                  <span className={project.status === 'complete' ? 'text-emerald-300' : 'text-cyan-300'}>
                    {project.status === 'complete' ? 'Requirements met' : 'In development'}
                  </span>
                </div>
                <div className="grid gap-2 sm:grid-cols-3">
                  {Object.entries(project.requirements || {}).map(([dimension, required]) => {
                    const current = project.progress?.[dimension] || 0;
                    const percentage = Math.min(100, Math.round((current / required) * 100));
                    return (
                      <div key={dimension}>
                        <div className="mb-1 flex justify-between text-[10px] uppercase text-slate-400">
                          <span>{dimension}</span>
                          <span>{Math.round(current)}/{required}</span>
                        </div>
                        <div className="h-1.5 overflow-hidden rounded bg-slate-800">
                          <div className="h-full bg-cyan-400 transition-all" style={{ width: `${percentage}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
                <p className="text-[10px] text-slate-500">Detected bugs: {project.bugs || 0}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-4 border-t border-slate-800/70 pt-4 text-xs text-slate-300">
        <span><strong className="text-indigo-300">{sleepHours}h</strong> sleep</span>
        <span><strong className="text-emerald-300">{categoryHours.study || 0}h</strong> study</span>
        <span><strong className="text-cyan-300">{categoryHours.work || 0}h</strong> work</span>
        <span><strong className="text-amber-300">{categoryHours.health || 0}h</strong> health</span>
        <span><strong className="text-violet-300">{categoryHours.rest || 0}h</strong> rest</span>
        {sleepHours < 6 && (
          <span className="flex items-center gap-1 rounded border border-rose-800/50 bg-rose-950/40 px-2.5 py-1 font-bold text-rose-400">
            <Trash2 className="h-3 w-3" /> Sleep is under 6h
          </span>
        )}
      </div>
    </div>
  );
}
