import { motion } from "framer-motion";
import { Brain, GraduationCap, MapPin, Sparkles, User } from "lucide-react";
import { portfolio } from "../data/portfolio";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export default function About() {
  return (
    <section id="about" className="py-24 px-6 bg-cyber-black relative">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 20% 50%, rgba(0,240,255,0.03) 0%, transparent 60%)" }} />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-6xl mx-auto"
      >
        <motion.div variants={itemVariants} className="flex items-center gap-3 mb-12">
          <User size={20} className="text-cyber-cyan" />
          <h2 className="text-3xl font-bold text-white font-mono">
            <span className="text-cyber-cyan">01.</span> About Me
          </h2>
          <div className="flex-1 h-px bg-gradient-to-r from-cyber-cyan/20 to-transparent ml-4" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Bio */}
          <motion.div variants={itemVariants} className="glass-card p-8 hover:border-cyber-cyan/20 transition-all duration-500">
            <p className="text-gray-300 leading-relaxed text-[15px]">
              {portfolio.summary}
            </p>
          </motion.div>

          {/* Availability */}
          <motion.div variants={itemVariants} className="glass-card p-8 hover:border-cyber-pink/20 transition-all duration-500">
            <div className="flex items-center gap-3 mb-4">
              <MapPin size={18} className="text-cyber-pink" />
              <h3 className="text-lg font-semibold text-white font-mono">Availability</h3>
            </div>
            <div className="flex gap-2 mb-4">
              {portfolio.availability.remote && (
                <span className="px-3 py-1 text-xs font-mono font-medium text-cyber-cyan bg-cyber-cyan/10 border border-cyber-cyan/20 rounded">
                  Remote
                </span>
              )}
              {portfolio.availability.onsite && (
                <span className="px-3 py-1 text-xs font-mono font-medium text-cyber-pink bg-cyber-pink/10 border border-cyber-pink/20 rounded">
                  Onsite
                </span>
              )}
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              {portfolio.availability.description}
            </p>
          </motion.div>

          {/* AI Integration */}
          <motion.div variants={itemVariants} className="glass-card p-8 hover:border-cyber-purple/20 transition-all duration-500">
            <div className="flex items-center gap-3 mb-4">
              <Brain size={18} className="text-cyber-purple" />
              <h3 className="text-lg font-semibold text-white font-mono">AI Integration</h3>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              {portfolio.aiIntegration}
            </p>
          </motion.div>

          {/* Vibe Coding */}
          <motion.div variants={itemVariants} className="glass-card p-8 hover:border-cyber-cyan/20 transition-all duration-500">
            <div className="flex items-center gap-3 mb-4">
              <Sparkles size={18} className="text-cyber-cyan" />
              <h3 className="text-lg font-semibold text-white font-mono">Vibe Coding</h3>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              {portfolio.vibeCoding}
            </p>
          </motion.div>

          {/* Education */}
          <motion.div variants={itemVariants} className="glass-card p-8 md:col-span-2 hover:border-cyber-pink/20 transition-all duration-500">
            <div className="flex items-center gap-3 mb-4">
              <GraduationCap size={18} className="text-cyber-pink" />
              <h3 className="text-lg font-semibold text-white font-mono">Education</h3>
            </div>
            <ul className="space-y-3">
              {portfolio.education.map((edu, i) => (
                <li key={i} className="text-gray-400 text-sm leading-relaxed font-mono">
                  {edu}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
