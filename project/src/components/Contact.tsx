import { motion } from "framer-motion";
import { Mail, Linkedin, Send } from "lucide-react";
import { portfolio } from "../data/portfolio";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const inputVariants = {
  focus: { boxShadow: "0 0 20px rgba(0,240,255,0.15)", borderColor: "rgba(0,240,255,0.5)" },
};

export default function Contact() {
  return (
    <section id="contact" className="py-24 px-6 bg-cyber-black relative">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 80%, rgba(0,240,255,0.03) 0%, transparent 60%)" }} />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-6xl mx-auto"
      >
        <motion.div variants={itemVariants} className="flex items-center gap-3 mb-12">
          <Mail size={20} className="text-cyber-cyan" />
          <h2 className="text-3xl font-bold text-white font-mono">
            <span className="text-cyber-cyan">05.</span> Contact
          </h2>
          <div className="flex-1 h-px bg-gradient-to-r from-cyber-cyan/20 to-transparent ml-4" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div variants={itemVariants} className="glass-card p-8 flex flex-col justify-center hover:border-cyber-cyan/20 transition-all duration-500">
            <p className="text-gray-300 leading-relaxed mb-8 text-[15px]">
              I'm always open to discussing new projects, creative ideas, or
              opportunities to be part of your vision. Feel free to reach out
              through any of the channels below.
            </p>

            <div className="space-y-5">
              <motion.a
                href={`mailto:${portfolio.contact.email}`}
                whileHover={{ x: 4, boxShadow: "0 0 20px rgba(0,240,255,0.15)" }}
                className="flex items-center gap-4 text-gray-400 hover:text-white transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-cyber-cyan/5 border border-cyber-cyan/15 flex items-center justify-center group-hover:border-cyber-cyan/40 group-hover:bg-cyber-cyan/10 transition-all">
                  <Mail size={18} className="text-cyber-cyan" />
                </div>
                <span className="text-sm font-mono">{portfolio.contact.email}</span>
              </motion.a>

              {portfolio.contact.linkedin && (
                <motion.a
                  href={`https://${portfolio.contact.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ x: 4, boxShadow: "0 0 20px rgba(255,0,229,0.15)" }}
                  className="flex items-center gap-4 text-gray-400 hover:text-white transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-cyber-pink/5 border border-cyber-pink/15 flex items-center justify-center group-hover:border-cyber-pink/40 group-hover:bg-cyber-pink/10 transition-all">
                    <Linkedin size={18} className="text-cyber-pink" />
                  </div>
                  <span className="text-sm font-mono">LinkedIn Profile</span>
                </motion.a>
              )}
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="glass-card p-8 hover:border-cyber-pink/20 transition-all duration-500">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const name = (form.elements.namedItem("name") as HTMLInputElement).value;
                const email = (form.elements.namedItem("email") as HTMLInputElement).value;
                const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value;
                window.location.href = `mailto:${portfolio.contact.email}?subject=Portfolio Contact from ${name}&body=${encodeURIComponent(message)}%0A%0AFrom: ${email}`;
              }}
              className="space-y-5"
            >
              {[
                { name: "name", label: "Name", type: "text", placeholder: "Your name" },
                { name: "email", label: "Email", type: "email", placeholder: "you@example.com" },
              ].map((field) => (
                <div key={field.name}>
                  <label htmlFor={field.name} className="block text-xs font-mono text-gray-500 mb-1.5 uppercase tracking-wider">
                    {field.label}
                  </label>
                  <motion.input
                    id={field.name}
                    name={field.name}
                    type={field.type}
                    required
                    variants={inputVariants}
                    whileFocus="focus"
                    className="w-full px-4 py-2.5 bg-white/[0.03] border border-white/10 rounded-lg text-white text-sm font-mono placeholder-gray-600 focus:outline-none transition-all"
                    placeholder={field.placeholder}
                  />
                </div>
              ))}
              <div>
                <label htmlFor="message" className="block text-xs font-mono text-gray-500 mb-1.5 uppercase tracking-wider">
                  Message
                </label>
                <motion.textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  variants={inputVariants}
                  whileFocus="focus"
                  className="w-full px-4 py-2.5 bg-white/[0.03] border border-white/10 rounded-lg text-white text-sm font-mono placeholder-gray-600 focus:outline-none transition-all resize-none"
                  placeholder="Your message..."
                />
              </div>
              <motion.button
                type="submit"
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 0 40px rgba(0,240,255,0.4), 0 0 80px rgba(0,240,255,0.15)",
                }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-cyber-cyan text-cyber-black font-bold font-mono rounded-lg text-sm tracking-wide transition-all relative overflow-hidden"
              >
                <Send size={16} />
                Send Message
              </motion.button>
            </form>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
