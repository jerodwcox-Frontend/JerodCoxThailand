import PageBanner from '../components/PageBanner';
import { SproutIcon } from '../components/icons';
import { support, remoteWork } from '../data';

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
    </>
  );
}
