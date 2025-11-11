import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Navigation from "./components/Navigation.jsx";
import HeroSection from "./components/HeroSection.jsx";
import MetricsSection from "./components/MetricsSection.jsx";
import AboutSection from "./components/AboutSection.jsx";
import ProjectsSection from "./components/ProjectsSection.jsx";
import ExperienceSection from "./components/ExperienceSection.jsx";
import ServicesSection from "./components/ServicesSection.jsx";
import SkillsSection from "./components/SkillsSection.jsx";
import SpotlightSection from "./components/SpotlightSection.jsx";
import TestimonialsSection from "./components/TestimonialsSection.jsx";
import TimelineSection from "./components/TimelineSection.jsx";
import ReadingListSection from "./components/ReadingListSection.jsx";
import ContactSection from "./components/ContactSection.jsx";
import Footer from "./components/Footer.jsx";
import SettingsPanel from "./components/SettingsPanel.jsx";
import FloatingDock from "./components/FloatingDock.jsx";
import BackgroundEffects from "./components/BackgroundEffects.jsx";
import {
  personalInfo,
  heroHighlights,
  metrics,
  specialization,
  experience,
  education,
  projects,
  services,
  skills,
  testimonials,
  timeline,
  spotlight,
  readingList,
  contactChannels
} from "./data/content.js";

const accentOptions = [
  {
    id: "iris",
    label: "Iris Aurora",
    value: "#c832ff",
    gradient: "from-purple-500 via-fuchsia-500 to-amber-400"
  },
  {
    id: "ocean",
    label: "Ocean Mist",
    value: "#38bdf8",
    gradient: "from-sky-400 via-cyan-400 to-indigo-500"
  },
  {
    id: "forest",
    label: "Forest Ember",
    value: "#34d399",
    gradient: "from-emerald-400 via-lime-400 to-amber-600"
  },
  {
    id: "sunset",
    label: "Sunset Bloom",
    value: "#f472b6",
    gradient: "from-pink-500 via-rose-500 to-orange-400"
  }
];

const themeOptions = [
  { id: "system", label: "Match system" },
  { id: "dark", label: "Dark" },
  { id: "light", label: "Light" }
];

const App = () => {
  const [settings, setSettings] = useState(() => ({
    theme: "system",
    accent: accentOptions[0],
    showGrid: true,
    glass: true,
    reducedMotion: false,
    spotlightGlow: true
  }));
  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const themeToApply =
      settings.theme === "system" ? (prefersDark ? "dark" : "light") : settings.theme;

    root.classList.toggle("dark", themeToApply === "dark");
  }, [settings.theme]);

  useEffect(() => {
    document.documentElement.style.setProperty("--accent-color", settings.accent.value);
  }, [settings.accent]);

  const accentGradient = useMemo(
    () => `bg-gradient-to-r ${settings.accent.gradient}`,
    [settings.accent]
  );

  const updateSetting = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <BackgroundEffects
        accent={settings.accent}
        showGrid={settings.showGrid}
        glass={settings.glass}
        reducedMotion={settings.reducedMotion}
      />

      <Navigation
        personalInfo={personalInfo}
        accentGradient={accentGradient}
        onOpenSettings={() => setSettingsOpen(true)}
      />

      <main className="relative mx-auto flex max-w-6xl flex-col gap-24 px-4 pb-32 pt-32 sm:px-6 lg:px-8">
        <HeroSection
          personalInfo={personalInfo}
          highlights={heroHighlights}
          specialization={specialization}
          accentGradient={accentGradient}
          reducedMotion={settings.reducedMotion}
        />

        <MetricsSection metrics={metrics} accentGradient={accentGradient} />

        <AboutSection
          personalInfo={personalInfo}
          spotlight={spotlight.slice(0, 3)}
          accentGradient={accentGradient}
          glass={settings.glass}
        />

        <ProjectsSection
          projects={projects}
          accentGradient={accentGradient}
          reducedMotion={settings.reducedMotion}
        />

        <ExperienceSection
          experience={experience}
          education={education}
          accentGradient={accentGradient}
          glass={settings.glass}
        />

        <ServicesSection
          services={services}
          accentGradient={accentGradient}
          reducedMotion={settings.reducedMotion}
        />

        <SkillsSection skills={skills} accentGradient={accentGradient} glass={settings.glass} />

        <SpotlightSection
          spotlight={spotlight}
          accentGradient={accentGradient}
          glow={settings.spotlightGlow}
        />

        <TestimonialsSection testimonials={testimonials} accentGradient={accentGradient} />

        <TimelineSection
          timeline={timeline}
          accentGradient={accentGradient}
          reducedMotion={settings.reducedMotion}
        />

        <ReadingListSection readingList={readingList} accentGradient={accentGradient} />

        <ContactSection
          personalInfo={personalInfo}
          channels={contactChannels}
          accentGradient={accentGradient}
        />
      </main>

      <Footer personalInfo={personalInfo} />

      <FloatingDock
        accentGradient={accentGradient}
        contact={personalInfo.email}
        onOpenSettings={() => setSettingsOpen(true)}
      />

      <AnimatePresence>
        {settingsOpen && (
          <SettingsPanel
            isOpen={settingsOpen}
            onClose={() => setSettingsOpen(false)}
            settings={settings}
            onChange={updateSetting}
            accentOptions={accentOptions}
            themeOptions={themeOptions}
          />
        )}
      </AnimatePresence>

      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-6 right-6 hidden h-12 w-12 items-center justify-center rounded-full border border-slate-300/80 bg-white/80 text-slate-700 shadow-lg shadow-slate-200/60 backdrop-blur dark:border-slate-700/70 dark:bg-slate-900/70 dark:text-slate-200 dark:shadow-glow-sm ${
          accentGradient
        } sm:flex`}
      >
        ↑
      </motion.button>
    </div>
  );
};

export default App;
