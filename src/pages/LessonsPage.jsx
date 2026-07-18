import PageBanner from '../components/PageBanner';
import { PlayIcon } from '../components/icons';

export default function LessonsPage() {
  return (
    <>
      <PageBanner
        eyebrow="Teaching"
        title="Lessons"
        lede="Recorded teaching and discipleship lessons from the field."
      />

      <section className="lessons-empty">
        <div className="container">
          <div className="empty-card">
            <span className="empty-icon">
              <PlayIcon />
            </span>
            <h3>Coming Soon</h3>
            <p>
              Recorded lessons are on the way — check back soon, or subscribe to updates to be
              notified when the first lessons are posted.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
