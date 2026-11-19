import { useState } from 'react';

const TO = 'jerodwcox@gmail.com';
const ENDPOINT = `https://formsubmit.co/ajax/${TO}`;
const KINDS = ['Prayer request', 'Suggestion', 'Comment'];
const EMPTY = { kind: KINDS[0], name: '', email: '', message: '' };

export default function MessageBox() {
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState('idle'); // idle | sending | done | mailto
  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  async function submit(e) {
    e.preventDefault();
    if (e.target._honey.value) return;
    setStatus('sending');
    const subject = `Website ${form.kind.toLowerCase()}${form.name ? ` from ${form.name}` : ''}`;
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject: subject,
          _template: 'table',
          ...(form.email ? { _replyto: form.email } : {}),
          Type: form.kind,
          Name: form.name || '(not given)',
          Email: form.email || '(not given)',
          Message: form.message,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || data.success === 'false' || data.success === false) throw new Error();
      setStatus('done');
      setForm(EMPTY);
    } catch {
      const body = `${form.kind}\n\n${form.message}\n\nName: ${form.name || '(not given)'}\nEmail: ${form.email || '(not given)'}`;
      window.location.href = `mailto:${TO}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setStatus('mailto');
    }
  }

  return (
    <section className="message-box" id="message">
      <div className="container">
        <div className="message-card">
          <div className="message-intro">
            <span className="eyebrow">Write to me</span>
            <h2>Prayer requests, suggestions, or comments</h2>
            <p>
              I'd love to hear from you. Share something I can pray for, an idea for the updates
              or lessons, or just a word of encouragement. It comes straight to me.
            </p>
          </div>

          {status === 'done' ? (
            <p className="message-thanks">
              Thank you! Your message is on its way to me. If it's a prayer request, I'll be praying.
            </p>
          ) : status === 'mailto' ? (
            <p className="message-thanks">
              Your email app should open with your message already written. Just press Send. If it
              didn't open, email me at <a href={`mailto:${TO}`}>{TO}</a>.
            </p>
          ) : (
            <form className="message-form" onSubmit={submit}>
              <input type="text" name="_honey" className="signup-honey" tabIndex="-1" autoComplete="off" />
              <div className="message-kinds" role="radiogroup" aria-label="Type of message">
                {KINDS.map((k) => (
                  <label key={k} className={form.kind === k ? 'active' : ''}>
                    <input type="radio" name="kind" value={k} checked={form.kind === k} onChange={update} />
                    {k}
                  </label>
                ))}
              </div>
              <textarea
                name="message"
                rows="4"
                required
                value={form.message}
                onChange={update}
                placeholder={
                  form.kind === 'Prayer request'
                    ? 'How can I pray for you?'
                    : form.kind === 'Suggestion'
                      ? 'What would you like to see or hear?'
                      : 'Your comment'
                }
              />
              <div className="message-row">
                <input name="name" value={form.name} onChange={update} placeholder="Your name (optional)" />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={update}
                  placeholder="Your email (optional, if you'd like a reply)"
                />
              </div>
              <button className="btn btn-primary" type="submit" disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending…' : 'Send'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
