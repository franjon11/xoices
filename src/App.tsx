import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router'
import GlobalLoader from './components/ui/GlobalLoader'
import MainLayout from './layouts/MainLayout'
import { PAGES } from './types/constants';

const Home = lazy(() => import('./pages/Home'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const QuizImporter = lazy(() => import('./pages/QuizImporter'));
const QuizPlayer = lazy(() => import('./pages/QuizPlayer'));
const QuizResults = lazy(() => import('./pages/QuizResults'));
const NotFound = lazy(() => import('./pages/NotFound'));

const QuizDetailsWrapper = lazy(() => import('./pages/QuizDetailsWrapper'));

const Pages = {
  [PAGES.HOME]: Home,
  [PAGES.DASHBOARD]: Dashboard,
  [PAGES.DETAILS_QUIZ]: QuizDetailsWrapper,
  [PAGES.IMPORT_QUIZ]: QuizImporter,
  [PAGES.PLAY_QUIZ]: QuizPlayer,
  [PAGES.RESULTS_QUIZ]: QuizResults,
  [PAGES.NOT_FOUND]: NotFound
}


function App() {

  return (
    <Suspense fallback={<GlobalLoader />}>
      <MainLayout>
        <Routes>
          {Object.entries(Pages).map(([path, Component]) => (
            <Route key={path} path={path} element={<Component />} />
          ))}
          <Route path="*" element={<Navigate to={PAGES.NOT_FOUND} replace />} />
        </Routes>
      </MainLayout>
    </Suspense>
  )
}

export default App
