import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

const TO = 'jerodwcox@gmail.com';
const ENDPOINT = `https://formsubmit.co/ajax/${TO}`;
const EMPTY = { name: '', email: '', note: '' };

const MODES = {
  join: {
    title: 'Join the mailing list',
    intro:
      'Get my weekly updates from Thailand in your inbox. Adding a friend? Put their name and email in, and tell me who they are in the note.',
    subject: 'Mailing list sign-up',
    request: 'Please add this email to your mailing list.',
    button: 'Add Email',
    notePlaceholder: 'e.g. This is my friend Sarah from church',
    thanks: "Thank you! I'll add that email to the list, and the next update will be on its way.",
  },
  optout: {
    title: 'Opt out of the weekly updates',
    intro:
      "No hard feelings. Enter the email address you'd like taken off the list and I'll remove it before the next update.",
    subject: 'Mailing list opt-out',
    request: 'Please remove this email from your mailing list.',
    button: 'Opt Out',
    notePlaceholder: 'Anything you want me to know (optional)',
    thanks: "Done. I'll take that email off the list before the next update. Thank you for reading.",
  },
};

export default function MailingListSignup() {
  const ref = useRef(null);
  const { hash } = useLocation();
  const [mode, setMode] = useState(hash === '#optout' ? 'optout' : 'join');
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState('idle'); // idle | sending | done | mailto
  const m = MODES[mode];

  useEffect(() => {
    if (hash === '#join' || hash === '#optout') {
      setMode(hash === '#optout' ? 'optout' : 'join');
      setStatus('idle');
      ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [hash]);

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const switchTo = (next) => {
    setMode(next);
    setStatus('idle');
  };

  async function submit(e) {
    e.preventDefault();
    if (e.target._honey.value) return;
    setStatus('sending');
    const subject = `${m.subject}: ${form.email}`;
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject: subject,
          _template: 'table',
          Request: mode === 'join' ? 'Add to mailing list' : 'Remove from mailing list',
          Name: form.name || '(not given)',
          Email: form.email,
          Note: form.note || '(none)',
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || data.success === 'false' || data.success === false) throw new Error();
      setStatus('done');
      setForm(EMPTY);
    } catch {
      // Backup: open the visitor's email app with the request already written
      const body = `${m.request}\n\nName: ${form.name || '(not given)'}\nEmail: ${form.email}\nNote: ${form.note || '(none)'}`;
      window.location.href = `mailto:${TO}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setStatus('mailto');
    }
  }

  return (
    <div className="signup" id="join" ref={ref}>
      <div id="optout" />
      <div className="signup-tabs">
        <button type="button" className={mode === 'join' ? 'active' : ''} onClick={() => switchTo('join')}>
          Join
        </button>
        <button type="button" className={mode === 'optout' ? 'active' : ''} onClick={() => switchTo('optout')}>
          Opt out
        </button>
      </div>

      <h2>{m.title}</h2>
      <p>{m.intro}</p>

      {status === 'mailto' ? (
        <p className="signup-thanks">
          Your email app should open with your request already written. Just press Send. If it
          didn't open, email me at <a href={`mailto:${TO}`}>{TO}</a>.
        </p>
      ) : status === 'done' ? (
        <p className="signup-thanks">{m.thanks}</p>
      ) : (
        <form className="signup-form" onSubmit={submit}>
          <input type="text" name="_honey" className="signup-honey" tabIndex="-1" autoComplete="off" />
          <label>
            Name {mode === 'optout' && <span>(optional)</span>}
            <input name="name" value={form.name} onChange={update} required={mode === 'join'} />
          </label>
          <label>
            Email
            <input type="email" name="email" value={form.email} onChange={update} required />
          </label>
          <label className="signup-wide">
            Note <span>(optional)</span>
            <textarea name="note" rows="3" value={form.note} onChange={update} placeholder={m.notePlaceholder} />
          </label>
          <button className="btn btn-primary" type="submit" disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending…' : m.button}
          </button>
        </form>
      )}
    </div>
  );
}
