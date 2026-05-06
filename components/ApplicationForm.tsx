'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import FileUploadField from './FileUploadField';
import SignaturePad from './SignaturePad';

type FormState = {
  // Business
  business_legal_name: string;
  business_dba: string;
  business_type: 'llc' | 'corp' | 's_corp' | 'sole_prop' | 'partnership' | 'non_profit' | 'other' | '';
  business_tax_id: string;
  business_years_in_operation: string;
  business_state_incorporated: string;
  business_address: string;
  business_city: string;
  business_state: string;
  business_zip: string;
  business_phone: string;
  business_email: string;
  business_website: string;
  business_industry: string;
  annual_revenue: string;
  // Owner
  owner_first_name: string;
  owner_last_name: string;
  owner_title: string;
  owner_ownership_pct: string;
  owner_home_address: string;
  owner_home_city: string;
  owner_home_state: string;
  owner_home_zip: string;
  owner_cell: string;
  owner_email: string;
  owner_dob: string;
  owner_ssn: string;
  owner_dl_state: string;
  // Equipment
  equipment_description: string;
  equipment_year: string;
  equipment_make: string;
  equipment_model: string;
  equipment_condition: 'new' | 'used' | '';
  equipment_vendor_type: 'dealer' | 'private_party' | 'self' | 'other' | '';
  equipment_vendor_name: string;
  equipment_vendor_phone: string;
  equipment_vendor_email: string;
  equipment_total_cost: string;
  equipment_down_payment: string;
  equipment_term_months: string;
};

const initialState: FormState = {
  business_legal_name: '', business_dba: '', business_type: '',
  business_tax_id: '', business_years_in_operation: '',
  business_state_incorporated: '', business_address: '', business_city: '',
  business_state: '', business_zip: '', business_phone: '',
  business_email: '', business_website: '', business_industry: '',
  annual_revenue: '',
  owner_first_name: '', owner_last_name: '', owner_title: '',
  owner_ownership_pct: '', owner_home_address: '', owner_home_city: '',
  owner_home_state: '', owner_home_zip: '', owner_cell: '',
  owner_email: '', owner_dob: '', owner_ssn: '', owner_dl_state: '',
  equipment_description: '', equipment_year: '', equipment_make: '',
  equipment_model: '', equipment_condition: '', equipment_vendor_type: '',
  equipment_vendor_name: '', equipment_vendor_phone: '',
  equipment_vendor_email: '', equipment_total_cost: '',
  equipment_down_payment: '0', equipment_term_months: '60'
};

const STEPS = ['Business', 'Owner', 'Equipment', 'Documents', 'Sign & Submit'];

