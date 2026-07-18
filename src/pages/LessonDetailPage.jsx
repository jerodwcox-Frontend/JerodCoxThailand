import { Link, useParams, Navigate } from 'react-router-dom';
import { lessons } from '../data';

function GemBlock({ block }) {
  return (
    <div className="lesson-gem">
      <span className="lesson-gem-title">💎 {block.title}</span>
      {block.text.split('\n').map((line, i) => (
        <p key={i}>{line}</p>
      ))}
      {block.items && (
        <ul>
          {block.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      )}
      {block.text2 &&
        block.text2.split('\n').map((line, i) => <p key={`t2-${i}`}>{line}</p>)}
    </div>
  );
}

function Block({ block, i }) {
  switch (block.type) {
    case 'h2':
      return <h2 key={i}>{block.text}</h2>;
    case 'h3':
      return <h3 key={i}>{block.text}</h3>;
    case 'list':
      return (
        <ul className="lesson-list" key={i}>
          {block.items.map((item, j) => (
            <li key={j}>{item}</li>
          ))}
        </ul>
      );
    case 'prompt':
      return (
        <p className="lesson-prompt" key={i}>
          {block.text}
        </p>
      );
    case 'gem':
      return <GemBlock block={block} key={i} />;
    default:
      return <p key={i}>{block.text}</p>;
  }
}

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
        {lesson.translationNote && <p className="lesson-translation-note">{lesson.translationNote}</p>}

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

        {lesson.centralQuestion && (
          <div className="central-question">
            <span className="central-question-label">Central Question</span>
            <p>{lesson.centralQuestion}</p>
          </div>
        )}

        <article className="update-body">
          {lesson.body.map((block, i) => (
            <Block block={block} i={i} key={i} />
          ))}
        </article>
      </div>
    </section>
  );
}
