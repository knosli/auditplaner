// Technische Lernillustrationen (eigene SVG-Schemata, bewusst vereinfacht).
// Sie veranschaulichen das Lernziel des Moduls – keine Bemessung, keine Plangrundlage.

type Props = { className?: string };

const Paper = ({ children, label }: { children: React.ReactNode; label: string }) => (
  <svg viewBox="0 0 480 300" role="img" aria-label={label} className="illu">
    <rect x="4" y="4" width="472" height="292" rx="18" fill="#f7f7f2" />
    <path d="M24 30h432M24 270h432" stroke="#e3e8e1" strokeDasharray="2 6" />
    {children}
  </svg>
);

const T = ({ x, y, children, anchor = 'start', w = 700, c = '#184542', s = 11 }: { x: number; y: number; children: React.ReactNode; anchor?: 'start' | 'middle' | 'end'; w?: number; c?: string; s?: number }) => (
  <text x={x} y={y} fontSize={s} fontWeight={w} fill={c} textAnchor={anchor} fontFamily="system-ui, -apple-system, Segoe UI, Arial, sans-serif">{children}</text>
);

/** Modul 2: Welches Wasser darf wohin? Querschnitt Baustelle → Behandlung → Ableitung */
export function IlluWater(_: Props) {
  return (
    <Paper label="Schema: Baustellenabwasser wird gefasst, abgesetzt und neutralisiert und nur mit Zustimmung in den Schmutzwasserkanal geleitet; der Meteorschacht zum Bach bleibt abgedeckt.">
      {/* Boden */}
      <path d="M24 196h432v74H24z" fill="#d9c3a4" />
      <path d="M24 196h432" stroke="#b49572" strokeWidth="2" />
      {/* Rohbau */}
      <path d="M44 196V96h96v100" fill="#e4ebe6" stroke="#9db7b0" strokeWidth="2" />
      <path d="M58 112h68M58 140h68M58 168h68" stroke="#c4d5cf" strokeWidth="2" />
      <T x={92} y={88} anchor="middle">Rohbau</T>
      {/* Waschplatz */}
      <path d="M150 190h56v6h-56z" fill="#8aa8a2" />
      <path d="M162 176c4 6 0 10 4 14M178 176c4 6 0 10 4 14" stroke="#4fa3a0" strokeWidth="2" fill="none" />
      <T x={178} y={168} anchor="middle" s={10}>Waschplatz</T>
      {/* Absetzbecken */}
      <path d="M224 160h70v36h-70z" fill="#dbe9e6" stroke="#5f8f88" strokeWidth="2" />
      <path d="M224 186h70v10h-70z" fill="#b59a78" opacity=".8" />
      <T x={259} y={152} anchor="middle" s={10}>Absetzen</T>
      {/* Neutralisation */}
      <path d="M310 160h56v36h-56z" fill="#e9f3ef" stroke="#5f8f88" strokeWidth="2" />
      <circle cx="338" cy="176" r="8" fill="#e5aa63" />
      <T x={338} y={180} anchor="middle" s={9} c="#3d2a10">pH</T>
      <T x={338} y={152} anchor="middle" s={10}>Neutralisieren</T>
      {/* Leitungen */}
      <path d="M206 192h18M294 178h16" stroke="#167b70" strokeWidth="4" strokeLinecap="round" />
      <path d="M366 178h22v52h22" stroke="#167b70" strokeWidth="4" fill="none" strokeLinecap="round" />
      <circle cx="412" cy="230" r="10" fill="#167b70" />
      <T x={404} y={256} anchor="middle" s={10}>Schmutzwasser</T>
      <T x={404} y={268} anchor="middle" s={9} w={500} c="#56645e">nur mit Zustimmung</T>
      {/* Meteorschacht, abgedeckt */}
      <rect x="108" y="198" width="30" height="40" fill="#c9d5d1" stroke="#7d918b" strokeWidth="2" />
      <rect x="102" y="192" width="42" height="7" rx="2" fill="#c14c40" />
      <path d="M123 238v14h-80" stroke="#7aa9c4" strokeWidth="4" fill="none" strokeDasharray="6 5" />
      <T x={40} y={268} s={10}>Meteorleitung → Bach</T>
      <T x={123} y={188} anchor="middle" s={9} c="#c14c40">abgedeckt</T>
      {/* Legende */}
      <circle cx="40" cy="44" r="5" fill="#167b70" /><T x={52} y={48} s={10} w={600}>behandeltes Wasser</T>
      <rect x="168" y="40" width="12" height="8" rx="2" fill="#c14c40" /><T x={186} y={48} s={10} w={600}>Schutz gegen Fehleinleitung</T>
    </Paper>
  );
}

