import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import DesignWork from './components/DesignWork';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FadeIn from './components/FadeIn';
import RouteTracker from './components/RouteTracker';

// Admin pages are only ever used by one person (you) — no reason to ship
// them in the bundle every visitor downloads.
const AdminLogin = lazy(() => import('./pages/AdminLogin'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));

function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <FadeIn><About /></FadeIn>
        <FadeIn><Experience /></FadeIn>
        <FadeIn><Skills /></FadeIn>
        <FadeIn><Projects /></FadeIn>
        <FadeIn><DesignWork /></FadeIn>
        <FadeIn><Contact /></FadeIn>
      </main>
      <Footer />
    </>
  );
}

function PageFade({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  );
}

function AppContent() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <>
      {!isAdmin && <RouteTracker />}
      <Suspense fallback={<div className="min-h-screen bg-bg" />}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageFade><HomePage /></PageFade>} />
            <Route path="/admin/login" element={<PageFade><AdminLogin /></PageFade>} />
            <Route path="/admin" element={<PageFade><AdminDashboard /></PageFade>} />
          </Routes>
        </AnimatePresence>
      </Suspense>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="font-body">
        <AppContent />
      </div>
    </BrowserRouter>
  );
}
