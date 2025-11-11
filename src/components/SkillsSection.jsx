import PropTypes from "prop-types";
import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader.jsx";

const SkillsSection = ({ skills, accentGradient, glass }) => (
  <section id="skills" className="relative">
    <SectionHeader
      eyebrow="Toolkit"
      title="Technologies & crafts in constant rotation."
      description="I thrive in environments that combine rigorous engineering with intentional design. Here are a few areas where I bring confidence and curiosity."
      accentGradient={accentGradient}
    />

    <div className="mt-12 grid gap-6 lg:grid-cols-3">
      {skills.map((group) => (
        <motion.div
          key={group.category}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className={`rounded-3xl border border-slate-200/70 p-6 text-slate-700 shadow-lg shadow-slate-200/70 dark:border-white/10 dark:text-slate-200 dark:shadow-black/15 ${
            glass
              ? "bg-white/80 backdrop-blur dark:bg-slate-900/60"
              : "bg-white dark:bg-slate-900/80"
          }`}
        >
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
            {group.category}
          </h3>
          <div className="mt-6 space-y-5">
            {group.items.map((item) => (
              <div key={item.label}>
                <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-300">
                  <span>{item.label}</span>
                  <span>{item.level}%</span>
                </div>
                <div className="mt-2 h-2 w-full rounded-full bg-slate-200 dark:bg-slate-700/60">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${item.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className={`h-full rounded-full ${accentGradient}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  </section>
);

SkillsSection.propTypes = {
  skills: PropTypes.arrayOf(
    PropTypes.shape({
      category: PropTypes.string.isRequired,
      items: PropTypes.arrayOf(
        PropTypes.shape({
          label: PropTypes.string.isRequired,
          level: PropTypes.number.isRequired
        })
      ).isRequired
    })
  ).isRequired,
  accentGradient: PropTypes.string.isRequired,
  glass: PropTypes.bool
};

export default SkillsSection;
