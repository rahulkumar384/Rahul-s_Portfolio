import { motion } from "framer-motion";
import { Code2, Database, Layers, Wrench } from "lucide-react";
import { portfolio } from "../data/portfolio";

const categories = [
  { label: "Frontend", icon: Layers, items: portfolio.skills.frontend, color: "cyber-cyan", glow: "rgba(0,240,255,0.3)" },
  { label: "Backend", icon: Code2, items: portfolio.skills.backend, color: "cyber-pink", glow: "rgba(255,0,229,0.3)" },
  { label: "Tools & Libraries", icon: Wrench, items: portfolio.skills.tools, color: "cyber-purple", glow: "rgba(176,0,255,0.3)" },
  { label: "Databases", icon: Database, items: portfolio.skills.databases, color: "cyber-blue", glow: "rgba(0,102,255,0.3)" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6 bg-cyber-dark relative">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 80% 30%, rgba(176,0,255,0.04) 0%, transparent 60%)" }} />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-6xl mx-auto"
      >
        <motion.div variants={cardVariants} className="flex items-center gap-3 mb-12">
          <Code2 size={20} className="text-cyber-cyan" />
          <h2 className="text-3xl font-bold text-white font-mono">
            <span className="text-cyber-cyan">02.</span> Skills
          </h2>
          <div className="flex-1 h-px bg-gradient-to-r from-cyber-cyan/20 to-transparent ml-4" />
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6">
          {categories.map((cat) => (
            <motion.div
              key={cat.label}
              variants={cardVariants}
              whileHover={{
                scale: 1.02,
                boxShadow: `0 0 40px ${cat.glow}`,
              }}
              className="glass-card p-6 group cursor-default"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className={`w-9 h-9 rounded-lg bg-${cat.color}/10 border border-${cat.color}/20 flex items-center justify-center`}>
                  <cat.icon size={18} className={`text-${cat.color}`} />
                </div>
                <h3 className="text-white font-semibold font-mono text-sm">{cat.label}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {cat.items.map((skill, i) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.03 }}
                    whileHover={{
                      scale: 1.1,
                      boxShadow: `0 0 12px ${cat.glow}`,
                    }}
                    className={`px-3 py-1.5 text-xs font-mono font-medium text-${cat.color} bg-${cat.color}/5 border border-${cat.color}/15 rounded-md cursor-default transition-all duration-200`}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
