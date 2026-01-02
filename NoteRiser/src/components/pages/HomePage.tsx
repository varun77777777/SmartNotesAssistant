import React, { useRef } from 'react';
import { motion, useTransform, useMotionValue } from 'framer-motion';
import { Upload, FileText, Brain, HelpCircle, Zap, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Image } from '@/components/ui/image';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '@/store/useAppStore';

export default function HomePage() {
  const navigate = useNavigate();
  const { 
    uploadedFile, 
    isProcessing, 
    summary, 
    setUploadedFile, 
    setIsProcessing, 
    setSummary 
  } = useAppStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const rotateX = useTransform(mouseY, [-300, 300], [10, -10]);
  const rotateY = useTransform(mouseX, [-300, 300], [-10, 10]);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setUploadedFile(file);
      setIsProcessing(true);
      
      // Simulate PDF processing and summarization
      setTimeout(() => {
        setSummary(`Analysis of "${file.name}":\n\n📋 Overview: Research paper, 24 pages, advanced level content\n🎯 Methodology: Mixed-methods approach with strong statistical significance (p < 0.05)\n📊 Structure: Introduction → Methodology → Results → Discussion → Conclusions\n🔍 Key Insights: Robust theoretical framework, high reliability scores (α > 0.85)\n⚠️ Limitations: Sample size and geographic scope constraints\n🚀 Ready for: Quizzes, flashcards, and Q&A analysis`);
        setIsProcessing(false);
      }, 3000);
    }
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(event.clientX - centerX);
    mouseY.set(event.clientY - centerY);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="min-h-screen md:h-screen grid place-items-center p-4 md:p-8 py-12 md:py-0">
        <motion.div
          className="relative w-full max-w-4xl rounded-xl md:rounded-2xl overflow-hidden bg-deep-space-blue border border-neon-teal/20 aspect-video"
          whileHover={{ scale: 1.02 }}
          onMouseMove={handleMouseMove}
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        >
          <div className="absolute inset-[-40px] z-10 bg-gradient-to-br from-neon-teal/10 to-magenta/10" />
          <div className="absolute inset-0 z-20 p-4 md:p-8 flex flex-col justify-between">
            <div className="flex items-center gap-2 md:gap-4 flex-wrap">
              <Brain className="w-8 md:w-12 h-8 md:h-12 text-neon-teal flex-shrink-0" />
              <span className="text-xs md:text-sm font-paragraph text-neon-teal/80 tracking-wider uppercase">MESS TO MASTERY - AI POWERED NOTES</span>
            </div>
            <div>
              <h1 className="text-3xl md:text-6xl font-heading font-bold text-white mb-2 md:mb-4 leading-tight">
                Transform Documents into Knowledge
              </h1>
              <p className="text-sm md:text-xl font-paragraph text-white/90 max-w-2xl leading-relaxed">
                Upload PDFs and leverage AI to extract insights, generate quizzes, and create flashcards
              </p>
            </div>
          </div>
        </motion.div>
      </section>
      {/* Upload Section */}
      <section className="py-12 md:py-20 px-4 md:px-8">
        <div className="max-w-[100rem] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-start lg:items-center">
            <div>
              <h2 className="text-2xl md:text-4xl font-heading font-bold text-white mb-4 md:mb-6">
                Upload Your Document
              </h2>
              <p className="text-sm md:text-lg font-paragraph text-white/90 mb-6 md:mb-8 leading-relaxed">
                Begin your learning journey by uploading a PDF. Our AI will analyze the content and provide summaries, quizzes, and flashcards.
              </p>
              
              <Card className="bg-deep-space-blue border-neon-teal/20 p-4 md:p-8">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                
                {!uploadedFile ? (
                  <div
                    className="border-2 border-dashed border-neon-teal/40 rounded-lg p-6 md:p-12 text-center cursor-pointer hover:border-neon-teal/60 transition-colors"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="w-12 md:w-16 h-12 md:h-16 text-neon-teal mx-auto mb-3 md:mb-4" />
                    <p className="text-lg md:text-xl font-paragraph text-white mb-2">
                      Select PDF Document
                    </p>
                    <p className="text-xs md:text-sm font-paragraph text-white/70">
                      Supports PDF files up to 10MB
                    </p>
                  </div>
                ) : (
                  <div className="text-center">
                    <FileText className="w-12 md:w-16 h-12 md:h-16 text-neon-teal mx-auto mb-3 md:mb-4" />
                    <p className="text-base md:text-lg font-paragraph text-white mb-2 break-words">
                      {uploadedFile.name}
                    </p>
                    {isProcessing ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-4 h-4 border-2 border-neon-teal border-t-transparent rounded-full animate-spin" />
                        <span className="text-xs md:text-sm font-paragraph text-white/80">Processing...</span>
                      </div>
                    ) : (
                      <p className="text-xs md:text-sm font-paragraph text-neon-teal font-medium">
                        ✓ Document ready for analysis
                      </p>
                    )}
                  </div>
                )}
              </Card>

              {summary && (
                <Card className="bg-deep-space-blue border-neon-teal/20 p-4 md:p-6 mt-4 md:mt-6">
                  <h3 className="text-base md:text-lg font-heading font-bold text-white mb-3">
                    Document Analysis Summary
                  </h3>
                  <div className="text-xs md:text-sm font-paragraph text-white/80 leading-relaxed whitespace-pre-line overflow-y-auto max-h-48">
                    {summary}
                  </div>
                </Card>
              )}
            </div>

            <div className="hidden lg:block">
              <Image
                src="https://static.wixstatic.com/media/931b1e_b6f92291b2c444969ba52546536cea08~mv2.png?originWidth=576&originHeight=576"
                alt="PDF upload and analysis visualization"
                width={600}
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section className="py-12 md:py-20 px-4 md:px-8 bg-deep-space-blue/50">
        <div className="max-w-[100rem] mx-auto">
          <h2 className="text-2xl md:text-4xl font-heading font-bold text-white text-center mb-8 md:mb-16">
            Advanced Learning Features
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            <motion.div
              whileHover={{ y: -8 }}
              className="bg-deep-space-blue border border-neon-teal/20 rounded-xl p-4 md:p-6 text-center flex flex-col"
            >
              <HelpCircle className="w-10 md:w-12 h-10 md:h-12 text-neon-teal mx-auto mb-3 md:mb-4" />
              <h3 className="text-lg md:text-xl font-heading font-bold text-white mb-2 md:mb-3">
                Intelligent Q&A
              </h3>
              <p className="text-xs md:text-sm font-paragraph text-white/90 mb-4 md:mb-4 leading-relaxed flex-grow">
                Ask detailed questions about your document content and receive comprehensive answers
              </p>
              <Button
                onClick={() => navigate('/qa')}
                className="w-full bg-neon-teal text-black hover:bg-neon-teal/90 text-sm md:text-base"
                disabled={!uploadedFile}
              >
                Ask Questions
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ y: -8 }}
              className="bg-deep-space-blue border border-magenta/20 rounded-xl p-4 md:p-6 text-center flex flex-col"
            >
              <Zap className="w-10 md:w-12 h-10 md:h-12 text-magenta mx-auto mb-3 md:mb-4" />
              <h3 className="text-lg md:text-xl font-heading font-bold text-white mb-2 md:mb-3">
                Smart Quiz
              </h3>
              <p className="text-xs md:text-sm font-paragraph text-white/90 mb-4 md:mb-4 leading-relaxed flex-grow">
                Generate customized quizzes from your content to test comprehension
              </p>
              <Button
                onClick={() => navigate('/quiz')}
                className="w-full bg-magenta text-black hover:bg-magenta/90 text-sm md:text-base"
                disabled={!uploadedFile}
              >
                Take Quiz
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ y: -8 }}
              className="bg-deep-space-blue border border-neon-teal/20 rounded-xl p-4 md:p-6 text-center flex flex-col"
            >
              <FileText className="w-10 md:w-12 h-10 md:h-12 text-neon-teal mx-auto mb-3 md:mb-4" />
              <h3 className="text-lg md:text-xl font-heading font-bold text-white mb-2 md:mb-3">
                Flashcards
              </h3>
              <p className="text-xs md:text-sm font-paragraph text-white/90 mb-4 md:mb-4 leading-relaxed flex-grow">
                Create and study with AI-generated flashcards for effective retention
              </p>
              <Button
                onClick={() => navigate('/flashcards')}
                className="w-full bg-neon-teal text-black hover:bg-neon-teal/90 text-sm md:text-base"
                disabled={!uploadedFile}
              >
                View Flashcards
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ y: -8 }}
              className="bg-deep-space-blue border border-magenta/20 rounded-xl p-4 md:p-6 text-center flex flex-col"
            >
              <Download className="w-10 md:w-12 h-10 md:h-12 text-magenta mx-auto mb-3 md:mb-4" />
              <h3 className="text-lg md:text-xl font-heading font-bold text-white mb-2 md:mb-3">
                Export
              </h3>
              <p className="text-xs md:text-sm font-paragraph text-white/90 mb-4 md:mb-4 leading-relaxed flex-grow">
                Download summaries and flashcards as formatted PDF documents
              </p>
              <Button
                onClick={() => navigate('/export')}
                className="w-full bg-magenta text-black hover:bg-magenta/90 text-sm md:text-base"
                disabled={!uploadedFile}
              >
                Export Content
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
