import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, ArrowLeft, RotateCcw, Trophy, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useNavigate } from 'react-router-dom';

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface QuizResult {
  questionId: string;
  selectedAnswer: number;
  isCorrect: boolean;
  timeSpent: number;
}

const sampleQuestions: Question[] = [
  {
    id: '1',
    question: 'What is the main concept discussed in the first chapter of the document?',
    options: [
      'Introduction to basic principles',
      'Advanced methodologies',
      'Conclusion and summary',
      'References and citations'
    ],
    correctAnswer: 0,
    explanation: 'The first chapter typically introduces the basic principles and foundational concepts that will be built upon throughout the document.'
  },
  {
    id: '2',
    question: 'Which methodology is primarily emphasized in the research section?',
    options: [
      'Qualitative analysis',
      'Quantitative research',
      'Mixed methods approach',
      'Theoretical framework'
    ],
    correctAnswer: 2,
    explanation: 'The document emphasizes a mixed methods approach, combining both qualitative and quantitative research techniques for comprehensive analysis.'
  },
  {
    id: '3',
    question: 'What are the key findings mentioned in the results section?',
    options: [
      'No significant results found',
      'Positive correlation between variables',
      'Negative impact on outcomes',
      'Inconclusive data analysis'
    ],
    correctAnswer: 1,
    explanation: 'The results section highlights a positive correlation between the studied variables, indicating a meaningful relationship.'
  },
  {
    id: '4',
    question: 'Which recommendation is provided for future research?',
    options: [
      'Discontinue current methods',
      'Expand sample size',
      'Change research focus entirely',
      'Ignore previous findings'
    ],
    correctAnswer: 1,
    explanation: 'The document recommends expanding the sample size to increase the validity and generalizability of future research findings.'
  },
  {
    id: '5',
    question: 'What is the primary limitation mentioned in the study?',
    options: [
      'Lack of funding',
      'Limited time frame',
      'Small sample size',
      'Inadequate technology'
    ],
    correctAnswer: 2,
    explanation: 'The primary limitation identified is the small sample size, which may affect the generalizability of the results.'
  }
];

