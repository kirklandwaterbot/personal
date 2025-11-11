import PropTypes from "prop-types";
import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader.jsx";

const SpotlightSection = ({ spotlight, accentGradient, glow }) => (
  <section id="spotlight" className="relative">
    <div
      className={`absolute inset-0 -z-10 rounded-[3rem] border border-slate-200/60 bg-white/70 dark:border-white/5 ${
        glow ? "backdrop-blur-xl dark:bg-slate-900/50" : "bg-white dark:bg-slate-900/70"
      }`}
    >
      {glow && (
        <div className={`absolute inset-4 rounded-[2.5rem] opacity-40 blur-3xl ${accentGradient}`} />
      )}
    </div>

    <div className="space-y-12 px-6 py-12 sm:px-10">
      <SectionHeader
        eyebrow="Spotlight"
        title="Principles that guide my craft."
        description="These pillars influence every decision I make, from early research to final polish."
        accentGradient={accentGradient}
        align="center"
      />

      <div className="grid gap-6 lg:grid-cols-3">
        {spotlight.map((item, index) => (
        <motion.div
          key={item.title}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.05 }}
          className="group relative overflow-hidden rounded-3xl border border-slate-200/70 bg-white/80 p-6 text-sm text-slate-700 shadow-xl shadow-slate-200/70 transition duration-300 hover:border-slate-300 hover:bg-white/90 dark:border-white/10 dark:bg-slate-900/70 dark:text-slate-200 dark:shadow-black/20 dark:hover:border-white/20 dark:hover:bg-slate-900/80"
        >
          <div
            className={`absolute inset-x-6 -top-24 h-40 rounded-full opacity-0 blur-3xl transition duration-500 group-hover:opacity-90 ${accentGradient}`}
          />
          <div className="relative flex items-center gap-3">
            <item.icon className="h-6 w-6 text-slate-700 dark:text-slate-200" />
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{item.title}</h3>
          </div>
          <p className="relative mt-4 text-slate-600 dark:text-slate-300">
            {item.description}
          </p>
        </motion.div>
        ))}
      </div>
    </div>
  </section>
);

SpotlightSection.propTypes = {
  spotlight: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      icon: PropTypes.elementType.isRequired
    })
  ).isRequired,
  accentGradient: PropTypes.string.isRequired,
  glow: PropTypes.bool
};

export default SpotlightSection;
