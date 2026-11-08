import PageBanner from '../components/PageBanner';
import {
  SproutIcon,
  MailIcon,
  PhoneIcon,
  ChatIcon,
  PeopleIcon,
  PinIcon,
  ClockIcon,
} from '../components/icons';
import { support, remoteWork, contact } from '../data';

const contactMethods = [
  {
    icon: PhoneIcon,
    label: 'Phone',
    value: contact.phone,
    href: contact.phoneHref,
  },
  {
    icon: ChatIcon,
    label: 'WhatsApp',
    value: contact.phone,
    href: contact.whatsappHref,
    external: true,
  },
  {
    icon: MailIcon,
    label: 'Email',
    value: contact.email,
    href: `mailto:${contact.email}`,
  },
  contact.facebook && {
    icon: PeopleIcon,
    label: 'Facebook',
    value: 'Follow along on Facebook',
    href: contact.facebook,
    external: true,
  },
  {
    icon: PinIcon,
    label: 'Mail',
    value: contact.address.join(', '),
  },
].filter(Boolean);

export default function AboutPage() {
  return (
    <>
      <PageBanner
        eyebrow="The calling"
        title="About the Work in Thailand"
        lede="Learning the language, sitting in the villages, and looking for where G-d is already at work."
      />

      <section className="about" id="about">
        <div className="container">
          <div className="about-media">
            <SproutIcon className="mark" />
          </div>

          <div className="about-copy">
            <div className="section-head">
              <span className="eyebrow">Who is serving</span>
              <h2>Jerod Cox</h2>
            </div>
            <p>
              Jerod is currently serving in Thailand, learning Thai and the Isan dialect spoken
              across northeastern Thailand, in partnership with{' '}
              <a href={support.throughRoehIsrael} target="_blank" rel="noopener noreferrer">
                Congregation Roeh Israel
              </a>
              . The work centers on building real relationships — sitting in homes, learning the
              language well enough to hear the questions people are actually asking, and sharing
              the Good News of Y'shua in a way that leads to lasting discipleship rather than a
              single encounter.
            </p>
            <p>
              A particular burden rests on Isan, the region that makes up roughly a third of
              Thailand's population and villages, where the visible presence of believers grows
              thin the farther one travels from Bangkok. The goal is not simply to hand someone a
              tract, but to remain — to be present between the scattering of the seed and the
              moment a heart begins to open.
            </p>
            <p>
              Jerod also works as a front-end web developer (HTML, CSS, JavaScript, React, APIs,
              responsive design), taking on remote and freelance projects to help support the
              mission while serving on the field.
            </p>
            <p>
              <strong>Ongoing website maintenance is also available on a monthly retainer.</strong>{' '}
              That covers updates, content changes, bug fixes, security and dependency updates,
              performance checks, and general support, so your site stays current and running
              smoothly without you having to manage it.{' '}
              <a href="#contact">Get in touch</a> to talk about your site.
            </p>
            {remoteWork.projects.length > 0 && (
              <div className="portfolio-links">
                {remoteWork.projects.map((p) => (
                  <a key={p.href} href={p.href} target="_blank" rel="noopener noreferrer" className="chip-link">
                    {p.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="contact" id="contact">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Get in touch</span>
            <h2>Contact Jerod</h2>
            <p className="contact-lede">
              Questions, prayer requests, a web project, or just want to say hello? Reach out any
              time. WhatsApp is the best way to reach me while I'm in Thailand.
            </p>
          </div>

          <div className="contact-grid">
            {contactMethods.map(({ icon: Icon, label, value, href, external }) => {
              const body = (
                <>
                  <span className="contact-icon">
                    <Icon width="22" height="22" />
                  </span>
                  <span className="contact-text">
                    <span className="contact-label">{label}</span>
                    <span className="contact-value">{value}</span>
                  </span>
                </>
              );
              return href ? (
                <a
                  key={label}
                  className="contact-card"
                  href={href}
                  {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  {body}
                </a>
              ) : (
                <div key={label} className="contact-card">
                  {body}
                </div>
              );
            })}
          </div>

          <p className="contact-note">
            <ClockIcon width="16" height="16" /> {contact.timezone}
          </p>
        </div>
      </section>
    </>
  );
}
