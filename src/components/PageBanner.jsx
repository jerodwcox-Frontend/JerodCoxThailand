export default function PageBanner({ eyebrow, title, lede }) {
  return (
    <section className="page-banner">
      <div className="container">
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h1>{title}</h1>
        {lede && <p>{lede}</p>}
      </div>
    </section>
  );
}
