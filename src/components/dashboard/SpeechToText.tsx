import React, { useState, useRef, useEffect } from "react";
import { Mic, MicOff } from "lucide-react";

interface SpeechToTextProps {
  setValue: (text: string) => void;
  changeType:()=>void;
}

const SpeechToText: React.FC<SpeechToTextProps> = ({ setValue,changeType }) => {
  const [isListening, setIsListening] = useState<boolean>(false);
  const recognitionRef = useRef<any | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    changeType();
    return () => stopListening(); // Cleanup on unmount
  }, []);

  const startListening = () => {
    const speechWindow = window as any;
    const SpeechRecognition =
      speechWindow.SpeechRecognition || speechWindow.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Your browser does not support Speech Recognition.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = false; // Stops when silence is detected
    recognition.interimResults = true; // Enables real-time transcription
    recognitionRef.current = recognition;

    recognition.onstart = () => {
      setIsListening(true);
      setValue(""); // Clear previous text
      timeoutRef.current = setTimeout(() => stopListening(), 60000); // Stop after 1 min
    };

    recognition.onresult = (event: any) => {
      let transcript = "";
      for (let i = 0; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript + " ";
      }
      setValue(transcript.trim()); // Update text in real-time
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error:", event.error);
      stopListening();
    };

    recognition.onend = () => {
      setIsListening(false);
      if (timeoutRef.current) clearTimeout(timeoutRef.current); // Clear timeout if ended early
    };

    recognition.start();
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  return (
    <div>
      {isListening ? (
        <Mic className="cursor-pointer animate-pulse" onClick={stopListening} />
      ) : (
        <MicOff className="cursor-pointer" onClick={startListening} />
      )}
    </div>
  );
};

export default SpeechToText;
