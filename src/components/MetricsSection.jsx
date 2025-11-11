import PropTypes from "prop-types";
import { motion } from "framer-motion";

const MetricsSection = ({ metrics, accentGradient }) => (
  <section id="metrics" className="relative">
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric, index) => (
        <motion.div
          key={metric.label}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.05 }}
          className="group relative overflow-hidden rounded-2xl border border-slate-200/70 bg-white/80 p-6 text-slate-700 backdrop-blur transition duration-300 hover:border-slate-300 hover:bg-white/90 dark:border-white/10 dark:bg-slate-900/40 dark:text-slate-200 dark:hover:border-white/20 dark:hover:bg-slate-900/70"
        >
          <div
            className={`absolute inset-x-4 -top-24 h-40 rounded-full opacity-0 blur-3xl transition duration-500 group-hover:opacity-80 ${accentGradient}`}
          />
          <metric.icon className="relative h-6 w-6 text-slate-700 dark:text-slate-200" />
          <p className="relative mt-6 text-4xl font-bold text-slate-900 dark:text-white">
            {metric.value}
          </p>
          <p className="relative mt-2 text-sm font-medium text-slate-600 dark:text-slate-300">
            {metric.label}
          </p>
        </motion.div>
      ))}
    </div>
  </section>
);

MetricsSection.propTypes = {
  metrics: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      icon: PropTypes.elementType.isRequired
    })
  ).isRequired,
  accentGradient: PropTypes.string.isRequired
};

export default MetricsSection;