/** Modul 3: Rückbau und Trennung */
export function IlluWaste(_: Props) {
  const bins: [number, string, string][] = [[210, '#9aa6a3', 'Mineralisch'], [270, '#c7a27a', 'Holz'], [330, '#b7c7c2', 'Metall'], [390, '#e0c48c', 'Brennbares']];
  return (
    <Paper label="Schema: Rückbau in Schritten – Schadstoffe zuerst entfernen, dann sortenrein trennen in mineralische Abfälle, Holz, Metall und Brennbares; Sonderabfälle separat mit Begleitschein.">
      <path d="M24 214h432v56H24z" fill="#d9c3a4" />
      {/* Gebäude im Rückbau */}
      <path d="M44 214V92h110v122" fill="#e4ebe6" stroke="#9db7b0" strokeWidth="2" />
      <path d="M44 92l20-18h70l20 18" fill="#cfdcd7" stroke="#9db7b0" strokeWidth="2" />
      <path d="M62 110h28v24H62zM108 110h28v24h-28zM62 150h28v24H62z" fill="#a7c4c4" />
      <path d="M108 150h28v24h-28z" fill="#f3d2c9" stroke="#c14c40" strokeWidth="2" strokeDasharray="3 3" />
      <T x={99} y={66} anchor="middle">1 · Schadstoffe zuerst</T>
      <T x={122} y={196} anchor="middle" s={9} c="#c14c40">Asbest?</T>
      {/* Pfeil */}
      <path d="M160 160h30" stroke="#167b70" strokeWidth="3" markerEnd="url(#ar)" />
      <defs><marker id="ar" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 10 5 0 10z" fill="#167b70" /></marker></defs>
      <T x={300} y={116} anchor="middle">2 · Sortenrein trennen</T>
      {bins.map(([x, c, l]) => (
        <g key={l}>
          <path d={`M${x - 24} 160h48l-6 54h-36z`} fill={c} stroke="#6f7f7a" strokeWidth="1.5" />
          <T x={x} y={232} anchor="middle" s={9}>{l}</T>
        </g>
      ))}
      {/* Sonderabfall */}
      <rect x="196" y="56" width="104" height="34" rx="8" fill="#fbe9e6" stroke="#c14c40" />
      <T x={248} y={71} anchor="middle" s={10} c="#8f2f25">Sonderabfall</T>
      <T x={248} y={84} anchor="middle" s={9} w={500} c="#8f2f25">separat · Begleitschein</T>
      <T x={300} y={256} anchor="middle" s={10} w={500} c="#56645e">3 · Nachweise: Liefer-, Waag- und Begleitscheine</T>
    </Paper>
  );
}

