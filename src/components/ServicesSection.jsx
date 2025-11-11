import PropTypes from "prop-types";
import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader.jsx";

const ServicesSection = ({ services, accentGradient, reducedMotion }) => (
  <section id="services" className="relative">
    <SectionHeader
      eyebrow="Ways I can help"
      title="Engagements tailored to velocity, clarity, and craft."
      description="From sprint-based collaborations to longer-term partnerships, I create structured programs that move ideas into shippable realities."
      accentGradient={accentGradient}
    />

    <div className="mt-12 grid gap-6 lg:grid-cols-3">
      {services.map((service, index) => (
        <motion.div
          key={service.title}
          initial={reducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.05 }}
          whileHover={reducedMotion ? {} : { y: -6 }}
          className="group relative overflow-hidden rounded-3xl border border-slate-200/70 bg-white/80 p-6 text-sm text-slate-700 shadow-lg shadow-slate-200/70 transition duration-300 hover:border-slate-300 hover:bg-white/90 dark:border-white/10 dark:bg-slate-900/60 dark:text-slate-200 dark:shadow-black/15 dark:hover:border-white/20 dark:hover:bg-slate-900/80"
        >
          <div
            className={`absolute inset-x-4 -top-24 h-40 rounded-full opacity-0 blur-3xl transition duration-500 group-hover:opacity-90 ${accentGradient}`}
          />
          <div className="relative flex items-center gap-3">
            <service.icon className="h-6 w-6 text-slate-700 dark:text-slate-200" />
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              {service.title}
            </h3>
          </div>
          <p className="relative mt-4 text-slate-600 dark:text-slate-300">{service.description}</p>
          <div className="relative mt-6 space-y-3">
            {service.deliverables.map((deliverable) => (
              <div
                key={deliverable}
                className="flex items-center gap-3 rounded-2xl border border-slate-200/70 bg-white/90 px-4 py-3 text-xs text-slate-600 transition duration-300 group-hover:border-slate-300 group-hover:bg-white dark:border-white/10 dark:bg-slate-900/60 dark:text-slate-200 dark:group-hover:border-white/20 dark:group-hover:bg-slate-900/70"
              >
                <span className="h-2 w-2 rounded-full bg-slate-400 dark:bg-slate-300" />
                {deliverable}
              </div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  </section>
);

ServicesSection.propTypes = {
  services: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      deliverables: PropTypes.arrayOf(PropTypes.string).isRequired,
      icon: PropTypes.elementType.isRequired
    })
  ).isRequired,
  accentGradient: PropTypes.string.isRequired,
  reducedMotion: PropTypes.bool
};

export default ServicesSection;