export default function QuizPage() {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [quizResults, setQuizResults] = useState<QuizResult[]>([]);
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  const [startTime, setStartTime] = useState<Date>(new Date());
  const [questionStartTime, setQuestionStartTime] = useState<Date>(new Date());

  const currentQuestion = sampleQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / sampleQuestions.length) * 100;

  useEffect(() => {
    setQuestionStartTime(new Date());
  }, [currentQuestionIndex]);

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;

    const timeSpent = new Date().getTime() - questionStartTime.getTime();
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

    const result: QuizResult = {
      questionId: currentQuestion.id,
      selectedAnswer,
      isCorrect,
      timeSpent
    };

    setQuizResults(prev => [...prev, result]);
    setShowResult(true);

    setTimeout(() => {
      if (currentQuestionIndex < sampleQuestions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        setIsQuizComplete(true);
      }
    }, 3000);
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setQuizResults([]);
    setIsQuizComplete(false);
    setStartTime(new Date());
    setQuestionStartTime(new Date());
  };

  const calculateScore = () => {
    const correctAnswers = quizResults.filter(result => result.isCorrect).length;
    return Math.round((correctAnswers / sampleQuestions.length) * 100);
  };

  const getTotalTime = () => {
    const totalMs = quizResults.reduce((sum, result) => sum + result.timeSpent, 0);
    return Math.round(totalMs / 1000);
  };

  if (isQuizComplete) {
    const score = calculateScore();
    const totalTime = getTotalTime();

    return (
      <div className="min-h-screen bg-background text-foreground">
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
              <Trophy className="w-6 md:w-8 h-6 md:h-8 text-magenta flex-shrink-0" />
              <h1 className="text-base md:text-2xl font-heading font-bold text-white">
                Quiz Complete!
              </h1>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto p-4 md:p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-6 md:mb-8"
          >
            <div className="w-24 md:w-32 h-24 md:h-32 mx-auto mb-4 md:mb-6 relative">
              <div className="w-full h-full rounded-full border-4 md:border-8 border-deep-space-blue flex items-center justify-center bg-gradient-to-br from-neon-teal to-magenta">
                <span className="text-2xl md:text-3xl font-heading font-bold text-black">
                  {score}%
                </span>
              </div>
            </div>
            <h2 className="text-2xl md:text-4xl font-heading font-bold text-white mb-2">
              {score >= 80 ? 'Excellent!' : score >= 60 ? 'Good Job!' : 'Keep Learning!'}
            </h2>
            <p className="text-sm md:text-lg font-paragraph text-white/80">
              You scored {quizResults.filter(r => r.isCorrect).length} out of {sampleQuestions.length}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-6 mb-6 md:mb-8">
            <Card className="bg-deep-space-blue border-neon-teal/20 p-3 md:p-6 text-center">
              <Trophy className="w-6 md:w-8 h-6 md:h-8 text-neon-teal mx-auto mb-2 md:mb-3" />
              <p className="text-xl md:text-2xl font-heading font-bold text-white">{score}%</p>
              <p className="text-xs md:text-sm font-paragraph text-white/60">Score</p>
            </Card>

            <Card className="bg-deep-space-blue border-magenta/20 p-3 md:p-6 text-center">
              <Clock className="w-6 md:w-8 h-6 md:h-8 text-magenta mx-auto mb-2 md:mb-3" />
              <p className="text-xl md:text-2xl font-heading font-bold text-white">{totalTime}s</p>
              <p className="text-xs md:text-sm font-paragraph text-white/60">Time</p>
            </Card>

            <Card className="bg-deep-space-blue border-neon-teal/20 p-3 md:p-6 text-center">
              <CheckCircle className="w-6 md:w-8 h-6 md:h-8 text-neon-teal mx-auto mb-2 md:mb-3" />
              <p className="text-xl md:text-2xl font-heading font-bold text-white">
                {quizResults.filter(r => r.isCorrect).length}/{sampleQuestions.length}
              </p>
              <p className="text-xs md:text-sm font-paragraph text-white/60">Correct</p>
            </Card>
          </div>

          <Card className="bg-deep-space-blue border-neon-teal/20 p-4 md:p-6 mb-6">
            <h3 className="text-base md:text-xl font-heading font-bold text-white mb-3 md:mb-4">
              Review
            </h3>
            <div className="space-y-2 md:space-y-4 max-h-96 overflow-y-auto">
              {sampleQuestions.map((question, index) => {
                const result = quizResults[index];
                return (
                  <div key={question.id} className="border border-white/10 rounded-lg p-2 md:p-4">
                    <div className="flex items-start gap-2 md:gap-3">
                      {result.isCorrect ? (
                        <CheckCircle className="w-4 md:w-5 h-4 md:h-5 text-neon-teal mt-0.5 md:mt-1 flex-shrink-0" />
                      ) : (
                        <XCircle className="w-4 md:w-5 h-4 md:h-5 text-destructive mt-0.5 md:mt-1 flex-shrink-0" />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="font-paragraph text-xs md:text-sm text-white mb-1">
                          {index + 1}. {question.question}
                        </p>
                        <p className="text-xs font-paragraph text-white/60">
                          Your answer: {question.options[result.selectedAnswer]}
                        </p>
                        {!result.isCorrect && (
                          <p className="text-xs font-paragraph text-neon-teal">
                            Correct: {question.options[question.correctAnswer]}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              onClick={restartQuiz}
              className="bg-neon-teal text-black hover:bg-neon-teal/90 text-sm md:text-base"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Retake
            </Button>
            <Button
              onClick={() => navigate('/')}
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10 text-sm md:text-base"
            >
              Home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="bg-deep-space-blue border-b border-neon-teal/20 p-6">
        <div className="max-w-[100rem] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="text-neon-teal hover:bg-neon-teal/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
            <div className="flex items-center gap-3">
              <Trophy className="w-8 h-8 text-magenta" />
              <h1 className="text-2xl font-heading font-bold text-white">
                "I Am Ready" Quiz
              </h1>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-paragraph text-white/60">
              Question {currentQuestionIndex + 1} of {sampleQuestions.length}
            </p>
            <Progress value={progress} className="w-32 mt-1" />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-8">
        <AnimatePresence mode="wait">
          {!showResult ? (
            <motion.div
              key={currentQuestionIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <Card className="bg-deep-space-blue border-neon-teal/20 p-8">
                <h2 className="text-2xl font-heading font-bold text-white mb-6">
                  {currentQuestion.question}
                </h2>

                <div className="space-y-4 mb-8">
                  {currentQuestion.options.map((option, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`p-4 rounded-lg border cursor-pointer transition-all ${
                        selectedAnswer === index
                          ? 'border-neon-teal bg-neon-teal/10'
                          : 'border-white/20 hover:border-neon-teal/50'
                      }`}
                      onClick={() => handleAnswerSelect(index)}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded-full border-2 ${
                          selectedAnswer === index
                            ? 'border-neon-teal bg-neon-teal'
                            : 'border-white/40'
                        }`} />
                        <p className="font-paragraph text-white">
                          {option}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="flex justify-between items-center">
                  <p className="text-sm font-paragraph text-white/60">
                    Select an answer to continue
                  </p>
                  <Button
                    onClick={handleSubmitAnswer}
                    disabled={selectedAnswer === null}
                    className="bg-magenta text-black hover:bg-magenta/90"
                  >
                    Submit Answer
                  </Button>
                </div>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <Card className="bg-deep-space-blue border-neon-teal/20 p-8">
                <div className="mb-6">
                  {quizResults[quizResults.length - 1]?.isCorrect ? (
                    <CheckCircle className="w-16 h-16 text-neon-teal mx-auto mb-4" />
                  ) : (
                    <XCircle className="w-16 h-16 text-destructive mx-auto mb-4" />
                  )}
                  
                  <h3 className="text-2xl font-heading font-bold text-white mb-2">
                    {quizResults[quizResults.length - 1]?.isCorrect ? 'Correct!' : 'Incorrect'}
                  </h3>
                  
                  <p className="text-lg font-paragraph text-white/80 mb-4">
                    {currentQuestion.explanation}
                  </p>

                  {!quizResults[quizResults.length - 1]?.isCorrect && (
                    <div className="bg-neon-teal/10 border border-neon-teal/20 rounded-lg p-4">
                      <p className="text-sm font-paragraph text-neon-teal">
                        Correct answer: {currentQuestion.options[currentQuestion.correctAnswer]}
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-center gap-2 text-white/60">
                  <div className="w-2 h-2 bg-neon-teal rounded-full animate-pulse" />
                  <div className="w-2 h-2 bg-neon-teal rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                  <div className="w-2 h-2 bg-neon-teal rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
                  <span className="text-sm font-paragraph ml-2">
                    {currentQuestionIndex < sampleQuestions.length - 1 ? 'Next question...' : 'Calculating results...'}
                  </span>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
