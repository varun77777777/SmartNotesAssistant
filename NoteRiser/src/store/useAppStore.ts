import { create } from 'zustand';

interface AppState {
  // PDF Upload State
  uploadedFile: File | null;
  isProcessing: boolean;
  summary: string;
  
  // Quiz State
  quizResults: any[];
  currentQuizScore: number;
  
  // Flashcards State
  flashcards: any[];
  
  // Q&A State
  qaHistory: any[];
  
  // Dark Mode
  isDarkMode: boolean;
  
  // Actions
  setUploadedFile: (file: File | null) => void;
  setIsProcessing: (processing: boolean) => void;
  setSummary: (summary: string) => void;
  setQuizResults: (results: any[]) => void;
  setCurrentQuizScore: (score: number) => void;
  setFlashcards: (flashcards: any[]) => void;
  setQAHistory: (history: any[]) => void;
  toggleDarkMode: () => void;
  resetApp: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  // Initial state
  uploadedFile: null,
  isProcessing: false,
  summary: '',
  quizResults: [],
  currentQuizScore: 0,
  flashcards: [],
  qaHistory: [],
  isDarkMode: true,
  
  // Actions
  setUploadedFile: (file) => set({ uploadedFile: file }),
  setIsProcessing: (processing) => set({ isProcessing: processing }),
  setSummary: (summary) => set({ summary }),
  setQuizResults: (results) => set({ quizResults: results }),
  setCurrentQuizScore: (score) => set({ currentQuizScore: score }),
  setFlashcards: (flashcards) => set({ flashcards }),
  setQAHistory: (history) => set({ qaHistory: history }),
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
  resetApp: () => set({
    uploadedFile: null,
    isProcessing: false,
    summary: '',
    quizResults: [],
    currentQuizScore: 0,
    flashcards: [],
    qaHistory: []
  })
}));
