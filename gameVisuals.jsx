// Iconițe text/SVG — personaj (sferă + rol) și logo companie (înlocuibile cu imagini later)

export const COMPANY_BRAND = {
  c1: { abbr: 'G', bg: '#4285F4', fg: '#fff' },
  c2: { abbr: 'CS', bg: '#E01E5A', fg: '#fff' },
  c3: { abbr: 'EA', bg: '#1a1a1a', fg: '#fff' },
  c4: { abbr: 'MS', bg: '#00A4EF', fg: '#fff' },
  c5: { abbr: '▲', bg: '#000', fg: '#fff' },
  c6: { abbr: 'PA', bg: '#FA582D', fg: '#fff' },
  c7: { abbr: 'BD', bg: '#ED1C24', fg: '#fff' },
  c8: { abbr: 'UB', bg: '#0080FF', fg: '#fff' },
  c9: { abbr: 'EP', bg: '#2f2f2f', fg: '#fff' },
  c10: { abbr: 'Ad', bg: '#FF0000', fg: '#fff' },
  c11: { abbr: 'WP', bg: '#0E3E5D', fg: '#fff' },
  c12: { abbr: 'M', bg: '#0668E1', fg: '#fff' },
};

/** Siluetă + accesoriu după sferă; insignă după rol */
export function avatarMeta(careerPath, role, isFounder) {
  if (isFounder) {
    return { badge: 'CEO', accessory: '★', ring: 'border-amber-500', title: 'Fondator' };
  }
  const sphere = {
    web: { badge: 'DEV', accessory: '</>', ring: 'border-sky-500', title: 'Developer' },
    cyber: { badge: 'SEC', accessory: '🛡', ring: 'border-emerald-500', title: 'Security' },
    gamedev: { badge: 'GM', accessory: '▶', ring: 'border-violet-500', title: 'Game dev' },
    marketing: { badge: 'MKT', accessory: '◎', ring: 'border-pink-500', title: 'Marketing / UX' },
  }[careerPath ?? 'web'] ?? { badge: '?', accessory: '·', ring: 'border-zinc-600', title: 'Neales' };

  const roleBadge = { Junior: 'Jr', Mid: 'Mid', Senior: 'Sr', 'Team Lead': 'Lead' }[role] ?? '—';
  return { ...sphere, badge: `${sphere.badge} · ${roleBadge}`, title: `${sphere.title} · ${role ?? 'caut job'}` };
}

export function AvatarIcon({ careerPath, role, isFounder, size = 56 }) {
  const m = avatarMeta(careerPath, role, isFounder);
  return (
    <div
      className={`flex shrink-0 flex-col items-center justify-center rounded-md border-2 bg-zinc-900 ${m.ring}`}
      style={{ width: size, height: size }}
      title={m.title}
      aria-label={m.title}
    >
      <span className="text-lg leading-none text-zinc-100" aria-hidden>
        👤
      </span>
      <span className="mt-0.5 text-[10px] font-bold text-zinc-400">{m.accessory}</span>
      <span className="text-[9px] text-zinc-500">{m.badge}</span>
    </div>
  );
}

export function CompanyLogo({ companyId, name, size = 48 }) {
  const b = COMPANY_BRAND[companyId] ?? { abbr: (name ?? '?').slice(0, 2).toUpperCase(), bg: '#52525b', fg: '#fff' };
  return (
    <div
      className="flex shrink-0 items-center justify-center rounded-md border border-zinc-700 font-bold shadow-inner"
      style={{ width: size, height: size, backgroundColor: b.bg, color: b.fg, fontSize: size * 0.28 }}
      title={name}
      aria-label={`Logo ${name}`}
    >
      {b.abbr}
    </div>
  );
}

export function PlayerCompanyLogo({ companyName, size = 48 }) {
  const letter = (companyName ?? 'F').trim().charAt(0).toUpperCase();
  return (
    <div
      className="flex shrink-0 items-center justify-center rounded-md border border-amber-600/60 bg-amber-950 font-bold text-amber-200"
      style={{ width: size, height: size, fontSize: size * 0.4 }}
      title={companyName}
    >
      {letter}
    </div>
  );
}
