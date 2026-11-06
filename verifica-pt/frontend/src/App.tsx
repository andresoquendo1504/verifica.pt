import { useState, type FormEvent, type ReactNode } from 'react'

type IconName = 'home' | 'search' | 'book' | 'clock' | 'shield' | 'arrow' | 'link' | 'check'

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, ReactNode> = {
    home: <><path d="m3 10 9-7 9 7" /><path d="M5 9v11h14V9M9 20v-6h6v6" /></>,
    search: <><circle cx="10.8" cy="10.8" r="6.8" /><path d="m16 16 4.5 4.5" /></>,
    book: <><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v17H6.5A2.5 2.5 0 0 1 4 17.5z" /><path d="M4 16.5A2.5 2.5 0 0 1 6.5 14H20M8 7h8" /></>,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    shield: <><path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11" /><path d="m9 12 2 2 4-4" /></>,
    arrow: <><path d="M5 12h14M13 6l6 6-6 6" /></>,
    link: <><path d="M10 13a5 5 0 0 0 7.1 0l2-2a5 5 0 0 0-7.1-7.1l-1.1 1.1" /><path d="M14 11a5 5 0 0 0-7.1 0l-2 2A5 5 0 0 0 12 20.1l1.1-1.1" /></>,
    check: <><path d="m5 12 4 4L19 6" /></>,
  }

  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  )
}

const navigation = [
  { label: 'Início', icon: 'home' as const, target: 'inicio' },
  { label: 'Analisar notícia', icon: 'search' as const, target: 'analise' },
  { label: 'Guia de literacia', icon: 'book' as const, target: 'guia' },
]

