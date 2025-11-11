import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { Cog6ToothIcon, EnvelopeIcon } from "@heroicons/react/24/outline";

const FloatingDock = ({ accentGradient, contact, onOpenSettings }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    className="fixed bottom-6 left-1/2 z-40 hidden -translate-x-1/2 rounded-full border border-slate-200/70 bg-white/80 px-4 py-2 text-slate-700 shadow-xl shadow-slate-200/70 backdrop-blur dark:border-white/10 dark:bg-slate-900/80 dark:text-slate-200 dark:shadow-black/20 md:flex"
  >
    <div className="flex items-center gap-3 text-xs">
      <span
        className={`inline-flex items-center gap-2 rounded-full px-3 py-2 font-semibold text-slate-900 ${accentGradient}`}
      >
        <EnvelopeIcon className="h-4 w-4" />
        {contact}
      </span>
      <button
        onClick={onOpenSettings}
        className="inline-flex items-center gap-2 rounded-full border border-slate-200/70 px-3 py-2 font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-white/80 dark:border-white/10 dark:text-slate-200 dark:hover:border-white/20 dark:hover:bg-white/5"
      >
        <Cog6ToothIcon className="h-4 w-4" />
        Settings
      </button>
    </div>
  </motion.div>
);

FloatingDock.propTypes = {
  accentGradient: PropTypes.string.isRequired,
  contact: PropTypes.string.isRequired,
  onOpenSettings: PropTypes.func.isRequired
};

export default FloatingDock;
