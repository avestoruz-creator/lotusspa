import { Suspense } from "react";
import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";
import LocaleWrapper from "./components/providers/locale-wrapper.tsx";
import { ThemeProvider } from "./components/providers/theme.tsx";
import { Toaster } from "sonner";
import { SAVED_OR_DEFAULT_LOCALE, setLocaleInPath } from "./i18n";
import "./i18n";
import Index from "./pages/Index.tsx";
import ServicePage from "./pages/service/page.tsx";
import NotFound from "./pages/NotFound.tsx";

export default function App() {
  return (
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
  );
}
