import { useMemo, useState } from 'react';
import {
  ArrowRight,
  BadgeCheck,
  ChevronDown,
  CirclePlay,
  Clock3,
  Headphones,
  MapPin,
  Menu,
  Mic2,
  Monitor,
  Pause,
  Radio,
  Search,
  Signal,
  Sliders,
  Sparkles,
  Star,
  AlertTriangle,
  Wifi,
  X,
  Zap,
} from 'lucide-react';

type Broadcaster = {
  id: number;
  name: string;
  city: string;
  state: string;
  styles: string[];
  availability: string[];
  description: string;
  experience: string;
  category: string;
  photo: string;
};

const photos = [
  'https://images.pexels.com/photos/5399032/pexels-photo-5399032.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/13929777/pexels-photo-13929777.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/23220988/pexels-photo-23220988.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/6954171/pexels-photo-6954171.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/26755044/pexels-photo-26755044.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/6878177/pexels-photo-6878177.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
];

const states = ['SP', 'MG', 'RJ', 'BA', 'PR', 'RS', 'SC', 'GO', 'PE', 'CE', 'PA', 'ES', 'DF', 'MA', 'AM', 'PB', 'RN', 'MT', 'MS', 'AL', 'SE', 'PI', 'RO', 'TO', 'AC'];
const cities = ['São Paulo', 'Belo Horizonte', 'Rio de Janeiro', 'Salvador', 'Curitiba', 'Porto Alegre', 'Florianópolis', 'Goiânia', 'Recife', 'Fortaleza', 'Belém', 'Vitória', 'Brasília', 'São Luís', 'Manaus'];
const firstNames = ['Carlos', 'Marina', 'Rafael', 'Bianca', 'Diego', 'Júlia', 'André', 'Camila', 'Felipe', 'Larissa', 'Bruno', 'Isabela', 'Gustavo', 'Renata', 'Leonardo', 'Patrícia', 'Eduardo', 'Aline', 'Vinícius', 'Nathalia'];
const lastNames = ['Silva', 'Oliveira', 'Santos', 'Costa', 'Almeida', 'Ferreira', 'Mendes', 'Ribeiro', 'Carvalho', 'Martins', 'Barbosa', 'Pereira', 'Rocha', 'Teixeira', 'Lima'];
const stylePool = ['Jovem', 'Sertanejo', 'Popular', 'Adulto', 'Flashback', 'Forró', 'Gospel', 'Romântico', 'Esportivo', 'Jornalístico', 'Comercial', 'Outros'];
const availabilityPool = ['Manhã', 'Tarde', 'Noite', 'Madrugada', 'Finais de semana', 'Horários variados'];

const broadcasters: Broadcaster[] = Array.from({ length: 100 }, (_, index) => {
  const first = firstNames[index % firstNames.length];
  const last = lastNames[(index * 3) % lastNames.length];
  const secondLast = lastNames[(index * 7 + 2) % lastNames.length];
  const style = stylePool[index % stylePool.length];
  const city = cities[index % cities.length];
  const state = states[index % states.length];
  return {
    id: index + 1,
    name: `${first} ${last} ${secondLast}`,
    city,
    state,
    styles: [style, stylePool[(index + 4) % stylePool.length]],
    availability: [availabilityPool[index % availabilityPool.length], availabilityPool[(index + 2) % availabilityPool.length]],
    description: `Voz marcante e presença que conecta com o ouvinte. Especialista em criar ritmo e identidade para cada programa.`,
    experience: `${3 + (index % 15)} anos de experiência`,
    category: style,
    photo: photos[index % photos.length],
  };
});

