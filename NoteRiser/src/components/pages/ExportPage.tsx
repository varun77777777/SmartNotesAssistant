import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, FileText, CreditCard, Settings, ArrowLeft, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { useNavigate } from 'react-router-dom';

interface ExportOption {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  selected: boolean;
  format: 'pdf' | 'json' | 'txt';
}

export default function ExportPage() {
  const navigate = useNavigate();
  const [exportOptions, setExportOptions] = useState<ExportOption[]>([
    {
      id: 'summary',
      title: 'Document Summary',
      description: 'AI-generated summary of the uploaded PDF content',
      icon: <FileText className="w-6 h-6" />,
      selected: true,
      format: 'pdf'
    },
    {
      id: 'flashcards',
      title: 'Study Cards',
      description: 'Curated flashcards with essential topics and insights',
      icon: <CreditCard className="w-6 h-6" />,
      selected: true,
      format: 'pdf'
    },
    {
      id: 'quiz-results',
      title: 'Quiz Results',
      description: 'Your quiz performance and detailed answers',
      icon: <Check className="w-6 h-6" />,
      selected: false,
      format: 'pdf'
    },
    {
      id: 'qa-history',
      title: 'Q&A History',
      description: 'All your questions and AI-generated answers',
      icon: <Settings className="w-6 h-6" />,
      selected: false,
      format: 'json'
    }
  ]);

  const [isExporting, setIsExporting] = useState(false);
  const [exportComplete, setExportComplete] = useState(false);

  const toggleOption = (id: string) => {
    setExportOptions(prev =>
      prev.map(option =>
        option.id === id ? { ...option, selected: !option.selected } : option
      )
    );
  };

  const handleExport = async () => {
    const selectedOptions = exportOptions.filter(option => option.selected);
    if (selectedOptions.length === 0) return;

    setIsExporting(true);

    // Simulate export process
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Create and download files
    selectedOptions.forEach(option => {
      const element = document.createElement('a');
      let content = '';
      let filename = '';
      let mimeType = '';

      switch (option.id) {
        case 'summary':
          content = `# Document Summary\n\nThis is a comprehensive summary of your uploaded PDF document. The AI has analyzed the content and extracted the key points, main arguments, and important conclusions.\n\n## Key Points:\n- Main concept introduction\n- Methodology overview\n- Results and findings\n- Conclusions and recommendations\n\n## Detailed Analysis:\nThe document provides valuable insights into the subject matter with well-structured arguments and evidence-based conclusions.`;
          filename = 'document-summary.txt';
          mimeType = 'text/plain';
          break;
        case 'flashcards':
          content = JSON.stringify({
            title: 'Study Cards',
            cards: [
              { front: 'Core Methodology', back: 'Mixed methods approach—qualitative meets quantitative for deeper insights.' },
              { front: 'Key Insight', back: 'Foundational framework that drives all subsequent analysis and conclusions.' },
              { front: 'Main Findings', back: 'Strong positive correlation with statistical significance across all variables.' }
            ]
          }, null, 2);
          filename = 'study-cards.json';
          mimeType = 'application/json';
          break;
        case 'quiz-results':
          content = JSON.stringify({
            title: 'Quiz Results',
            score: '85%',
            totalQuestions: 5,
            correctAnswers: 4,
            results: [
              { question: 'Question 1', answer: 'Correct', time: '15s' },
              { question: 'Question 2', answer: 'Correct', time: '12s' },
              { question: 'Question 3', answer: 'Incorrect', time: '20s' },
              { question: 'Question 4', answer: 'Correct', time: '18s' },
              { question: 'Question 5', answer: 'Correct', time: '14s' }
            ]
          }, null, 2);
          filename = 'quiz-results.json';
          mimeType = 'application/json';
          break;
        case 'qa-history':
          content = JSON.stringify({
            title: 'Q&A History',
            sessions: [
              {
                question: 'What is the main topic?',
                answer: 'The document focuses on research methodology and analysis.',
                source: 'pdf',
                timestamp: new Date().toISOString()
              },
              {
                question: 'Explain the findings',
                answer: 'The results show significant positive correlations.',
                source: 'pdf',
                timestamp: new Date().toISOString()
              }
            ]
          }, null, 2);
          filename = 'qa-history.json';
          mimeType = 'application/json';
          break;
      }

      const file = new Blob([content], { type: mimeType });
      element.href = URL.createObjectURL(file);
      element.download = filename;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    });

    setIsExporting(false);
    setExportComplete(true);

    // Reset after showing success
    setTimeout(() => {
      setExportComplete(false);
    }, 3000);
  };

  const selectedCount = exportOptions.filter(option => option.selected).length;

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="bg-deep-space-blue border-b border-neon-teal/20 p-3 md:p-6">
        <div className="max-w-[100rem] mx-auto flex items-center gap-2 md:gap-4">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="text-neon-teal hover:bg-neon-teal/10 text-xs md:text-sm p-2 h-auto"
          >
            <ArrowLeft className="w-4 h-4 mr-1 md:mr-2" />
            <span className="hidden sm:inline">Back</span>
          </Button>
          <div className="flex items-center gap-2 md:gap-3">
            <Download className="w-6 md:w-8 h-6 md:h-8 text-magenta flex-shrink-0" />
            <h1 className="text-base md:text-2xl font-heading font-bold text-white">
              Export Tools
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4 md:p-8">
        {/* Success Message */}
        {exportComplete && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Card className="bg-neon-teal/10 border-neon-teal/20 p-6">
              <div className="flex items-center gap-3">
                <Check className="w-6 h-6 text-neon-teal" />
                <div>
                  <h3 className="text-lg font-heading font-bold text-neon-teal">
                    Export Complete!
                  </h3>
                  <p className="text-sm font-paragraph text-white/80">
                    Your files have been downloaded successfully.
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Export Options */}
        <Card className="bg-deep-space-blue border-neon-teal/20 p-8 mb-8">
          <h2 className="text-2xl font-heading font-bold text-white mb-6">
            Select Content to Export
          </h2>
          
          <div className="space-y-4 mb-8">
            {exportOptions.map((option) => (
              <motion.div
                key={option.id}
                whileHover={{ scale: 1.02 }}
                className={`p-4 rounded-lg border cursor-pointer transition-all ${
                  option.selected
                    ? 'border-neon-teal bg-neon-teal/10'
                    : 'border-white/20 hover:border-neon-teal/50'
                }`}
                onClick={() => toggleOption(option.id)}
              >
                <div className="flex items-center gap-4">
                  <Checkbox
                    checked={option.selected}
                    onChange={() => toggleOption(option.id)}
                    className="data-[state=checked]:bg-neon-teal data-[state=checked]:border-neon-teal"
                  />
                  
                  <div className={`${option.selected ? 'text-neon-teal' : 'text-white/60'}`}>
                    {option.icon}
                  </div>
                  
                  <div className="flex-1">
                    <h3 className={`font-paragraph font-bold ${
                      option.selected ? 'text-neon-teal' : 'text-white'
                    }`}>
                      {option.title}
                    </h3>
                    <p className="text-sm font-paragraph text-white/60">
                      {option.description}
                    </p>
                    <span className="text-xs font-paragraph text-white/40">
                      Format: {option.format.toUpperCase()}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <p className="text-sm font-paragraph text-white/60">
              {selectedCount} item{selectedCount !== 1 ? 's' : ''} selected for export
            </p>
            
            <Button
              onClick={handleExport}
              disabled={selectedCount === 0 || isExporting}
              className="bg-magenta text-black hover:bg-magenta/90"
            >
              {isExporting ? (
                <>
                  <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin mr-2" />
                  Exporting...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 mr-2" />
                  Export Selected ({selectedCount})
                </>
              )}
            </Button>
          </div>
        </Card>

        {/* Export Formats Info */}
        <Card className="bg-deep-space-blue border-neon-teal/20 p-6">
          <h3 className="text-lg font-heading font-bold text-white mb-4">
            Export Formats
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <FileText className="w-8 h-8 text-neon-teal mx-auto mb-2" />
              <h4 className="font-paragraph font-bold text-white mb-1">PDF</h4>
              <p className="text-xs font-paragraph text-white/60">
                Formatted documents ready for printing
              </p>
            </div>
            
            <div className="text-center">
              <Settings className="w-8 h-8 text-magenta mx-auto mb-2" />
              <h4 className="font-paragraph font-bold text-white mb-1">JSON</h4>
              <p className="text-xs font-paragraph text-white/60">
                Structured data for import/export
              </p>
            </div>
            
            <div className="text-center">
              <FileText className="w-8 h-8 text-neon-teal mx-auto mb-2" />
              <h4 className="font-paragraph font-bold text-white mb-1">TXT</h4>
              <p className="text-xs font-paragraph text-white/60">
                Plain text for universal compatibility
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