/** Modul 4: Bodenprofil und Befahrbarkeit */
export function IlluSoil(_: Props) {
  return (
    <Paper label="Schema: Bodenprofil mit Oberboden, Unterboden und Untergrund; Lastwagen fahren auf der Kiespiste, Ober- und Unterboden werden getrennt in Depots gelagert.">
      {/* Profil */}
      <path d="M40 120h160v28H40z" fill="#5b4433" />
      <path d="M40 148h160v52H40z" fill="#a9825e" />
      <path d="M40 200h160v58H40z" fill="#cdb796" />
      <path d="M40 200h160" stroke="#b49572" strokeDasharray="4 4" />
      <path d="M60 120c0-10 8-16 12-22M100 120c0-12-6-18-2-26M150 120c0-8 6-14 10-20" stroke="#4f7d55" strokeWidth="3" fill="none" />
      <T x={210} y={138}>Oberboden</T>
      <T x={210} y={178}>Unterboden</T>
      <T x={210} y={232}>Untergrund</T>
      <path d="M202 134h-6M202 174h-6M202 228h-6" stroke="#184542" />
      {/* Piste + LKW */}
      <path d="M300 200h150v10H300z" fill="#b8b2a6" />
      <path d="M300 210h150v48H300z" fill="#a9825e" />
      <rect x="330" y="166" width="58" height="26" rx="4" fill="#e5aa63" />
      <rect x="388" y="172" width="26" height="20" rx="3" fill="#d29a55" />
      <circle cx="346" cy="196" r="7" fill="#2d4c48" /><circle cx="400" cy="196" r="7" fill="#2d4c48" />
      <T x={375} y={232} anchor="middle" s={10} c="#fff">Kiespiste auf Vlies</T>
      {/* Depots */}
      <path d="M300 112q22-30 44 0z" fill="#5b4433" />
      <path d="M362 112q30-38 60 0z" fill="#a9825e" />
      <path d="M300 112h122" stroke="#4f7d55" strokeWidth="2" />
      <T x={322} y={128} anchor="middle" s={9}>Depot OB</T>
      <T x={392} y={128} anchor="middle" s={9}>Depot UB</T>
      <T x={240} y={56} anchor="middle">Getrennt abtragen, getrennt lagern – nur bei trockenem Boden</T>
      <T x={240} y={72} anchor="middle" s={10} w={500} c="#56645e">Befahrbarkeit: Freigabe nach Bodenfeuchte (Saugspannung)</T>
    </Paper>
  );
}

/** Modul 1: Vom Gesetz zur Baustelle */
export function IlluLaw(_: Props) {
  const steps: [number, string, string][] = [[70, 'Gesetz', 'USG, GSchG'], [170, 'Verordnung', 'GSchV, VVEA'], [270, 'Vollzugshilfe', 'BAFU, Kanton'], [370, 'Auflage', 'Bewilligung']];
  return (
    <Paper label="Schema: Vom Gesetz über Verordnung und Vollzugshilfe zur Auflage in der Baubewilligung und zur Umsetzung auf der Baustelle.">
      <T x={240} y={58} anchor="middle">Vom Gesetz zur Massnahme auf der Baustelle</T>
      {steps.map(([x, t, s], i) => (
        <g key={t}>
          <rect x={x - 44} y={92} width={88} height={64} rx="12" fill={i === 3 ? '#daeee8' : '#ffffff'} stroke="#9db7b0" strokeWidth="1.5" />
          <T x={x} y={120} anchor="middle">{t}</T>
          <T x={x} y={138} anchor="middle" s={9} w={500} c="#56645e">{s}</T>
          {i < 3 && <path d={`M${x + 46} 124h8`} stroke="#167b70" strokeWidth="3" />}
        </g>
      ))}
      <path d="M370 158v30" stroke="#167b70" strokeWidth="3" />
      <rect x="150" y="190" width="300" height="58" rx="12" fill="#102d2d" />
      <T x={300} y={214} anchor="middle" c="#ffffff">Baustelle: Massnahme · Kontrolle · Nachweis</T>
      <T x={300} y={232} anchor="middle" s={10} w={500} c="#b6d6cf">Kanton und Gemeinde können ergänzen</T>
      <rect x="40" y="190" width="96" height="58" rx="12" fill="#fff2de" stroke="#e5aa63" />
      <T x={88} y={214} anchor="middle" s={10}>Norm (SIA)</T>
      <T x={88} y={230} anchor="middle" s={9} w={500} c="#56645e">via Vertrag</T>
      <path d="M136 219h14" stroke="#e5aa63" strokeWidth="3" />
    </Paper>
  );
}