const whatsappNumber = '5531983532534';
const whatsappLink = (message: string) => `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

function App() {
  const [query, setQuery] = useState('');
  const [stateFilter, setStateFilter] = useState('Todos os estados');
  const [styleFilter, setStyleFilter] = useState('Todos os estilos');
  const [availabilityFilter, setAvailabilityFilter] = useState('Qualquer horário');
  const [selected, setSelected] = useState<Broadcaster | null>(null);
  const [playingId, setPlayingId] = useState<number | null>(null);
  const [mobileMenu, setMobileMenu] = useState(false);

  const filtered = useMemo(() => broadcasters.filter((person) => {
    const normalizedQuery = query.toLowerCase();
    return (!normalizedQuery || `${person.name} ${person.city} ${person.state}`.toLowerCase().includes(normalizedQuery))
      && (stateFilter === 'Todos os estados' || person.state === stateFilter)
      && (styleFilter === 'Todos os estilos' || person.styles.includes(styleFilter))
      && (availabilityFilter === 'Qualquer horário' || person.availability.includes(availabilityFilter));
  }), [query, stateFilter, styleFilter, availabilityFilter]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenu(false);
  };

  const playDemo = (id: number) => {
    setPlayingId((current) => current === id ? null : id);
  };

  return (
    <main className="site-shell">
      <div className="topline"><span className="live-dot" /> AO VIVO <span className="topline-divider" /> Uma rede nacional de vozes para sua rádio</div>
      <header className="navbar">
        <button className="brand" onClick={() => scrollTo('inicio')} aria-label="Voltar ao início">
          <img src="/images/LOGO_MARCA_LOCUTORES_LIVE-300x300.jpg" alt="Souza Beats Locutores Live" />
          <span><strong>SOUZA BEATS</strong><small>LOCUTORES LIVE</small></span>
        </button>
        <button className="menu-toggle" onClick={() => setMobileMenu(!mobileMenu)} aria-label="Abrir menu">{mobileMenu ? <X /> : <Menu />}</button>
        <nav className={mobileMenu ? 'nav-links open' : 'nav-links'}>
          <button onClick={() => scrollTo('inicio')}>Início</button>
          <button onClick={() => scrollTo('catalogo')}>Encontrar locutor</button>
          <button onClick={() => scrollTo('como-funciona')}>Como funciona</button>
          <button onClick={() => scrollTo('estilos')}>Estilos</button>
          <a className="nav-cta" href={whatsappLink('Olá! Quero saber como fazer parte da Souza Beats Locutores Live.')} target="_blank" rel="noreferrer">Quero fazer parte <ArrowRight size={16} /></a>
        </nav>
      </header>

      <section className="hero" id="inicio">
        <div className="hero-noise" />
        <div className="hero-copy reveal">
          <div className="eyebrow"><span className="live-dot" /> LIVE <span>•</span> LOCUTORES DE TODO O BRASIL</div>
          <h1>SOUZA<br /><em>BEATS</em></h1>
          <div className="hero-subtitle">LOCUTORES LIVE</div>
          <div className="hero-tagline">LOCUTORES AO VIVO PARA SUA RÁDIO</div>
          <p className="hero-slogan">Sua voz. Nossa vitrine. Sua rádio não para.</p>
          <p className="hero-text">Encontre locutores profissionais de todo o Brasil para apresentar sua programação ao vivo, em diferentes horários, estilos e formatos de rádio.</p>
          <div className="hero-actions"><button className="button button-red" onClick={() => scrollTo('catalogo')}>Encontrar um locutor <ArrowRight size={18} /></button><a className="button button-outline" href={whatsappLink('Olá! Quero saber como fazer parte da Souza Beats Locutores Live.')} target="_blank" rel="noreferrer">Quero fazer parte</a></div>
          <div className="hero-meta"><span><Signal size={15} /> 100 vozes em destaque</span><span><BadgeCheck size={15} /> Curadoria Souza Beats</span></div>
        </div>
        <div className="hero-visual" aria-label="Visual de transmissão ao vivo">
          <div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="orbit orbit-three" />
          <div className="frequency frequency-a"><i /><i /><i /><i /><i /><i /><i /></div>
          <div className="frequency frequency-b"><i /><i /><i /><i /><i /><i /><i /></div>
          <div className="mic-disc"><div className="mic-live"><span className="mic-head"><span /></span><span className="mic-body" /><span className="mic-base" /></div></div>
          <div className="live-chip"><span className="live-dot" /><span><b>TRANSMISSÃO</b><small>24 horas por dia</small></span></div>
          <div className="signal-chip"><Radio size={16} /><span>ON AIR</span></div>
        </div>
        <div className="hero-bottom"><span>SCROLL PARA EXPLORAR</span><div className="scroll-line" /><span>01 — 05</span></div>
      </section>

      <section className="stats-strip"><div><strong>100</strong><span>locutores<br />em destaque</span></div><div><strong>27</strong><span>estados<br />conectados</span></div><div><strong>24/7</strong><span>sua rádio<br />não para</span></div><div><strong>01</strong><span>conexão<br />central</span></div></section>

      <section className="section how-section" id="como-funciona">
        <div className="section-heading"><div><span className="section-kicker">SIMPLES. DIRETO. PROFISSIONAL.</span><h2>Como funciona<span>?</span></h2></div><p>Do primeiro play ao primeiro contato, a gente aproxima quem tem uma voz de quem precisa ouvi-la.</p></div>
        <div className="how-grid"><div className="how-column"><div className="column-label"><Radio size={18} /> PARA AS RÁDIOS</div><HowStep number="01" title="Encontre" text="Procure locutores por estado, cidade, estilo e disponibilidade." /><HowStep number="02" title="Ouça" text="Conheça o perfil e escute a demonstração de voz de cada profissional." /><HowStep number="03" title="Conecte" text="Solicite o contato pelo WhatsApp e a Souza Beats faz a conexão inicial." /></div><div className="how-column dark-card"><div className="column-label yellow"><Mic2 size={18} /> PARA OS LOCUTORES</div><HowStep number="01" title="Apresente seu trabalho" text="Tenha seu perfil profissional dentro da plataforma." /><HowStep number="02" title="Mostre sua voz" text="Apresente sua demo e suas características profissionais." /><HowStep number="03" title="Seja encontrado" text="Emissoras de todo o Brasil poderão encontrar o seu perfil." /></div></div>
      </section>

      <section className="catalog-section" id="catalogo">
        <div className="catalog-intro section"><div className="section-heading"><div><span className="section-kicker">A ESCOLHA É SUA</span><h2>Encontre a voz<br /><span>certa para sua rádio.</span></h2></div><p>Explore uma rede de profissionais com diferentes estilos, regiões e horários. Dê o play e encontre a combinação perfeita.</p></div>
          <div className="filter-panel"><div className="search-wrap"><Search size={19} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Digite o nome do locutor..." /></div><Select label="Estado" value={stateFilter} options={['Todos os estados', ...states]} onChange={setStateFilter} /><Select label="Estilo" value={styleFilter} options={['Todos os estilos', ...stylePool]} onChange={setStyleFilter} /><Select label="Disponibilidade" value={availabilityFilter} options={['Qualquer horário', ...availabilityPool]} onChange={setAvailabilityFilter} /></div>
          <div className="results-row"><span><strong>{filtered.length}</strong> locutores encontrados</span><span className="results-live"><span className="live-dot" /> perfis disponíveis agora</span></div>
          <div className="broadcaster-grid">{filtered.slice(0, 12).map((person) => <BroadcasterCard key={person.id} person={person} playingId={playingId} onPlay={playDemo} onSelect={setSelected} />)}</div>
          {filtered.length === 0 && <div className="empty-state"><Search size={32} /><h3>Nenhuma voz encontrada</h3><p>Tente combinar outros filtros para encontrar seu próximo locutor.</p></div>}
          {filtered.length > 12 && <button className="load-more" onClick={() => setQuery(query)}>Visualizando os 12 primeiros de {filtered.length} <ChevronDown size={17} /></button>}
        </div>
      </section>

      <section className="styles-section section" id="estilos"><div className="section-heading"><div><span className="section-kicker">ENCONTRE O SEU SOM</span><h2>Um estilo para<br /><span>cada programa.</span></h2></div><p>Do jornal da manhã ao flashback da madrugada, existe uma voz pronta para criar a atmosfera da sua rádio.</p></div><div className="styles-grid">{stylePool.map((style, index) => <button key={style} className={`style-tile tile-${index % 4}`} onClick={() => { setStyleFilter(style); scrollTo('catalogo'); }}><Mic2 size={19} /><span>{style}</span><ArrowRight size={17} /></button>)}</div></section>

      <section className="twenty-section"><div className="twenty-glow" /><div className="twenty-content"><span className="section-kicker yellow-kicker">UMA REDE QUE NÃO DESLIGA</span><h2>24 HORAS.<br /><span>7 DIAS POR SEMANA.</span></h2><p>Aqui, sua rádio não para. Vozes conectadas, talentos de todo o Brasil e uma vitrine sempre aberta para novas possibilidades.</p><button className="button button-yellow" onClick={() => scrollTo('catalogo')}>Explorar a rede <ArrowRight size={18} /></button></div><div className="map-visual"><div className="map-ring ring-a" /><div className="map-ring ring-b" /><div className="map-ring ring-c" /><div className="map-dots">{Array.from({ length: 18 }, (_, index) => <i key={index} style={{ '--x': `${10 + ((index * 37) % 80)}%`, '--y': `${14 + ((index * 53) % 68)}%` } as React.CSSProperties} />)}</div><span className="map-label label-sp">SP</span><span className="map-label label-mg">MG</span><span className="map-label label-ba">BA</span></div></section>

      <section className="tech-section section" id="estrutura">
        <div className="section-heading"><div><span className="section-kicker">PARA LOCUTORES AO VIVO</span><h2>Estrutura necessária<br /><span>para locução ao vivo.</span></h2></div><p>Para participar da Souza Beats Locutores Live como locutor ao vivo, o profissional deve possuir estrutura própria para transmissão remota.</p></div>
        <div className="tech-grid">
          <div className="tech-item"><div className="tech-icon"><Mic2 size={22} /></div><div><h3>Estúdio adequado</h3><p>Estúdio ou ambiente adequado para locução, com tratamento acústico mínimo.</p></div></div>
          <div className="tech-item"><div className="tech-icon"><Headphones size={22} /></div><div><h3>Microfone e áudio</h3><p>Microfone e equipamentos de áudio compatíveis com qualidade profissional.</p></div></div>
          <div className="tech-item"><div className="tech-icon"><Monitor size={22} /></div><div><h3>Computador</h3><p>Computador ou equipamento adequado para operação e transmissão.</p></div></div>
          <div className="tech-item"><div className="tech-icon"><Wifi size={22} /></div><div><h3>Internet estável</h3><p>Internet estável e de boa qualidade, essencial para transmitir sem quedas.</p></div></div>
          <div className="tech-item"><div className="tech-icon"><Radio size={22} /></div><div><h3>Condições técnicas</h3><p>Condições técnicas para transmitir o programa ao vivo para a emissora.</p></div></div>
          <div className="tech-item"><div className="tech-icon"><Sliders size={22} /></div><div><h3>Conhecimento técnico</h3><p>Conhecimento básico dos equipamentos e softwares utilizados na transmissão.</p></div></div>
        </div>
        <div className="tech-notice"><AlertTriangle size={22} /><p><strong>A estrutura técnica e a conexão com a emissora são de responsabilidade do locutor.</strong> Antes de assumir uma programação ao vivo, o profissional deve verificar com a emissora os requisitos técnicos, software, codec, link ou sistema de transmissão utilizado.</p></div>
      </section>

      <section className="join-section section"><div className="join-card"><div><span className="section-kicker">PARA QUEM VIVE DE VOZ</span><h2>Quer fazer parte da<br /><span>Souza Beats?</span></h2><p>Mostre sua voz, apresente seu trabalho e coloque seu talento diante de emissoras de todo o Brasil.</p></div><div className="join-details"><p>A Souza Beats oferece um espaço de divulgação com perfil, apresentação e demonstração de voz. Nosso compromisso é divulgar seu trabalho e sua voz — o seu talento faz o resto.</p><a className="button button-yellow" href={whatsappLink('Olá! Quero saber como fazer parte da Souza Beats Locutores Live.')} target="_blank" rel="noreferrer">Quero fazer parte da rede <ArrowRight size={18} /></a><small>Sem promessa de contratação. Uma vitrine para o seu trabalho.</small></div></div></section>

      <section className="final-cta"><div className="cta-wave" /><span className="section-kicker yellow-kicker">SOUZA BEATS LOCUTORES LIVE</span><h2>Sua voz pode ser a<br /><span>próxima a ser ouvida.</span></h2><p>Sua voz. Nossa vitrine. Sua rádio não para.</p><button className="button button-yellow" onClick={() => scrollTo('catalogo')}>Encontrar locutores <ArrowRight size={18} /></button></section>
      <footer className="footer"><div className="footer-brand"><img src="/images/LOGO_MARCA_LOCUTORES_LIVE-300x300.jpg" alt="Souza Beats" /><div><strong>SOUZA BEATS</strong><span>LOCUTORES LIVE</span><small>Sua voz. Nossa vitrine. Sua rádio não para.</small></div></div><div className="footer-links"><button onClick={() => scrollTo('inicio')}>Início</button><button onClick={() => scrollTo('catalogo')}>Encontrar locutor</button><button onClick={() => scrollTo('estilos')}>Estilos</button><button onClick={() => scrollTo('como-funciona')}>Como funciona</button><a href={whatsappLink('Olá! Quero falar com a Souza Beats.')} target="_blank" rel="noreferrer">WhatsApp</a></div><div className="footer-bottom"><span>© Souza Beats Locutores Live — Todos os direitos reservados.</span><span>Conexão central <b>+55 31 98353-2534</b></span></div></footer>

      {selected && <ProfileModal person={selected} playingId={playingId} onPlay={playDemo} onClose={() => setSelected(null)} />}
    </main>
  );
}

function HowStep({ number, title, text }: { number: string; title: string; text: string }) {
  return <div className="how-step"><span className="step-number">{number}</span><div><h3>{title}</h3><p>{text}</p></div></div>;
}

function Select({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (value: string) => void }) {
  return <label className="select-wrap"><span>{label}</span><select value={value} onChange={(event) => onChange(event.target.value)}>{options.map((option) => <option key={option}>{option}</option>)}</select><ChevronDown size={15} /></label>;
}

function BroadcasterCard({ person, playingId, onPlay, onSelect }: { person: Broadcaster; playingId: number | null; onPlay: (id: number) => void; onSelect: (person: Broadcaster) => void }) {
  const isPlaying = playingId === person.id;
  return <article className="broadcaster-card"><button className="card-image" onClick={() => onSelect(person)} aria-label={`Ver perfil de ${person.name}`}><img src={person.photo} alt={person.name} /><span className="image-overlay"><CirclePlay size={29} fill="currentColor" /></span><span className="card-tag"><span className="live-dot" /> DISPONÍVEL</span></button><div className="card-body"><button className="card-name" onClick={() => onSelect(person)}>{person.name}<BadgeCheck size={16} /></button><span className="location"><MapPin size={14} /> {person.city} — {person.state}</span><div className="card-pills">{person.styles.map((style) => <span key={style}>{style}</span>)}</div><p>{person.description}</p><div className="card-footer"><button className={`play-button ${isPlaying ? 'playing' : ''}`} onClick={() => onPlay(person.id)}>{isPlaying ? <Pause size={15} fill="currentColor" /> : <CirclePlay size={15} fill="currentColor" />} {isPlaying ? 'Pausar demo' : 'Ouvir demo'}</button><button className="contact-button" onClick={() => window.open(whatsappLink(`Olá! Encontrei o locutor ${person.name} na Souza Beats Locutores Live e gostaria de saber mais sobre ele.`), '_blank')}>Quero este locutor <ArrowRight size={14} /></button></div></div></article>;
}

function ProfileModal({ person, playingId, onPlay, onClose }: { person: Broadcaster; playingId: number | null; onPlay: (id: number) => void; onClose: () => void }) {
  return <div className="modal-backdrop" onClick={onClose}><div className="profile-modal" onClick={(event) => event.stopPropagation()}><button className="modal-close" onClick={onClose} aria-label="Fechar perfil"><X /></button><div className="profile-photo"><img src={person.photo} alt={person.name} /><span><span className="live-dot" /> PERFIL EM DESTAQUE</span></div><div className="profile-content"><span className="section-kicker">PERFIL DO LOCUTOR</span><h2>{person.name}</h2><span className="location"><MapPin size={15} /> {person.city} — {person.state}</span><div className="profile-meta"><span><Clock3 size={16} /> {person.availability.join(' · ')}</span><span><Star size={16} /> {person.experience}</span></div><div className="card-pills">{person.styles.map((style) => <span key={style}>{style}</span>)}</div><p className="profile-description">{person.description} Com uma comunicação natural e técnica apurada, transforma cada entrada em uma experiência que fica na memória do ouvinte.</p><div className="demo-player"><div className="player-icon"><Headphones size={21} /></div><div className="player-info"><strong>Demonstração de voz</strong><div className="player-track"><span className={playingId === person.id ? 'track-progress active' : 'track-progress'} /><i /><i /><i /><i /><i /><i /><i /><i /></div></div><button onClick={() => onPlay(person.id)} aria-label="Reproduzir demonstração">{playingId === person.id ? <Pause size={20} fill="currentColor" /> : <CirclePlay size={20} fill="currentColor" />}</button></div><a className="button button-red profile-button" href={whatsappLink(`Olá! Encontrei o locutor ${person.name} na Souza Beats Locutores Live e gostaria de saber mais sobre ele.`)} target="_blank" rel="noreferrer">Quero este locutor <ArrowRight size={17} /></a></div></div></div>;
}

export default App;
