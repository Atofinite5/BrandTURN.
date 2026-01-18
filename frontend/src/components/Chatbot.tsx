import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatbotProps {
  context: 'admin' | 'landing';
  isOpen: boolean;
  onClose: () => void;
}

const Chatbot: React.FC<ChatbotProps> = ({ context, isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5002';

  // Branding: show "BT" in the circle and consistent title
  const chatbotName = 'BT';
  const chatbotTitle = 'BT buddy - BrandTURN Executive Assistant';

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: Message = {
        id: 'welcome',
        text: context === 'admin'
          ? `Hello! I'm BT buddy, your AI assistant for the admin panel. I can help you with writing emails, generating business ideas, marketing strategies, and more. How can I assist you today?`
          : `Hi there! I'm BT buddy, your BrandTURN executive assistant. I'm here to help you understand our services, provide marketing suggestions, or guide you to the right resources. What can I help you with?`,
        isUser: false,
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, context, messages.length]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    try {
      const response = await axios.post(`${API_URL}/api/integrations/ai/chat`, {
        message: inputMessage,
        context
      });

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response.data.content,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Sorry, I\'m having trouble connecting right now. Please try again later.',
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-80 h-[500px] flex flex-col">
        {/* Header */}
        <div className="bg-black text-white p-3 rounded-t-2xl flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative flex-shrink-0">
              <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white font-bold text-lg">
                {chatbotName}
              </div>
              <span className="block text-xs lowercase text-white/90 mt-1 text-center">buddy</span>
            </div>
            <div className="ml-0">
              <h3 className="font-semibold text-sm leading-tight">BT buddy - BrandTURN</h3>
              <p className="text-xs text-white/80 mt-0.5">Executive Assistant</p>
              <p className="text-xs opacity-80 text-white/80 mt-0.5">Online</p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close chat"
            className="text-white hover:bg-white/10 rounded-full p-1 transition-colors"
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button> 
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div
          className="flex-1 overflow-y-auto p-4 space-y-4"
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
        >
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] ${message.isUser ? 'ml-auto' : ''} p-3 rounded-2xl text-sm ${
                  message.isUser
                    ? 'bg-black text-white rounded-3xl text-sm leading-normal'
                    : 'bg-gray-100 text-gray-900 rounded-2xl text-sm leading-relaxed'
                } shadow-sm`}
              >
                <p className="whitespace-pre-wrap">{message.text}</p>
                <p className={`text-xs mt-1 ${message.isUser ? 'text-white/70' : 'text-gray-500'}`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div> 
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className={`p-3 rounded-2xl ${context === 'landing' ? 'bg-gray-100' : 'bg-gray-100'}`}>
                <div className="flex space-x-1">
                  <div className={`w-2 h-2 rounded-full animate-bounce ${context === 'landing' ? 'bg-black' : 'bg-gray-400'}`}></div>
                  <div className={`w-2 h-2 rounded-full animate-bounce ${context === 'landing' ? 'bg-black' : 'bg-gray-400'}`} style={{ animationDelay: '0.1s' }}></div>
                  <div className={`w-2 h-2 rounded-full animate-bounce ${context === 'landing' ? 'bg-black' : 'bg-gray-400'}`} style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              aria-label="Type a message"
              placeholder="Type your message..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-black/80 focus:border-transparent text-black placeholder-gray-500 bg-white"
              disabled={isTyping}
            />
            <button
              onClick={sendMessage}
              aria-label="Send message"
              disabled={!inputMessage.trim() || isTyping}
              className="bg-black text-white p-2.5 w-10 h-10 rounded-full hover:bg-gray-800 transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-4 h-4 transform rotate-90 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M22 2L11 13" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M22 2l-7 20-4-9-9-4 20-7z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
