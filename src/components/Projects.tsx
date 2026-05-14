import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FolderGit2, X } from "lucide-react";
import { portfolio } from "../data/portfolio";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50, rotateX: 10 },
  visible: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
};

function ProjectModal({ project, onClose }: { project: typeof portfolio.projects[0]; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-6"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-cyber-black/80 backdrop-blur-xl" />
      <motion.div
        initial={{ scale: 0.85, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.85, opacity: 0, y: 40 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="relative glass-card p-8 max-w-lg w-full border-cyber-cyan/20"
        style={{ perspective: "1000px" }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-cyber-cyan transition-colors"
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <FolderGit2 size={20} className="text-cyber-cyan" />
          <h3 className="text-xl font-bold text-white font-mono">{project.title}</h3>
        </div>

        <p className="text-gray-400 text-sm leading-relaxed mb-6">{project.description}</p>

        <div className="flex flex-wrap gap-2 mb-6">
          {project.tech.map((t) => (
            <span
              key={t}
              className="px-2.5 py-1 text-xs font-mono font-medium text-cyber-cyan bg-cyber-cyan/10 border border-cyber-cyan/20 rounded"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="h-px bg-gradient-to-r from-cyber-cyan/20 via-cyber-pink/20 to-transparent" />
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const [selected, setSelected] = useState<typeof portfolio.projects[0] | null>(null);

  return (
    <section id="projects" className="py-24 px-6 bg-cyber-dark relative">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 70% 60%, rgba(255,0,229,0.03) 0%, transparent 60%)" }} />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-6xl mx-auto"
      >
        <motion.div variants={cardVariants} className="flex items-center gap-3 mb-12">
          <FolderGit2 size={20} className="text-cyber-cyan" />
          <h2 className="text-3xl font-bold text-white font-mono">
            <span className="text-cyber-cyan">04.</span> Projects
          </h2>
          <div className="flex-1 h-px bg-gradient-to-r from-cyber-cyan/20 to-transparent ml-4" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {portfolio.projects.map((proj, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              whileHover={{
                scale: 1.03,
                rotateY: 3,
                rotateX: -2,
                boxShadow: "0 0 50px rgba(0,240,255,0.15)",
              }}
              style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
              onClick={() => setSelected(proj)}
              className="glass-card p-8 group cursor-pointer hover:border-cyber-cyan/20 transition-all duration-500"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-semibold text-white group-hover:text-cyber-cyan transition-colors font-mono">
                  {proj.title}
                </h3>
                <FolderGit2
                  size={20}
                  className="text-gray-600 group-hover:text-cyber-cyan transition-colors shrink-0 mt-1"
                />
              </div>
              <p className="text-sm text-gray-400 leading-relaxed mb-6 line-clamp-3">
                {proj.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {proj.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 text-xs font-mono font-medium text-cyber-pink bg-cyber-pink/10 border border-cyber-pink/20 rounded"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <AnimatePresence>
        {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
}
