// MarketOverview.jsx — UI text-first + pop-up-uri de acțiune
import { useEffect, useState } from 'react';
import {
  useGameStore,
  competitorsInCareer,
  foundingStatus,
  hackForIndustry,
  parseJobId,
  ROLES,
  SALARIES,
  BALANCE,
  FOUNDING_REQUIREMENTS,
  industryName,
} from './gameStore';

function Modal() {
  const modal = useGameStore((s) => s.modal);
  const resolveModalChoice = useGameStore((s) => s.resolveModalChoice);
  const closeModal = useGameStore((s) => s.closeModal);
  const foundCompany = useGameStore((s) => s.foundCompany);
  const [firmName, setFirmName] = useState('');

  if (!modal) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto border border-zinc-600 bg-zinc-950 p-5 text-sm text-zinc-200 shadow-xl">
        <h2 id="modal-title" className="text-base font-semibold text-zinc-50">
          {modal.title}
        </h2>
        <p className="mt-3 whitespace-pre-wrap leading-relaxed text-zinc-400">{modal.body}</p>

        {modal.type === 'foundName' && (
          <form
            className="mt-4 space-y-3"
            onSubmit={(e) => {
              e.preventDefault();
              foundCompany(firmName);
              setFirmName('');
            }}
          >
            <input
              className="w-full border border-zinc-700 bg-zinc-900 px-3 py-2 text-zinc-100"
              placeholder="Ex: ByteForge SRL"
              value={firmName}
              onChange={(e) => setFirmName(e.target.value)}
              autoFocus
            />
            <div className="flex gap-2">
              <button type="submit" className="border border-emerald-600 px-3 py-1.5 text-emerald-300 hover:bg-emerald-950">
                Înregistrează
              </button>
              <button type="button" className="border border-zinc-600 px-3 py-1.5 hover:bg-zinc-900" onClick={closeModal}>
                Anulează
              </button>
            </div>
          </form>
        )}

        {modal.choices?.length > 0 && (
          <ul className="mt-5 space-y-2">
            {modal.choices.map((c) => (
              <li key={c.id}>
                <button
                  type="button"
                  disabled={c.disabled}
                  className="w-full border border-zinc-700 px-3 py-2 text-left hover:border-zinc-500 hover:bg-zinc-900 disabled:opacity-40"
                  onClick={() => resolveModalChoice(c.id)}
                >
                  <span className="text-zinc-100">{c.label}</span>
                  {c.hint && <span className="mt-1 block text-xs text-zinc-500">{c.hint}</span>}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function Line({ k, v, warn }) {
  return (
    <p className="text-sm">
      <span className="text-zinc-500">{k}: </span>
      <span className={warn ? 'text-rose-300' : 'text-zinc-100'}>{v}</span>
    </p>
  );
}

function ActionButton({ children, onClick, disabled, danger }) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`block w-full border px-3 py-2 text-left text-sm disabled:opacity-40 ${
        danger
          ? 'border-rose-800 text-rose-200 hover:bg-rose-950'
          : 'border-zinc-700 text-zinc-200 hover:border-zinc-500 hover:bg-zinc-900'
      }`}
    >
      {children}
    </button>
  );
}

export default function MarketOverview() {
  const s = useGameStore();
  const ensureCareerModal = useGameStore((st) => st.ensureCareerModal);
  const [applyRole, setApplyRole] = useState('Junior');

  useEffect(() => {
    ensureCareerModal();
  }, [ensureCareerModal, s.player.careerPath]);

  const job = parseJobId(s.player.currentJobId);
  const employer = job && s.competitors.find((c) => c.id === job.companyId);
  const rivals = competitorsInCareer(s);
  const { ready: canFound } = foundingStatus(s);
  const sphere = s.player.careerPath ? industryName(s.player.careerPath) : '—';
  const hackKey = s.player.careerPath && hackForIndustry(industryName(s.player.careerPath));
  const blocked = !!s.modal || !!s.gameOver;

  return (
    <main className="min-h-screen bg-zinc-950 p-4 font-mono text-zinc-200 sm:p-8">
      <Modal />

      <div className="mx-auto max-w-2xl space-y-6">
        <header>
          <h1 className="text-lg text-zinc-50">Echoes of Code</h1>
          <p className="mt-1 text-xs text-zinc-500">
            Simulator de carieră în tech · strategie de firmă · ziua {s.day}
          </p>
        </header>

        <section className="space-y-1 border border-zinc-800 p-4">
          <p className="text-xs uppercase tracking-wide text-zinc-500">Status programator</p>
          <Line k="Sferă" v={sphere} />
          <Line
            k="Situație"
            v={
              s.player.isFounder
                ? `Fondator · ${s.playerCompany.name}`
                : job
                  ? `${job.role} @ ${employer?.name}`
                  : s.burnout
                    ? `Burnout (${s.burnout.daysLeft} zile)`
                    : 'Disponibil pe piață'
            }
          />
          <Line k="Bani personali" v={`${s.player.money.toLocaleString('ro-RO')}$`} />
          {s.player.isFounder && (
            <>
              <Line k="Buget firmă" v={`${s.playerCompany.budget.toLocaleString('ro-RO')}$`} />
              <Line k="Cota ta de piață" v={`${s.playerCompany.marketShare}%`} />
              <Line k="Angajați" v={String(s.playerCompany.employees.length)} />
            </>
          )}
          <Line k="Skill" v={`${s.player.skill}/100`} />
          <Line k="Reputație" v={`${s.player.reputation}/100`} />
          <Line k="Energie" v={`${s.player.energy}%`} />
          <Line k="Stres" v={`${s.player.stress}%`} warn={s.player.stress >= 75} />
          <Line k="Trace" v={`${s.player.trace}%`} warn={s.player.trace > BALANCE.AUDIT_THRESHOLD} />
          <Line k="Zile în carieră" v={String(s.player.careerDays)} />
          {job && <Line k="Zile în rolul curent" v={String(s.player.daysInRole)} />}
          {s.audit.active && (
            <p className="mt-2 text-xs text-rose-300">
              Audit activ — Trace +{BALANCE.AUDIT_TRACE_PRESSURE}%/zi. Șterge log-urile ({BALANCE.SCRUB_COST}$).
            </p>
          )}
        </section>

        {s.gameOver ? (
          <section className="border border-rose-800 p-4 text-rose-200">
            <p>{s.gameOver.reason === 'trace' ? 'Game over: Trace maxim.' : 'Game over: faliment.'}</p>
            <ActionButton onClick={s.resetGame}>Joc nou</ActionButton>
          </section>
        ) : (
          <section className="space-y-2">
            <p className="text-xs uppercase tracking-wide text-zinc-500">Acțiuni</p>
            <p className="text-xs text-zinc-600">
              Fiecare acțiune majoră deschide un pop-up cu context și risc. Timpul avansează după muncă / odihnă /
              zile de firmă.
            </p>

            {!s.player.isFounder && s.player.careerPath && (
              <>
                {s.player.currentJobId ? (
                  <>
                    <ActionButton disabled={blocked} onClick={() => s.openWorkModal()}>
                      Începe ziua de lucru (alegi task-ul)
                    </ActionButton>
                    <ActionButton disabled={blocked} onClick={() => s.openPromotionModal()}>
                      Cere promovare (după timp în rol)
                    </ActionButton>
                    <ActionButton disabled={blocked || s.player.stealBlockedDays > 0} danger onClick={() => s.openStealModal()}>
                      Acces neautorizat la servere
                      {s.player.stealBlockedDays > 0 ? ` (blocat ${s.player.stealBlockedDays}z)` : ''}
                    </ActionButton>
                  </>
                ) : (
                  <>
                    <label className="text-xs text-zinc-500">
                      Rol țintă la aplicare
                      <select
                        className="ml-2 border border-zinc-700 bg-zinc-900 px-2 py-1"
                        value={applyRole}
                        onChange={(e) => setApplyRole(e.target.value)}
                      >
                        {ROLES.map((r) => (
                          <option key={r} value={r}>
                            {r} ({SALARIES[r]}$/lună)
                          </option>
                        ))}
                      </select>
                    </label>
                  </>
                )}
                <ActionButton disabled={blocked} onClick={() => s.openFoundModal()}>
                  Pregătește startup-ul {canFound ? '✓' : `(cerințe: Senior, ${FOUNDING_REQUIREMENTS.minCareerDays}z, ${FOUNDING_REQUIREMENTS.minSavings}$)`}
                </ActionButton>
              </>
            )}

            {s.player.isFounder && (
              <>
                <ActionButton disabled={blocked} onClick={() => s.openCompanyDayModal()}>
                  Planifică ziua firmei (strategie)
                </ActionButton>
                <ActionButton disabled={blocked} onClick={() => s.openInnovateModal()}>
                  Investește în produs (creștere lentă de cotă)
                </ActionButton>
                <ActionButton
                  disabled={blocked || s.playerCompany.budget < BALANCE.HIRE_FEE}
                  onClick={() => s.hireEmployee('Mid')}
                >
                  Angajează Mid ({BALANCE.HIRE_FEE}$ + salariu lunar)
                </ActionButton>
              </>
            )}

            <ActionButton disabled={blocked} onClick={s.rest}>
              Odihnă / weekend (recuperare)
            </ActionButton>
            {s.player.trace > 0 && (
              <ActionButton disabled={blocked} onClick={s.scrubLogs}>
                Șterge log-uri digitale ({BALANCE.SCRUB_COST}$)
              </ActionButton>
            )}
          </section>
        )}

        {s.player.careerPath && !s.player.isFounder && !s.player.currentJobId && !s.burnout && (
          <section className="space-y-2">
            <p className="text-xs uppercase tracking-wide text-zinc-500">Angajatori în {sphere}</p>
            {rivals.map((c) => (
              <ActionButton key={c.id} disabled={blocked} onClick={() => s.openApplyModal(c.id, applyRole)}>
                Aplică la {c.name} · cota lor {c.marketShare}%
              </ActionButton>
            ))}
          </section>
        )}

        {s.player.careerPath && (
          <section className="border border-zinc-800 p-4">
            <p className="text-xs uppercase tracking-wide text-zinc-500">Piața din {sphere}</p>
            <ul className="mt-2 space-y-2 text-sm">
              {rivals
                .sort((a, b) => b.marketShare - a.marketShare)
                .map((c) => (
                  <li key={c.id} className="flex flex-wrap justify-between gap-2 border-b border-zinc-900 pb-2">
                    <span>
                      {c.name}
                      {employer?.id === c.id && ' (angajator)'}
                    </span>
                    <span className="text-zinc-400">
                      {c.marketShare}% · ostilitate {c.hostility}
                    </span>
                    {s.player.isFounder && s.playerCompany.industry === c.industry && hackKey && (
                      <ActionButton
                        danger
                        disabled={blocked || s.player.energy < 20}
                        onClick={() => s.openSabotageModal(c.id, hackKey)}
                      >
                        Sabotaj strategic
                      </ActionButton>
                    )}
                  </li>
                ))}
              {s.player.isFounder && (
                <li className="text-amber-200/90">
                  {s.playerCompany.name} (tu): {s.playerCompany.marketShare}%
                </li>
              )}
            </ul>
          </section>
        )}

        <section className="border border-zinc-800 p-4">
          <p className="text-xs uppercase tracking-wide text-zinc-500">Jurnal</p>
          <ol className="mt-2 max-h-56 space-y-1 overflow-y-auto text-xs">
            {[...s.log].reverse().map((l) => (
              <li key={l.id} className={l.kind === 'err' ? 'text-rose-400' : l.kind === 'warn' ? 'text-amber-300' : 'text-zinc-500'}>
                [z{l.day}] {l.text}
              </li>
            ))}
          </ol>
        </section>
      </div>
    </main>
  );
}
