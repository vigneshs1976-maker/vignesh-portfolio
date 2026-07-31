import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import RevealSection from './RevealSection';
import { api } from '../api/client';
import {
  IconMail, IconPhone, IconMapPin, IconBriefcase,
  IconCopy, IconCheck, IconAlert,
} from './icons';

function CopyField({ icon: Icon, label, value }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard API unavailable (e.g. insecure context) — value is
      // still visible and selectable, so this fails silently.
    }
  }

  return (
    <button type="button" className="info-block" onClick={handleCopy}>
      <span className="info-icon"><Icon /></span>
      <span className="info-text">
        <span className="info-label">{label}</span>
        <span className="info-value">{value}</span>
      </span>
      <span className="info-copy">{copied ? <IconCheck /> : <IconCopy />}</span>
    </button>
  );
}

export default function Contact({ profile }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [errorMsg, setErrorMsg] = useState('');

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg('');
    try {
      await api.sendContactMessage(form);
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      setStatus('error');
      if (err.detail && typeof err.detail === 'object') {
        const firstField = Object.values(err.detail)[0];
        setErrorMsg(Array.isArray(firstField) ? firstField[0] : String(firstField));
      } else {
        setErrorMsg("Couldn't send that just now — please try emailing directly instead.");
      }
    }
  }

  return (
    <section id="contact" className="section">
      <p className="section-eyebrow">#contact</p>
      <h2 className="section-heading">Let&rsquo;s Build Something Together</h2>
      <div className="section-body">
        <RevealSection>
          <p>
            I&rsquo;m actively looking for Full Stack Web Developer opportunities. Whether you
            have a role in mind or just want to talk shop, my inbox is open.
          </p>
        </RevealSection>

        <RevealSection delay={0.1} className="info-grid">
          <CopyField icon={IconMail} label="email" value={profile.email} />
          <CopyField icon={IconPhone} label="phone" value={profile.phone} />
          <div className="info-block info-block-static">
            <span className="info-icon"><IconMapPin /></span>
            <span className="info-text">
              <span className="info-label">location</span>
              <span className="info-value">{profile.location}</span>
            </span>
          </div>
          <div className="info-block info-block-static">
            <span className="info-icon"><IconBriefcase /></span>
            <span className="info-text">
              <span className="info-label">looking for</span>
              <span className="info-value">Full Stack Developer roles</span>
            </span>
          </div>
        </RevealSection>

        <RevealSection delay={0.16}>
          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <div className="form-row">
              <label htmlFor="name">Name</label>
              <input
                id="name" name="name" type="text" required
                value={form.name} onChange={handleChange}
                disabled={status === 'submitting'} placeholder="Your name"
              />
            </div>
            <div className="form-row">
              <label htmlFor="email">Email</label>
              <input
                id="email" name="email" type="email" required
                value={form.email} onChange={handleChange}
                disabled={status === 'submitting'} placeholder="you@example.com"
              />
            </div>
            <div className="form-row">
              <label htmlFor="message">Message</label>
              <textarea
                id="message" name="message" required rows={5}
                value={form.message} onChange={handleChange}
                disabled={status === 'submitting'} placeholder="What are you working on?"
              />
            </div>

            <div className="form-footer">
              <button type="submit" className="btn btn-primary" disabled={status === 'submitting'}>
                {status === 'submitting' ? 'Sending…' : 'Send Message'}
              </button>

              <AnimatePresence mode="wait">
                {status === 'success' && (
                  <motion.p
                    key="success"
                    className="form-feedback form-feedback-success"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    <IconCheck /> Message sent — I&rsquo;ll get back to you soon.
                  </motion.p>
                )}
                {status === 'error' && (
                  <motion.p
                    key="error"
                    className="form-feedback form-feedback-error"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    <IconAlert /> {errorMsg}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </form>
        </RevealSection>
      </div>
    </section>
  );
}
