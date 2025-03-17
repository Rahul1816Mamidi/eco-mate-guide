
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

// Type definitions
type GeminiResponse = {
  candidates: {
    content: {
      parts: {
        text: string;
      }[];
    };
  }[];
  promptFeedback?: {
    blockReason?: string;
  };
};

export const useGeminiAI = () => {
  const [response, setResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  // The API key would normally be stored securely in environment variables
  // For demo purposes, we're using it directly (not recommended for production)
  const API_KEY = "AIzaSyCvcBNCcsRnFHPbkxxkv7LFm2YoFhilFgw";
  
  const askAI = async (prompt: string) => {
    setIsLoading(true);
    setResponse(null);
    
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: prompt,
                  },
                ],
              },
            ],
            generationConfig: {
              temperature: 0.7,
              topK: 40,
              topP: 0.95,
              maxOutputTokens: 1024,
            },
            safetySettings: [
              {
                category: "HARM_CATEGORY_HARASSMENT",
                threshold: "BLOCK_MEDIUM_AND_ABOVE",
              },
              {
                category: "HARM_CATEGORY_HATE_SPEECH",
                threshold: "BLOCK_MEDIUM_AND_ABOVE",
              },
              {
                category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                threshold: "BLOCK_MEDIUM_AND_ABOVE",
              },
              {
                category: "HARM_CATEGORY_DANGEROUS_CONTENT",
                threshold: "BLOCK_MEDIUM_AND_ABOVE",
              },
            ],
          }),
        }
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data: GeminiResponse = await response.json();
      
      if (data.promptFeedback?.blockReason) {
        toast({
          title: "Content blocked",
          description: "The AI couldn't generate a response due to safety concerns.",
          variant: "destructive",
        });
        return;
      }
      
      if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
        const result = data.candidates[0].content.parts[0].text;
        setResponse(result);
      } else {
        toast({
          title: "Error",
          description: "No valid response from the AI.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      toast({
        title: "Error",
        description: "Failed to get AI response. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return { askAI, response, isLoading };
};
