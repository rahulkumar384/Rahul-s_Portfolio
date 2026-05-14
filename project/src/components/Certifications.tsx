import { motion } from "framer-motion";
import { Award } from "lucide-react";
import { portfolio } from "../data/portfolio";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export default function Certifications() {
  if (!portfolio.certifications || portfolio.certifications.length === 0) {
    return null;
  }

  return (
    <section id="certifications" className="py-24 px-6 bg-cyber-black relative">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(0,240,255,0.03) 0%, transparent 60%)" }} />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-6xl mx-auto"
      >
        <motion.div variants={itemVariants} className="flex items-center gap-3 mb-12">
          <Award size={20} className="text-cyber-cyan" />
          <h2 className="text-3xl font-bold text-white font-mono">
            <span className="text-cyber-cyan">04.</span> Certifications
          </h2>
          <div className="flex-1 h-px bg-gradient-to-r from-cyber-cyan/20 to-transparent ml-4" />
        </motion.div>

        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8">
          {portfolio.certifications.map((cert, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="glass-card overflow-hidden hover:border-cyber-cyan/30 transition-all duration-500 group"
            >
              <div className="relative overflow-hidden bg-gradient-to-b from-cyber-cyan/5 to-transparent">
                <motion.img
                  src={cert.image}
                  alt={cert.name}
                  className="w-full h-auto aspect-video object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cyber-black via-transparent to-transparent opacity-60" />
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white mb-1">{cert.name}</h3>
                    <p className="text-cyber-cyan text-sm font-mono">{cert.issuer}</p>
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-cyber-cyan/10 border border-cyber-cyan/20 flex items-center justify-center flex-shrink-0">
                    <Award size={16} className="text-cyber-cyan" />
                  </div>
                </div>

                <p className="text-gray-300 text-sm mb-3">{cert.credential}</p>

                <div className="pt-3 border-t border-white/5">
                  <p className="text-gray-500 text-xs font-mono">{cert.date}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
