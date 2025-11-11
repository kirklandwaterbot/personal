import PropTypes from "prop-types";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";

const Footer = ({ personalInfo }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200/70 bg-white/80 px-6 py-10 text-sm text-slate-500 backdrop-blur dark:border-white/5 dark:bg-slate-950/90 dark:text-slate-400">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-slate-900 dark:text-slate-200">{personalInfo.name}</p>
          <p className="text-xs text-slate-500 dark:text-slate-500">
            © {currentYear} {personalInfo.name}. Always iterating, always learning.
          </p>
        </div>
        <div className="flex gap-4">
          {personalInfo.socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 rounded-full border border-slate-200/70 px-4 py-2 text-xs font-semibold text-slate-600 transition hover:border-slate-300 hover:bg-white/80 dark:border-white/10 dark:text-slate-300 dark:hover:border-white/20 dark:hover:bg-white/5"
            >
              <link.icon className="h-4 w-4" />
              {link.label}
              <ArrowUpRightIcon className="h-3.5 w-3.5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

Footer.propTypes = {
  personalInfo: PropTypes.shape({
    name: PropTypes.string.isRequired,
    socialLinks: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        icon: PropTypes.elementType.isRequired
      })
    ).isRequired
  }).isRequired
};

export default Footer;