/** Modul 8: Installationsplan in der AVOR (Draufsicht) */
export function IlluPlan(_: Props) {
  return (
    <Paper label="Schema: Installationsplan in der Draufsicht. Betankung und Waschplatz liegen auf befestigter Fläche weg vom Bach, der Meteorschacht ist markiert, Mulden und Lärmquellen weg von den Wohnhäusern, Bodendepot ausserhalb der Baufläche.">
      {/* Raster */}
      <path d="M40 48h300v206H40z" fill="#ffffff" stroke="#9db7b0" strokeWidth="1.5" />
      <path d="M40 98h300M40 148h300M40 198h300M100 48v206M160 48v206M220 48v206M280 48v206" stroke="#eef2ee" />
      {/* Bach */}
      <path d="M352 40c-10 40 14 70 2 110s12 80 0 112" stroke="#7aa9c4" strokeWidth="14" fill="none" strokeLinecap="round" opacity=".8" />
      <T x={410} y={58} anchor="middle" s={10} c="#2f6f8f">Bach</T>
      {/* Neubau */}
      <rect x="120" y="110" width="120" height="84" rx="4" fill="#e4ebe6" stroke="#5f8f88" strokeWidth="2" />
      <T x={180} y={156} anchor="middle">Neubau</T>
      {/* Wohnhäuser */}
      <path d="M40 30h80v14H40zM140 30h80v14h-80z" fill="#cfdcd7" />
      <T x={130} y={24} anchor="middle" s={9} w={600} c="#56645e">Wohnhäuser</T>
      {/* Mulden/Kompressor weg von Wohnhäusern */}
      <rect x="250" y="214" width="28" height="18" rx="3" fill="#c7a27a" /><rect x="282" y="214" width="28" height="18" rx="3" fill="#9aa6a3" />
      <T x={280} y={248} anchor="middle" s={9}>Mulden</T>
      {/* Betankung und Waschplatz auf befestigter Fläche */}
      <rect x="54" y="206" width="84" height="40" rx="6" fill="#e9f3ef" stroke="#167b70" strokeWidth="2" />
      <circle cx="76" cy="226" r="9" fill="#e5aa63" /><T x={76} y={230} anchor="middle" s={8} c="#3d2a10">Tank</T>
      <rect x="94" y="216" width="34" height="20" rx="3" fill="#dbe9e6" stroke="#5f8f88" />
      <T x={111} y={230} anchor="middle" s={8}>Wasch</T>
      <T x={96} y={200} anchor="middle" s={9} c="#0f5a52">befestigt, gefasst</T>
      {/* Meteorschacht markiert */}
      <circle cx="300" cy="80" r="8" fill="#fff" stroke="#c14c40" strokeWidth="3" />
      <T x={300} y={104} anchor="middle" s={9} c="#c14c40">Meteor → Bach</T>
      {/* Bodendepot */}
      <path d="M54 92q24-30 48 0z" fill="#5b4433" /><T x={78} y={106} anchor="middle" s={9}>Bodendepot</T>
      {/* Zufahrt */}
      <path d="M180 254v-60" stroke="#b8b2a6" strokeWidth="12" />
      <T x={196} y={250} s={9} w={600} c="#56645e">Zufahrt</T>
      {/* Legende */}
      <T x={366} y={196} s={10} w={700}>Quelle</T>
      <T x={366} y={210} s={10} w={700}>weg vom</T>
      <T x={366} y={224} s={10} w={700}>Schutzgut</T>
      <T x={366} y={246} s={9} w={500} c="#56645e">Plan je Bauphase</T>
    </Paper>
  );
}

/** Modul 9: Umweltbegehung – dem Wasser nachgehen, feststellen, nachverfolgen */
export function IlluInspect(_: Props) {
  return (
    <Paper label="Schema: Umweltbegehung. Der Rundgang folgt dem Wasser von der Baustelle bis zum Schacht; Feststellungen werden eingestuft, Massnahmen nachverfolgt, bis sie wirken.">
      <path d="M24 206h432v64H24z" fill="#d9c3a4" />
      <path d="M24 206h432" stroke="#b49572" strokeWidth="2" />
      <path d="M44 206V112h92v94" fill="#e4ebe6" stroke="#9db7b0" strokeWidth="2" />
      <path d="M58 130h64M58 158h64M58 186h64" stroke="#c4d5cf" strokeWidth="2" />
      <path d="M140 200c40 8 60-6 96 2s52 0 84 0" stroke="#167b70" strokeWidth="3" fill="none" strokeDasharray="7 6" />
      <T x={268} y={190} anchor="middle" s={10} c="#0f5a52">dem Wasser nach</T>
      <rect x="318" y="204" width="34" height="36" fill="#c9d5d1" stroke="#7d918b" strokeWidth="2" />
      <rect x="312" y="198" width="46" height="7" rx="2" fill="#c14c40" />
      <T x={335} y={258} anchor="middle" s={9}>Schacht</T>
      <circle cx="186" cy="130" r="9" fill="#184542" />
      <path d="M186 140v34M186 150l-14 10M186 150l16 6M186 174l-10 22M186 174l10 22" stroke="#184542" strokeWidth="4" strokeLinecap="round" fill="none" />
      <rect x="200" y="146" width="18" height="24" rx="3" fill="#fff" stroke="#184542" strokeWidth="2" />
      <path d="M204 154h10M204 160h10" stroke="#167b70" strokeWidth="2" />
      <rect x="368" y="60" width="92" height="112" rx="10" fill="#ffffff" stroke="#9db7b0" strokeWidth="1.5" />
      <T x={414} y={80} anchor="middle" s={10}>Feststellungen</T>
      <circle cx="384" cy="100" r="6" fill="#c14c40" /><T x={396} y={104} s={9}>kritisch</T>
      <circle cx="384" cy="122" r="6" fill="#e5aa63" /><T x={396} y={126} s={9}>Abweichung</T>
      <circle cx="384" cy="144" r="6" fill="#9db7b0" /><T x={396} y={148} s={9}>Hinweis</T>
      <T x={414} y={164} anchor="middle" s={8} w={500} c="#56645e">bis wirksam erledigt</T>
      <T x={170} y={56} anchor="middle">Vorhanden – angewendet – wirksam?</T>
      <T x={170} y={72} anchor="middle" s={10} w={500} c="#56645e">Beobachten, einstufen, handeln, nachverfolgen</T>
    </Paper>
  );
}

