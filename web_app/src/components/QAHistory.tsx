
import React from 'react';
import { Answer } from '@/types';
import AnswerDisplay from './AnswerDisplay';
import { History } from 'lucide-react';

interface QAHistoryProps {
  history: Answer[];
}

const QAHistory = ({ history }: QAHistoryProps) => {
  if (history.length === 0) {
    return null;
  }

  return (
    <div className="mt-6 space-y-4">
      <h2 className="text-xl font-semibold text-ensi-dark flex items-center gap-2">
        <History className="text-ensi-500" />
        Historique des questions
      </h2>
      <div className="space-y-4">
        {history.map((item, index) => (
          <AnswerDisplay key={index} answer={item} />
        ))}
      </div>
    </div>
  );
};

export default QAHistory;
