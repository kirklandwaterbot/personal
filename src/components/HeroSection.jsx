import PropTypes from "prop-types";
import { motion } from "framer-motion";
import {
  ArrowDownRightIcon,
  ArrowUpRightIcon,
  PlayCircleIcon,
  SparklesIcon
} from "@heroicons/react/24/outline";

const heroVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};

const HeroSection = ({
  personalInfo,
  highlights,
  specialization,
  accentGradient,
  reducedMotion
}) => {
  const headline = personalInfo.headline;

  return (
    <section id="home" className="relative flex flex-col gap-16 lg:flex-row lg:items-center">
      <div className="relative z-10 flex-1 space-y-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={heroVariants}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="inline-flex items-center gap-2 rounded-full border border-slate-200/70 bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600 dark:border-white/10 dark:bg-slate-900/60 dark:text-slate-300"
        >
          <SparklesIcon className="h-4 w-4" />
          Currently crafting delightful experiences
        </motion.div>

        <motion.h1
          initial={reducedMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          className="text-4xl font-bold leading-tight text-slate-900 dark:text-white sm:text-5xl md:text-6xl"
        >
          {personalInfo.name}
          <span className="mt-4 block bg-gradient-to-r from-slate-700 via-slate-900 to-slate-700 bg-clip-text text-3xl font-extrabold text-transparent dark:from-slate-200 dark:via-white dark:to-slate-300 sm:text-4xl">
            {personalInfo.role}
          </span>
        </motion.h1>

        <motion.p
          initial={reducedMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="max-w-2xl text-lg text-slate-600 dark:text-slate-300"
        >
          {headline}
        </motion.p>

        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
          className="flex flex-wrap gap-3"
        >
          <a
            href="#projects"
            className={`group inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-slate-900 transition duration-300 hover:shadow-glow-md ${accentGradient}`}
          >
            Explore projects
            <ArrowUpRightIcon className="h-4 w-4 transition group-hover:translate-x-1 group-hover:-translate-y-1" />
          </a>
          <a
            href="https://calendly.com/"
            className="group inline-flex items-center gap-2 rounded-full border border-slate-200/70 px-5 py-3 text-sm font-semibold text-slate-700 transition duration-300 hover:border-slate-300 hover:bg-white/70 dark:border-white/10 dark:text-slate-200 dark:hover:border-white/20 dark:hover:bg-white/5"
          >
            Watch intro reel
            <PlayCircleIcon className="h-5 w-5 transition group-hover:scale-110" />
          </a>
        </motion.div>

        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
          className="grid gap-4 sm:grid-cols-3"
        >
          {highlights.map((item) => (
            <div
              key={item.title}
          className="group relative overflow-hidden rounded-2xl border border-slate-200/70 bg-white/80 p-4 text-slate-700 transition duration-300 hover:border-slate-300 hover:bg-white/90 dark:border-white/10 dark:bg-slate-900/60 dark:text-slate-200 dark:hover:border-white/20 dark:hover:bg-slate-900/80"
        >
          <div
            className={`absolute inset-x-2 -top-12 h-32 rounded-full opacity-0 blur-3xl transition duration-300 group-hover:opacity-100 ${accentGradient}`}
          />
          <item.icon className="relative h-6 w-6 text-slate-700 dark:text-slate-200" />
          <h3 className="relative mt-3 text-sm font-semibold text-slate-900 dark:text-white">
            {item.title}
          </h3>
          <p className="relative mt-2 text-xs text-slate-600 dark:text-slate-400">
            {item.description}
          </p>
        </div>
          ))}
        </motion.div>
      </div>

      <div className="relative flex flex-1 justify-center">
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          className="relative w-full max-w-md rounded-[2.5rem] border border-slate-200/70 bg-white/80 p-6 text-slate-700 shadow-2xl shadow-slate-200/70 backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/40 dark:text-slate-200 dark:shadow-black/20"
        >
          <div className="absolute inset-x-10 -top-36 h-60 rounded-full opacity-70 blur-3xl sm:opacity-80 lg:opacity-90" />
          <div className="relative space-y-5">
            {specialization.map((item, index) => (
              <motion.div
                key={item.title}
                initial={reducedMotion ? false : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1, ease: "easeOut" }}
              className="group rounded-2xl border border-slate-200/70 bg-white/80 p-4 text-sm text-slate-700 transition duration-300 hover:border-slate-300 hover:bg-white/90 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:border-white/20 dark:hover:bg-white/10"
            >
              <div className="flex items-center gap-3">
                <item.icon className="h-5 w-5 text-slate-700 dark:text-slate-200" />
                <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                  {item.title}
                </h3>
              </div>
              <p className="mt-3 text-xs text-slate-600 dark:text-slate-300">{item.description}</p>
            </motion.div>
            ))}
          </div>

          <motion.div
            className="mt-6 flex items-center justify-between rounded-2xl border border-slate-200/70 bg-white/80 px-4 py-3 text-xs text-slate-600 dark:border-white/10 dark:bg-slate-900/60 dark:text-slate-300"
            initial={reducedMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
          >
            <span className="flex items-center gap-2 font-medium text-slate-700 dark:text-slate-200">
              <ArrowDownRightIcon className="h-4 w-4" />
              Availability
            </span>
            <span className={`rounded-full px-3 py-1 text-slate-900 ${accentGradient}`}>
              {personalInfo.availability}
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

HeroSection.propTypes = {
  personalInfo: PropTypes.shape({
    name: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    headline: PropTypes.string.isRequired,
    availability: PropTypes.string.isRequired
  }).isRequired,
  highlights: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      icon: PropTypes.elementType.isRequired
    })
  ).isRequired,
  specialization: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      icon: PropTypes.elementType.isRequired
    })
  ).isRequired,
  accentGradient: PropTypes.string.isRequired,
  reducedMotion: PropTypes.bool
};

export default HeroSection;
