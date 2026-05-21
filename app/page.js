'use client';
import { useEffect } from 'react';

const PHONE     = '+254105978871'; // ← replace with real number
const WA_NUM    = PHONE.replace(/\D/g, '');
const TT_LINK_1 = 'https://www.tiktok.com/@scurowalks/video/7611897363770166546';
const TT_LINK_2 = 'https://www.tiktok.com/@scurowalks/video/7611907436244471047';

/* ── scroll reveal ── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } }),
      { threshold: 0.1 }
    );
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ── reusable eyebrow ── */
function Eyebrow({ label, variant = 'gold' }) {
  return (
    <div className={`eyebrow eyebrow-${variant}`}>
      <span className="eyebrow-line" />
      {label}
    </div>
  );
}

/* ── video preview card (no embed – opens TikTok) ── */
function VideoCard({ href, caption, bgClass }) {
  return (
    <a className={`video-card`} href={href} target="_blank" rel="noreferrer">
      <div className={`vc-bg ${bgClass}`} />
      <div className="vc-trees" />
      <div className="vc-sky" />
      <div className="vc-ground" />
      <div className="vc-overlay" />

      {/* TikTok logo badge */}
      <div className="vc-tiktok-badge">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
          <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.14 8.14 0 004.76 1.52V6.76a4.85 4.85 0 01-1-.07z"/>
        </svg>
      </div>

      {/* Play button */}
      <div className="vc-play">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
          <polygon points="5,3 19,12 5,21" />
        </svg>
      </div>

      {/* Meta */}
      <div className="vc-meta">
        <div className="vc-handle">@scurowalks</div>
        <div className="vc-caption">{caption}</div>
      </div>
    </a>
  );
}

/* ── asset row ── */
function Asset({ icon, sym, name, price, change, up }) {
  return (
    <div className="asset-row-item">
      <div className="asset-icon">{icon}</div>
      <div>
        <div className="asset-sym">{sym}</div>
        <div className="asset-nm">{name}</div>
      </div>
      <div className="asset-px">{price}</div>
      <span className={`chg ${up ? 'up' : 'dn'}`}>{up ? '↑' : '↓'} {change}</span>
    </div>
  );
}

