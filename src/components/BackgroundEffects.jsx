import { motion } from "framer-motion";
import PropTypes from "prop-types";

const BackgroundEffects = ({ accent, showGrid, glass, reducedMotion }) => {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {showGrid && (
        <div className="absolute inset-0 bg-grid bg-[radial-gradient(circle_at_1px_1px,#94a3b844_1px,transparent_0)] opacity-20" />
      )}

      <motion.div
        className="absolute -left-40 top-[-12rem] h-[32rem] w-[32rem] rounded-full"
        style={{
          background: `radial-gradient(circle at 25% 25%, ${accent.value}30 0%, transparent 70%)`
        }}
        animate={
          reducedMotion
            ? { opacity: [0.6, 0.8, 0.6] }
            : { x: ["0%", "12%", "-6%"], y: ["0%", "8%", "-10%"], opacity: [0.5, 0.8, 0.5] }
        }
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute -bottom-40 right-[-12rem] h-[36rem] w-[36rem] rounded-full"
        style={{
          background: `radial-gradient(circle at 70% 70%, ${accent.value}20 0%, transparent 70%)`
        }}
        animate={
          reducedMotion
            ? { opacity: [0.4, 0.7, 0.4] }
            : { x: ["0%", "-8%", "10%"], y: ["0%", "-12%", "8%"], opacity: [0.4, 0.7, 0.4] }
        }
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />

      {glass && (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(148,163,184,0.18),transparent_60%)]" />
      )}
    </div>
  );
};

BackgroundEffects.propTypes = {
  accent: PropTypes.shape({
    value: PropTypes.string.isRequired
  }).isRequired,
  showGrid: PropTypes.bool,
  glass: PropTypes.bool,
  reducedMotion: PropTypes.bool
};

export default BackgroundEffects;
