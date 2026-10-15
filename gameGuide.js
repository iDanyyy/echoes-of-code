// Ghid reguli & termeni — fără import din gameStore (evită dependențe circulare)
import {
  FOUNDING_REQUIREMENTS,
  MIN_DAYS_IN_ROLE,
  ROLE_APPLY_REQ,
  GUIDE_META,
} from './gameContent';

export const GUIDE_TITLE = 'Regulament & termeni';

export function buildGuideBody() {
  const { ROLES, SALARIES, BALANCE } = GUIDE_META;
  const applyLines = ROLES.map(
    (r) =>
      `• ${r}: salariu ${SALARIES[r]}$/lună (~${Math.round(SALARIES[r] / BALANCE.DAYS_PER_MONTH)}$/zi la task normal); aplicare cere skill ≥${ROLE_APPLY_REQ[r].skill}, rep ≥${ROLE_APPLY_REQ[r].reputation}; promovare după ${MIN_DAYS_IN_ROLE[r]} zile în rol.`,
  ).join('\n');

  return `ECHOES OF CODE — cum funcționează

TERMINI
• Skill / Reputație (0–100): cresc din task-uri reușite; scad la eșecuri.
• Energie / Stres (0–100): munca consumă energie; stres 100% = burnout (${BALANCE.BURNOUT_DAYS} zile fără job).
• Trace (0–100%): urma digitală. Hack, furt intern, sabotaj o măresc. Peste ${BALANCE.AUDIT_THRESHOLD}% → audit (Trace +${BALANCE.AUDIT_TRACE_PRESSURE}%/zi). La ${BALANCE.TRACE_MAX}% → game over, amendă ${BALANCE.TRACE_FINE}$.
• Cotă de piață (%): cât din industrie controlezi; veniturile firmei depind de cotă (creștere lentă).
• Ostilitate: rivali supărați după Trace mare; pot lovi bugetul.

JOB & INTERVIU
Șansa la interviu ≈ 35% + skill/200 + rep/200 − stres/300 (procent afișat la fiecare interviu).
Respins = +stres, trece o zi.
${applyLines}

HACK (bani rapizi, consecințe)
• Fără job: contracte pe piața neagră (bani mici, Trace).
• Cu job: furt din serverele angajatorului (mai mult $, Trace mare, angajatorul investighează).
• Fondator: scheme gri + sabotaj pe rivali (Trace foarte mare) — strategie pe termen lung.

STARTUP
${FOUNDING_REQUIREMENTS.minRole}, skill ${FOUNDING_REQUIREMENTS.minSkill}+, rep ${FOUNDING_REQUIREMENTS.minReputation}+, ${FOUNDING_REQUIREMENTS.minCareerDays} zile carieră, ${FOUNDING_REQUIREMENTS.minSavings}$ economii + taxă ${FOUNDING_REQUIREMENTS.foundingFee}$.

Timpul avansează după: lucru, odihnă, hack, zile de firmă, interviu eșuat. Unele acțiuni pot declanșa evenimente aleatorii.`;
}
