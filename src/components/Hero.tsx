import { motion } from "framer-motion";
import { ArrowUpRight, ChevronDown, Download, Sparkles } from "lucide-react";
import { portfolio } from "../data/portfolio";
import HeroScene from "./HeroScene";

const textVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-cyber-black pt-20">
      {/* 3D WebGL Background Scene */}
      <HeroScene />

      {/* Scan line overlay */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-[1]">
        <div className="absolute inset-x-0 h-px bg-cyber-cyan/10 animate-scan-line" />
      </div>

      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none z-[2]" style={{ background: "radial-gradient(ellipse at center, transparent 40%, #0a0a0f 100%)" }} />

      {/* Content */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 px-6 max-w-7xl w-full">
        {/* Text content */}
        <div className="flex-1 text-center lg:text-left">
          <motion.div
            custom={0}
            variants={textVariants}
            initial="hidden"
            animate="visible"
            className="mb-5"
          >
            <div className="flex flex-wrap justify-center lg:justify-start gap-2">
              <span className="inline-block px-4 py-1.5 text-[10px] font-mono font-semibold tracking-[0.2em] uppercase text-cyber-cyan border border-cyber-cyan/30 rounded-full bg-cyber-cyan/5 backdrop-blur-sm">
                &gt; Remote
              </span>
              <span className="inline-block px-4 py-1.5 text-[10px] font-mono font-semibold tracking-[0.2em] uppercase text-cyber-pink border border-cyber-pink/30 rounded-full bg-cyber-pink/5 backdrop-blur-sm">
                &gt; Onsite
              </span>
              <span className="inline-block px-4 py-1.5 text-[10px] font-mono font-semibold tracking-[0.2em] uppercase text-cyber-purple border border-cyber-purple/30 rounded-full bg-cyber-purple/5 backdrop-blur-sm">
                &gt; Open to Opportunities
              </span>
            </div>
          </motion.div>

          <motion.h1
            custom={1}
            variants={textVariants}
            initial="hidden"
            animate="visible"
            className="text-5xl sm:text-6xl md:text-8xl font-bold tracking-tight mb-4"
          >
            <span className="bg-gradient-to-r from-cyber-cyan via-white to-cyber-pink bg-clip-text text-transparent">
              {portfolio.name}
            </span>
          </motion.h1>

          <motion.p
            custom={2}
            variants={textVariants}
            initial="hidden"
            animate="visible"
            className="text-lg sm:text-xl md:text-2xl font-mono font-medium text-cyber-cyan mb-6"
          >
            {portfolio.title}
          </motion.p>

          <motion.p
            custom={3}
            variants={textVariants}
            initial="hidden"
            animate="visible"
            className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-2xl mx-auto lg:mx-0 mb-8"
          >
            {portfolio.summary}
          </motion.p>

          <motion.div
            custom={4}
            variants={textVariants}
            initial="hidden"
            animate="visible"
            className="mb-10 grid grid-cols-2 gap-3 sm:grid-cols-4"
          >
            {portfolio.highlights.map((item) => (
              <div
                key={item.label}
                className="rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 backdrop-blur-md"
              >
                <div className="text-lg font-bold text-white font-mono">{item.value}</div>
                <div className="mt-1 text-[10px] uppercase tracking-wider text-gray-500">{item.label}</div>
              </div>
            ))}
          </motion.div>

          <motion.div
            custom={5}
            variants={textVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap justify-center lg:justify-start gap-4"
          >
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(0,240,255,0.4)" }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-8 py-3 bg-cyber-cyan text-cyber-black font-bold rounded-lg text-sm tracking-wide transition-all"
            >
              View Projects
              <ArrowUpRight size={16} />
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(255,0,229,0.3)" }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-8 py-3 border border-cyber-pink/40 text-cyber-pink font-bold rounded-lg text-sm tracking-wide bg-cyber-pink/5 backdrop-blur-sm transition-all"
            >
              Get in Touch
              <Sparkles size={16} />
            </motion.a>
          </motion.div>
        </div>

        <motion.aside
          custom={6}
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-md lg:w-[380px]"
        >
          <div className="glass-card border-cyber-cyan/15 p-5 shadow-[0_0_70px_rgba(0,240,255,0.08)]">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <p className="text-xs font-mono uppercase tracking-widest text-cyber-cyan">Engineer Profile</p>
                <h2 className="mt-1 text-xl font-bold text-white">Backend Systems Focus</h2>
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-cyber-cyan/20 bg-cyber-cyan/10">
                <Download size={18} className="text-cyber-cyan" />
              </div>
            </div>
            <div className="mt-5 space-y-3">
              {portfolio.focusAreas.map((area) => (
                <div key={area} className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3">
                  <span className="h-2 w-2 rounded-full bg-cyber-cyan shadow-[0_0_12px_rgba(0,240,255,0.8)]" />
                  <span className="text-sm text-gray-300">{area}</span>
                </div>
              ))}
            </div>
            <a
              href={`mailto:${portfolio.contact.email}`}
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-cyber-cyan/30 bg-cyber-cyan/10 px-4 py-3 text-sm font-bold text-cyber-cyan transition hover:bg-cyber-cyan hover:text-cyber-black"
            >
              Start a Conversation
              <ArrowUpRight size={16} />
            </a>
          </div>
        </motion.aside>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-cyber-cyan/60 hover:text-cyber-cyan transition-colors"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown size={28} />
      </motion.a>
    </section>
  );
}
