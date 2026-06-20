import { Suspense } from "react";
import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";
import { DefaultProviders } from "./components/providers/default.tsx";
import LocaleWrapper from "./components/providers/locale-wrapper.tsx";
import { SAVED_OR_DEFAULT_LOCALE, setLocaleInPath } from "./i18n";
import "./i18n";
import AuthCallback from "./pages/auth/Callback.tsx";
import Index from "./pages/Index.tsx";
import ServicePage from "./pages/service/page.tsx";
import NotFound from "./pages/NotFound.tsx";

export default function App() {
  return (
    <DefaultProviders>
      <BrowserRouter>
        <Suspense fallback={<div />}>
          <Routes>
            {/* Root: redirect to saved/default locale */}
            <Route
              path="/"
              element={<Navigate to={setLocaleInPath(SAVED_OR_DEFAULT_LOCALE, "/")} replace />}
            />

            {/* Non-localized routes */}
            <Route path="/auth/callback" element={<AuthCallback />} />

            {/* All localized routes under /:lng */}
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
    </DefaultProviders>
  );
}
