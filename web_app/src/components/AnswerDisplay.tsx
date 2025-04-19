
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Answer } from '@/types';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { MessageSquare } from 'lucide-react';

interface AnswerDisplayProps {
  answer: Answer;
}

const AnswerDisplay = ({ answer }: AnswerDisplayProps) => {
  const formattedTime = formatDistanceToNow(new Date(answer.timestamp), { 
    addSuffix: true,
    locale: fr
  });

  return (
    <Card className="w-full mb-4 bg-white border border-ensi-100 shadow-sm hover:shadow transition-shadow">
      <CardHeader className="pb-2">
        <CardTitle className="text-md font-medium text-ensi-700 flex items-center gap-2">
          <MessageSquare size={18} className="text-ensi-500" />
          {answer.question}
        </CardTitle>
        <p className="text-xs text-gray-500">{formattedTime}</p>
      </CardHeader>
      <CardContent>
        <div className="text-gray-700 whitespace-pre-line">
          {answer.answer}
        </div>
      </CardContent>
    </Card>
  );
};

export default AnswerDisplay;
