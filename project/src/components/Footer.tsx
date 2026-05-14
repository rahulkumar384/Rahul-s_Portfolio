import { motion } from "framer-motion";
import { portfolio } from "../data/portfolio";

export default function Footer() {
  return (
    <footer className="border-t border-cyber-cyan/5 py-8 px-6 bg-cyber-black">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4"
      >
        <p className="text-xs font-mono text-gray-600">
          &copy; {new Date().getFullYear()} {portfolio.name}. All rights reserved.
        </p>
        <div className="flex items-center gap-6">
          {portfolio.contact.linkedin && (
            <a
              href={`https://${portfolio.contact.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono text-gray-600 hover:text-cyber-cyan transition-colors"
            >
              LinkedIn
            </a>
          )}
          <a
            href={`mailto:${portfolio.contact.email}`}
            className="text-xs font-mono text-gray-600 hover:text-cyber-cyan transition-colors"
          >
            Email
          </a>
        </div>
      </motion.div>
    </footer>
  );
}
