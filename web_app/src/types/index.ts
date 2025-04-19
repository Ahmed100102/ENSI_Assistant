
export interface Answer {
  question: string;
  answer: string;
  timestamp: string;
}

export interface QAHistory {
  items: Answer[];
}
