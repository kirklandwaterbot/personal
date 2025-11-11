import PropTypes from "prop-types";
import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader.jsx";

const TimelineSection = ({ timeline, accentGradient, reducedMotion }) => (
  <section id="timeline" className="relative">
    <SectionHeader
      eyebrow="Milestones"
      title="Moments that shaped my perspective."
      description="Notable highlights that continue to influence how I approach collaboration and problem solving."
      accentGradient={accentGradient}
    />

    <div className="mt-12 grid gap-8 lg:grid-cols-[0.6fr,1fr]">
      <div className="relative hidden justify-center lg:flex">
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative h-full w-[2px] rounded-full bg-gradient-to-b from-slate-300 via-slate-200/50 to-transparent dark:from-white/50 dark:via-white/10"
        >
          <div className="absolute inset-x-[-1.5rem] -top-10 flex items-center justify-center rounded-full border border-slate-200/70 bg-white/80 px-4 py-2 text-xs uppercase tracking-[0.3em] text-slate-700 dark:border-white/20 dark:bg-slate-900/70 dark:text-slate-200">
            Journey
          </div>
        </motion.div>
      </div>

      <div className="space-y-6">
        {timeline.map((entry, index) => (
          <motion.div
            key={entry.title}
            initial={reducedMotion ? false : { opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.05 }}
            className="group relative overflow-hidden rounded-3xl border border-slate-200/70 bg-white/80 px-6 py-5 text-sm text-slate-700 shadow-lg shadow-slate-200/70 transition duration-300 hover:border-slate-300 hover:bg-white/90 dark:border-white/10 dark:bg-slate-900/60 dark:text-slate-200 dark:shadow-black/15 dark:hover:border-white/20 dark:hover:bg-slate-900/80"
          >
            <div
              className={`absolute inset-x-6 -top-24 h-40 rounded-full opacity-0 blur-3xl transition duration-500 group-hover:opacity-90 ${accentGradient}`}
            />
            <div className="relative flex items-center gap-3 text-slate-700 dark:text-slate-200">
              <entry.icon className="h-6 w-6" />
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
                  {entry.period}
                </p>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                  {entry.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300">{entry.subtitle}</p>
              </div>
            </div>
            <p className="relative mt-4 text-slate-600 dark:text-slate-300">{entry.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

TimelineSection.propTypes = {
  timeline: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.elementType.isRequired,
      title: PropTypes.string.isRequired,
      subtitle: PropTypes.string.isRequired,
      period: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired
    })
  ).isRequired,
  accentGradient: PropTypes.string.isRequired,
  reducedMotion: PropTypes.bool
};

export default TimelineSection;
