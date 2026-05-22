'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

/* ── constants ─────────────────────────────────────── */
const PHONE   = '+254105978871';
const WA_NUM  = '+254105978871';
const TT_MAIN = 'https://www.tiktok.com/@scurowalks';

const TT_1    = 'https://www.tiktok.com/@scurowalks/video/7611897363770166546'; 
const TT_2    = 'https://www.tiktok.com/@scurowalks/video/7611907436244471047';

/* ── scroll reveal ──────────────────────────────────── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { 
        if (e.isIntersecting) { 
          e.target.classList.add('visible'); 
          io.unobserve(e.target); 
        } 
      }),
      { threshold: 0.1 }
    );
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ── hide-on-scroll nav ─────────────────────────────── */
function useNavHide() {
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  useEffect(() => {
    const handler = () => {
      const y = window.scrollY;
      if (y > 50 && y > lastY.current) setHidden(true);
      else setHidden(false);
      lastY.current = y;
    };
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);
  return hidden;
}

/* ── small helpers ──────────────────────────────────── */
function Eyebrow({ label, variant = 'gold' }) {
  return (
    <div className={`eyebrow ey-${variant} reveal d1`}>
      <span className="ey-line" />
      {label}
    </div>
  );
}

function Asset({ icon, sym, name, price, change, up }) {
  return (
    <div className="a-row">
      <div className="a-icon">{icon}</div>
      <div>
        <div className="a-sym">{sym}</div>
        <div className="a-nm">{name}</div>
      </div>
      <div className="a-px">{price}</div>
      <span className={`chg ${up ? 'up' : 'dn'}`}>{up ? '↑' : '↓'} {change}</span>
    </div>
  );
}

/* ── Fix: Added unoptimized fallback to bypass strict domain errors if needed ── */
function TikTokCard({ videoUrl, cap }) {
  const [meta, setMeta] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!videoUrl) return;
    async function fetchThumbnail() {
      try {
        const res = await fetch(`/api/tiktok?url=${encodeURIComponent(videoUrl)}`);
        if (res.ok) {
          const data = await res.json();
          setMeta(data);
        }
      } catch (err) {
        console.error("Error loading thumbnail:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchThumbnail();
  }, [videoUrl]);

  return (
    <a 
      href={videoUrl} 
      target="_blank" 
      rel="noreferrer" 
      className="reveal"
      style={{ 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'end',
        position: 'relative', 
        overflow: 'hidden',
        width: '100%',
        maxWidth: '340px',
        aspectRatio: '9 / 16', 
        borderRadius: '4px',
        backgroundColor: '#0d120e',
        border: '1px solid var(--border, rgba(237,233,224,0.07))',
        margin: '0 auto'
      }}
    >
      {/* Thumbnail Layer */}
      {meta?.thumbnail_url && (
        <Image
          src={meta.thumbnail_url}
          alt={meta.title || "TikTok Walk"}
          fill
          unoptimized // Prevents image domain blocking strings from hiding the asset thumb
          sizes="(max-width: 768px) 100vw, 340px"
          style={{ objectFit: 'cover', zIndex: 0 }} 
          className="transition-opacity duration-500 opacity-70 hover:opacity-95"
        />
      )}

      {/* Text Backdrop Gradient */}
      <div 
        style={{ 
          position: 'absolute', 
          inset: 0, 
          background: 'linear-gradient(to top, rgba(11, 15, 12, 0.95) 0%, rgba(11, 15, 12, 0.3) 50%, transparent 100%)',
          zIndex: 1 
        }} 
      />

      {/* Content Container */}
      <div style={{ position: 'relative', zIndex: 2, padding: '1.5rem', width: '100%' }}>
        {loading ? (
          <p className="text-faint" style={{ margin: 0, fontSize: '0.85rem' }}>Fetching landscape...</p>
        ) : (
          <>
            <p className="card-tag" style={{ color: 'var(--gold, #c4a45a)', margin: 0, fontSize: '0.75rem', letterSpacing: '0.12em' }}>WALK ASSET</p>
            <h3 className="card-title" style={{ margin: '0.4rem 0 0 0', color: '#ede9e0', fontSize: '1.05rem', fontWeight: 400, lineHeight: 1.4 }}>
              {cap || meta?.title || "Field Note"}
            </h3>
          </>
        )}
      </div>
    </a>
  );
}

function VideoCard({ href, cap, bgStyle }) {
  const [meta, setMeta] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchThumbnail() {
      try {
        const res = await fetch(`/api/tiktok?url=${encodeURIComponent(href)}`);
        if (res.ok) {
          const data = await res.json();
          setMeta(data);
        }
      } catch (err) {
        console.error("Error fetching landscape video meta:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchThumbnail();
  }, [href]);

  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noreferrer" 
      className="scuro-card video-card" 
      style={{ display: 'block', position: 'relative', overflow: 'hidden', ...bgStyle }}
    >
      {meta?.thumbnail_url && (
        <Image
          src={meta.thumbnail_url}
          alt={meta.title || "Walk Cinematic"}
          fill
          unoptimized
          sizes="(max-width: 768px) 100vw, 50vw"
          style={{ objectFit: 'cover', zIndex: 0 }}
          className="transition-opacity duration-500 opacity-40 hover:opacity-70"
        />
      )}
      <div style={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
        {loading ? (
          <p className="text-faint">Loading cinematic note...</p>
        ) : (
          <>
            <p className="card-tag">WALK CINEMATIC</p>
            <h3 className="card-title" style={{ fontSize: '1.1rem', fontWeight: 'normal', lineHeight: 1.5 }}>
              {cap || meta?.title || "Untitled Landscape"}
            </h3>
          </>
        )}
      </div>
    </a>
  );
}

/* ── page ───────────────────────────────────────────── */
export default function Home() {
  useReveal();
  const navHidden = useNavHide();

  return (
    <>
      {/* ════════ NAV ════════ */}
      <nav className={`nav${navHidden ? ' hidden-nav' : ''}`}>
        <div className="nav-bg" />
        <a href="#top" className="nav-brand">Scuro</a>
        <div className="nav-links">
          <a href="#plainspeak">Plain Speak</a>
          <a href="#markets">Markets</a>
          <a href="#automation">Automation</a>
          <a href="#clips">5MinClips</a>
          <a href="#scuro">Stories</a>
          <a href="#contact">Connect</a>
        </div>
        <a href={`https://wa.me/${WA_NUM}`} target="_blank" rel="noreferrer" className="nav-cta">
          ↗ WhatsApp
        </a>
      </nav>

      {/* ════════ HERO ════════ */}
      <section id="top" className="hero">
        <div className="hero-bg" />
        <div className="hero-left">
          <div className="hero-greeting reveal d1">Hello. Welcome in.</div>
          <h1 className="hero-title reveal d2">
            Walking slow<br />
            in a world that<br />
            won&rsquo;t stop.
          </h1>
          <p className="hero-body reveal d3">
            Over the past four years, <strong>Griffin</strong> has been exploring how technology
            can feel less like a rigid machine and more like an organic human partnership. This
            portfolio is a look at that journey — showing exactly how AI is used to simplify the
            world, and how that same approach can bring real, measurable value to the right
            collaboration.
          </p>
        </div>

        <div className="hero-right">
          <div className="photo-frame reveal d3" style={{ width: '100%', maxWidth: '420px' }}>
            <div className="photo-frame-border-2" />
            <div className="photo-frame-border" />
            <div style={{ position: 'relative', width: '100%', aspectRatio: '380/507', overflow: 'hidden' }}>
              <Image
                src="/griffin.jpg"
                alt="Griffin"
                fill
                sizes="(max-width: 960px) 100vw, 420px"
                style={{ objectFit: 'cover', borderRadius: '2px', filter: 'contrast(1.05) brightness(0.92)' }}
                priority
              />
            </div>
            <div className="photo-frame-label">Griffin · Builder & Walker</div>
          </div>
        </div>

        <div className="hero-scroll">Scroll</div>
      </section>

      <div className="divider" />

      {/* ════════ VALUE PROPOSITION ════════ */}
      <section id="value" className="pg-section value-section">
        <div className="pg-inner">
          <div className="value-grid">
            <div>
              <Eyebrow label="What I Build For You" />
              <h2 className="d-serif reveal d2" style={{ fontSize: 'clamp(2.4rem,5vw,4.2rem)', color: 'var(--text)' }}>
                Systems that run<br />
                <em style={{ color: 'var(--gold)' }}>while you lead.</em>
              </h2>
            </div>
            <div>
              <div className="value-right reveal d2">
                <p>
                  The core of this work is building <strong>custom, background-operating
                  automated engines</strong> — systems that transform chaotic data, high-friction
                  tech problems, and dense content into streamlined business assets without
                  demanding your team&rsquo;s attention.
                </p>
                <p>
                  These engines run <strong>silently in the background</strong> — parsing leads,
                  modelling market trends, sharding media, and orchestrating multi-agent workflows
                  — so that your principal team can focus entirely on high-level execution,
                  strategy, and the partnerships that actually move the needle.
                </p>
                <p>
                  The philosophy is straightforward: technology should remove friction, not create
                  it. Every system built here is measured against a single question —
                  <strong> does this give your time back to you?</strong>
                </p>
              </div>
              <div className="value-pills reveal d3">
                {['Lead Parsing','Market Modelling','Media Automation','Agentic Workflows','LLM Pipelines','MT5 Execution'].map(p => (
                  <span key={p} className="vpill">{p}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ════════ PLAIN SPEAK ════════ */}
      <section id="plainspeak" className="pg-section" style={{ background: 'var(--bg)' }}>
        <div className="pg-inner">
          <div className="two-col">
            <div>
              <div className="eyebrow ey-blue reveal d1">
                <span className="ey-line" style={{ background: 'var(--blue)' }} />
                Plain Speak AI
              </div>
              <h2 className="d-serif reveal d2" style={{ fontSize: 'clamp(2.6rem,5.5vw,5rem)', color: 'var(--text)' }}>
                Tech should talk<br />
                <em style={{ color: 'var(--blue)' }}>like a person.</em>
              </h2>
              <p className="prose reveal d2" style={{ marginTop: '1.7rem' }}>
                Plain Speak AI is a browser extension that intercepts jargon and replaces it
                with language that anyone can understand. Not dumbed-down —{' '}
                <strong>translated.</strong> Highlight any complex technical phrase on screen
                and receive a clear, everyday translation instantly — without breaking your
                workflow or switching tabs.
              </p>
              <ul className="feat-list">
                {[
                  { t: 'Three reading profiles', d: "Child, Simple, or Learner — dial the complexity to where you are, not where the author assumed." },
                  { t: 'Live page rewriting',   d: 'One click rewrites the entire page in real time. Docs, papers, legal pages — all speak plainly.' },
                  { t: 'Instant raw restore',   d: 'Need the original back? One click. Plain Speak never deletes, only translates.' },
                  { t: "Groq-powered inference", d: "Translation in under a second — fast enough that you don't remember waiting." },
                ].map((f, i) => (
                  <li key={i} className="reveal"><span className="feat-arrow">→</span><div className="feat-text"><strong>{f.t}</strong>{f.d}</div></li>
                ))}
              </ul>
              <a href="https://scurrro.gumroad.com/l/ilmzh" className="dl-btn reveal d3">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Download Extension
              </a>
            </div>
            
            <div className="app-frame reveal d3">
              <div className="app-titlebar">
                <div className="tbar-dot" style={{ background: '#ff5f56' }} />
                <div className="tbar-dot" style={{ background: '#ffbd2e' }} />
                <div className="tbar-dot" style={{ background: '#27c93f' }} />
                <span className="tbar-url">www.langchain.com</span>
              </div>
              <div className="app-body">
                <div className="status-pill"><span className="s-dot" />Plain Speak AI — Page simplified ✓</div>
                <div className="orig-block">
                  <div className="orig-lbl">Original</div>
                  <p><strong>&ldquo;</strong>LangSmith is an all-in-one developer platform for every step of the LLM-powered application lifecycle, whether you&rsquo;re building with LangChain or not.<strong>&rdquo;</strong></p>
                </div>
                <div className="simp-lbl">Simplicity Level</div>
                <div className="level-row">
                  <div className="lv active">🧒 Child</div>
                  <div className="lv">🙂 Simple</div>
                  <div className="lv">📖 Learner</div>
                </div>
                <div className="translated">LangSmith is a tool that helps builders make and fix their AI helpers. You can watch them work, test them, and use what you already have.</div>
                <div className="key-row">
                  <span className="dim">GROQ API KEY ············</span>
                  <span className="saved">✓ Key saved</span>
                </div>
                <a href="#" className="chrome-link">↗ Add to Chrome — Free</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ════════ MARKET WATCHER ════════ */}
      <section id="markets" className="pg-section market-section">
        <div className="pg-inner">
          <div className="two-col flip">
            <div>
              <div className="terminal reveal d2">
                <div className="term-head">
                  <div className="term-dots"><span /><span /><span /></div>
                  <span className="term-lbl">market_watcher — direction log</span>
                </div>
                <div className="term-body">
                  <span className="tl td">// ── 2026-05-22 04:17:09 UTC ──────────────</span>
                  <span className="tl" style={{ marginTop: '0.5rem' }}><span className="tc">SCAN    </span><span className="tm">Running deep analysis on 52 instruments…</span></span>
                  <span className="tl"><span className="tc">SIGNAL  </span><span className="tg">XAU/USD </span><span className="tm">RSI divergence detected at 28.4</span></span>
                  <span className="tl"><span className="tc">MODEL   </span><span className="tm">Direction confidence: </span><span className="tgr">↑ 91.2% LONG</span></span>
                  <span className="tl"><span className="tc">EXEC    </span><span className="tgr">BUY XAU/USD @ 3,312.80 — MT5 Demo</span></span>
                  <span className="tl"><span className="tc">SL/TP   </span><span className="tm">3,298.00 / </span><span className="tg">3,344.00</span></span>
                </div>
              </div>
              <div className="csv-wrap reveal d3">
                <div className="csv-h"><span>Date</span><span>Asset</span><span>Direction</span><span>Result</span><span>P&amp;L</span></div>
                {[
                  ['21 May','XAU/USD','↑ Long','WIN','+$340',true],
                  ['20 May','WTI','↑ Long','WIN','+$127',true],
                  ['20 May','EUR/USD','↓ Short','WIN','+$84',true],
                  ['19 May','GBP/JPY','↑ Long','WIN','+$211',true],
                  ['19 May','DXY','↓ Short','LOSS','-$32',false],
                  ['18 May','XAU/USD','↑ Long','WIN','+$290',true],
                  ['18 May','USOIL','↑ Long','WIN','+$165',true],
                ].map(([d,s,dir,res,pnl,w],i) => (
                  <div key={i} className="csv-r">
                    <span style={{ color:'var(--text-faint)',fontSize:'0.58rem' }}>{d}</span>
                    <span className="sym">{s}</span>
                    <span className={w?'win':'loss'}>{dir}</span>
                    <span className={w?'win':'loss'}>{res}</span>
                    <span className={w?'win':'loss'}>{pnl}</span>
                  </div>
                ))}
              </div>
              <div className="mt5-tag reveal d3"><span className="mt5-dot" />MT5 Demo Account — Live Execution Track Record</div>
            </div>

            <div>
              <Eyebrow label="Market Watcher" />
              <h2 className="d-serif reveal d2" style={{ fontSize: 'clamp(2.6rem,5.5vw,5rem)', color: 'var(--text)' }}>
                The market runs<br />
                <em style={{ color: 'var(--gold)' }}>while you walk.</em>
              </h2>
              <p className="prose reveal d2" style={{ marginTop: '1.7rem' }}>
                Market Watcher is an automated predictive system tracking highly liquid assets —{' '}
                <strong>Gold, EUR/USD, Crude Oil, and the DXY index</strong> — around the clock.
                It runs deep predictive AI analysis to pinpoint direction (up or down), then
                automatically executes algorithmic trades on an MT5 demo account with a fully
                transparent, auditable track record.
              </p>
              <p className="prose reveal d3" style={{ marginTop: '1rem' }}>
                No overnight anxiety. No emotional triggers. Signal, logic, and a consistent
                methodology — <strong>provably consistent over time.</strong>
              </p>
              <div className="asset-table reveal d3">
                <div className="a-head"><span></span><span>Instrument</span><span>Price</span><span>24h</span></div>
                <Asset icon="🥇" sym="XAU/USD"  name="Gold — Spot"      price="3,312.40" change="1.24%" up />
                <Asset icon="💱" sym="EUR/USD"  name="Euro / US Dollar"   price="1.0842"   change="0.31%" up={false} />
                <Asset icon="🛢️" sym="WTI"      name="Crude Oil"          price="78.64"    change="0.87%" up />
                <Asset icon="📊" sym="DXY"      name="US Dollar Index"     price="104.32"   change="0.19%" up />
                <Asset icon="💹" sym="GBP/JPY"  name="Sterling / Yen"     price="196.44"   change="0.55%" up />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ════════ AUTOMATION COMPANION ════════ */}
      <section id="automation" className="pg-section auto-section">
        <div className="pg-inner">
          <Eyebrow label="The Automation Companion" />
          <h2 className="d-serif reveal d2" style={{ fontSize: 'clamp(2.5rem,5vw,4.5rem)', color: 'var(--text)', maxWidth: 680 }}>
            Technology as a<br />
            <em style={{ color: 'var(--gold)' }}>walking partner.</em>
          </h2>
          <div className="auto-quote reveal d2">
            &ldquo;Walking alongside my dogs helped me see that AI is just another companion —
            and <em>how you use it actually matters.</em>&rdquo;
          </div>
          <div className="auto-cards">
            {[
              { ic: '⚙️', t: 'AI Worker Systems', d: 'Structuring multi-agent autonomous background teams to manage dense data workflows. Agents parse, classify, and route information without supervision — running 24/7 while you focus elsewhere.' },
              { ic: '🎯', t: 'Intent-Driven Lead Generation', d: 'Python-engineered scraping and sentiment extraction layers that parse public comment streams, identify explicit buying intent keywords, and instantly pass hot sales leads to target companies to close.' },
              { ic: '🔄', t: 'Background Automation', d: 'Repetitive data handling, reporting, and communication flows handed entirely to autonomous agents. The work continues reliably and consistently — always on, never distracted.' },
              { ic: '🧠', t: 'Human-Centred Design', d: "Every system surfaces the right information at the right moment — not to overwhelm, but to clarify. The companion metaphor isn't decorative; it's the design principle behind everything built here." },
            ].map((c, i) => (
              <div key={i} className="auto-card reveal">
                <div className="auto-card-ic">{c.ic}</div>
                <h4>{c.t}</h4>
                <p>{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ════════ 5MINCLIPS ════════ */}
      <section id="clips" className="pg-section clips-section">
        <div className="pg-inner">
          <Eyebrow label="5MinClips" />
          <div className="two-col" style={{ alignItems: 'start', gap: '5rem' }}>
            <div>
              <h2 className="d-serif reveal d2" style={{ fontSize: 'clamp(2.5rem,5vw,4.5rem)', color: 'var(--text)' }}>
                Long courses,<br />
                <em style={{ color: 'var(--gold)' }}>five minutes at a time.</em>
              </h2>
              <p className="prose reveal d2" style={{ marginTop: '1.7rem' }}>
                5MinClips is a custom-built knowledge application engineered out of personal
                utility — to <strong>accelerate learning at pace with real life.</strong> The
                tool shards long-form educational videos (ranging from 25-minute deep dives to
                3-hour courses) into highly condensed, 5-minute media fragments.
              </p>
              <p className="prose reveal d3" style={{ marginTop: '1rem' }}>
                These optimised, concise shards are designed to feed directly into{' '}
                <strong>LLM analytical workflows</strong> — allowing rapid querying, analysis,
                and absorption of complex courses while on the move. Learning that keeps up
                with a life that won&rsquo;t slow down.
              </p>
            </div>
            <div>
              <div className="flow-chart reveal d3">
                {[
                  { ic: '🎬', lbl: 'Raw Input', val: '3-Hour Course' },
                  null,
                  { ic: '⚙️', lbl: 'Sharding Engine', val: 'Algorithmic', accent: true },
                  null,
                  { ic: '✂️', lbl: 'Media Shards', val: '5-Min Clips' },
                  null,
                  { ic: '🤖', lbl: 'LLM Ingestion', val: 'Context-Ready', accent: true },
                ].map((n, i) =>
                  n === null ? (
                    <div key={i} className="flow-arrow">→</div>
                  ) : (
                    <div key={i} className={`flow-node${n.accent ? ' accent' : ''}`}>
                      <div className="flow-node-icon">{n.ic}</div>
                      <div className="flow-node-label">{n.lbl}</div>
                      <div className="flow-node-val">{n.val}</div>
                    </div>
                  )
                )}
              </div>
              <div style={{ marginTop: '2rem', padding: '1.5rem', border: '1px solid var(--border)', borderRadius: '4px', background: 'var(--bg-3)' }} className="reveal d3">
                <div style={{ fontFamily: 'var(--mono)', fontSize: '0.58rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-faint)', marginBottom: '1rem' }}>
                  Use case
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.75 }}>
                  A 3-hour Coursera machine learning course → sharded into 36 × 5-minute clips →
                  each clip transcribed and chunked → fed into a RAG pipeline →
                  <strong style={{ color: 'var(--text)' }}> fully queryable in under 10 minutes.</strong>
                </p>
              </div>
              <a
                href="https://5minclips.streamlit.app/"
                target="_blank"
                rel="noreferrer"
                className="dl-btn reveal d4"
                style={{ marginTop: '1.75rem' }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Open 5MinClips App
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ════════ SCURO STREAMS (FIXED GRID AND PROPS) ════════ */}
      <section id="scuro" className="pg-section scuro-section">
        <div className="pg-inner">
          <Eyebrow label="Scuro Walks" />
          <h2 className="d-serif reveal d2" style={{ fontSize: 'clamp(2.8rem,5.5vw,5.5rem)', color: 'var(--text)' }}>
            Stories automated<br />
            <em style={{ color: 'var(--gold)' }}>by the land itself.</em>
          </h2>
          <div className="scuro-narrative reveal d2">
            <p>
              It began on the open land and winding country roads, walking alongside
              the dogs. To capture the spirit of these moments, custom AI pipelines were introduced
              not to replace the human element — <strong>but to perfectly refine the story.</strong>{' '}
              Systems now analyse raw scenes, suggest cinematic transitions, shape the narrative
              arc, and auto-schedule cross-platform releases.
            </p>
            <p>
              The result went far beyond data. It became a{' '}
              <strong>deeply shared human experience.</strong> A community emerged — people stepped
              away from their screens to touch the earth. Even local children joined the walks,
              eager to learn about the native biology around them and spend time with the dogs.{' '}
              <strong>Technology bridged the gap back to the real world.</strong>
            </p>
          </div>
          
          {/* Fix: Wrapped inside a beautiful flexible grid frame forcing vertical alignments side-by-side */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2.5rem', marginTop: '3.5rem', width: '100%' }}>
            <div className="reveal d2" style={{ display: 'flex', justifyContent: 'center' }}>
              <TikTokCard
                videoUrl={TT_1}
                cap="Permission to be lost — open land, open mind."
              />
            </div>
            <div className="reveal d3" style={{ display: 'flex', justifyContent: 'center' }}>
              <TikTokCard
                videoUrl={TT_2}
                cap="River walk series — returning to nature is the best way to find peace."
              />
            </div>
          </div>
          
          <div className="scuro-cta reveal d3" style={{ marginTop: '3.5rem' }}>
            <a href={TT_MAIN} target="_blank" rel="noreferrer">↗ View all walks @scurowalks</a>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ════════ CONTACT ════════ */}
      <section id="contact" className="contact-section">
        <h2 className="contact-title reveal">Let&rsquo;s talk<br />the human way.</h2>
        <p className="contact-ask reveal d2">Will you join me on this journey?</p>
        <p className="contact-sub reveal d2">
          No forms. No cold threads. If any of this resonates — reach out directly.
          Warm, personal, and immediate.
        </p>
        <div className="contact-btns reveal d3">
          <a href={`https://wa.me/${WA_NUM}`} target="_blank" rel="noreferrer" className="cbtn prime">💬 WhatsApp</a>
          <a href={`sms:${PHONE}`} className="cbtn">📱 Text / SMS</a>
          <a href={TT_MAIN} target="_blank" rel="noreferrer" className="cbtn">↗ @scurowalks</a>
        </div>
        <p className="contact-tz reveal d4">Available via WhatsApp · Text · FaceTime</p>
      </section>

      {/* ════════ FOOTER ════════ */}
      <footer>
        <p>© 2026 Griffin / Scuro</p>
        <p>Field Notes from the Edge of Code &amp; Country</p>
        <p>Next.js · Vercel</p>
      </footer>
    </>
  );
}
