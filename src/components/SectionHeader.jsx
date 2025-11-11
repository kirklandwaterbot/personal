import PropTypes from "prop-types";
import { motion } from "framer-motion";

const alignmentOptions = {
  left: "text-left",
  center: "text-center",
  right: "text-right"
};

const SectionHeader = ({ eyebrow, title, description, accentGradient, align = "left" }) => (
  <div className={`mx-auto max-w-4xl ${alignmentOptions[align] ?? alignmentOptions.left}`}>
    {eyebrow && (
      <motion.span
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`inline-flex items-center gap-2 rounded-full border border-slate-200/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate-600 dark:border-white/10 dark:text-slate-300 ${accentGradient}`}
      >
        {eyebrow}
      </motion.span>
    )}
    <motion.h2
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
      className="mt-6 text-3xl font-semibold text-slate-900 dark:text-white sm:text-4xl"
    >
      {title}
    </motion.h2>
    {description && (
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
        className="mt-4 text-base text-slate-600 dark:text-slate-300"
      >
        {description}
      </motion.p>
    )}
  </div>
);

SectionHeader.propTypes = {
  eyebrow: PropTypes.string,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  accentGradient: PropTypes.string,
  align: PropTypes.oneOf(["left", "center", "right"])
};

export default SectionHeader;
