import { Link, useParams, Navigate } from 'react-router-dom';
import { lessons } from '../data';

export default function LessonDetailPage() {
  const { slug } = useParams();
  const lesson = lessons.find((l) => l.slug === slug);

  if (!lesson) return <Navigate to="/lessons" replace />;

  return (
    <section className="update-detail">
      <div className="container">
        <Link className="back-link" to="/lessons">
          ← All Lessons
        </Link>

        <span className="update-week">Bible Study</span>
        <h1>{lesson.title}</h1>
        {lesson.subtitle && <p className="lesson-subtitle">{lesson.subtitle}</p>}

        {lesson.passages && (
          <div className="core-passages">
            <h3>Core Passages</h3>
            <div className="passage-chips">
              {lesson.passages.map((p) => (
                <span className="chip-static" key={p}>
                  {p}
                </span>
              ))}
            </div>
          </div>
        )}

        <article className="update-body">
          {lesson.body.map((block, i) =>
            block.type === 'h2' ? <h2 key={i}>{block.text}</h2> : <p key={i}>{block.text}</p>
          )}
        </article>
      </div>
    </section>
  );
}
