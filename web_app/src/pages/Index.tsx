
import { useState, useEffect } from 'react';
import QuestionForm from '@/components/QuestionForm';
import AnswerDisplay from '@/components/AnswerDisplay';
import QAHistory from '@/components/QAHistory';
import { Answer } from '@/types';
import { answerQuestion } from '@/services/geminiService';
import { useToast } from '@/components/ui/use-toast';
import { GraduationCap, School } from 'lucide-react';

const Index = () => {
  const API_KEY = 'AIzaSyDwz34pykzm4f0QxpN8q7OMXVOmT4RMfy8';
  const [currentAnswer, setCurrentAnswer] = useState<Answer | null>(null);
  const [history, setHistory] = useState<Answer[]>(() => {
    const savedHistory = localStorage.getItem('qa-history');
    return savedHistory ? JSON.parse(savedHistory) : [];
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    localStorage.setItem('qa-history', JSON.stringify(history));
  }, [history]);

  const handleSubmit = async (question: string) => {
    setIsLoading(true);
    try {
      const result = await answerQuestion(question, API_KEY);
      setCurrentAnswer(result);
      setHistory(prev => [result, ...prev]);
    } catch (error) {
      console.error("Error getting answer:", error);
      let errorMessage = "Une erreur s'est produite lors de la génération de la réponse.";
      
      if (error instanceof Error) {
        // Check for CORS errors
        if (error.message.includes("Network Error") || error.message.includes("Failed to fetch")) {
          errorMessage = "Impossible de se connecter au serveur Flask. Assurez-vous qu'il est en cours d'exécution sur localhost:5000 et que CORS est activé.";
        } else {
          errorMessage = error.message;
        }
      }
      
      toast({
        title: "Erreur",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-ensi-50 to-white">
      <div className="container py-8 px-4 md:py-12 md:px-6 max-w-4xl mx-auto">
        <header className="mb-8 text-center">
          <div className="flex flex-col items-center justify-center gap-3 mb-4">
            <img 
              src="/lovable-uploads/d915f0fc-ee2a-47a6-afda-c8fb3bd76268.png" 
              alt="ENSI Logo" 
              className="h-24 md:h-32 mb-2" 
            />
            <h1 className="text-3xl md:text-4xl font-bold text-ensi-dark">
              Assistant ENSI
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Posez vos questions sur l'École Nationale des Sciences de l'Informatique et obtenez des réponses précises générées par l'IA Gemini.
            </p>
          </div>
        </header>
        
        <div className="mb-8">
          <QuestionForm onSubmit={handleSubmit} isLoading={isLoading} />
        </div>

        {isLoading && (
          <div className="flex justify-center my-8">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full border-4 border-ensi-200 border-t-ensi-500 animate-spin mb-4"></div>
              <p className="text-ensi-700">Génération de la réponse en cours...</p>
            </div>
          </div>
        )}

        {currentAnswer && !isLoading && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-ensi-dark mb-4 flex items-center gap-2">
              <GraduationCap className="text-ensi-500" />
              Réponse
            </h2>
            <AnswerDisplay answer={currentAnswer} />
          </div>
        )}

        <QAHistory history={history.slice(currentAnswer ? 1 : 0)} />
      </div>
    </div>
  );
};

export default Index;
