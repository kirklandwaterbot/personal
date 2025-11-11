import PropTypes from "prop-types";
import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader.jsx";

const AboutSection = ({ personalInfo, spotlight, accentGradient, glass }) => {
  return (
    <section id="about" className="relative">
      <SectionHeader
        eyebrow="About"
        title="Rooted in curiosity, driven by purpose."
        description={personalInfo.bio.join(" ")}
        accentGradient={accentGradient}
      />

      <div className="mt-10 grid gap-6 lg:grid-cols-[2fr,1fr]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className={`rounded-3xl border border-slate-200/70 p-8 text-base leading-relaxed text-slate-700 shadow-lg shadow-slate-200/70 dark:border-white/10 dark:text-slate-200 dark:shadow-black/10 ${
            glass ? "bg-white/80 backdrop-blur-lg dark:bg-slate-900/60" : "bg-white dark:bg-slate-900/80"
          }`}
        >
          <p>
            I&apos;m energized by the intersection of design, engineering, and storytelling. With
            every project, I seek to translate ambiguous ideas into thoughtful digital journeys that
            make people feel confident, heard, and inspired. I champion inclusive practices, pair
            programming, and rapid feedback loops to keep teams aligned and momentum strong.
          </p>
          <p className="mt-6 text-slate-600 dark:text-slate-300">
            Outside of work, you&apos;ll find me sketching speculative interfaces, hosting code &
            design workshops for college clubs, or experimenting with generative visuals. I&apos;m
            always exploring creative mediums to expand how I think about product building.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-slate-500 dark:text-slate-300">
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200/70 px-4 py-2 dark:border-white/10">
              Based in {personalInfo.location}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200/70 px-4 py-2 dark:border-white/10">
              {personalInfo.availability}
            </span>
          </div>
        </motion.div>

        <div className="space-y-4">
          {spotlight.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.05 }}
              className={`group relative overflow-hidden rounded-3xl border border-slate-200/70 p-5 text-sm shadow-lg shadow-slate-200/70 transition duration-300 dark:border-white/10 dark:shadow-black/10 ${
                glass
                  ? "bg-white/80 backdrop-blur dark:bg-slate-900/60"
                  : "bg-white dark:bg-slate-900/80"
              } hover:border-slate-300 dark:hover:border-white/20`}
            >
              <div
                className={`absolute inset-x-4 -top-16 h-32 rounded-full opacity-0 blur-3xl transition duration-500 group-hover:opacity-90 ${accentGradient}`}
              />
              <div className="relative flex items-center gap-3 text-slate-700 dark:text-slate-200">
                <item.icon className="h-5 w-5" />
                <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                  {item.title}
                </h3>
              </div>
              <p className="relative mt-3 text-xs text-slate-600 dark:text-slate-300">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

AboutSection.propTypes = {
  personalInfo: PropTypes.shape({
    bio: PropTypes.arrayOf(PropTypes.string).isRequired,
    availability: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired
  }).isRequired,
  spotlight: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      icon: PropTypes.elementType.isRequired
    })
  ).isRequired,
  accentGradient: PropTypes.string.isRequired,
  glass: PropTypes.bool
};

export default AboutSection;
