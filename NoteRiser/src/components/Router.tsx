import { MemberProvider } from '@/integrations';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import { ScrollToTop } from '@/lib/scroll-to-top';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HomePage from '@/components/pages/HomePage';
import QAPage from '@/components/pages/QAPage';
import QuizPage from '@/components/pages/QuizPage';
import FlashcardsPage from '@/components/pages/FlashcardsPage';
import ExportPage from '@/components/pages/ExportPage';

// Layout component that includes ScrollToTop, Header, and Footer
function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "qa",
        element: <QAPage />,
      },
      {
        path: "quiz",
        element: <QuizPage />,
      },
      {
        path: "flashcards",
        element: <FlashcardsPage />,
      },
      {
        path: "export",
        element: <ExportPage />,
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
], {
  basename: import.meta.env.BASE_NAME,
});

export default function AppRouter() {
  return (
    <MemberProvider>
      <RouterProvider router={router} />
    </MemberProvider>
  );
}