function App() {
  const [query, setQuery] = useState('')
  const [error, setError] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [activeSection, setActiveSection] = useState('inicio')

  function navigateTo(target: string) {
    setActiveSection(target)
    document.getElementById(target)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const value = query.trim()

    if (!value) {
      setError('Escreve uma afirmação, um título ou uma ligação para continuar.')
      setSubmitted(false)
      return
    }

    if (value.length > 5000) {
      setError('O texto é demasiado longo. O limite é de 5000 caracteres.')
      setSubmitted(false)
      return
    }

    if (/^(https?:\/\/|www\.)/i.test(value)) {
      try {
        const url = new URL(value.startsWith('www.') ? `https://${value}` : value)
        if (url.protocol !== 'http:' && url.protocol !== 'https:') {
          throw new Error('Protocolo não suportado')
        }
      } catch {
        setError('Introduz uma ligação válida, iniciada por http:// ou https://.')
        setSubmitted(false)
        return
      }
    } else if (value.length < 5) {
      setError('Introduz pelo menos 5 caracteres para descrever a afirmação.')
      setSubmitted(false)
      return
    }

    setError('')
    setSubmitted(true)
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <a className="brand" href="#inicio" onClick={(event) => { event.preventDefault(); navigateTo('inicio') }}>
          <span className="brand-mark"><Icon name="check" size={21} /></span>
          <span className="brand-name">verifica<span>.pt</span></span>
        </a>

        <div className="workspace-label">PLATAFORMA</div>
        <nav className="side-nav" aria-label="Navegação principal">
          {navigation.map((item) => (
            <button
              className={`nav-item ${activeSection === item.target ? 'active' : ''}`}
              key={item.target}
              onClick={() => navigateTo(item.target)}
              type="button"
            >
              <Icon name={item.icon} size={19} />
              <span>{item.label}</span>
              {item.target === 'analise' && <span className="nav-shortcut">↵</span>}
            </button>
          ))}
          <div className="nav-divider" />
          <button className="nav-item planned" type="button" disabled title="Funcionalidade prevista para uma fase posterior">
            <Icon name="clock" size={19} />
            <span>Histórico</span>
            <span className="soon-dot" aria-label="Previsto" />
          </button>
        </nav>

        <div className="sidebar-bottom">
          <div className="sidebar-note">
            <span className="note-icon"><Icon name="shield" size={17} /></span>
            <p><strong>Transparência primeiro</strong><br />Sem evidências, sem conclusões.</p>
          </div>
          <div className="profile">
            <div className="avatar">V</div>
            <div className="profile-copy"><strong>Visitante</strong><span>Modo de demonstração</span></div>
            <span className="profile-menu" aria-hidden="true">···</span>
          </div>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div className="breadcrumb"><span>Verifica.pt</span><span className="crumb-slash">/</span><strong>Início</strong></div>
          <div className="topbar-right">
            <span className="phase-indicator"><span /> Fase 1 · Interface</span>
            <button className="mobile-profile" type="button" aria-label="Perfil de visitante">V</button>
          </div>
        </header>

        <div className="page-content">
          <section className="hero-section" id="inicio">
            <div className="hero-copy">
              <div className="eyebrow"><span className="eyebrow-line" /> INFORMAÇÃO COM CONTEXTO</div>
              <h1>Uma notícia merece<br />mais do que um <span>clique.</span></h1>
              <p className="hero-description">
                Estamos a construir uma plataforma para analisar afirmações com fontes identificáveis
                e evidências transparentes. Informação responsável começa por saber em quem confiar.
              </p>
              <button className="primary-button hero-button" onClick={() => navigateTo('analise')} type="button">
                Analisar uma notícia <Icon name="arrow" size={18} />
              </button>
              <div className="trust-line"><Icon name="shield" size={16} /><span>Sem respostas inventadas. Sem conclusões precipitadas.</span></div>
            </div>
            <div className="hero-visual" aria-hidden="true">
              <div className="visual-orbit orbit-one" />
              <div className="visual-orbit orbit-two" />
              <div className="visual-card card-back"><span className="card-spark">✳</span><span className="visual-line long" /><span className="visual-line short" /></div>
              <div className="visual-card card-front">
                <div className="visual-card-top"><span className="visual-tag">EVIDÊNCIA</span><span className="visual-card-dot" /></div>
                <div className="visual-title-line" /><div className="visual-line medium" /><div className="visual-line long" />
                <div className="visual-divider" />
                <div className="visual-source"><span className="source-check"><Icon name="check" size={13} /></span><span className="visual-line source-line" /><span className="source-label">FONTE</span></div>
              </div>
              <div className="visual-stamp"><Icon name="check" size={15} /> RIGOR</div>
              <div className="visual-caption">Cada afirmação merece<br />ser verificada.</div>
            </div>
          </section>

          <section className="principles" aria-label="Princípios da plataforma">
            <div className="principle"><span className="principle-icon teal"><Icon name="search" size={19} /></span><div><strong>Fontes identificáveis</strong><span>Origem clara para cada informação</span></div></div>
            <div className="principle"><span className="principle-icon blue"><Icon name="link" size={19} /></span><div><strong>Evidências consultáveis</strong><span>Contexto e referências à vista</span></div></div>
            <div className="principle"><span className="principle-icon violet"><Icon name="shield" size={19} /></span><div><strong>Conclusões responsáveis</strong><span>Inconclusivo também é uma resposta</span></div></div>
          </section>

          <section className="analysis-section" id="analise">
            <div className="section-heading">
              <div>
                <div className="section-kicker">COMECE POR AQUI</div>
                <h2>O que queres verificar?</h2>
                <p>Cola uma afirmação, um título ou a ligação de uma publicação.</p>
              </div>
              <span className="step-count">01 <span>/ 03</span></span>
            </div>

            <div className="analysis-grid">
              <form className="search-card" onSubmit={handleSubmit} noValidate>
                <label htmlFor="news-query">Afirmação ou ligação</label>
                <div className={`input-wrap ${error ? 'has-error' : ''}`}>
                  <textarea
                    id="news-query"
                    maxLength={5000}
                    onChange={(event) => { setQuery(event.target.value); setError(''); setSubmitted(false) }}
                    placeholder="Ex.: “A barragem X atingiu a capacidade máxima...” ou https://..."
                    rows={4}
                    value={query}
                  />
                  <div className="input-footer">
                    <span><Icon name="link" size={15} /> Texto ou URL pública</span>
                    <span>{query.length}/5000</span>
                  </div>
                </div>
                {error && <p className="form-message error-message" role="alert">{error}</p>}
                <button className="primary-button submit-button" type="submit">
                  Preparar análise <Icon name="arrow" size={17} />
                </button>
                {submitted && (
                  <div className="form-message info-message" role="status">
                    <span className="status-icon"><Icon name="check" size={15} /></span>
                    <span><strong>Texto recebido.</strong> A pesquisa em fontes reais será ligada na Fase 2. Não foram gerados resultados nesta fase.</span>
                  </div>
                )}
              </form>

              <aside className="results-card" aria-live="polite">
                <div className="results-top"><span className="results-icon"><Icon name="search" size={18} /></span><span className="results-label">PAINEL DE ANÁLISE</span><span className="results-state">À ESPERA</span></div>
                <div className="results-empty">
                  <div className="empty-illustration"><span className="empty-page"><span /><span /><span /></span><span className="empty-glass"><Icon name="search" size={20} /></span></div>
                  <strong>Ainda sem evidências</strong>
                  <p>Depois da pesquisa, as fontes e os dados encontrados serão apresentados aqui.</p>
                </div>
                <div className="results-foot"><Icon name="shield" size={15} /><span>Nenhum resultado fictício será apresentado.</span></div>
              </aside>
            </div>
          </section>

          <section className="guide-section" id="guia">
            <div className="guide-heading">
              <div><div className="section-kicker">ANTES DE PARTILHAR</div><h2>Três perguntas que ajudam.</h2></div>
              <span className="guide-label">GUIA RÁPIDO</span>
            </div>
            <div className="guide-grid">
              <article className="guide-card"><span className="guide-number">01</span><div><h3>Quem publicou?</h3><p>Consegues identificar a entidade responsável e encontrar os seus contactos?</p></div><Icon name="arrow" size={17} /></article>
              <article className="guide-card"><span className="guide-number">02</span><div><h3>Qual é a fonte original?</h3><p>Procura documentos, dados ou declarações originais citados na notícia.</p></div><Icon name="arrow" size={17} /></article>
              <article className="guide-card"><span className="guide-number">03</span><div><h3>Quando aconteceu?</h3><p>Uma notícia verdadeira, mas antiga, pode ser partilhada fora de contexto.</p></div><Icon name="arrow" size={17} /></article>
            </div>
          </section>

          <footer className="page-footer"><span>Verifica.pt <span className="footer-dot">·</span> Informação com contexto.</span><span>Projeto PAP <span className="footer-dot">·</span> Fase 1 em desenvolvimento</span></footer>
        </div>
      </main>
    </div>
  )
}

export default App
