import Link from 'next/link';
import ApplicationForm from '@/components/ApplicationForm';

export const metadata = {
  title: 'Apply for Equipment Financing — ABC Leasing & Financing',
  description:
    'Five-minute online application for equipment financing. Trucks, paving, landscaping, waste & recycling. $0 down. Decisions in 24 hours.'
};

export default function ApplyPage() {
  return (
    <>
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
            <Link href="/">← Back to Site</Link>
            <a href="tel:5188575206" className="nav-cta" style={{ background: 'var(--forest)' }}>
              Call Gerry · 518.857.5206
            </a>
          </nav>
        </div>
      </header>

      <main className="apply-page">
        <div className="container-x">
          <div className="apply-head">
            <div className="eyebrow no-rule" style={{ justifyContent: 'center' }}>
              <span className="num">→</span>
              <span>Equipment Finance Application</span>
            </div>
            <h1>
              Five minutes,<br /><em>then we get to work.</em>
            </h1>
            <p>
              One application, 45+ lenders, decisions in twenty-four hours.
              Your information is encrypted and only visible to ABC Leasing.
            </p>
          </div>

          <ApplicationForm />
        </div>
      </main>
    </>
  );
}
