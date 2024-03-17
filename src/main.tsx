import "./styles/reset.css";
import "./styles/main.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { AuthProvider } from "./providers/AuthProvider";
import { Backstage } from "./modules/backstage";
import { CreateProfile } from "./modules/profile/create-profile";
import { CurrentProfileProvider } from "./providers/CurrentProfileProvider";
import { DeleteProfile } from "./modules/profile/delete-profile";
import { EditProfile } from "./modules/profile/edit-profile";
import { Home } from "./modules/home";
import { Login } from "./modules/login";
import { Profile } from "./modules/profile/profile";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { ROUTES } from "./constants";
import React from "react";
import ReactDOM from "react-dom/client";
import { setupI18n } from "./lang/setup";
import { ErrorBoundary } from "react-error-boundary";
import { NotFound } from "./components/NotFound/NotFound";
import { ErrorFallback } from "./components/ErrorBoundary/fallbackError";

const queryClient = new QueryClient();

setupI18n();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <CurrentProfileProvider>
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <Routes>
                <Route path="*" element={<NotFound />} />
                <Route
                  path="/"
                  element={
                    <ProtectedRoute role="user">
                      <Home />
                    </ProtectedRoute>
                  }
                />
                <Route path={ROUTES.LOGIN} element={<Login />} />
                <Route
                  path={ROUTES.PROFILE}
                  element={
                    <ProtectedRoute role="user">
                      <Profile />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path={ROUTES.CREATE_PROFILE}
                  element={
                    <ProtectedRoute role="user">
                      <CreateProfile />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path={ROUTES.EDIT_PROFILE}
                  element={
                    <ProtectedRoute role="user">
                      <EditProfile />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path={ROUTES.DELETE_PROFILE}
                  element={
                    <ProtectedRoute role="user">
                      <DeleteProfile />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path={ROUTES.BACKSTAGE}
                  element={
                    <ProtectedRoute role="admin">
                      <Backstage />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </ErrorBoundary>
          </CurrentProfileProvider>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
