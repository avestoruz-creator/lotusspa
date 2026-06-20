import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-6">
        <h1 className="text-6xl font-bold text-muted-foreground">404</h1>
        <h2 className="text-2xl font-semibold">Page Not Found</h2>
        <div className="pt-4">
          <Link to="/" className="bg-primary text-primary-foreground px-6 py-3 rounded-full text-sm font-medium">
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
