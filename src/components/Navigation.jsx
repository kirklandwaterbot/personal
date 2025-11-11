import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { ArrowUpRightIcon, Cog6ToothIcon, Bars3BottomRightIcon } from "@heroicons/react/24/outline";

const sections = [
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "services", label: "Services" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" }
];

const Navigation = ({ personalInfo, accentGradient, onOpenSettings }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (hash) => {
    const element = document.getElementById(hash);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed inset-x-0 top-0 z-40 flex justify-center px-4 pb-4 pt-4 sm:px-6 lg:px-8"
    >
      <div
        className={`flex w-full max-w-6xl items-center justify-between rounded-2xl border border-slate-200/70 px-4 py-3 shadow-lg shadow-slate-200/70 backdrop-blur dark:border-white/10 dark:shadow-black/10 ${
          scrolled
            ? "bg-white/90 dark:bg-slate-900/80"
            : "bg-white/70 dark:bg-slate-900/40"
        }`}
      >
        <div className="flex items-center gap-3">
          <span
            className={`flex h-10 w-10 items-center justify-center rounded-full font-semibold text-slate-900 ${accentGradient}`}
          >
            NM
          </span>
          <div className="hidden flex-col text-sm sm:flex">
            <span className="font-semibold text-slate-900 dark:text-slate-100">
              {personalInfo.name}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">{personalInfo.role}</span>
          </div>
        </div>

        <nav className="hidden items-center gap-2 md:flex">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => handleNavClick(section.id)}
              className="rounded-full px-3 py-2 text-sm font-medium text-slate-600 transition hover:text-slate-900 dark:text-slate-200 dark:hover:text-white"
            >
              {section.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenSettings}
            className="hidden h-10 w-10 items-center justify-center rounded-full border border-slate-200/70 bg-white/80 text-slate-600 transition hover:border-slate-300 hover:text-slate-900 dark:border-white/10 dark:bg-slate-900/60 dark:text-slate-200 dark:hover:border-white/20 dark:hover:text-white sm:flex"
            aria-label="Open settings panel"
          >
            <Cog6ToothIcon className="h-5 w-5" />
          </button>

          <a
            href={personalInfo.resumeUrl}
            className={`hidden items-center gap-1 rounded-full px-4 py-2 text-sm font-semibold text-slate-900 transition hover:opacity-90 md:flex ${accentGradient}`}
          >
            Résumé
            <ArrowUpRightIcon className="h-4 w-4" />
          </a>

          <button
            onClick={() => handleNavClick("contact")}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200/70 bg-white/80 text-slate-600 transition hover:border-slate-300 hover:text-slate-900 dark:border-white/10 dark:bg-slate-900/70 dark:text-slate-200 dark:hover:border-white/20 dark:hover:text-white md:hidden"
          >
            <Bars3BottomRightIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </motion.header>
  );
};

Navigation.propTypes = {
  personalInfo: PropTypes.shape({
    name: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    resumeUrl: PropTypes.string
  }).isRequired,
  accentGradient: PropTypes.string.isRequired,
  onOpenSettings: PropTypes.func.isRequired
};

export default Navigation;
