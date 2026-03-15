import { PageLayout } from "@/components/Layouts/PageLayout.tsx";
import Dashboard from "@/pages/Dashboard/Dashboard.tsx";
import { IndividualFeedbackPage } from "@/pages/Feedback/IndividualFeedbackPage.tsx";
import { FeedbacksPage } from "@/pages/Feedbacks/FeedbacksPage.tsx";
import { LoginPage } from "@/pages/LoginPage.tsx";
import { createBrowserRouter, Navigate } from "react-router";
import { ProtectedRoute } from "./ProtectedRoute.tsx";
import { AuthCallbackPage } from "@/pages/AuthCallbackPage.tsx";
import { OnboardingCreateDomainPage } from "@/pages/OnboardingCreateDomainPage.tsx";
import Domains from "@/pages/Domains/Domains.tsx";
import Settings from "@/pages/Settings/Settings.tsx";
export const Router = createBrowserRouter([
  {
    path: "/",
    element: <PageLayout />,
    children: [
      {
        index: true,
        element: <Navigate to={"/login"} replace />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/auth/callback",
        element: <AuthCallbackPage />,
      },
      {
        path: "/onboarding/create-domain",
        element: <OnboardingCreateDomainPage />,
      },
      {
        path: "/dashboard",
        element: <ProtectedRoute />,
        children: [
          {
            path: "/dashboard/:domainId",
            element: <Dashboard />,
          },
          {
            path: "/dashboard/:domainId/domains",
            element: <Domains />,
          },
          {
            path: "/dashboard/:domainId/feedbacks",
            element: <FeedbacksPage />,
          },
          {
            path: "/dashboard/:domainId/feedbacks/:feedbackId",
            element: <IndividualFeedbackPage />,
          },
          {
            path: "/dashboard/:domainId/settings/",
            element: <Settings />,
          },
        ],
      },
    ],
  },
]);