export default function Home() {
  useReveal();
  return (
    <>
      {/* ═══════════ NAV ═══════════ */}
      <nav className="nav">
        <a href="#top" className="nav-brand">Scuro</a>
        <div className="nav-links">
          <a href="#plainspeak">Plain Speak</a>
          <a href="#markets">Markets</a>
          <a href="#automation">Automation</a>
          <a href="#scuro">Stories</a>
          <a href="#contact">Connect</a>
        </div>
        <a href={`https://wa.me/${WA_NUM}`} target="_blank" rel="noreferrer" className="nav-cta">
          ↗ WhatsApp
        </a>
      </nav>

      {/* ═══════════ HERO ═══════════ */}
      <section id="top" className="hero">
        <div className="hero-bg" />
        <div className="hero-coord">1.2921° S, 36.8219° E — Ongata Rongai, Kenya</div>

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div className="hero-greeting reveal d1">
            Hello, Mr. Garrett. Welcome.
          </div>
          <h1 className="hero-title reveal d2">
            Walking slow<br />
            in a world that<br />
            won&rsquo;t stop.
          </h1>
          <p className="hero-intro reveal d3">
            This is a space prepared especially for you by <strong>Griffin.</strong> Over the past
            four years, Griffin has been exploring how technology can feel less like a machine and
            more like a human conversation. This portfolio is a look at that journey — showing
            exactly how he uses AI to simplify the world, and how that same approach can bring
            value to the work you do together.
          </p>
        </div>

        <div className="hero-scroll">Scroll</div>
      </section>

      <div className="divider" />

      {/* ═══════════ PLAIN SPEAK AI ═══════════ */}
      <section id="plainspeak" className="section plainspeak-section">
        <div className="section-inner">
          <div className="two-col">
            {/* Left — copy */}
            <div>
              <div className="eyebrow eyebrow-blue reveal d1">
                <span className="eyebrow-line" style={{ background: 'var(--blue)' }} />
                Plain Speak AI
              </div>
              <h2 className="display-serif reveal d2" style={{ fontSize: 'clamp(2.8rem, 5.5vw, 5rem)', color: 'var(--text)' }}>
                Tech should talk<br />
                <em style={{ color: 'var(--blue)' }}>like a person.</em>
              </h2>
              <p className="body-prose reveal d2" style={{ marginTop: '1.75rem' }}>
                Plain Speak AI is a browser extension that intercepts jargon and replaces it
                with language that anyone can understand. Not dumbed-down —{' '}
                <strong>translated.</strong> The meaning survives. The confusion doesn&rsquo;t.
              </p>
              <p className="body-prose reveal d2" style={{ marginTop: '1rem', fontSize: '0.92rem' }}>
                Highlight any complex technical phrase on your screen and receive a clear,
                everyday translation instantly — without breaking your workflow or switching tabs.
              </p>

              <ul className="feat-list">
                {[
                  { title: 'Three reading levels', desc: "Child, Simple, or Learner mode — dial the complexity to match where you are, not where the author assumed you'd be." },
                  { title: 'Live page simplification', desc: 'One click rewrites the entire page in real time. Documentation, research papers, legal pages — all speak plainly.' },
                  { title: 'Restore original instantly', desc: 'Need the technical version back? One click. Plain Speak never deletes, only translates.' },
                  { title: "Powered by Groq's fast inference", desc: "Translation happens in under a second — fast enough that you don't remember waiting." },
                ].map((f, i) => (
                  <li key={i} className="reveal">
                    <span className="feat-arrow">→</span>
                    <div className="feat-body"><strong>{f.title}</strong>{f.desc}</div>
                  </li>
                ))}
              </ul>

              <a
                href="/plain-speak-extension.zip"
                className="download-btn reveal d3"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Download Extension
              </a>
            </div>

            {/* Right — mockup */}
            <div className="app-frame reveal d3">
              <div className="app-titlebar">
                <div className="tbar-dot" style={{ background: '#ff5f56' }} />
                <div className="tbar-dot" style={{ background: '#ffbd2e' }} />
                <div className="tbar-dot" style={{ background: '#27c93f' }} />
                <span className="tbar-url">www.langchain.com</span>
              </div>
              <div className="app-body">
                <div className="status-pill">
                  <span className="status-dot" />
                  Plain Speak AI — Page simplified ✓
                </div>
                <div className="original-block">
                  <div className="label">Original</div>
                  <p>
                    <strong>&ldquo;</strong>LangSmith is an all-in-one developer platform for
                    every step of the LLM-powered application lifecycle, whether you&rsquo;re
                    building with LangChain or not.<strong>&rdquo;</strong>
                  </p>
                </div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.58rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(91,155,213,0.55)', marginBottom: '0.5rem' }}>
                  Simplicity Level
                </div>
                <div className="level-row">
                  <div className="lv active">🧒 Child</div>
                  <div className="lv">🙂 Simple</div>
                  <div className="lv">📖 Learner</div>
                </div>
                <div className="translated">
                  LangSmith is a tool that helps builders make and fix their AI helpers.
                  You can watch them work, test them, and use what you already have.
                </div>
                <div className="key-row">
                  <span className="dim">GROQ API KEY ············</span>
                  <span className="saved">✓ Key saved</span>
                </div>
                <a href="#" className="chrome-btn">↗ Add to Chrome — Free</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ═══════════ MARKET WATCHER ═══════════ */}
      <section id="markets" className="section market-section">
        <div className="section-inner">
          <div className="two-col flip">
            {/* Right — terminal + CSV (rendered left after flip) */}
            <div>
              <div className="terminal">
                <div className="term-head">
                  <div className="term-dots"><span /><span /><span /></div>
                  <span className="term-label">market_watcher — direction log</span>
                </div>
                <div className="term-body">
                  <span className="tl td">// ── 2026-05-21 04:17:09 UTC ──────────────</span>
                  <span className="tl" style={{ marginTop: '0.6rem' }}><span className="tc">SCAN    </span><span className="tm">Running deep analysis on 52 instruments…</span></span>
                  <span className="tl"><span className="tc">SIGNAL  </span><span className="tg">XAU/USD </span><span className="tm">Momentum divergence — RSI 28.4</span></span>
                  <span className="tl"><span className="tc">MODEL   </span><span className="tm">Direction confidence: </span><span className="tgr">↑ 91.2% LONG</span></span>
                  <span className="tl"><span className="tc">EXEC    </span><span className="tgr">BUY XAU/USD @ 3,312.80 — MT5 Demo</span></span>
                  <span className="tl"><span className="tc">SL/TP   </span><span className="tm">3,298.00 / </span><span className="tg">3,344.00</span></span>
                </div>
              </div>

              {/* CSV mock */}
              <div className="csv-mock">
                <div className="csv-head">
                  <span>Date</span><span>Instrument</span><span>Direction</span><span>Result</span><span>P&amp;L</span>
                </div>
                {[
                  { date: '21 May', sym: 'XAU/USD', dir: '↑ Long',  res: 'WIN',  pnl: '+$340', w: true },
                  { date: '20 May', sym: 'WTI',     dir: '↑ Long',  res: 'WIN',  pnl: '+$127', w: true },
                  { date: '20 May', sym: 'EUR/USD',  dir: '↓ Short', res: 'WIN',  pnl: '+$84',  w: true },
                  { date: '19 May', sym: 'GBP/JPY', dir: '↑ Long',  res: 'WIN',  pnl: '+$211', w: true },
                  { date: '19 May', sym: 'DXY',     dir: '↓ Short', res: 'LOSS', pnl: '-$32',  w: false },
                  { date: '18 May', sym: 'XAU/USD', dir: '↑ Long',  res: 'WIN',  pnl: '+$290', w: true },
                  { date: '18 May', sym: 'USOIL',   dir: '↑ Long',  res: 'WIN',  pnl: '+$165', w: true },
                ].map((r, i) => (
                  <div key={i} className="csv-row">
                    <span style={{ color: 'var(--text-faint)', fontSize: '0.6rem' }}>{r.date}</span>
                    <span className="sym">{r.sym}</span>
                    <span style={{ color: r.w ? '#4ade80' : '#f87171', fontSize: '0.65rem' }}>{r.dir}</span>
                    <span className={r.w ? 'win' : 'loss'}>{r.res}</span>
                    <span className={r.w ? 'win' : 'loss'}>{r.pnl}</span>
                  </div>
                ))}
              </div>

              <div className="mt5-tag">
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#4ade80', display: 'inline-block', animation: 'pulse 2s infinite' }} />
                MT5 Demo Account — Live Execution Track Record
              </div>
            </div>

            {/* Left — copy */}
            <div>
              <div className="eyebrow eyebrow-gold reveal d1">
                <span className="eyebrow-line" style={{ background: 'var(--gold)' }} />
                Market Watcher
              </div>
              <h2 className="display-serif reveal d2" style={{ fontSize: 'clamp(2.8rem, 5.5vw, 5rem)', color: 'var(--text)' }}>
                The market runs<br />
                <em style={{ color: 'var(--gold)' }}>while you walk.</em>
              </h2>
              <p className="body-prose reveal d2" style={{ marginTop: '1.75rem' }}>
                Market Watcher is an AI engine that monitors high-liquidity assets —{' '}
                <strong>Gold, Euro/USD, Oil, and the DXY index</strong> — around the clock.
                It runs deep predictive analysis to pinpoint direction (up or down), then
                automatically executes algorithmic trades on a MetaTrader 5 demo account
                with a fully transparent, auditable track record.
              </p>
              <p className="body-prose reveal d3" style={{ marginTop: '1rem' }}>
                No overnight anxiety. No emotional triggers. Signal, logic, and a consistent
                methodology that compounds over time — provably.
              </p>

              {/* Asset table */}
              <div className="asset-table reveal d3">
                <div className="asset-head">
                  <span></span><span>Instrument</span><span>Price</span><span>Change</span>
                </div>
                <Asset icon="🥇" sym="XAU/USD"  name="Gold — Spot"           price="3,312.40" change="1.24%" up />
                <Asset icon="💱" sym="EUR/USD"  name="Euro / US Dollar"       price="1.0842"   change="0.31%" up={false} />
                <Asset icon="🛢️" sym="WTI"      name="Crude Oil"              price="78.64"    change="0.87%" up />
                <Asset icon="📊" sym="DXY"      name="US Dollar Index"        price="104.32"   change="0.19%" up />
                <Asset icon="💹" sym="GBP/JPY"  name="Sterling / Yen"         price="196.44"   change="0.55%" up />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ═══════════ AUTOMATION COMPANION ═══════════ */}
      <section id="automation" className="section auto-section">
        <div className="section-inner">
          <div className="eyebrow eyebrow-gold reveal d1">
            <span className="eyebrow-line" style={{ background: 'var(--gold)' }} />
            The Automation Companion
          </div>
          <h2 className="display-serif reveal d2" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', color: 'var(--text)', maxWidth: '680px' }}>
            Technology as a<br />
            <em style={{ color: 'var(--gold)' }}>walking partner.</em>
          </h2>

          <div className="companion-quote reveal d2">
            &ldquo;Walking alongside my dogs helped me see that AI is just another companion —
            and <em>how you use it actually matters.</em>&rdquo;
          </div>

          <div className="auto-cards">
            <div className="auto-card reveal d2">
              <div className="auto-card-icon">⚙️</div>
              <h4>AI Worker Systems</h4>
              <p>
                Orchestrating agentic, multi-agent flows to handle heavy business data, simplify
                complex tasks, and run entire workflows in the background — while the principal
                stays focused on what only they can do.
              </p>
            </div>
            <div className="auto-card reveal d3">
              <div className="auto-card-icon">🎯</div>
              <h4>Intent-Driven Lead Generation</h4>
              <p>
                An automated system that extracts YouTube comments, runs AI sentiment analysis,
                and pinpoints users expressing explicit buying intent — asking for contractors,
                materials, or builders — routing those hot leads directly to businesses to close.
              </p>
            </div>
            <div className="auto-card reveal d2">
              <div className="auto-card-icon">🔄</div>
              <h4>Background Automation</h4>
              <p>
                Repetitive data handling, reporting, and communication flows handed off entirely
                to autonomous agents. The work continues without supervision — reliable,
                consistent, always on.
              </p>
            </div>
            <div className="auto-card reveal d3">
              <div className="auto-card-icon">🧠</div>
              <h4>Human-Centred Design</h4>
              <p>
                Every system is built to surface the right information at the right moment —
                not to overwhelm, but to clarify. The companion metaphor isn&rsquo;t decorative;
                it&rsquo;s the design principle.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ═══════════ SCURO ═══════════ */}
      <section id="scuro" className="section scuro-section">
        <div className="section-inner">
          <div className="eyebrow eyebrow-gold reveal d1">
            <span className="eyebrow-line" style={{ background: 'var(--gold)' }} />
            Scuro Walks
          </div>
          <h2 className="display-serif reveal d2" style={{ fontSize: 'clamp(2.8rem, 5.5vw, 5rem)', color: 'var(--text)' }}>
            Stories automated<br />
            <em style={{ color: 'var(--gold)' }}>by the land itself.</em>
          </h2>

          <div className="scuro-story reveal d2">
            <p>
              It began on the open land and winding roads, walking alongside my dogs. To capture
              the spirit of these moments, I began using AI not to replace the human element —
              <strong> but to perfect the story.</strong> I built systems where AI analyses raw
              scenes, suggests the most impactful cinematic cuts, refines the narrative arc, and
              auto-schedules the posts.
            </p>
            <p>
              The result went far beyond data. It became a{' '}
              <strong>deeply shared human experience.</strong> A community emerged — people stepped
              away from their screens to touch the earth. Even local children joined the walks,
              eager to learn about the nature around them and engage with the dogs.
              <strong> Technology bridged the gap back to the real world.</strong>
            </p>
          </div>

          {/* Video preview cards */}
          <div className="video-grid">
            <div className="reveal d2">
              <VideoCard
                href={TT_LINK_1}
                bgClass="vc-bg-1"
                caption="Permission to be lost — open land, open mind."
              />
            </div>
            <div className="reveal d3">
              <VideoCard
                href={TT_LINK_2}
                bgClass="vc-bg-2"
                caption="River walk series — returning to nature."
              />
            </div>
          </div>

          <div style={{ marginTop: '2rem', textAlign: 'center' }}>
            <a
              href="https://www.tiktok.com/@scurowalks"
              target="_blank"
              rel="noreferrer"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '0.62rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--text-faint)',
                textDecoration: 'none',
                transition: 'color 0.3s',
              }}
              onMouseEnter={e => e.target.style.color = 'var(--gold)'}
              onMouseLeave={e => e.target.style.color = 'var(--text-faint)'}
            >
              ↗ View all walks @scurowalks
            </a>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ═══════════ CONTACT ═══════════ */}
      <section id="contact" className="contact-section">
        <h2 className="contact-title reveal">
          Let&rsquo;s talk<br />
          the human way.
        </h2>
        <p className="contact-ask reveal d2">Will you join me on this journey?</p>
        <p className="contact-sub reveal d2">
          No forms. No cold threads. If any of this resonates — the walks, the tools,
          the vision — reach out directly. Warm, personal, and immediate.
        </p>

        <div className="contact-btns reveal d3">
          <a href={`https://wa.me/${WA_NUM}`} target="_blank" rel="noreferrer" className="cbtn prime">
            💬 WhatsApp
          </a>
          <a href={`sms:${PHONE}`} className="cbtn">📱 Text / SMS</a>
          <a href={`facetime:${PHONE}`} className="cbtn">📹 FaceTime</a>
          <a href="https://www.tiktok.com/@scurowalks" target="_blank" rel="noreferrer" className="cbtn">
            ↗ @scurowalks
          </a>
        </div>

        <p className="contact-tz reveal d4">
          Ongata Rongai, Kenya &nbsp;·&nbsp; East Africa Time — UTC+3
        </p>
      </section>

      {/* ═══════════ FOOTER ═══════════ */}
      <footer>
        <p>© 2026 Griffin / Scuro</p>
        <p>Field Notes from the Edge of Code &amp; Country</p>
        <p>Next.js · Vercel</p>
      </footer>
    </>
  );
}
