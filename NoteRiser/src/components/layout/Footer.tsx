import React from 'react';
import { Brain, Github, Twitter, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Footer() {
  return (
    <footer className="bg-deep-space-blue border-t border-neon-teal/20 mt-auto">
      <div className="max-w-[100rem] mx-auto px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <Brain className="w-8 h-8 text-neon-teal" />
              <span className="text-xl font-heading font-bold text-white">
                Smartz - Less time more results
              </span>
            </div>
            <p className="font-paragraph text-white/80 mb-6 max-w-md">
              Transform your PDF documents into interactive learning experiences with AI-powered summaries, quizzes, and flashcards.
            </p>
            <div className="flex gap-4">
              <Button
                variant="ghost"
                size="sm"
                className="text-white/60 hover:text-neon-teal hover:bg-neon-teal/10"
              >
                <Github className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-white/60 hover:text-neon-teal hover:bg-neon-teal/10"
              >
                <Twitter className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-white/60 hover:text-neon-teal hover:bg-neon-teal/10"
              >
                <Mail className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Features */}
          <div>
            <h3 className="font-heading font-bold text-white mb-4">Features</h3>
            <ul className="space-y-2">
              {[
                'PDF Analysis',
                'AI Summaries',
                'Question Answering',
                'Quiz Generation',
                'Flashcard Creation',
                'Export Tools'
              ].map((feature) => (
                <li key={feature}>
                  <span className="font-paragraph text-white/60 hover:text-neon-teal cursor-pointer transition-colors">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-heading font-bold text-white mb-4">Resources</h3>
            <ul className="space-y-2">
              {[
                'Documentation',
                'API Reference',
                'Tutorials',
                'Support',
                'Privacy Policy',
                'Terms of Service'
              ].map((resource) => (
                <li key={resource}>
                  <span className="font-paragraph text-white/60 hover:text-neon-teal cursor-pointer transition-colors">
                    {resource}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="font-paragraph text-white/60 text-sm">
            © 2024 Smartz - Less time more results. All rights reserved.
          </p>
          <p className="font-paragraph text-white/40 text-sm mt-4 md:mt-0">
            Powered by AI • Built with React
          </p>
        </div>
      </div>
    </footer>
  );
}
