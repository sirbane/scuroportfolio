'use client';

import { useEffect, useRef } from 'react';

/* ── TikTok Video Embed ── */
function TikTokEmbed({ videoId, title }) {
  return (
    <div className="tiktok-wrapper">
      <iframe
        src={`https://www.tiktok.com/embed/v2/${videoId}?autoplay=1&loop=1`}
        title={title}
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
        allowFullScreen
        loading="lazy"
      />
    </div>
  );
}

/* ── Animated number on scroll ── */
function AnimatedStat({ value, label }) {
  return (
    <div className="stat-item">
      <span className="stat-value">{value}</span>
      <span className="stat-label">{label}</span>
    </div>
  );
}

/* ── Asset row ── */
function AssetRow({ icon, symbol, name, change, isUp }) {
  return (
    <div className="asset-card">
      <div className="asset-left">
        <div className="asset-icon">{icon}</div>
        <div>
          <div className="asset-name">{symbol}</div>
          <div className="asset-full">{name}</div>
        </div>
      </div>
      <span className={`asset-change ${isUp ? 'up' : 'down'}`}>
        {isUp ? '↑' : '↓'} {change}
      </span>
    </div>
  );
}

export default function Home() {
  /* Intersection Observer for scroll animations */
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('animate-fade-up');
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const PHONE = '+254700000000'; // replace with real number

  return (
    <>
      {/* ═══════════════════════════════════════════
          NAV
      ══════════════════════════════════════════════ */}
      <nav>
        <a href="#top" style={{ color: 'var(--text)', fontFamily: "'Fraunces', Georgia, serif", fontStyle: 'italic', fontSize: '1rem', letterSpacing: '-0.01em' }}>
          Scuro
        </a>
        <div className="nav-links" style={{ display: 'flex', gap: '2rem' }}>
          <a href="#journey">Journey</a>
          <a href="#scuro">Stories</a>
          <a href="#plainspeak">Plain Speak</a>
          <a href="#markets">Markets</a>
          <a href="#contact">Connect</a>
        </div>
        <a href={`https://wa.me/${PHONE.replace('+', '')}`} target="_blank" rel="noreferrer">
          ↗ WhatsApp
        </a>
      </nav>

      {/* ═══════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════ */}
      <section id="top" className="hero">
        <div className="hero-bg" />
        <div className="hero-line" />

        {/* Floating coordinate tag */}
        <div style={{
          position: 'absolute',
          top: '7rem',
          left: '2.5rem',
          fontFamily: "'Space Mono', monospace",
          fontSize: '0.58rem',
          letterSpacing: '0.15em',
          color: 'var(--text-faint)',
          textTransform: 'uppercase',
          zIndex: 1,
        }}>
          — 1.2921° S, 36.8219° E — Ongata Rongai, Kenya
        </div>

        <div style={{ position: 'relative', zIndex: 1 }}>
          <h1 className="hero-title animate-fade-up delay-1">
            Walking slow<br />
            in a world that<br />
            <span className="accent">won&rsquo;t stop.</span>
          </h1>
          <p className="hero-sub animate-fade-up delay-2">
            A developer. A walker. A storyteller. Building AI that
            speaks human — while learning, again, to listen to the land.
          </p>
        </div>

        <div className="hero-scroll">Scroll</div>
      </section>

      {/* ═══════════════════════════════════════════
          THE JOURNEY — Healing narrative
      ══════════════════════════════════════════════ */}
      <section id="journey" className="section journey-section">
        <div className="section-label reveal delay-1">Origin</div>
        <h2 className="section-title reveal delay-2">
          The city gets loud.<br />
          <em>The land gets honest.</em>
        </h2>

        <div className="journey-grid" style={{ marginTop: '4rem' }}>
          <div className="journey-prose reveal delay-2">
            <p>
              There was a season when screens filled every waking hour —
              systems to debug, markets to decode, deadlines riding the clock.
              <strong> The work was meaningful, but the noise was constant.</strong>
            </p>
            <p>
              The remedy wasn&rsquo;t another productivity app. It was a leash.
              A dog. A dirt road. The long, unhurried ritual of going somewhere
              with no agenda except to be present in it.
            </p>
            <p>
              Kenya&rsquo;s open land has a way of recalibrating things. Out here
              — past Ongata Rongai where the tarmac thins and the acacia take over —
              <strong> the body relearns its own pace.</strong> The dog pulls ahead.
              The mind follows, slowly, into quiet.
            </p>
            <p>
              These walks became a practice. Then a discipline. Then, eventually,
              a body of stories worth sharing with anyone else searching for
              the same unhurried exhale.
            </p>
          </div>

          <div className="journey-visual">
            {[
              {
                num: '01',
                icon: '🌿',
                title: 'The Rift Valley light',
                desc: 'Dawn breaks different at altitude. Golden hour in the Rift Valley is not a metaphor — it\'s an actual instruction to stop walking and simply witness.',
              },
              {
                num: '02',
                icon: '🐕',
                title: 'Loyal companions',
                desc: 'Dogs don\'t negotiate with bad days. They show up, all paws and momentum, reminding you that motion is medicine and presence is everything.',
              },
              {
                num: '03',
                icon: '🪨',
                title: 'Rivers & ridgelines',
                desc: 'Water teaches patience. Rock teaches permanence. Walking between them teaches you which of your problems belong to which category.',
              },
              {
                num: '04',
                icon: '🌙',
                title: 'The return',
                desc: 'Coming back from a long walk, the city noise is the same. The difference is you — slightly recalibrated, slightly less afraid of the silence.',
              },
            ].map((card) => (
              <div key={card.num} className="nature-card reveal">
                <span className="nature-card-num">{card.num}</span>
                <div className="nature-card-icon">{card.icon}</div>
                <h4>{card.title}</h4>
                <p>{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ═══════════════════════════════════════════
          SCURO — AI storytelling
      ══════════════════════════════════════════════ */}
      <section id="scuro" className="section scuro-section">
        <div className="scuro-header">
          <div>
            <div className="section-label reveal delay-1">Scuro Walks</div>
            <h2 className="section-title reveal delay-2">
              Stories automated<br />
              <em>by the land itself.</em>
            </h2>
          </div>
          <div className="body-text reveal delay-2" style={{ maxWidth: '420px' }}>
            <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: '1.8' }}>
              Scuro is the system that turns a walk into a story — automatically.
              GPS routes, ambient audio, dog behaviour cues, and AI narration
              combine into shareable field notes that a growing community
              follows across TikTok and beyond.
            </p>
            <p style={{ marginTop: '1rem', color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.8' }}>
              The name means <em style={{ color: 'var(--text)' }}>&ldquo;dark&rdquo;</em> in Italian — after the
              pre-dawn hours when the walks begin and the world belongs
              only to those awake enough to witness it.
            </p>
          </div>
        </div>

        {/* TikTok Embeds */}
        <div className="reveal">
          <div className="section-label" style={{ marginBottom: '1.5rem' }}>
            Live from the field
          </div>
          <div className="tiktok-grid">
            <TikTokEmbed
              videoId="7611897363770166546"
              title="Scuro Walk — Field Recording 1"
            />
            <TikTokEmbed
              videoId="7611907436244471047"
              title="Scuro Walk — Field Recording 2"
            />
          </div>
        </div>

        <div className="scuro-stats">
          <AnimatedStat value="2.5k+" label="Views on recent drop" />
          <AnimatedStat value="Daily" label="Automated uploads" />
          <AnimatedStat value="Zero" label="Manual editing required" />
        </div>

        {/* How it works */}
        <div style={{ marginTop: '5rem', paddingTop: '5rem', borderTop: '1px solid var(--border)' }}>
          <div className="section-label reveal">How Scuro captures a story</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2rem', marginTop: '2.5rem' }}>
            {[
              { step: '01', label: 'Walk begins', desc: 'GPS starts logging. Camera rolls on a mount. Audio captures ambient soundscape — wind, birds, water.' },
              { step: '02', label: 'AI narrates', desc: 'Location data, pace, and visual scene are fed to a language model that drafts context-aware voiceover.' },
              { step: '03', label: 'Auto-edit', desc: 'Clips are trimmed, colour-graded to that signature dark contrast, and text overlays applied programmatically.' },
              { step: '04', label: 'Community notified', desc: 'Published and scheduled automatically. Followers wake up to a field note from a walk that happened at dawn.' },
            ].map((item) => (
              <div key={item.step} className="reveal" style={{
                padding: '1.75rem',
                border: '1px solid var(--border)',
                borderRadius: '2px',
                background: 'linear-gradient(135deg, rgba(196,164,90,0.03) 0%, transparent 50%)',
              }}>
                <div style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '0.58rem',
                  letterSpacing: '0.2em',
                  color: 'var(--gold)',
                  marginBottom: '1rem',
                }}>
                  STEP {item.step}
                </div>
                <h4 style={{
                  fontFamily: "'Fraunces', Georgia, serif",
                  fontStyle: 'italic',
                  fontSize: '1.1rem',
                  fontWeight: 400,
                  color: 'var(--text)',
                  marginBottom: '0.75rem',
                }}>
                  {item.label}
                </h4>
                <p style={{ fontSize: '0.83rem', color: 'var(--text-muted)', lineHeight: '1.65' }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ═══════════════════════════════════════════
          PLAIN SPEAK AI
      ══════════════════════════════════════════════ */}
      <section id="plainspeak" className="section plainspeak-section">
        <div className="plainspeak-grid">
          <div>
            <div className="section-label reveal delay-1" style={{ color: 'var(--blue)' }}>
              <span style={{ background: 'var(--blue)', width: '2rem', height: '1px', display: 'inline-block' }} />
              Plain Speak AI
            </div>
            <h2 className="section-title reveal delay-2">
              Tech should talk<br />
              <em style={{ color: 'var(--blue)' }}>like a person.</em>
            </h2>
            <p className="body-text reveal delay-2" style={{ marginTop: '1.75rem' }}>
              Plain Speak AI is a browser extension that intercepts jargon
              and replaces it with language that anyone can understand.
              Not dumbed-down — <strong style={{ color: 'var(--text)' }}>translated</strong>. The
              meaning survives. The confusion doesn&rsquo;t.
            </p>

            <ul className="feature-list">
              {[
                {
                  num: '→',
                  title: 'Three reading levels',
                  desc: 'Child, Simple, or Learner mode — dial the complexity to match where you are, not where the author assumed you\'d be.',
                },
                {
                  num: '→',
                  title: 'Live page simplification',
                  desc: 'One click rewrites the entire page in real time. Documentation, research papers, legal pages — all speak plainly.',
                },
                {
                  num: '→',
                  title: 'Restore original instantly',
                  desc: 'Need the technical version back? One click. Plain Speak never deletes, only translates.',
                },
                {
                  num: '→',
                  title: 'Powered by Groq\'s fast inference',
                  desc: 'Translation happens in under a second — fast enough that you don\'t remember waiting.',
                },
              ].map((feat, i) => (
                <li key={i} className="reveal">
                  <span className="feat-num">{feat.num}</span>
                  <div className="feat-text">
                    <strong>{feat.title}</strong>
                    {feat.desc}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* App Mockup */}
          <div className="app-mockup reveal delay-3">
            <div className="mockup-bar">
              <div className="mockup-dot" style={{ background: '#ff5f56' }} />
              <div className="mockup-dot" style={{ background: '#ffbd2e' }} />
              <div className="mockup-dot" style={{ background: '#27c93f' }} />
              <span className="mockup-url">www.langchain.com</span>
            </div>
            <div className="mockup-body">
              <div className="mockup-pill">
                <span className="dot" />
                Plain Speak AI — Page simplified ✓
              </div>

              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '1.25rem', lineHeight: '1.6' }}>
                <strong style={{ color: 'var(--text)', fontWeight: 500 }}>Original:</strong> &ldquo;LangSmith is an all-in-one developer platform for every step of the LLM-powered application lifecycle, whether you&rsquo;re building with LangChain or not.&rdquo;
              </p>

              <div style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: '0.6rem',
                letterSpacing: '0.12em',
                color: 'rgba(74,158,255,0.6)',
                textTransform: 'uppercase',
                marginBottom: '0.5rem',
              }}>
                Simplicity Level
              </div>
              <div className="simplify-levels">
                <div className="level-btn active">🧒 Child</div>
                <div className="level-btn">🙂 Simple</div>
                <div className="level-btn">📖 Learner</div>
              </div>

              <div className="translated-block">
                <p>
                  LangSmith is a tool that helps builders make and fix their AI helpers.
                  You can watch them work, test them, and use what you already have.
                </p>
              </div>

              <div style={{
                marginTop: '1.25rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
                <span style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '0.58rem',
                  color: 'rgba(74,158,255,0.4)',
                  letterSpacing: '0.1em',
                }}>
                  GROQ API KEY ••••••••••••
                </span>
                <span style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '0.58rem',
                  color: '#4ade80',
                  letterSpacing: '0.1em',
                }}>
                  ✓ Key saved
                </span>
              </div>

              <div style={{
                marginTop: '1.25rem',
                padding: '0.75rem',
                border: '1px dashed rgba(74,158,255,0.15)',
                borderRadius: '3px',
                textAlign: 'center',
              }}>
                <a
                  href="https://chromewebstore.google.com"
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: '0.6rem',
                    color: 'var(--blue)',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                  }}
                >
                  ↗ Add to Chrome — Free
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ═══════════════════════════════════════════
          MARKET WATCHER
      ══════════════════════════════════════════════ */}
      <section id="markets" className="section market-section">
        <div className="market-grid">
          <div>
            <div className="section-label reveal delay-1">Market Watcher</div>
            <h2 className="section-title reveal delay-2">
              The market runs<br />
              <em>while you walk.</em>
            </h2>
            <p className="body-text reveal delay-2" style={{ marginTop: '1.75rem' }}>
              Market Watcher is an AI engine that monitors gold, oil,
              and major currencies around the clock — analysing momentum,
              sentiment, and pattern — then executes positions on a MetaTrader 5
              demo account with documented, auditable results.
            </p>
            <p className="body-text reveal delay-3" style={{ marginTop: '1rem' }}>
              No overnight anxiety. No emotional triggers. Just signal, logic,
              and a consistent methodology that compounds over time.
            </p>

            {/* Assets */}
            <div className="asset-cards reveal delay-3">
              <AssetRow icon="🥇" symbol="XAU/USD" name="Gold — Spot" change="+1.24%" isUp={true} />
              <AssetRow icon="🛢️" symbol="WTI" name="Crude Oil" change="+0.87%" isUp={true} />
              <AssetRow icon="💱" symbol="EUR/USD" name="Euro / US Dollar" change="-0.31%" isUp={false} />
              <AssetRow icon="💹" symbol="GBP/JPY" name="Sterling / Yen" change="+0.55%" isUp={true} />
              <AssetRow icon="📈" symbol="USD/KES" name="Dollar / Kenyan Shilling" change="-0.18%" isUp={false} />
            </div>

            <div className="mt5-badge">
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ade80', display: 'inline-block', animation: 'pulse 2s infinite' }} />
              MT5 Demo Account — Live Execution
            </div>
          </div>

          {/* Terminal */}
          <div className="terminal-card reveal delay-2">
            <div className="terminal-header">
              <div className="terminal-dots">
                <span />
                <span />
                <span />
              </div>
              <span className="terminal-title">market_watcher — execution log</span>
            </div>
            <div className="terminal-body">
              <span className="t-line t-dim">// ── 2026-05-21 04:23:11 UTC ──────────────</span>
              <span className="t-line" style={{ marginTop: '0.75rem' }}>
                <span className="t-cmd">SCANNER </span>
                <span className="t-muted">Checking 47 instruments...</span>
              </span>
              <span className="t-line">
                <span className="t-cmd">SIGNAL  </span>
                <span className="t-gold">XAU/USD </span>
                <span className="t-muted">RSI divergence detected</span>
              </span>
              <span className="t-line">
                <span className="t-cmd">AI      </span>
                <span className="t-muted">Pattern confidence: </span>
                <span className="t-green">87.3%</span>
              </span>
              <span className="t-line">
                <span className="t-cmd">EXEC    </span>
                <span className="t-green">BUY XAU/USD @ 3,312.40</span>
              </span>
              <span className="t-line">
                <span className="t-cmd">SL/TP   </span>
                <span className="t-muted">3,298.00 / </span>
                <span className="t-gold">3,341.00</span>
              </span>

              <div style={{ margin: '1.25rem 0', borderTop: '1px solid rgba(74,158,255,0.08)' }} />

              <span className="t-line t-dim">// ── Recent closed trades ──────────────────</span>
              <div style={{ marginTop: '0.75rem' }}>
                {[
                  { pair: 'WTI    ', dir: 'LONG ', pnl: '+$127.40', win: true },
                  { pair: 'EUR/USD', dir: 'SHORT', pnl: '+$84.20', win: true },
                  { pair: 'GBP/JPY', dir: 'LONG ', pnl: '+$211.80', win: true },
                  { pair: 'USD/KES', dir: 'SHORT', pnl: '-$32.60', win: false },
                  { pair: 'XAU/USD', dir: 'LONG ', pnl: '+$340.00', win: true },
                ].map((trade, i) => (
                  <div key={i} className="trade-row">
                    <span className="t-gold">{trade.pair}</span>
                    <span className="t-dim">{trade.dir}</span>
                    <span className={trade.win ? 't-green' : 't-red'}>{trade.pnl}</span>
                  </div>
                ))}
              </div>

              <div style={{ margin: '1.25rem 0', borderTop: '1px solid rgba(74,158,255,0.08)' }} />

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span className="t-dim">Win rate (30d)</span>
                <span className="t-green">78.4%</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.3rem' }}>
                <span className="t-dim">Net P&L (demo)</span>
                <span className="t-green">+$4,820.00</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.3rem' }}>
                <span className="t-dim">Account</span>
                <span className="t-muted">MT5 Demo #38820</span>
              </div>

              <div style={{ marginTop: '1.5rem' }}>
                <span className="t-dim">// Interested in live results? </span>
                <span className="t-gold">→ Connect below</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ═══════════════════════════════════════════
          CONTACT
      ══════════════════════════════════════════════ */}
      <section id="contact" className="contact-section">
        <h2 className="contact-title reveal">
          Let&rsquo;s talk<br />
          <em>the human way.</em>
        </h2>
        <p className="contact-sub reveal delay-2">
          No forms. No email threads. If you&rsquo;re curious about Scuro,
          Plain Speak, the Market Watcher, or just want to share what your
          morning walk looked like — reach out directly.
        </p>

        <div className="contact-methods reveal delay-3">
          <a
            href={`https://wa.me/${PHONE.replace(/\D/g, '')}`}
            target="_blank"
            rel="noreferrer"
            className="contact-btn primary"
          >
            <span>💬</span>
            WhatsApp
          </a>
          <a
            href={`sms:${PHONE}`}
            className="contact-btn"
          >
            <span>📱</span>
            Text / SMS
          </a>
          <a
            href={`facetime:${PHONE}`}
            className="contact-btn"
          >
            <span>📹</span>
            FaceTime
          </a>
          <a
            href="https://www.tiktok.com/@scurowalks"
            target="_blank"
            rel="noreferrer"
            className="contact-btn"
          >
            <span>↗</span>
            @scurowalks
          </a>
        </div>

        <p className="contact-note reveal delay-4">
          Based in Ongata Rongai, Kenya &nbsp;·&nbsp; East Africa Time (EAT, UTC+3)
        </p>
      </section>

      {/* ═══════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════════ */}
      <footer>
        <p>© 2026 Scuro — All rights reserved</p>
        <p>Field Notes from the Edge of Code &amp; Country</p>
        <p>Built with Next.js · Deployed on Vercel</p>
      </footer>
    </>
  );
}
