import Link from 'next/link';
import Image from 'next/image';
import Calculator from '@/components/Calculator';

export default function Home() {
  return (
    <>
      {/* ============== NAV ============== */}
      <header className="nav">
        <div className="nav-inner">
          <Link href="/" className="logo">
            <span className="logo-mark">A</span>
            <span className="logo-text">
              ABC Leasing
              <small>&amp; Financing · Est. 1979</small>
            </span>
          </Link>
          <nav className="nav-links">
            <a href="#services">Services</a>
            <a href="#why">Why ABC</a>
            <a href="#calculator">Calculator</a>
            <a href="#story">Our Story</a>
            <a href="#contact">Contact</a>
            <Link href="/apply" className="nav-cta">Apply Now</Link>
          </nav>
        </div>
      </header>

      {/* ============== HERO ============== */}
      <section className="hero">
        <div className="est-badge">
          Family-Owned<br />Veteran-Operated<br />Since
          <span className="year">1979</span>
        </div>

        <div className="container-x">
          <div className="hero-meta">
            <span>01 / Equipment Financing · Trusted Since 1979</span>
          </div>
          <div className="hero-grid">
            <h1>
              Equipment<br />
              financing,<br />
              <em>done</em> <span className="underline">right.</span>
            </h1>
            <div className="hero-side">
              <p>
                Forty-plus years of getting deals approved that banks turn
                away. Trucks. Paving. Landscaping. Waste &amp; recycling. Even
                used equipment from private parties. One application, decisions
                in twenty-four hours.
              </p>
              <div className="hero-cta-row">
                <Link href="/apply" className="btn-primary">Start Application</Link>
                <a href="tel:5188575206" className="btn-ghost">
                  Or call Gerry direct{' '}
                  <span className="num">518.857.5206</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============== TRUST MARQUEE ============== */}
      <div className="trust-bar">
        <div className="trust-track">
          {[
            'Veteran-Owned','45+ Lender Network','$0 Down Payment',
            '24-Hour Decisions','$250K No Financials','Used Equipment OK',
            'Private Party Sales',
            'Veteran-Owned','45+ Lender Network','$0 Down Payment',
            '24-Hour Decisions','$250K No Financials','Used Equipment OK',
            'Private Party Sales'
          ].map((s, i) => <span key={i}>{s}</span>)}
        </div>
      </div>

      {/* ============== STATS ============== */}
      <section className="stats">
        <div className="container-x">
          <div className="eyebrow">
            <span className="num">02 /</span>
            <span>By the Numbers</span>
            <span className="line" />
          </div>
          <div className="stats-grid">
            <div className="stat">
              <span className="stat-tag">i.</span>
              <div className="stat-num">45+</div>
              <div className="stat-label">Lenders &amp; Banks</div>
            </div>
            <div className="stat">
              <span className="stat-tag">ii.</span>
              <div className="stat-num">$250K</div>
              <div className="stat-label">No Financials Needed</div>
            </div>
            <div className="stat">
              <span className="stat-tag">iii.</span>
              <div className="stat-num">$0</div>
              <div className="stat-label">Down Payment</div>
            </div>
            <div className="stat">
              <span className="stat-tag">iv.</span>
              <div className="stat-num">46</div>
              <div className="stat-label">Years In Business</div>
            </div>
          </div>
        </div>
      </section>

      {/* ============== SERVICES ============== */}
      <section className="services" id="services">
        <div className="container-x">
          <div className="eyebrow">
            <span className="num">03 /</span>
            <span>What We Finance</span>
            <span className="line" />
          </div>
          <div className="services-head">
            <h2>If it works for a living,<br /><em>we&apos;ll finance it.</em></h2>
            <p>
              From box trucks to skid steers, paving rigs to grapple loaders —
              if you need it to run your business, we have a lender for it. New
              or used. Private party or dealer. We don&apos;t blink.
            </p>
          </div>

          <div className="services-grid">
            <ServiceCard
              num="A." title="Trucks &" titleLine="Commercial Vehicles"
              desc="Class 1 through 8. Box trucks, dump trucks, tractors, trailers, vocational rigs. Owner-operators welcome."
              icon={<path d="M4 44V20h28v24M32 28h12l8 10v6H32M14 50a4 4 0 100-8 4 4 0 000 8zM44 50a4 4 0 100-8 4 4 0 000 8z" />}
            />
            <ServiceCard
              num="B." title="Paving" titleLine="Equipment"
              desc="Asphalt pavers, rollers, milling machines, line stripers. We know paving season runs short — we move fast."
              icon={<path d="M8 48l12-26h24l12 26H8zM20 48v8M44 48v8M16 28h32" />}
            />
            <ServiceCard
              num="C." title="Tree &" titleLine="Landscape Gear"
              desc="Bucket trucks, chippers, stump grinders, mowers, skid steers, mini excavators. Crew tools that pay for themselves."
              icon={<path d="M32 8v44M32 8l-8 8M32 8l8 8M16 36l8 8M48 36l-8 8M12 52h40" />}
            />
            <ServiceCard
              num="D." title="Waste &" titleLine="Recycling"
              desc="Roll-offs, packers, balers, compactors, sorting lines. This is our specialty — we run with the haulers."
              icon={<path d="M14 18h36l-4 36H18L14 18zM10 18h44M22 12h20v6M28 28v18M36 28v18" />}
            />
            <ServiceCard
              num="E." title="Used Equipment" titleLine="(Private Party)"
              desc="The deal banks won't touch. Buying from a private seller? We finance it. Sale-leaseback your existing fleet? Done."
              icon={
                <>
                  <circle cx="32" cy="32" r="24" />
                  <path d="M32 18a14 14 0 010 28M22 32h20M32 22v20" />
                </>
              }
            />
            <ServiceCard
              num="F." title="Working Capital" titleLine="& Factoring"
              desc="Term loans, lines of credit, invoice factoring, revenue advances. Cash to keep the lights on between paydays."
              icon={<path d="M8 16h48v32H8zM18 30h28M18 38h20M14 22v20M50 22v20" />}
            />
          </div>
        </div>
      </section>

      {/* ============== DIFFERENTIATOR ============== */}
      <section className="differentiator" id="why">
        <div className="container-x">
          <div className="diff-eyebrow"><span>04 / The Difference</span></div>
          <div className="diff-grid">
            <h2>What banks<br />won&apos;t do,<br /><strong>we do.</strong></h2>
            <div className="diff-body">
              <p>
                Most lenders want a pristine balance sheet, three years of tax
                returns, and equipment fresh off a dealer lot. We&apos;re not
                most lenders. We&apos;re the ones who get you funded when the
                spreadsheet says no but the deal says yes.
              </p>
              <ul className="diff-list">
                <DiffItem marker="i." title="$250K with no financials"
                  text="No tax returns. No P&Ls. Application-only up to a quarter million." />
                <DiffItem marker="ii." title="Private party purchases"
                  text="Buying a used dump truck from a guy two towns over? That's exactly the deal we want." />
                <DiffItem marker="iii." title="45+ lender network"
                  text="One application. We shop it. You get the offer. No 14 hard pulls on your credit." />
                <DiffItem marker="iv." title="Sale-leasebacks"
                  text="Cash sitting in equipment you already own. We unlock it." />
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ============== CALCULATOR ============== */}
      <Calculator />

      {/* ============== STORY ============== */}
      <section className="story" id="story">
        <div className="container-x">
          <div className="eyebrow">
            <span className="num">06 /</span>
            <span>Our Story</span>
            <span className="line" />
          </div>
          <div className="story-grid">
            <div className="story-photo">
              <Image
                src="/gerry.jpg"
                alt="Gerry, founder of ABC Leasing & Financing, with equipment"
                fill
                sizes="(max-width: 900px) 100vw, 40vw"
                className="story-photo-img"
                priority
              />
              <div className="story-photo-tag">Gerry · Founder · Delmar, NY</div>
            </div>
            <div className="story-content">
              <h2>Founded in <em>1979</em>.<br />Built one deal at a time.</h2>
              <p>
                ABC Leasing &amp; Financing started the way most good businesses
                do — with a guy who saw small business owners getting turned
                away by banks that didn&apos;t understand their work. Forty-six
                years later, we&apos;re still here. Still picking up the phone.
                Still getting deals done.
              </p>
              <p>
                We&apos;ve financed everything from a single tow truck to entire
                fleets. We&apos;ve watched contractors grow from one rig to
                twenty. We&apos;re proudly veteran-owned and we believe small
                business is the engine that runs this country. We finance the
                engines.
              </p>
              <div className="signature">
                <span className="signature-line" />
                <span>Gerry, Founder</span>
                <span className="signature-line" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============== INDUSTRIES MARQUEE ============== */}
      <div className="industries">
        <div className="industries-track">
          {[
            'Trucking','Construction','Paving','Tree Care','Landscaping',
            'Waste Hauling','Recycling','Towing','Excavation',
            'Trucking','Construction','Paving','Tree Care','Landscaping',
            'Waste Hauling','Recycling','Towing','Excavation'
          ].map((s, i) => <span key={i}>{s}</span>)}
        </div>
      </div>

      {/* ============== CTA ============== */}
      <section className="cta-section" id="apply">
        <div className="container-x">
          <div className="cta-content">
            <div className="diff-eyebrow"><span>Ready When You Are</span></div>
            <h2>Get the equipment.<br /><em>Get back to work.</em></h2>
            <div className="cta-row">
              <Link href="/apply" className="btn-primary">Start Online Application</Link>
            </div>
            <div className="cta-phones">
              <div className="cta-phone">
                <div className="label">Office</div>
                <div className="number">
                  <a href="tel:5186180033">518.618.0033</a>
                </div>
              </div>
              <div className="cta-phone">
                <div className="label">Gerry Direct</div>
                <div className="number">
                  <a href="tel:5188575206">518.857.5206</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============== AFFILIATIONS ============== */}
      <section className="affiliations">
        <div className="container-x">
          <div className="affil-grid">
            <div>
              <div className="eyebrow no-rule">Member Of</div>
              <h3 style={{ marginTop: 18 }}>
                Trusted by the<br /><em>industries we serve.</em>
              </h3>
            </div>
            <div className="affil-logos">
              <a
                href="https://www.aacfb.org"
                target="_blank"
                rel="noopener noreferrer"
                className="affil-logo"
                title="American Association of Commercial Finance Brokers"
              >
                <Image src="/aacfb.jpeg" alt="AACFB" width={64} height={64} />
                <div className="affil-logo-text">
                  <strong>AACFB</strong>
                  <span>American Association of<br />Commercial Finance Brokers</span>
                </div>
              </a>
              <div className="affil-logo">
                <div className="affil-logo-placeholder" style={{ background: 'var(--ink)', color: 'var(--paper-light)' }}>★</div>
                <div className="affil-logo-text">
                  <strong>Veteran-Owned</strong>
                  <span>Proudly Serving Since 1979</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============== FOOTER ============== */}
      <footer className="site-footer" id="contact">
        <div className="container-x">
          <div className="footer-grid">
            <div className="footer-brand">
              <h3>ABC Leasing &amp; Financing</h3>
              <p>
                Equipment and truck financing for working businesses across the
                United States. Veteran-owned. Family-operated. Established 1979.
              </p>
              <span className="veteran">★ Veteran-Owned Business</span>
            </div>
            <div className="footer-col">
              <h4>Contact</h4>
              <ul>
                <li><a href="tel:5186180033">518.618.0033 · Office</a></li>
                <li><a href="tel:5188575206">518.857.5206 · Gerry</a></li>
                <li><a href="mailto:abcleasingNY@gmail.com">abcleasingNY@gmail.com</a></li>
                <li>Fax · 518.677.1888</li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Visit</h4>
              <ul>
                <li>66 Walden Fields Drive</li>
                <li>Delmar, NY 12054</li>
                <li><a href="https://maps.google.com/?q=66+Walden+Fields+Drive+Delmar+NY" target="_blank" rel="noopener noreferrer">Get Directions →</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Services</h4>
              <ul>
                <li><a href="#services">Truck Financing</a></li>
                <li><a href="#services">Paving Equipment</a></li>
                <li><a href="#services">Waste &amp; Recycling</a></li>
                <li><a href="#services">Working Capital</a></li>
                <li><Link href="/apply">Apply Now</Link></li>
              </ul>
            </div>
          </div>
          <div className="footer-meta">
            <span>© 1979–2026 ABC Leasing &amp; Financing</span>
            <span>Made with care · Delmar, NY</span>
          </div>
        </div>
      </footer>
    </>
  );
}

function ServiceCard({
  num, title, titleLine, desc, icon
}: {
  num: string; title: string; titleLine: string; desc: string; icon: React.ReactNode;
}) {
  return (
    <div className="service">
      <div className="service-num">{num}</div>
      <span className="service-arrow">↗</span>
      <div className="service-icon">
        <svg viewBox="0 0 64 64" fill="none" stroke="currentColor">{icon}</svg>
      </div>
      <h3>{title}<br />{titleLine}</h3>
      <p>{desc}</p>
    </div>
  );
}

function DiffItem({ marker, title, text }: { marker: string; title: string; text: string }) {
  return (
    <li>
      <span className="marker">{marker}</span>
      <span className="text"><strong>{title}</strong>{text}</span>
    </li>
  );
}
