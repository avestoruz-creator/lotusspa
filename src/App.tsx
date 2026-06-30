import { Suspense, lazy } from "react";
import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./components/providers/theme.tsx";
import { QueryClientProvider } from "./components/providers/query-client.tsx";
import { Toaster } from "./components/ui/sonner.tsx";
import LocaleWrapper from "./components/providers/locale-wrapper.tsx";
import { SAVED_OR_DEFAULT_LOCALE, setLocaleInPath } from "./i18n";
import "./i18n";

const Index = lazy(() => import("./pages/Index.tsx"));
const ServicePage = lazy(() => import("./pages/service/page.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));

export default function App() {
  return (
    <QueryClientProvider>
      <ThemeProvider>
        <Toaster />
        <BrowserRouter>
          <Suspense fallback={<div />}>
            <Routes>
              <Route
                path="/"
                element={<Navigate to={setLocaleInPath(SAVED_OR_DEFAULT_LOCALE, "/")} replace />}
              />
              <Route
                path="/:lng"
                element={
                  <LocaleWrapper>
                    <Outlet />
                  </LocaleWrapper>
                }
              >
                <Route index element={<Index />} />
                <Route path="service/:key" element={<ServicePage />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
