export interface User {
  id: string;
  name: string;
  avatar: string;
}

export interface Question {
  id: string;
  prompt: string; // Supports HTML for images
  options: string[];
  correctOptionIndex: number;
  explanation?: string;
}

export type NewQuestion = Omit<Question, 'id'>;

export interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: Question[];
  createdAt: number;
  creator: User;
}

export type NewQuiz = Omit<Quiz, 'id' | 'createdAt' | 'creator'>;

export interface QuizSession {
  quizId: string;
  answers: Record<string, number>; // questionId -> selectedIndex (MAS ADELANTE TOMAR TIEMPO)
  isCompleted: boolean;
  startTime: number;
  endTime?: number;
}

export type ViewType = 'dashboard' | 'create' | 'import' | 'play' | 'results';

export type TypeQuestion = "first" | "middle" | "last"

// PROPS
export interface FileDropZoneProps {
  onFileSelect: (file: File) => void;
  onError?: (error: string) => void;
}

export interface QuestionFormAddProps {
  question: Question;
  currentQuestionIdx: number;
  addQuestionToQuiz: (question: Question) => boolean;
}