/** Modul 10: Regelkreis des Umweltmanagements */
export function IlluCycle(_: Props) {
  const seg: [number, number, string, string][] = [[240, 78, 'Planen', '#daeee8'], [352, 150, 'Umsetzen', '#fff2de'], [240, 222, 'Prüfen', '#e4ebe6'], [128, 150, 'Verbessern', '#eaf1f6']];
  return (
    <Paper label="Schema: Regelkreis des Umweltmanagements. Planen, Umsetzen, Prüfen und Verbessern folgen im Kreis aufeinander; in der Mitte stehen die Baustelle und die oberste Leitung, die die Rechenschaft trägt.">
      <circle cx="240" cy="150" r="88" fill="none" stroke="#9db7b0" strokeWidth="2" strokeDasharray="5 6" />
      <defs><marker id="ar10" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 10 5 0 10z" fill="#167b70" /></marker></defs>
      <path d="M292 82q36 16 52 46" fill="none" stroke="#167b70" strokeWidth="3" markerEnd="url(#ar10)" />
      <path d="M344 172q-16 34-52 46" fill="none" stroke="#167b70" strokeWidth="3" markerEnd="url(#ar10)" />
      <path d="M188 218q-36-14-52-46" fill="none" stroke="#167b70" strokeWidth="3" markerEnd="url(#ar10)" />
      <path d="M136 128q16-34 52-46" fill="none" stroke="#167b70" strokeWidth="3" markerEnd="url(#ar10)" />
      {seg.map(([x, y, t, c]) => (
        <g key={t}>
          <rect x={x - 46} y={y - 18} width={92} height={36} rx="12" fill={c} stroke="#9db7b0" strokeWidth="1.5" />
          <T x={x} y={y + 4} anchor="middle">{t}</T>
        </g>
      ))}
      <rect x="196" y="128" width="88" height="44" rx="10" fill="#102d2d" />
      <T x={240} y={147} anchor="middle" s={10} c="#ffffff">Baustelle</T>
      <T x={240} y={162} anchor="middle" s={9} w={500} c="#b6d6cf">Leitung · Linie</T>
      <T x={240} y={40} anchor="middle" s={10} w={500} c="#56645e">Aspekte · Verpflichtungen · Ziele</T>
      <T x={240} y={270} anchor="middle" s={10} w={500} c="#56645e">Audit · Kennzahlen · Managementbewertung</T>
    </Paper>
  );
}

export function ModuleIllustration({ moduleId }: { moduleId: string }) {
  switch (moduleId) {
    case 'm2': return <IlluWater />;
    case 'm3': return <IlluWaste />;
    case 'm4': return <IlluSoil />;
    case 'm8': return <IlluPlan />;
    case 'm9': return <IlluInspect />;
    case 'm10': return <IlluCycle />;
    default: return <IlluLaw />;
  }
}
