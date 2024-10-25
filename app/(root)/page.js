// app/(root)/page.js
import ActivitySummary from './ActivitySummary';

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Activity Summary Parser</h1>
      <ActivitySummary />
    </div>
  );
}
