
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Send, HelpCircle } from 'lucide-react';

interface QuestionFormProps {
  onSubmit: (question: string) => Promise<void>;
  isLoading: boolean;
}

const QuestionForm = ({ onSubmit, isLoading }: QuestionFormProps) => {
  const [question, setQuestion] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (question.trim() && !isLoading) {
      await onSubmit(question);
      // Don't clear the input after submission so users can see what they asked
    }
  };

  return (
    <Card className="w-full border-ensi-100 shadow-sm">
      <CardContent className="pt-6">
        <div className="mb-4 flex items-center gap-2 text-ensi-700">
          <HelpCircle size={20} className="text-ensi-500" />
          <h3 className="font-semibold">Posez votre question sur ENSI</h3>
        </div>
        <form onSubmit={handleSubmit} className="flex items-end gap-2">
          <div className="flex-1">
            <Input
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Quels sont les filières disponibles à l'ENSI?"
              className="w-full border-ensi-200 focus-visible:ring-ensi-500"
              disabled={isLoading}
            />
          </div>
          <Button 
            type="submit" 
            disabled={isLoading || !question.trim()} 
            className="bg-ensi-500 hover:bg-ensi-600"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-ensi-200 border-t-white" />
                <span>Traitement...</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Send size={16} />
                <span>Demander</span>
              </div>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default QuestionForm;
