'use client';

import { useEffect, useState } from 'react';

const fmt = (n: number) => Math.round(n).toLocaleString('en-US');

export default function Calculator() {
  const [cost, setCost] = useState(75000);
  const [down, setDown] = useState(0);
  const [term, setTerm] = useState(60);
  const [rate, setRate] = useState(9.5);

  const principal = Math.max(0, cost - down);
  const monthlyRate = rate / 100 / 12;
  let payment = 0;
  if (principal > 0 && monthlyRate > 0) {
    payment =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, term)) /
      (Math.pow(1 + monthlyRate, term) - 1);
  } else if (principal > 0) {
    payment = principal / term;
  }
  const totalCost = payment * term;
  const interest = totalCost - principal;

  useEffect(() => {
    if (down > cost) setDown(cost);
  }, [cost, down]);

  return (
    <section className="calculator" id="calculator">
      <div className="container-x">
        <div className="eyebrow">
          <span className="num">05 /</span>
          <span>Estimate Your Payment</span>
          <span className="line" />
        </div>

        <div className="calc-head">
          <h2>
            Run the numbers.<br />
            <em>No surprises.</em>
          </h2>
          <p>
            Move the sliders. See your estimated monthly payment in real time.
            Apply when you&apos;re ready for your actual rate.
          </p>
        </div>

        <div className="calc-grid">
          <div className="calc-inputs">
            <div className="calc-field">
              <label>Equipment Cost</label>
              <div className="calc-value">
                <span>$</span>
                <input
                  type="number"
                  value={cost}
                  min={5000}
                  max={500000}
                  step={500}
                  onChange={(e) => setCost(+e.target.value || 0)}
                />
              </div>
              <input
                type="range"
                className="calc-slider"
                min={5000}
                max={500000}
                step={500}
                value={cost}
                onChange={(e) => setCost(+e.target.value)}
              />
              <div className="calc-range">
                <span>$5K</span><span>$500K</span>
              </div>
            </div>

            <div className="calc-field">
              <label>
                Down Payment <small>$0 preferred</small>
              </label>
              <div className="calc-value">
                <span>$</span>
                <input
                  type="number"
                  value={down}
                  min={0}
                  max={100000}
                  step={500}
                  onChange={(e) => setDown(+e.target.value || 0)}
                />
              </div>
              <input
                type="range"
                className="calc-slider"
                min={0}
                max={100000}
                step={500}
                value={down}
                onChange={(e) => setDown(+e.target.value)}
              />
              <div className="calc-range">
                <span>$0</span><span>$100K</span>
              </div>
            </div>

            <div className="calc-field">
              <label>Loan Term</label>
              <div className="calc-value">
                <span>{term}</span>
                <span className="unit">months</span>
              </div>
              <input
                type="range"
                className="calc-slider"
                min={24}
                max={84}
                step={12}
                value={term}
                onChange={(e) => setTerm(+e.target.value)}
              />
              <div className="calc-range">
                <span>24 mo</span><span>84 mo</span>
              </div>
            </div>

            <div className="calc-field">
              <label>
                Estimated Rate <small>based on credit profile</small>
              </label>
              <div className="calc-value">
                <span>{rate}</span>
                <span className="unit">% APR</span>
              </div>
              <input
                type="range"
                className="calc-slider"
                min={6}
                max={25}
                step={0.25}
                value={rate}
                onChange={(e) => setRate(+e.target.value)}
              />
              <div className="calc-range">
                <span>Excellent</span><span>Building</span>
              </div>
            </div>
          </div>

          <div className="calc-output">
            <div className="calc-payment">
              <div className="calc-label">Estimated Monthly</div>
              <div className="calc-amount">
                <span className="currency">$</span>
                <span>{fmt(payment)}</span>
                <span className="per">/ mo</span>
              </div>
            </div>
            <div className="calc-breakdown">
              <div className="calc-row">
                <span>Amount Financed</span>
                <span>${fmt(principal)}</span>
              </div>
              <div className="calc-row">
                <span>Total Interest</span>
                <span>${fmt(interest)}</span>
              </div>
              <div className="calc-row">
                <span>Total of Payments</span>
                <span>${fmt(totalCost)}</span>
              </div>
            </div>
            <a href="/apply" className="btn-primary amber">
              Apply for Exact Rate
            </a>
            <p className="calc-disclaimer">
              Estimate only. Actual terms based on credit profile, equipment
              type, age, and lender approval. Apply for a real quote in under
              five minutes.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