export default function ApplicationForm() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FormState>(initialState);
  const [drivers_license, setDriversLicense] = useState<File[]>([]);
  const [equipment_quote, setEquipmentQuote] = useState<File[]>([]);
  const [bank_statements, setBankStatements] = useState<File[]>([]);
  const [voided_check, setVoidedCheck] = useState<File[]>([]);
  const [signatureData, setSignatureData] = useState<string | null>(null);
  const [signatureName, setSignatureName] = useState('');
  const [consentCredit, setConsentCredit] = useState(false);
  const [consentTerms, setConsentTerms] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setData((d) => ({ ...d, [key]: value }));
  }

  function validateStep(): string | null {
    const required: (keyof FormState)[][] = [
      ['business_legal_name','business_type','business_address','business_city','business_state','business_zip','business_phone','business_email'],
      ['owner_first_name','owner_last_name','owner_home_address','owner_home_city','owner_home_state','owner_home_zip','owner_cell','owner_email','owner_dob','owner_ssn'],
      ['equipment_description','equipment_total_cost'],
      [], []
    ];
    for (const k of required[step]) {
      if (!data[k] || `${data[k]}`.trim() === '') return `Please fill in ${k.replace(/_/g, ' ')}.`;
    }
    if (step === 3) {
      if (drivers_license.length === 0) return 'Please upload your driver\'s license.';
      if (equipment_quote.length === 0) return 'Please upload the equipment quote or invoice.';
    }
    if (step === 4) {
      if (!signatureData) return 'Please draw your signature.';
      if (!signatureName.trim()) return 'Please type your full legal name.';
      if (!consentCredit || !consentTerms) return 'Please accept both consents.';
    }
    return null;
  }

  function next() {
    setSubmitError(null);
    const err = validateStep();
    if (err) { setSubmitError(err); return; }
    setStep((s) => Math.min(STEPS.length - 1, s + 1));
  }
  function back() {
    setSubmitError(null);
    setStep((s) => Math.max(0, s - 1));
  }

  async function submit() {
    const err = validateStep();
    if (err) { setSubmitError(err); return; }

    setSubmitting(true);
    setSubmitError(null);

    try {
      const supabase = createClient();
      const cost = parseFloat(data.equipment_total_cost) || 0;
      const dpay = parseFloat(data.equipment_down_payment) || 0;

      const { data: app, error: insertErr } = await supabase
        .from('applications')
        .insert({
          business_legal_name: data.business_legal_name,
          business_dba: data.business_dba || null,
          business_type: data.business_type,
          business_tax_id: data.business_tax_id || null,
          business_years_in_operation: parseFloat(data.business_years_in_operation) || null,
          business_state_incorporated: data.business_state_incorporated || null,
          business_address: data.business_address,
          business_city: data.business_city,
          business_state: data.business_state,
          business_zip: data.business_zip,
          business_phone: data.business_phone,
          business_email: data.business_email,
          business_website: data.business_website || null,
          business_industry: data.business_industry || null,
          annual_revenue: parseFloat(data.annual_revenue) || null,
          owner_first_name: data.owner_first_name,
          owner_last_name: data.owner_last_name,
          owner_title: data.owner_title || null,
          owner_ownership_pct: parseFloat(data.owner_ownership_pct) || null,
          owner_home_address: data.owner_home_address,
          owner_home_city: data.owner_home_city,
          owner_home_state: data.owner_home_state,
          owner_home_zip: data.owner_home_zip,
          owner_cell: data.owner_cell,
          owner_email: data.owner_email,
          owner_dob: data.owner_dob || null,
          owner_ssn: data.owner_ssn || null,
          owner_ssn_last4: data.owner_ssn ? data.owner_ssn.replace(/\D/g, '').slice(-4) : null,
          owner_dl_state: data.owner_dl_state || null,
          equipment_description: data.equipment_description,
          equipment_year: data.equipment_year || null,
          equipment_make: data.equipment_make || null,
          equipment_model: data.equipment_model || null,
          equipment_condition: data.equipment_condition || null,
          equipment_vendor_type: data.equipment_vendor_type || null,
          equipment_vendor_name: data.equipment_vendor_name || null,
          equipment_vendor_phone: data.equipment_vendor_phone || null,
          equipment_vendor_email: data.equipment_vendor_email || null,
          equipment_total_cost: cost,
          equipment_down_payment: dpay,
          equipment_amount_financed: Math.max(0, cost - dpay),
          equipment_term_months: parseInt(data.equipment_term_months) || null,
          signature_data: signatureData!,
          signature_typed_name: signatureName,
          signature_user_agent: navigator.userAgent,
          consent_credit_pull: consentCredit,
          consent_terms: consentTerms
        })
        .select('id')
        .single();

      if (insertErr || !app) throw insertErr || new Error('Submission failed');
      const applicationId = app.id;

      const uploads: { file: File; category: string }[] = [
        ...drivers_license.map((f) => ({ file: f, category: 'drivers_license' })),
        ...equipment_quote.map((f) => ({ file: f, category: 'equipment_quote' })),
        ...bank_statements.map((f) => ({ file: f, category: 'bank_statement' })),
        ...voided_check.map((f) => ({ file: f, category: 'voided_check' }))
      ];

      for (const { file, category } of uploads) {
        const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
        const path = `${applicationId}/${category}/${Date.now()}_${safeName}`;
        const { error: uploadErr } = await supabase.storage
          .from('application-files')
          .upload(path, file, {
            cacheControl: '3600',
            upsert: false,
            contentType: file.type || undefined
          });
        if (uploadErr) throw uploadErr;

        const { error: fileRowErr } = await supabase.from('application_files').insert({
          application_id: applicationId,
          storage_path: path,
          original_filename: file.name,
          mime_type: file.type || null,
          size_bytes: file.size,
          category
        });
        if (fileRowErr) throw fileRowErr;
      }

      // Fire-and-forget: notify Gerry. The Edge Function handles email.
      try {
        await fetch(
          `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/notify-application`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`
            },
            body: JSON.stringify({ application_id: applicationId })
          }
        );
      } catch {
        // Email is best-effort. Application is already saved.
      }

      setSuccess(true);
    } catch (e: any) {
      setSubmitError(e?.message || 'Something went wrong submitting your application. Please call Gerry at 518.857.5206.');
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <div className="form-success">
        <div className="eyebrow no-rule" style={{ justifyContent: 'center' }}>
          <span style={{ color: 'var(--rust)' }}>Application Received</span>
        </div>
        <h2>Thank you. <em>We&apos;re on it.</em></h2>
        <p>
          Your application is in. Gerry or someone from his team will call you
          within one business day. If you need to reach us before then, call
          <a href="tel:5188575206" style={{ color: 'var(--forest)', fontWeight: 600 }}> 518.857.5206</a>.
        </p>
        <a href="/" className="btn-primary">Back to Home</a>
      </div>
    );
  }

  return (
    <>
      <div className="progress-bar">
        {STEPS.map((_, i) => (
          <div
            key={i}
            className={`progress-step ${i < step ? 'complete' : ''} ${i === step ? 'active' : ''}`}
          />
        ))}
      </div>
      <div className="progress-labels">
        {STEPS.map((label, i) => (
          <span key={i} className={i === step ? 'active' : ''}>{`0${i + 1} ${label}`}</span>
        ))}
      </div>

      <div className="form-card">
        <div className="form-step">
          <div className="step-meta">Step {step + 1} of {STEPS.length}</div>
          <h2>{stepTitle(step)}</h2>

          {step === 0 && <BusinessStep data={data} update={update} />}
          {step === 1 && <OwnerStep data={data} update={update} />}
          {step === 2 && <EquipmentStep data={data} update={update} />}
          {step === 3 && (
            <DocumentsStep
              drivers_license={drivers_license} setDriversLicense={setDriversLicense}
              equipment_quote={equipment_quote} setEquipmentQuote={setEquipmentQuote}
              bank_statements={bank_statements} setBankStatements={setBankStatements}
              voided_check={voided_check} setVoidedCheck={setVoidedCheck}
            />
          )}
          {step === 4 && (
            <SignStep
              data={data}
              signatureName={signatureName} setSignatureName={setSignatureName}
              setSignatureData={setSignatureData}
              consentCredit={consentCredit} setConsentCredit={setConsentCredit}
              consentTerms={consentTerms} setConsentTerms={setConsentTerms}
              drivers_license={drivers_license}
              equipment_quote={equipment_quote}
              bank_statements={bank_statements}
              voided_check={voided_check}
            />
          )}

          {submitError && (
            <div className="error" style={{ marginTop: 20, fontSize: 13 }}>{submitError}</div>
          )}

          <div className="form-nav">
            <button
              type="button" className="btn-back"
              onClick={back} disabled={step === 0 || submitting}
            >
              Back
            </button>
            {step < STEPS.length - 1 ? (
              <button type="button" className="btn-primary" onClick={next}>
                Continue
              </button>
            ) : (
              <button
                type="button" className="btn-primary amber"
                onClick={submit} disabled={submitting}
              >
                {submitting ? 'Submitting...' : 'Submit Application'}
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function stepTitle(step: number) {
  switch (step) {
    case 0: return <>Tell us about your <em>business.</em></>;
    case 1: return <>Now <em>about you.</em></>;
    case 2: return <>What are you <em>financing?</em></>;
    case 3: return <>Upload <em>supporting documents.</em></>;
    case 4: return <>Review &amp; <em>sign.</em></>;
    default: return null;
  }
}

function Field({
  label, name, type = 'text', required, value, onChange, placeholder, options, span
}: any) {
  return (
    <div className={`form-field ${span === 2 ? 'span-2' : ''}`}>
      <label>{label} {required && <span className="req">*</span>}</label>
      {options ? (
        <select value={value} onChange={onChange}>
          <option value="">— Select —</option>
          {options.map((o: { value: string; label: string }) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      ) : type === 'textarea' ? (
        <textarea value={value} onChange={onChange} placeholder={placeholder} />
      ) : (
        <input type={type} name={name} value={value} onChange={onChange} placeholder={placeholder} />
      )}
    </div>
  );
}

const STATES = ['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','PR','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'];

function formatSSN(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 9);
  if (digits.length <= 3) return digits;
  if (digits.length <= 5) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  return `${digits.slice(0, 3)}-${digits.slice(3, 5)}-${digits.slice(5)}`;
}

function BusinessStep({ data, update }: { data: FormState; update: any }) {
  return (
    <>
      <div className="form-grid">
        <Field span={2} label="Legal Business Name" required value={data.business_legal_name}
          onChange={(e: any) => update('business_legal_name', e.target.value)} />
        <Field label="DBA / Trade Name" value={data.business_dba}
          onChange={(e: any) => update('business_dba', e.target.value)} />
        <Field label="Business Type" required value={data.business_type}
          options={[
            { value: 'llc', label: 'LLC' },
            { value: 'corp', label: 'C-Corp' },
            { value: 's_corp', label: 'S-Corp' },
            { value: 'sole_prop', label: 'Sole Proprietor' },
            { value: 'partnership', label: 'Partnership' },
            { value: 'non_profit', label: 'Non-Profit' },
            { value: 'other', label: 'Other' }
          ]}
          onChange={(e: any) => update('business_type', e.target.value)} />
        <Field label="Federal Tax ID / EIN" value={data.business_tax_id}
          onChange={(e: any) => update('business_tax_id', e.target.value)} />
        <Field label="Years in Operation" type="number" value={data.business_years_in_operation}
          onChange={(e: any) => update('business_years_in_operation', e.target.value)} />
        <Field span={2} label="Business Address" required value={data.business_address}
          onChange={(e: any) => update('business_address', e.target.value)} />
      </div>
      <div className="form-grid cols-3" style={{ marginTop: 22 }}>
        <Field label="City" required value={data.business_city}
          onChange={(e: any) => update('business_city', e.target.value)} />
        <Field label="State" required value={data.business_state}
          options={STATES.map((s) => ({ value: s, label: s }))}
          onChange={(e: any) => update('business_state', e.target.value)} />
        <Field label="ZIP" required value={data.business_zip}
          onChange={(e: any) => update('business_zip', e.target.value)} />
      </div>
      <div className="form-grid" style={{ marginTop: 22 }}>
        <Field label="Business Phone" type="tel" required value={data.business_phone}
          onChange={(e: any) => update('business_phone', e.target.value)} />
        <Field label="Business Email" type="email" required value={data.business_email}
          onChange={(e: any) => update('business_email', e.target.value)} />
        <Field label="Website" type="url" value={data.business_website}
          onChange={(e: any) => update('business_website', e.target.value)} />
        <Field label="Industry" value={data.business_industry}
          placeholder="e.g. Trucking, Paving, Tree Care"
          onChange={(e: any) => update('business_industry', e.target.value)} />
        <Field span={2} label="Estimated Annual Revenue" type="number" value={data.annual_revenue}
          onChange={(e: any) => update('annual_revenue', e.target.value)} />
      </div>
    </>
  );
}

function OwnerStep({ data, update }: { data: FormState; update: any }) {
  return (
    <>
      <div className="form-grid">
        <Field label="First Name" required value={data.owner_first_name}
          onChange={(e: any) => update('owner_first_name', e.target.value)} />
        <Field label="Last Name" required value={data.owner_last_name}
          onChange={(e: any) => update('owner_last_name', e.target.value)} />
        <Field label="Title" placeholder="Owner, President, Member, etc."
          value={data.owner_title}
          onChange={(e: any) => update('owner_title', e.target.value)} />
        <Field label="Ownership %" type="number" value={data.owner_ownership_pct}
          onChange={(e: any) => update('owner_ownership_pct', e.target.value)} />
        <Field span={2} label="Home Address" required value={data.owner_home_address}
          onChange={(e: any) => update('owner_home_address', e.target.value)} />
      </div>
      <div className="form-grid cols-3" style={{ marginTop: 22 }}>
        <Field label="City" required value={data.owner_home_city}
          onChange={(e: any) => update('owner_home_city', e.target.value)} />
        <Field label="State" required value={data.owner_home_state}
          options={STATES.map((s) => ({ value: s, label: s }))}
          onChange={(e: any) => update('owner_home_state', e.target.value)} />
        <Field label="ZIP" required value={data.owner_home_zip}
          onChange={(e: any) => update('owner_home_zip', e.target.value)} />
      </div>
      <div className="form-grid" style={{ marginTop: 22 }}>
        <Field label="Cell Phone" type="tel" required value={data.owner_cell}
          onChange={(e: any) => update('owner_cell', e.target.value)} />
        <Field label="Personal Email" type="email" required value={data.owner_email}
          onChange={(e: any) => update('owner_email', e.target.value)} />
        <Field label="Date of Birth" type="date" required value={data.owner_dob}
          onChange={(e: any) => update('owner_dob', e.target.value)} />
        <Field label="Social Security Number" required type="text"
          placeholder="XXX-XX-XXXX"
          value={data.owner_ssn}
          onChange={(e: any) => update('owner_ssn', formatSSN(e.target.value))} />
        <Field label="DL State" value={data.owner_dl_state}
          options={STATES.map((s) => ({ value: s, label: s }))}
          onChange={(e: any) => update('owner_dl_state', e.target.value)} />
      </div>
      <p style={{ marginTop: 18, fontSize: 12, color: 'var(--ink-soft)', display: 'flex', alignItems: 'flex-start', gap: 8 }}>
        <span style={{ color: 'var(--forest)', fontWeight: 700, fontSize: 14 }}>🔒</span>
        <span>
          Your SSN is required by lenders to run credit and verify identity. It&apos;s transmitted over an encrypted connection, stored encrypted at rest in our private database, and only visible to ABC Leasing staff. We never sell or share your information outside the lender approval process.
        </span>
      </p>
    </>
  );
}

function EquipmentStep({ data, update }: { data: FormState; update: any }) {
  return (
    <>
      <div className="form-grid full">
        <Field label="Equipment Description" required type="textarea"
          placeholder="2018 International dump truck, 350 hp, 6x4..."
          value={data.equipment_description}
          onChange={(e: any) => update('equipment_description', e.target.value)} />
      </div>
      <div className="form-grid cols-3" style={{ marginTop: 22 }}>
        <Field label="Year" value={data.equipment_year}
          onChange={(e: any) => update('equipment_year', e.target.value)} />
        <Field label="Make" value={data.equipment_make}
          onChange={(e: any) => update('equipment_make', e.target.value)} />
        <Field label="Model" value={data.equipment_model}
          onChange={(e: any) => update('equipment_model', e.target.value)} />
      </div>
      <div className="form-grid" style={{ marginTop: 22 }}>
        <Field label="Condition" value={data.equipment_condition}
          options={[{ value: 'new', label: 'New' }, { value: 'used', label: 'Used' }]}
          onChange={(e: any) => update('equipment_condition', e.target.value)} />
        <Field label="Buying From" value={data.equipment_vendor_type}
          options={[
            { value: 'dealer', label: 'Dealer' },
            { value: 'private_party', label: 'Private Party' },
            { value: 'self', label: 'Self / Sale-Leaseback' },
            { value: 'other', label: 'Other' }
          ]}
          onChange={(e: any) => update('equipment_vendor_type', e.target.value)} />
        <Field label="Vendor / Seller Name" value={data.equipment_vendor_name}
          onChange={(e: any) => update('equipment_vendor_name', e.target.value)} />
        <Field label="Vendor Phone" type="tel" value={data.equipment_vendor_phone}
          onChange={(e: any) => update('equipment_vendor_phone', e.target.value)} />
        <Field span={2} label="Vendor Email" type="email" value={data.equipment_vendor_email}
          onChange={(e: any) => update('equipment_vendor_email', e.target.value)} />
        <Field label="Total Equipment Cost ($)" required type="number"
          value={data.equipment_total_cost}
          onChange={(e: any) => update('equipment_total_cost', e.target.value)} />
        <Field label="Down Payment ($)" type="number" value={data.equipment_down_payment}
          onChange={(e: any) => update('equipment_down_payment', e.target.value)} />
        <Field label="Term Preference (months)" type="number"
          value={data.equipment_term_months}
          onChange={(e: any) => update('equipment_term_months', e.target.value)} />
      </div>
    </>
  );
}

function DocumentsStep(props: {
  drivers_license: File[]; setDriversLicense: (f: File[]) => void;
  equipment_quote: File[]; setEquipmentQuote: (f: File[]) => void;
  bank_statements: File[]; setBankStatements: (f: File[]) => void;
  voided_check: File[]; setVoidedCheck: (f: File[]) => void;
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
      <FileUploadField
        label="Driver's License (front)" required
        accept="image/jpeg,image/png,image/heic,application/pdf"
        hint="JPG, PNG, HEIC, or PDF · max 20MB"
        files={props.drivers_license} onChange={props.setDriversLicense}
      />
      <FileUploadField
        label="Equipment Quote / Invoice" required
        accept="image/jpeg,image/png,application/pdf"
        hint="From your dealer or private seller · PDF preferred"
        files={props.equipment_quote} onChange={props.setEquipmentQuote}
      />
      <FileUploadField
        label="Bank Statements (last 3 months)"
        multiple
        accept="application/pdf,image/jpeg,image/png"
        hint="Optional for amounts under $250K · upload up to 3 PDFs"
        files={props.bank_statements} onChange={props.setBankStatements}
      />
      <FileUploadField
        label="Voided Check or Bank Letter"
        accept="image/jpeg,image/png,application/pdf"
        hint="Optional — needed at funding"
        files={props.voided_check} onChange={props.setVoidedCheck}
      />
    </div>
  );
}

function SignStep({
  data, signatureName, setSignatureName, setSignatureData,
  consentCredit, setConsentCredit, consentTerms, setConsentTerms,
  drivers_license, equipment_quote, bank_statements, voided_check
}: any) {
  const cost = parseFloat(data.equipment_total_cost) || 0;
  const dpay = parseFloat(data.equipment_down_payment) || 0;
  const financed = Math.max(0, cost - dpay);

  return (
    <>
      <div className="review-block">
        <h4>Business</h4>
        <div className="review-grid">
          <Row k="Legal Name" v={data.business_legal_name} />
          <Row k="Type" v={data.business_type?.toUpperCase()} />
          <Row k="Phone" v={data.business_phone} />
          <Row k="Email" v={data.business_email} />
          <Row k="City, State" v={`${data.business_city}, ${data.business_state}`} />
          <Row k="Years In Op" v={data.business_years_in_operation} />
        </div>
      </div>

      <div className="review-block">
        <h4>Owner</h4>
        <div className="review-grid">
          <Row k="Name" v={`${data.owner_first_name} ${data.owner_last_name}`} />
          <Row k="Title" v={data.owner_title} />
          <Row k="Cell" v={data.owner_cell} />
          <Row k="Email" v={data.owner_email} />
        </div>
      </div>

      <div className="review-block">
        <h4>Equipment</h4>
        <div className="review-grid">
          <Row k="Description" v={data.equipment_description} />
          <Row k="Condition" v={data.equipment_condition} />
          <Row k="Total Cost" v={`$${cost.toLocaleString()}`} />
          <Row k="Down Payment" v={`$${dpay.toLocaleString()}`} />
          <Row k="Amount Financed" v={`$${financed.toLocaleString()}`} />
          <Row k="Term" v={`${data.equipment_term_months} mo`} />
        </div>
      </div>

      <div className="review-block">
        <h4>Documents Attached</h4>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: 14 }}>
          <li>Driver&apos;s License: {drivers_license.length} file(s)</li>
          <li>Equipment Quote: {equipment_quote.length} file(s)</li>
          <li>Bank Statements: {bank_statements.length} file(s)</li>
          <li>Voided Check: {voided_check.length} file(s)</li>
        </ul>
      </div>

      <div style={{ marginTop: 36 }}>
        <h4 style={{ fontFamily: 'var(--font-plex-mono)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--rust)', marginBottom: 16 }}>
          Authorization & Signature
        </h4>

        <div className="consent-row">
          <input id="consent-credit" type="checkbox" checked={consentCredit}
            onChange={(e) => setConsentCredit(e.target.checked)} />
          <label htmlFor="consent-credit">
            I authorize ABC Leasing &amp; Financing and its lender partners to obtain consumer and business credit reports, verify references, and check the information provided in this application.
          </label>
        </div>

        <div className="consent-row">
          <input id="consent-terms" type="checkbox" checked={consentTerms}
            onChange={(e) => setConsentTerms(e.target.checked)} />
          <label htmlFor="consent-terms">
            I certify that all information provided in this application is true and complete to the best of my knowledge.
          </label>
        </div>

        <div className="form-grid full" style={{ marginTop: 26 }}>
          <div className="form-field">
            <label>Type Your Full Legal Name <span className="req">*</span></label>
            <input
              type="text" value={signatureName}
              onChange={(e) => setSignatureName(e.target.value)}
              placeholder="First Middle Last"
            />
          </div>
          <div className="form-field">
            <label>Sign Below <span className="req">*</span></label>
            <SignaturePad onChange={setSignatureData} />
          </div>
        </div>
      </div>
    </>
  );
}

function Row({ k, v }: { k: string; v: any }) {
  return (
    <div className="review-row">
      <span className="key">{k}</span>
      <span className="val">{v || '—'}</span>
    </div>
  );
}
