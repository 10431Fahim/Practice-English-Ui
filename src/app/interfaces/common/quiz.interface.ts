export interface Quiz {
  _id?: string;
  name?: string;
  questionCount?: number;
  timeInSec?: number;
  passMark?: number;
  isNegativeMark?: boolean;
  negativeMark?: number;
  questions: QuizQuestion[];
  image?: string;
  priority?: number;
  createdAt?: string;
  updatedAt?: string;
  select?: boolean;
}

export interface QuizQuestion {
  name: string;
  image: string;
  options: QuizOption[];
}

export interface QuizOption {
  name: string;
  isCorrect: boolean;
  isSelect?: boolean;
}
