'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

/* ── constants ─────────────────────────────────────── */
const PHONE   = '+254105978871';
const WA_NUM  = '+254105978871';
const TT_MAIN = 'https://www.tiktok.com/@scurowalks';

const TT_1    = 'https://www.tiktok.com/@scurowalks/video/7611897363770166546'; 
const TT_2    = 'https://www.tiktok.com/@scurowalks/video/7611907436244471047';

/* ── parallax hooks ─────────────────────────────────── */
function useParallax(speedFactor = 0.3) {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    // Respect user choices regarding motion sensitivity
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const handleScroll = () => {
      setOffset(window.scrollY * speedFactor);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speedFactor]);

  return offset;
}

/* ── scroll reveal (UPDATED STRATEGY TO PREVENT FLASHING) ── */
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
      { 
        threshold: 0.05,                  // Element begins setup safely as soon as 5% breaks plane
        rootMargin: '0px 0px -60px 0px'  // Delays entrance trigger until element crosses 60px past screen baseline
      }
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
  
  // Calculate distinct speed offsets for layered components
  const bgOffset = useParallax(0.32);   // Background image layers glide slower
  const textOffset = useParallax(-0.1); // Content moves slightly upward to counter layout drag

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

      {/* ════════ HERO (WITH REFACTORED PARALLAX EFFECT) ════════ */}
      <section id="top" className="hero relative overflow-hidden" style={{ minHeight: '100vh' }}>
        
        {/* Parallax Layer Background Panel */}
        <div 
          className="absolute inset-0 w-full h-[120%] -top-[10%] will-change-transform pointer-events-none"
          style={{ 
            transform: `translateY(${bgOffset}px)`,
            zIndex: 0
          }}
        >
          <div className="hero-bg w-full h-full opacity-40" />
        </div>

        {/* Content Elements shifted via complementary offsets */}
        <div 
          className="hero-left relative will-change-transform"
          style={{ transform: `translateY(${textOffset}px)`, zIndex: 1 }}
        >
          <div className="hero-greeting reveal d1">Hello. Welcome in.</div>
          <h1 className="hero-title reveal d2">
            Walking slow<br />
            in a world that<br />
            won&rsquo;t stop.
          </h1>
          <p className="hero-body reveal d3">
            A developer building software from a quiet place.
          </p>
        </div>
      </section>
    </>
  );
}
