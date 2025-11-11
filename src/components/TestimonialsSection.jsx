import PropTypes from "prop-types";
import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader.jsx";

const TestimonialsSection = ({ testimonials, accentGradient }) => (
  <section id="testimonials" className="relative">
    <SectionHeader
      eyebrow="Words from collaborators"
      title="Trusted by teams shipping ambitious products."
      description="Feedback from folks I've had the joy of building with."
      accentGradient={accentGradient}
    />

    <div className="mt-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="grid gap-6 lg:grid-cols-3"
      >
        {testimonials.map((testimonial, index) => (
          <motion.blockquote
            key={testimonial.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.05 }}
            className="group relative h-full overflow-hidden rounded-3xl border border-slate-200/70 bg-white/80 p-6 text-sm text-slate-700 shadow-lg shadow-slate-200/70 transition duration-300 hover:border-slate-300 hover:bg-white/90 dark:border-white/10 dark:bg-slate-900/60 dark:text-slate-200 dark:shadow-black/15 dark:hover:border-white/20 dark:hover:bg-slate-900/80"
          >
            <div
              className={`absolute inset-x-6 -top-24 h-40 rounded-full opacity-0 blur-3xl transition duration-500 group-hover:opacity-90 ${accentGradient}`}
            />
            <p className="relative text-slate-700 dark:text-slate-200">
              “{testimonial.quote}”
            </p>
            <footer className="relative mt-6 text-xs text-slate-500 dark:text-slate-400">
              <p className="font-semibold text-slate-900 dark:text-slate-100">
                {testimonial.name}
              </p>
              <p>{testimonial.title}</p>
            </footer>
          </motion.blockquote>
        ))}
      </motion.div>
    </div>
  </section>
);

TestimonialsSection.propTypes = {
  testimonials: PropTypes.arrayOf(
    PropTypes.shape({
      quote: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired
    })
  ).isRequired,
  accentGradient: PropTypes.string.isRequired
};

export default TestimonialsSection;
