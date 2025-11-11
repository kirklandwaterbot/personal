import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import SectionHeader from "./SectionHeader.jsx";

const ReadingListSection = ({ readingList, accentGradient }) => (
  <section id="reading" className="relative">
    <SectionHeader
      eyebrow="Library"
      title="Ideas currently fueling my curiosity."
      description="I regularly share books, essays, and talks shaping the way I think about systems, leadership, and human-centered design."
      accentGradient={accentGradient}
    />

    <div className="mt-10 grid gap-4 sm:grid-cols-2">
      {readingList.map((item, index) => (
        <motion.a
          key={item.title}
          href={item.url}
          target="_blank"
          rel="noreferrer"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4, ease: "easeOut", delay: index * 0.05 }}
          className="group relative overflow-hidden rounded-3xl border border-slate-200/70 bg-white/80 p-6 text-slate-700 shadow-lg shadow-slate-200/70 transition duration-300 hover:border-slate-300 hover:bg-white/90 dark:border-white/10 dark:bg-slate-900/60 dark:text-slate-200 dark:shadow-black/15 dark:hover:border-white/20 dark:hover:bg-slate-900/80"
        >
          <div
            className={`absolute inset-x-6 -top-24 h-40 rounded-full opacity-0 blur-3xl transition duration-500 group-hover:opacity-90 ${accentGradient}`}
          />
          <p className="relative text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
            Featured
          </p>
          <h3 className="relative mt-3 text-lg font-semibold text-slate-900 dark:text-white">
            {item.title}
          </h3>
          <p className="relative mt-2 text-sm text-slate-600 dark:text-slate-300">{item.author}</p>
          <div className="relative mt-6 inline-flex items-center gap-2 text-xs font-semibold text-slate-700 transition group-hover:translate-x-1 dark:text-slate-200">
            Read now
            <ArrowTopRightOnSquareIcon className="h-4 w-4" />
          </div>
        </motion.a>
      ))}
    </div>
  </section>
);

ReadingListSection.propTypes = {
  readingList: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired
    })
  ).isRequired,
  accentGradient: PropTypes.string.isRequired
};

export default ReadingListSection;
