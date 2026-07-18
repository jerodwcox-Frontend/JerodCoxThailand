import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-media" />
      <div className="container">
        <div className="hero-content">
          <span className="eyebrow">Isan, Thailand</span>
          <h1>
            Carrying the Good News <em>Farther Inland</em>
          </h1>
          <p className="lede">
            Learning the language, sitting in the villages, and looking for where G-d is already
            at work — mission updates and lessons from Jerod Cox, serving in Thailand in
            partnership with Congregation Roeh Israel.
          </p>

          <div className="hero-actions">
            <Link className="btn btn-primary" to="/updates">
              Read the Latest Update
            </Link>
            <Link className="btn btn-ghost" to="/support">
              Support the Mission
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
