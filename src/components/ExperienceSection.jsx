import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { BriefcaseIcon, AcademicCapIcon } from "@heroicons/react/24/outline";
import SectionHeader from "./SectionHeader.jsx";

const experienceShape = PropTypes.shape({
  company: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  period: PropTypes.string.isRequired,
  achievements: PropTypes.arrayOf(PropTypes.string).isRequired,
  stack: PropTypes.arrayOf(PropTypes.string).isRequired
});

const ExperienceCard = ({ item, accentGradient }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    className="group relative overflow-hidden rounded-3xl border border-slate-200/70 bg-white/80 p-8 text-slate-700 shadow-lg shadow-slate-200/70 transition duration-300 hover:border-slate-300 hover:bg-white/90 dark:border-white/10 dark:bg-slate-900/60 dark:text-slate-200 dark:shadow-black/15 dark:hover:border-white/20 dark:hover:bg-slate-900/80"
  >
    <div
      className={`absolute inset-x-4 -top-24 h-40 rounded-full opacity-0 blur-3xl transition duration-500 group-hover:opacity-90 ${accentGradient}`}
    />
    <div className="relative flex items-start justify-between gap-4">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
          {item.period}
        </p>
        <h3 className="mt-3 text-xl font-semibold text-slate-900 dark:text-white">{item.role}</h3>
        <p className="text-sm text-slate-600 dark:text-slate-300">{item.company}</p>
      </div>
      <div className="flex flex-wrap gap-2 text-xs text-slate-500 dark:text-slate-300">
        {item.stack.map((tech) => (
          <span
            key={tech}
            className="rounded-full border border-slate-200/70 bg-white/90 px-3 py-1 font-semibold dark:border-white/10 dark:bg-slate-900/60"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
    <ul className="relative mt-6 space-y-3 text-sm text-slate-600 dark:text-slate-300">
      {item.achievements.map((achievement) => (
        <li key={achievement} className="flex gap-3">
          <span className="mt-1 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-slate-400 dark:bg-slate-300" />
          {achievement}
        </li>
      ))}
    </ul>
  </motion.div>
);

ExperienceCard.propTypes = {
  item: experienceShape.isRequired,
  accentGradient: PropTypes.string.isRequired
};

const educationShape = PropTypes.shape({
  school: PropTypes.string.isRequired,
  program: PropTypes.string.isRequired,
  period: PropTypes.string.isRequired,
  highlights: PropTypes.arrayOf(PropTypes.string).isRequired
});

const EducationCard = ({ item, accentGradient }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
    className="group relative overflow-hidden rounded-3xl border border-slate-200/70 bg-white/80 p-8 text-slate-700 shadow-lg shadow-slate-200/70 transition duration-300 hover:border-slate-300 hover:bg-white/90 dark:border-white/10 dark:bg-slate-900/60 dark:text-slate-200 dark:shadow-black/15 dark:hover:border-white/20 dark:hover:bg-slate-900/80"
  >
    <div
      className={`absolute inset-x-4 -top-24 h-40 rounded-full opacity-0 blur-3xl transition duration-500 group-hover:opacity-90 ${accentGradient}`}
    />
    <p className="relative text-sm uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
      {item.period}
    </p>
    <h3 className="relative mt-3 text-xl font-semibold text-slate-900 dark:text-white">
      {item.school}
    </h3>
    <p className="relative text-sm text-slate-600 dark:text-slate-300">{item.program}</p>
    <ul className="relative mt-6 space-y-3 text-sm text-slate-600 dark:text-slate-300">
      {item.highlights.map((highlight) => (
        <li key={highlight} className="flex gap-3">
          <span className="mt-1 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-slate-400 dark:bg-slate-300" />
          {highlight}
        </li>
      ))}
    </ul>
  </motion.div>
);

EducationCard.propTypes = {
  item: educationShape.isRequired,
  accentGradient: PropTypes.string.isRequired
};

const ExperienceSection = ({ experience, education, accentGradient }) => {
  return (
    <section id="experience" className="relative">
      <SectionHeader
        eyebrow="Journey"
        title="Experience & education"
        description="Every role taught me to lead with empathy, prototype quickly, and leave things better than I found them."
        accentGradient={accentGradient}
      />

      <div className="mt-12 grid gap-8 lg:grid-cols-5">
        <div className="space-y-6 lg:col-span-3">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
            <BriefcaseIcon className="h-4 w-4" />
            Experience
          </div>
          {experience.map((item) => (
            <ExperienceCard key={item.company} item={item} accentGradient={accentGradient} />
          ))}
        </div>

        <div className="space-y-6 lg:col-span-2">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
            <AcademicCapIcon className="h-4 w-4" />
            Education
          </div>
          {education.map((item) => (
            <EducationCard key={item.school} item={item} accentGradient={accentGradient} />
          ))}
        </div>
      </div>
    </section>
  );
};

ExperienceSection.propTypes = {
  experience: PropTypes.arrayOf(experienceShape).isRequired,
  education: PropTypes.arrayOf(educationShape).isRequired,
  accentGradient: PropTypes.string.isRequired
};

export default ExperienceSection;
