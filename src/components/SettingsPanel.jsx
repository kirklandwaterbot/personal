import PropTypes from "prop-types";
import { Fragment } from "react";
import { motion } from "framer-motion";
import { Switch, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

const SettingsPanel = ({
  isOpen,
  onClose,
  settings,
  onChange,
  accentOptions,
  themeOptions
}) => {
  return (
    <Transition show={isOpen} as={Fragment}>
      <div className="fixed inset-0 z-50 flex justify-end">
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <button
            aria-label="Close settings"
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm dark:bg-slate-950/70"
          />
        </Transition.Child>

        <Transition.Child
          as={Fragment}
          enter="transform transition duration-300 ease-out"
          enterFrom="translate-x-full"
          enterTo="translate-x-0"
          leave="transform transition duration-200 ease-in"
          leaveFrom="translate-x-0"
          leaveTo="translate-x-full"
        >
          <motion.aside
            layout
            className="relative flex h-full w-full max-w-md flex-col gap-8 overflow-y-auto border-l border-slate-200/60 bg-white/95 px-6 py-8 text-slate-700 shadow-2xl shadow-slate-200/80 backdrop-blur dark:border-white/10 dark:bg-slate-950/95 dark:text-slate-200 dark:shadow-black/30"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  Personalize experience
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Tweak the look, feel, and motion to match your vibe.
                </p>
              </div>
              <button
                aria-label="Close settings panel"
                onClick={onClose}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200/70 bg-white/80 text-slate-600 transition hover:border-slate-300 hover:text-slate-900 dark:border-white/10 dark:bg-slate-900/70 dark:text-slate-200 dark:hover:border-white/20 dark:hover:text-white"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>

            <section className="space-y-4">
              <h3 className="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
                Theme
              </h3>
              <div className="grid gap-2">
                {themeOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => onChange("theme", option.id)}
                    className={`flex items-center justify-between rounded-2xl border px-4 py-3 text-sm transition ${
                      settings.theme === option.id
                        ? "border-slate-300 bg-white text-slate-900 shadow-sm dark:border-white/30 dark:bg-slate-900/70 dark:text-white"
                        : "border-slate-200 bg-white/70 text-slate-600 hover:border-slate-300 hover:bg-white dark:border-white/10 dark:bg-slate-900/50 dark:text-slate-300 dark:hover:border-white/20"
                    }`}
                  >
                    {option.label}
                    {settings.theme === option.id && (
                      <span className="text-xs font-semibold text-slate-500 dark:text-slate-300">
                        Active
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </section>

            <section className="space-y-4">
              <h3 className="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
                Accent
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {accentOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => onChange("accent", option)}
                    className={`relative h-24 overflow-hidden rounded-2xl border border-slate-200 transition focus:outline-none focus:ring-2 focus:ring-slate-300 dark:border-white/10 dark:focus:ring-white/40 ${
                      settings.accent.id === option.id
                        ? "ring-2 ring-slate-400 dark:ring-white/50"
                        : "hover:border-slate-300 dark:hover:border-white/20"
                    }`}
                    style={{
                      backgroundImage: `linear-gradient(135deg, ${option.value}55, transparent)`
                    }}
                  >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.18),transparent_60%)] dark:bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.18),transparent_60%)]" />
                    <div className="absolute inset-0 flex flex-col items-start justify-end p-4">
                      <span className="text-xs font-semibold text-slate-900 dark:text-white">
                        {option.label}
                      </span>
                      <span className="text-[10px] uppercase tracking-[0.3em] text-slate-700/70 dark:text-white/70">
                        {option.id}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </section>

            <section className="space-y-4">
              <h3 className="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
                Toggles
              </h3>
              <div className="space-y-3">
                <ToggleRow
                  label="Show ambient grid"
                  description="Layer a subtle grid to add depth and structure."
                  value={settings.showGrid}
                  onChange={(value) => onChange("showGrid", value)}
                />
                <ToggleRow
                  label="Enable glassmorphism"
                  description="Apply frosted surfaces with extra light scattering."
                  value={settings.glass}
                  onChange={(value) => onChange("glass", value)}
                />
                <ToggleRow
                  label="Reduce motion"
                  description="Tone down floating animations for calmer interactions."
                  value={settings.reducedMotion}
                  onChange={(value) => onChange("reducedMotion", value)}
                />
                <ToggleRow
                  label="Spotlight glow"
                  description="Adds luminous gradients to the spotlight section."
                  value={settings.spotlightGlow}
                  onChange={(value) => onChange("spotlightGlow", value)}
                />
              </div>
            </section>
          </motion.aside>
        </Transition.Child>
      </div>
    </Transition>
  );
};

const ToggleRow = ({ label, description, value, onChange }) => (
  <Switch.Group>
    <div className="flex items-start justify-between gap-4 rounded-2xl border border-slate-200/70 bg-white/80 px-4 py-3 transition hover:border-slate-300 dark:border-white/10 dark:bg-slate-900/60 dark:hover:border-white/20">
      <div>
        <Switch.Label className="text-sm font-semibold text-slate-900 dark:text-white">
          {label}
        </Switch.Label>
        <Switch.Description className="text-xs text-slate-600 dark:text-slate-400">
          {description}
        </Switch.Description>
      </div>
      <Switch
        checked={value}
        onChange={onChange}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
          value ? "bg-slate-900/80 dark:bg-white/70" : "bg-slate-300 dark:bg-slate-700"
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition dark:bg-slate-900 ${
            value ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </Switch>
    </div>
  </Switch.Group>
);

ToggleRow.propTypes = {
  label: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  value: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired
};

SettingsPanel.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  settings: PropTypes.shape({
    theme: PropTypes.string.isRequired,
    accent: PropTypes.shape({
      id: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired
    }).isRequired,
    showGrid: PropTypes.bool.isRequired,
    glass: PropTypes.bool.isRequired,
    reducedMotion: PropTypes.bool.isRequired,
    spotlightGlow: PropTypes.bool.isRequired
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  accentOptions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired
    })
  ).isRequired,
  themeOptions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired
    })
  ).isRequired
};

export default SettingsPanel;
