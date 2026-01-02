import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, ArrowLeft, ArrowRight, Download, Printer, Eye, EyeOff, Shuffle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

interface Flashcard {
  id: string;
  front: string;
  back: string;
  category: string;
}

const sampleFlashcards: Flashcard[] = [
  {
    id: '1',
    front: 'Core Methodology',
    back: 'Mixed methods approach—qualitative meets quantitative for deeper insights.',
    category: 'Method'
  },
  {
    id: '2',
    front: 'Key Insight',
    back: 'Foundational framework that drives all subsequent analysis and conclusions.',
    category: 'Core'
  },
  {
    id: '3',
    front: 'Main Findings',
    back: 'Strong positive correlation with statistical significance across all variables.',
    category: 'Results'
  },
  {
    id: '4',
    front: 'Critical Limitations',
    back: 'Sample size constraints and time boundaries affect broader applicability.',
    category: 'Limits'
  },
  {
    id: '5',
    front: 'Future Direction',
    back: 'Scale up sample size, extend timeline, implement controlled trials.',
    category: 'Next'
  }
];

export default function FlashcardsPage() {
  const navigate = useNavigate();
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [flashcards, setFlashcards] = useState(sampleFlashcards);

  const currentCard = flashcards[currentCardIndex];

  const nextCard = () => {
    setCurrentCardIndex((prev) => (prev + 1) % flashcards.length);
    setIsFlipped(false);
  };

  const prevCard = () => {
    setCurrentCardIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length);
    setIsFlipped(false);
  };

  const shuffleCards = () => {
    const shuffled = [...flashcards].sort(() => Math.random() - 0.5);
    setFlashcards(shuffled);
    setCurrentCardIndex(0);
    setIsFlipped(false);
  };

  const resetCards = () => {
    setFlashcards(sampleFlashcards);
    setCurrentCardIndex(0);
    setIsFlipped(false);
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([JSON.stringify(flashcards, null, 2)], { type: 'application/json' });
    element.href = URL.createObjectURL(file);
    element.download = 'flashcards.json';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handlePrint = () => {
    window.print();
  };

  if (showAll) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <div className="bg-deep-space-blue border-b border-neon-teal/20 p-3 md:p-6">
          <div className="max-w-[100rem] mx-auto flex items-center justify-between gap-2 md:gap-4">
            <div className="flex items-center gap-2 md:gap-4 min-w-0">
              <Button
                variant="ghost"
                onClick={() => navigate('/')}
                className="text-neon-teal hover:bg-neon-teal/10 text-xs md:text-sm p-2 h-auto flex-shrink-0"
              >
                <ArrowLeft className="w-4 h-4 mr-1 md:mr-2" />
                <span className="hidden sm:inline">Back</span>
              </Button>
              <h1 className="text-base md:text-2xl font-heading font-bold text-white truncate">
                Study Cards
              </h1>
            </div>
            <div className="flex gap-1 md:gap-2 flex-shrink-0">
              <Button
                onClick={() => setShowAll(false)}
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 text-xs md:text-sm p-2 md:px-3 h-auto"
              >
                <Eye className="w-4 h-4 md:mr-1" />
                <span className="hidden md:inline">Study</span>
              </Button>
              <Button
                onClick={handleDownload}
                className="bg-neon-teal text-black hover:bg-neon-teal/90 text-xs md:text-sm p-2 md:px-3 h-auto"
              >
                <Download className="w-4 h-4 md:mr-1" />
                <span className="hidden md:inline">Export</span>
              </Button>
              <Button
                onClick={handlePrint}
                className="bg-magenta text-black hover:bg-magenta/90 text-xs md:text-sm p-2 md:px-3 h-auto"
              >
                <Printer className="w-4 h-4 md:mr-1" />
                <span className="hidden md:inline">Print</span>
              </Button>
            </div>
          </div>
        </div>

        <div className="max-w-[100rem] mx-auto p-4 md:p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
            {flashcards.map((card, index) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-deep-space-blue border-neon-teal/20 p-4 md:p-6 h-48 md:h-64">
                  <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between mb-3 md:mb-4">
                      <span className="text-xs font-paragraph text-neon-teal bg-neon-teal/10 px-2 py-1 rounded">
                        {card.category}
                      </span>
                      <span className="text-xs font-paragraph text-white/60">
                        {index + 1}/{flashcards.length}
                      </span>
                    </div>
                    
                    <div className="flex-1 space-y-2 md:space-y-4">
                      <div>
                        <h4 className="text-xs md:text-sm font-paragraph font-bold text-white mb-1 md:mb-2">
                          Topic:
                        </h4>
                        <p className="text-xs md:text-sm font-paragraph text-white/80 leading-relaxed">
                          {card.front}
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="text-xs md:text-sm font-paragraph font-bold text-neon-teal mb-1 md:mb-2">
                          Insight:
                        </h4>
                        <p className="text-xs md:text-sm font-paragraph text-white/80 leading-relaxed">
                          {card.back}
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="bg-deep-space-blue border-b border-neon-teal/20 p-3 md:p-6 sticky top-0 z-40">
        <div className="max-w-[100rem] mx-auto flex items-center justify-between gap-2 md:gap-4">
          <div className="flex items-center gap-2 md:gap-4 min-w-0">
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="text-neon-teal hover:bg-neon-teal/10 text-xs md:text-sm p-2 h-auto flex-shrink-0"
            >
              <ArrowLeft className="w-4 h-4 mr-1 md:mr-2" />
              <span className="hidden sm:inline">Back</span>
            </Button>
            <h1 className="text-base md:text-2xl font-heading font-bold text-white truncate">
              Study Mode
            </h1>
          </div>
          <div className="flex gap-1 md:gap-2 flex-shrink-0">
            <Button
              onClick={() => setShowAll(true)}
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10 text-xs md:text-sm p-2 md:px-3 h-auto"
            >
              <EyeOff className="w-4 h-4 md:mr-1" />
              <span className="hidden md:inline">View All</span>
            </Button>
            <Button
              onClick={shuffleCards}
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10 text-xs md:text-sm p-2 md:px-3 h-auto"
            >
              <Shuffle className="w-4 h-4 md:mr-1" />
              <span className="hidden md:inline">Shuffle</span>
            </Button>
            <Button
              onClick={resetCards}
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10 text-xs md:text-sm p-2 md:px-3 h-auto"
            >
              <RotateCcw className="w-4 h-4 md:mr-1" />
              <span className="hidden md:inline">Reset</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4 md:p-8 min-h-[calc(100vh-120px)] md:min-h-[calc(100vh-140px)] flex flex-col">
        <div className="text-center mb-4 md:mb-8">
          <p className="text-sm md:text-lg font-paragraph text-white/80 mb-2">
            Card {currentCardIndex + 1} of {flashcards.length}
          </p>
          <div className="w-full bg-white/10 rounded-full h-2 mb-3 md:mb-4">
            <div
              className="bg-neon-teal h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentCardIndex + 1) / flashcards.length) * 100}%` }}
            />
          </div>
          <span className="text-xs md:text-sm font-paragraph text-neon-teal bg-neon-teal/10 px-3 py-1 rounded inline-block">
            {currentCard.category}
          </span>
        </div>

        <div className="flex justify-center mb-6 md:mb-8 flex-1">
          <motion.div
            className="relative w-full max-w-2xl h-64 md:h-96 cursor-pointer"
            onClick={() => setIsFlipped(!isFlipped)}
            style={{ perspective: '1000px' }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={isFlipped ? 'back' : 'front'}
                initial={{ rotateY: 90 }}
                animate={{ rotateY: 0 }}
                exit={{ rotateY: -90 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <Card className="w-full h-full bg-deep-space-blue border-neon-teal/20 p-4 md:p-8 flex flex-col justify-center">
                  <div className="text-center">
                    <h3 className="text-xs md:text-sm font-paragraph font-bold text-neon-teal mb-3 md:mb-4">
                      {isFlipped ? 'Insight' : 'Topic'}
                    </h3>
                    <p className="text-base md:text-xl font-paragraph text-white leading-relaxed break-words">
                      {isFlipped ? currentCard.back : currentCard.front}
                    </p>
                  </div>
                  
                  <div className="absolute bottom-3 md:bottom-4 left-1/2 transform -translate-x-1/2">
                    <p className="text-xs font-paragraph text-white/40">
                      Click to {isFlipped ? 'see topic' : 'reveal insight'}
                    </p>
                  </div>
                </Card>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

        <div className="flex justify-center items-center gap-2 md:gap-4 mb-4 md:mb-6 flex-wrap">
          <Button
            onClick={prevCard}
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10 text-xs md:text-sm p-2 md:px-3 h-auto"
            disabled={flashcards.length <= 1}
          >
            <ArrowLeft className="w-4 h-4 md:mr-2" />
            <span className="hidden md:inline">Previous</span>
          </Button>

          <div className="flex gap-1 md:gap-2">
            {flashcards.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentCardIndex(index);
                  setIsFlipped(false);
                }}
                className={`w-2 md:w-3 h-2 md:h-3 rounded-full transition-colors ${
                  index === currentCardIndex
                    ? 'bg-neon-teal'
                    : 'bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>

          <Button
            onClick={nextCard}
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10 text-xs md:text-sm p-2 md:px-3 h-auto"
            disabled={flashcards.length <= 1}
          >
            <span className="hidden md:inline">Next</span>
            <ArrowRight className="w-4 h-4 md:ml-2" />
          </Button>
        </div>

        <div className="text-center">
          <p className="text-xs md:text-sm font-paragraph text-white/60 mb-3 md:mb-4">
            Focus on the topic, then reveal the key insight
          </p>
          
          <div className="flex justify-center gap-2 md:gap-4 flex-wrap">
            <Button
              onClick={handleDownload}
              className="bg-neon-teal text-black hover:bg-neon-teal/90 text-xs md:text-sm p-2 md:px-4 h-auto"
            >
              <Download className="w-4 h-4 md:mr-2" />
              <span className="hidden md:inline">Export</span>
            </Button>
            <Button
              onClick={handlePrint}
              className="bg-magenta text-black hover:bg-magenta/90 text-xs md:text-sm p-2 md:px-4 h-auto"
            >
              <Printer className="w-4 h-4 md:mr-2" />
              <span className="hidden md:inline">Print</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
