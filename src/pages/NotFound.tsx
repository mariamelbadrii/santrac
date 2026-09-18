import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center px-4 py-24 text-center">
      <h1 className="text-3xl font-bold text-ink-900">Page not found</h1>
      <Link to="/" className="mt-4 text-brand-600">
        Back to home
      </Link>
    </div>
  );
}
