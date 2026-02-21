import { sections } from '../data';
import { motion } from 'motion/react';
import { ExternalLink, Github, Mail, Linkedin } from 'lucide-react';

interface SectionContentProps {
  sectionId: string | null;
}

export function SectionContent({ sectionId }: SectionContentProps) {
  const section = sections.find(s => s.id === sectionId);

  if (!section) return null;

  const { content } = section;

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-8 border-b border-white/10 pb-4"
      >
        <h2 className="text-3xl font-bold text-[var(--color-accent)] flex items-center gap-3">
          <section.icon className="w-8 h-8" />
          {section.title}
        </h2>
      </motion.div>

      <div className="space-y-8">
        {sectionId === 'details' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[var(--color-sidebar)] p-6 rounded-2xl border border-white/5">
              <h3 className="text-xl font-semibold mb-4 text-white">Personal Info</h3>
              <ul className="space-y-4 text-[var(--color-text-secondary)]">
                <li className="flex flex-col">
                  <span className="text-xs uppercase tracking-wider text-[var(--color-accent)]">Name</span>
                  <span className="text-lg text-white">{content.name}</span>
                </li>
                <li className="flex flex-col">
                  <span className="text-xs uppercase tracking-wider text-[var(--color-accent)]">Role</span>
                  <span className="text-lg text-white">{content.role}</span>
                </li>
                <li className="flex flex-col">
                  <span className="text-xs uppercase tracking-wider text-[var(--color-accent)]">Location</span>
                  <span className="text-lg text-white">{content.location}</span>
                </li>
              </ul>
            </div>
            <div className="bg-[var(--color-sidebar)] p-6 rounded-2xl border border-white/5">
              <h3 className="text-xl font-semibold mb-4 text-white">About Me</h3>
              <p className="text-[var(--color-text-secondary)] leading-relaxed">
                {content.bio}
              </p>
            </div>
          </div>
        )}

        {sectionId === 'qualification' && (
          <div className="space-y-6">
            {content.map((edu: any, index: number) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 + 0.3 }}
                className="bg-[var(--color-sidebar)] p-6 rounded-2xl border border-white/5 hover:border-[var(--color-accent)]/50 transition-colors"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-white">{edu.degree}</h3>
                  <span className="text-sm font-mono text-[var(--color-accent)] bg-[var(--color-accent)]/10 px-3 py-1 rounded-full w-fit mt-2 md:mt-0">
                    {edu.year}
                  </span>
                </div>
                <div className="text-lg text-[var(--color-text-secondary)] mb-2">{edu.institution}</div>
                <p className="text-sm text-[var(--color-text-secondary)]/80">{edu.details}</p>
              </motion.div>
            ))}
          </div>
        )}

        {sectionId === 'achievements' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {content.map((ach: any, index: number) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 + 0.3 }}
                className="bg-[var(--color-sidebar)] p-6 rounded-2xl border border-white/5 relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <section.icon size={100} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2 relative z-10">{ach.title}</h3>
                <p className="text-[var(--color-text-secondary)] mb-4 relative z-10">{ach.description}</p>
                {ach.link && (
                  <a href={ach.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-[var(--color-accent)] hover:underline relative z-10">
                    View <ExternalLink size={14} className="ml-1" />
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        )}

        {sectionId === 'projects' && (
          <div className="grid grid-cols-1 gap-6">
            {content.map((project: any, index: number) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.3 }}
                className="bg-[var(--color-sidebar)] rounded-2xl border border-white/5 overflow-hidden hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 group"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold text-white group-hover:text-[var(--color-accent)] transition-colors">
                      {project.title}
                    </h3>
                    <div className="flex gap-2">
                       {/* Placeholder for project links if they existed in data */}
                       <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                         <Github size={16} className="text-[var(--color-text-secondary)]" />
                       </div>
                    </div>
                  </div>
                  <p className="text-[var(--color-text-secondary)] mb-6 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t: string, i: number) => (
                      <span key={i} className="px-3 py-1 text-xs font-mono rounded-full bg-[var(--color-navy)] text-[var(--color-accent)] border border-[var(--color-accent)]/20">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {sectionId === 'certifications' && (
          <div className="space-y-4">
            {content.map((cert: any, index: number) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 + 0.3 }}
                className="bg-[var(--color-sidebar)] p-6 rounded-2xl border border-white/5 flex items-center justify-between"
              >
                <div>
                  <h3 className="text-lg font-bold text-white">{cert.title}</h3>
                  <p className="text-[var(--color-text-secondary)]">{cert.issuer}</p>
                </div>
                <span className="text-sm font-mono text-[var(--color-text-secondary)] bg-white/5 px-3 py-1 rounded-lg">
                  {cert.date}
                </span>
              </motion.div>
            ))}
          </div>
        )}

        {sectionId === 'contact' && (
          <div className="bg-[var(--color-sidebar)] p-8 rounded-2xl border border-white/5 text-center">
            <h3 className="text-2xl font-bold text-white mb-8">Get In Touch</h3>
            <div className="flex flex-col lg:flex-row justify-center gap-6">
              <a 
                href={`mailto:${content.email}`}
                className="flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-[var(--color-navy)] hover:bg-[var(--color-accent)] text-white transition-colors duration-300 group"
              >
                <Mail className="group-hover:scale-110 transition-transform" />
                <span>{content.email}</span>
              </a>
              <a 
                href={content.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-[var(--color-navy)] hover:bg-white hover:text-black text-white transition-colors duration-300 group"
              >
                <Github className="group-hover:scale-110 transition-transform" />
                <span>GitHub</span>
              </a>
              <a 
                href={content.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-[var(--color-navy)] hover:bg-[#0077b5] text-white transition-colors duration-300 group"
              >
                <Linkedin className="group-hover:scale-110 transition-transform" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
