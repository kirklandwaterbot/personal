import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { EnvelopeIcon, ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import SectionHeader from "./SectionHeader.jsx";

const ContactSection = ({ personalInfo, channels, accentGradient }) => (
  <section id="contact" className="relative">
    <SectionHeader
      eyebrow="Let's collaborate"
      title="Ready to build something remarkable?"
      description="Reach out for collaborations, speaking engagements, or to jam on a new idea. I respond within 48 hours."
      accentGradient={accentGradient}
      align="center"
    />

    <div className="mt-12 grid gap-8 lg:grid-cols-[1.2fr,0.8fr]">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="rounded-3xl border border-slate-200/70 bg-white/80 p-8 text-slate-700 shadow-lg shadow-slate-200/70 backdrop-blur dark:border-white/10 dark:bg-slate-900/70 dark:text-slate-200 dark:shadow-black/15"
      >
        <div className="flex flex-col gap-6 text-sm text-slate-600 dark:text-slate-300">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
              Drop me a line
            </p>
            <a
              href={`mailto:${personalInfo.email}`}
              className="mt-3 inline-flex items-center gap-2 text-lg font-semibold text-slate-900 transition hover:text-slate-700 dark:text-white dark:hover:text-slate-200"
            >
              <EnvelopeIcon className="h-5 w-5" />
              {personalInfo.email}
            </a>
          </div>

          <p>
            Share a bit about the problem you&apos;re solving, your timeline, and what success looks
            like for you. I&apos;ll follow up with a tailored plan or resources to get you moving.
          </p>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200/70 bg-white/90 px-4 py-3 text-xs text-slate-600 dark:border-white/10 dark:bg-slate-900/70 dark:text-slate-300">
              <p className="font-semibold text-slate-900 dark:text-slate-100">
                Project collaborations
              </p>
              <p className="mt-2">Product strategy, design systems, creative UX</p>
            </div>
            <div className="rounded-2xl border border-slate-200/70 bg-white/90 px-4 py-3 text-xs text-slate-600 dark:border-white/10 dark:bg-slate-900/70 dark:text-slate-300">
              <p className="font-semibold text-slate-900 dark:text-slate-100">
                Speaking & workshops
              </p>
              <p className="mt-2">
                University clubs, hackathons, community meetups welcome
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="space-y-4">
        {channels.map((channel, index) => (
          <motion.a
            key={channel.label}
            href={channel.href}
            target={channel.href?.startsWith("http") ? "_blank" : undefined}
            rel={channel.href?.startsWith("http") ? "noreferrer" : undefined}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: index * 0.05 }}
            className="group relative flex items-center justify-between gap-4 overflow-hidden rounded-3xl border border-slate-200/70 bg-white/80 px-5 py-4 text-sm text-slate-700 shadow-lg shadow-slate-200/70 transition duration-300 hover:border-slate-300 hover:bg-white/90 dark:border-white/10 dark:bg-slate-900/60 dark:text-slate-200 dark:shadow-black/15 dark:hover:border-white/20 dark:hover:bg-slate-900/80"
          >
            <div className="flex items-center gap-4">
              <channel.icon className="h-6 w-6 flex-shrink-0 text-slate-700 dark:text-slate-200" />
              <div>
                <p className="font-semibold text-slate-900 dark:text-white">{channel.label}</p>
                <p className="text-xs text-slate-600 dark:text-slate-300">{channel.value}</p>
              </div>
            </div>
            <ArrowTopRightOnSquareIcon className="h-5 w-5 text-slate-500 transition group-hover:translate-x-1 group-hover:-translate-y-1 dark:text-slate-400" />
          </motion.a>
        ))}
      </div>
    </div>
  </section>
);

ContactSection.propTypes = {
  personalInfo: PropTypes.shape({
    email: PropTypes.string.isRequired
  }).isRequired,
  channels: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
      icon: PropTypes.elementType.isRequired
    })
  ).isRequired,
  accentGradient: PropTypes.string.isRequired
};

export default ContactSection;
