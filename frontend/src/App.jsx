import { useCallback, useEffect, useState } from 'react';
import Sidebar from './components/Sidebar';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Education from './components/Education';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ProgressBar from './components/ProgressBar';
import BackToTop from './components/BackToTop';
import LoadingScreen from './components/LoadingScreen';
import ErrorScreen from './components/ErrorScreen';
import { useTheme } from './hooks/useTheme';
import { api } from './api/client';

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const [data, setData] = useState(null);
  const [status, setStatus] = useState('loading'); // 'loading' | 'ready' | 'error'

  const loadData = useCallback(() => {
    setStatus('loading');
    api
      .getPortfolio()
      .then((res) => {
        setData(res);
        setStatus('ready');
      })
      .catch(() => {
        setStatus('error');
      });
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  if (status === 'loading') return <LoadingScreen />;
  if (status === 'error' || !data?.profile) return <ErrorScreen onRetry={loadData} />;

  return (
    <>
      <ProgressBar />
      <div className="layout">
        <Sidebar profile={data.profile} theme={theme} onToggleTheme={toggleTheme} />
        <main className="content">
          <About
            profile={data.profile}
            projectCount={data.projects.length}
            certCount={data.certifications.length}
          />
          <Skills skills={data.skills} />
          <Projects projects={data.projects} />
          <Experience experience={data.experience} />
          <Education education={data.education} />
          <Certifications certifications={data.certifications} />
          <Contact profile={data.profile} />
          <Footer />
        </main>
      </div>
      <BackToTop />
    </>
  );
}
