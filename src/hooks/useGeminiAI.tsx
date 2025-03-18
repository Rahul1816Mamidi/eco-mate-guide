
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import axios from 'axios';

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
  const API_KEY = "AIzaSyASsXRUYy4OmpCQIwC_lwzzUIguotWi16k";
  
  const askAI = async (prompt: string) => {
    setIsLoading(true);
    setResponse(null);
    
    try {
      // Using Gemini 1.5 Flash model
      const enhancedPrompt = `
        You are providing concise and clear information to users on sustainable living topics.
        
        Important formatting guidelines:
        - Use a clean, structured format with clear sections when appropriate.
        - Use headings (## for sections, ### for subsections) when it improves readability.
        - Use bullet points (• ) for lists, NOT dashes or asterisks.
        - Use bold (**text**) for emphasis on important terms.
        - Avoid excessive formatting - be judicious.
        - Be direct and practical with actionable advice.
        - Keep your response under 200 words total, focusing on the most important points.
        - DO NOT include titles like "Here's my response" or "Sustainable tips" at the beginning.
        - DO NOT use placeholder terms like "here is" or "I'll provide".
        - Just start with the content directly.
        
        Query: ${prompt}
      `;
      
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
        {
          contents: [
            {
              parts: [
                {
                  text: enhancedPrompt,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.2,
            topK: 32,
            topP: 0.95,
            maxOutputTokens: 800,
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
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      
      const data: GeminiResponse = response.data;
      
      if (data.promptFeedback?.blockReason) {
        toast({
          title: "Content blocked",
          description: "The AI couldn't generate a response due to safety concerns.",
          variant: "destructive",
        });
        return;
      }
      
      if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
        // Process the response to improve formatting
        let result = data.candidates[0].content.parts[0].text;
        
        // Remove any extra instructions that might have been included
        result = result.replace(/^(As an AI assistant|I'll provide|Here's a concise|Here is a|Following your instructions).*?\n/i, '');
        
        // Remove redundant title if present
        result = result.replace(/^#+\s*Energy Efficiency Recommendations:?\s*\n+/i, '');
        result = result.replace(/^#+\s*Simple Ways to Make Your Home More Energy Efficient:?\s*\n+/i, '');
        result = result.replace(/^#+\s*Eco Tip(s)? (of the Day|for Today):?\s*\n+/i, '');
        
        // Format markdown headers properly
        result = result.replace(/^(\w.+):$/gm, '**$1:**');
        
        // Fix bullet points
        result = result.replace(/^[-*]\s+/gm, '• ');
        
        // Ensure there's spacing between sections
        result = result.replace(/(\n#+\s+)/g, '\n\n$1');
        
        // Remove any "Query:" text that might be included
        result = result.replace(/Query:.*$/gm, '');
        
        // Clean up extra whitespace
        result = result.replace(/\n{3,}/g, '\n\n');
        result = result.trim();
        
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
