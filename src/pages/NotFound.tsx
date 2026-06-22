import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function NotFound() {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-6">
        <h1 className="text-6xl font-bold text-muted-foreground font-sans">404</h1>
        <h2 className="text-2xl font-semibold font-sans">Page Not Found</h2>
        <Link to="/" className="inline-block mt-4 px-6 py-3 bg-primary text-primary-foreground rounded-full text-sm font-sans">
          Return to Home
        </Link>
      </div>
    </div>
  );
}
