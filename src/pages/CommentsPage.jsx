import PageBanner from '../components/PageBanner';
import MessageBox from '../components/MessageBox';

export default function CommentsPage() {
  return (
    <>
      <PageBanner
        eyebrow="Write to me"
        title="Prayer Requests & Comments"
        lede="Send a prayer request, a suggestion for the updates or lessons, or a word of encouragement. Every message comes straight to my inbox, and I read each one."
      />
      <MessageBox />
    </>
  );
}
