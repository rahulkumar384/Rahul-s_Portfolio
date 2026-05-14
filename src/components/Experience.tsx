import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import { portfolio } from "../data/portfolio";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export default function Experience() {
  return (
    <section id="experience" className="py-24 px-6 bg-cyber-black relative">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 10% 70%, rgba(0,240,255,0.03) 0%, transparent 60%)" }} />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-6xl mx-auto"
      >
        <motion.div variants={itemVariants} className="flex items-center gap-3 mb-12">
          <Briefcase size={20} className="text-cyber-cyan" />
          <h2 className="text-3xl font-bold text-white font-mono">
            <span className="text-cyber-cyan">03.</span> Experience
          </h2>
          <div className="flex-1 h-px bg-gradient-to-r from-cyber-cyan/20 to-transparent ml-4" />
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-cyber-cyan/40 via-cyber-pink/20 to-transparent" />

          <div className="space-y-12">
            {portfolio.experience.map((exp, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className={`relative flex flex-col md:flex-row gap-8 ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-4 md:left-1/2 w-3 h-3 -translate-x-1/2 z-10 top-1">
                  <div className="w-3 h-3 rounded-full bg-cyber-cyan shadow-[0_0_12px_rgba(0,240,255,0.6)]" />
                  <div className="absolute inset-0 w-3 h-3 rounded-full bg-cyber-cyan animate-glow-pulse" />
                </div>

                <div className="hidden md:block md:w-1/2" />

                <motion.div
                  whileHover={{ scale: 1.01, boxShadow: "0 0 40px rgba(0,240,255,0.1)" }}
                  className="ml-12 md:ml-0 md:w-1/2 glass-card p-6 hover:border-cyber-cyan/20 transition-all duration-500"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-4">
                    <h3 className="text-white font-semibold text-lg font-mono">
                      {exp.role}
                    </h3>
                    <span className="text-[11px] text-cyber-cyan font-mono font-medium whitespace-nowrap px-2 py-0.5 bg-cyber-cyan/10 border border-cyber-cyan/20 rounded">
                      {exp.duration}
                    </span>
                  </div>
                  <p className="text-sm text-cyber-pink font-mono mb-4">{exp.company}</p>
                  <ul className="space-y-2.5">
                    {exp.points.map((point, pi) => (
                      <li key={pi} className="text-sm text-gray-400 leading-relaxed flex gap-2.5">
                        <span className="mt-2 w-1 h-1 rounded-full bg-cyber-cyan shrink-0" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
