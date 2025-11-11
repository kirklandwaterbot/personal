import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { ArrowTopRightOnSquareIcon, CodeBracketIcon } from "@heroicons/react/24/outline";
import SectionHeader from "./SectionHeader.jsx";

const ProjectsSection = ({ projects, accentGradient, reducedMotion }) => {
  return (
    <section id="projects" className="relative">
      <SectionHeader
        eyebrow="Selected Work"
        title="Projects that blend craft with measurable outcomes."
        description="A mix of shipped products, explorations, and hackathon experiments that showcase my end-to-end problem solving."
        accentGradient={accentGradient}
      />

      <div className="mt-12 grid gap-8 lg:grid-cols-2">
        {projects.map((project, index) => (
          <motion.article
            key={project.title}
            initial={reducedMotion ? false : { opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
            whileHover={reducedMotion ? {} : { y: -8 }}
            className="group relative overflow-hidden rounded-3xl border border-slate-200/70 bg-white/80 text-slate-700 shadow-lg shadow-slate-200/70 transition duration-300 hover:border-slate-300 hover:bg-white/90 dark:border-white/10 dark:bg-slate-900/60 dark:text-slate-200 dark:shadow-black/15 dark:hover:border-white/20 dark:hover:bg-slate-900/80"
          >
            <div className="relative h-56 overflow-hidden">
              <img
                src={project.thumbnail}
                alt={project.title}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
            </div>

            <div className="relative flex flex-col gap-6 p-8">
              <div>
                <h3 className="text-2xl font-semibold text-slate-900 dark:text-white">
                  {project.title}
                </h3>
                <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
                  {project.description}
                </p>
              </div>

              <ul className="grid gap-2 text-sm text-slate-600 dark:text-slate-300">
                {project.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-slate-400 dark:bg-slate-300" />
                  {highlight}
                </li>
              ))}
            </ul>

              <div className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-slate-200/70 bg-white/90 px-3 py-1 text-xs font-semibold text-slate-600 dark:border-white/10 dark:bg-slate-900/60 dark:text-slate-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex gap-3">
                <a
                  href={project.liveUrl}
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold text-slate-900 transition hover:opacity-90 ${accentGradient}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Visit
                  <ArrowTopRightOnSquareIcon className="h-4 w-4" />
                </a>
                <a
                  href={project.repoUrl}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200/70 px-4 py-2 text-xs font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-white/80 dark:border-white/10 dark:text-slate-200 dark:hover:border-white/20 dark:hover:bg-white/5"
                  target="_blank"
                  rel="noreferrer"
                >
                  Code
                  <CodeBracketIcon className="h-4 w-4" />
                </a>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
};

ProjectsSection.propTypes = {
  projects: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      highlights: PropTypes.arrayOf(PropTypes.string).isRequired,
      stack: PropTypes.arrayOf(PropTypes.string).isRequired,
      liveUrl: PropTypes.string,
      repoUrl: PropTypes.string,
      thumbnail: PropTypes.string
    })
  ).isRequired,
  accentGradient: PropTypes.string.isRequired,
  reducedMotion: PropTypes.bool
};

export default ProjectsSection;
