
import { Answer } from '@/types';

// Function to answer a question by calling the Flask server
export const answerQuestion = async (question: string, apiKey: string): Promise<Answer> => {
  try {
    // Create the request to the Flask server running on localhost:5000
    const response = await fetch('http://localhost:5000/answer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        question,
        api_key: apiKey
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Server error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    
    return {
      question,
      answer: data.answer,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error("Error answering question:", error);
    throw error;
  }
};
