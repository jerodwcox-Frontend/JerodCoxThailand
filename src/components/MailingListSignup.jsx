import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

const ENDPOINT = 'https://formsubmit.co/ajax/jerodwcox@gmail.com';

export default function MailingListSignup() {
  const ref = useRef(null);
  const { hash } = useLocation();
  const [form, setForm] = useState({ name: '', email: '', note: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | done | error

  useEffect(() => {
    if (hash === '#join' && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [hash]);

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  async function submit(e) {
    e.preventDefault();
    if (e.target._honey.value) return;
    setStatus('sending');
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject: `Mailing list sign-up: ${form.email}`,
          _template: 'table',
          Name: form.name,
          Email: form.email,
          Note: form.note || '(none)',
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || data.success === 'false' || data.success === false) throw new Error();
      setStatus('done');
      setForm({ name: '', email: '', note: '' });
    } catch {
      // Backup: open the visitor's email app with the sign-up already written
      const body = `Please add this email to your mailing list.\n\nName: ${form.name}\nEmail: ${form.email}\nNote: ${form.note || '(none)'}`;
      window.location.href = `mailto:jerodwcox@gmail.com?subject=${encodeURIComponent(
        `Mailing list sign-up: ${form.email}`
      )}&body=${encodeURIComponent(body)}`;
      setStatus('mailto');
    }
  }

  return (
    <div className="signup" id="join" ref={ref}>
      <h2>Join the mailing list</h2>
      <p>
        Get my weekly updates from Thailand in your inbox. Adding a friend? Put their name and
        email in, and tell me who they are in the note.
      </p>

      {status === 'mailto' ? (
        <p className="signup-thanks">
          Your email app should open with the sign-up already written. Just press Send. If it
          didn't open, email me at{' '}
          <a href="mailto:jerodwcox@gmail.com">jerodwcox@gmail.com</a> and I'll add you.
        </p>
      ) : status === 'done' ? (
        <p className="signup-thanks">
          Thank you! I'll add that email to the list, and the next update will be on its way.
        </p>
      ) : (
        <form className="signup-form" onSubmit={submit}>
          <input type="text" name="_honey" className="signup-honey" tabIndex="-1" autoComplete="off" />
          <label>
            Name
            <input name="name" value={form.name} onChange={update} required />
          </label>
          <label>
            Email
            <input type="email" name="email" value={form.email} onChange={update} required />
          </label>
          <label className="signup-wide">
            Note <span>(optional)</span>
            <textarea
              name="note"
              rows="3"
              value={form.note}
              onChange={update}
              placeholder="e.g. This is my friend Sarah from church"
            />
          </label>
          <button className="btn btn-primary" type="submit" disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending…' : 'Add Email'}
          </button>
          {status === 'error' && (
            <p className="signup-error">
              Something went wrong. Please try again, or email me at{' '}
              <a href="mailto:jerodwcox@gmail.com">jerodwcox@gmail.com</a>.
            </p>
          )}
        </form>
      )}
    </div>
  );
}
