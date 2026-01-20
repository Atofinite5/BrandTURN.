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

  // Branding: BT Buddy with distinctive black box logo
  const chatbotName = 'BT';
  const chatbotTitle = 'BT Buddy';
  const chatbotSubtitle = 'BrandTURN Executive Assistant';

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: Message = {
        id: 'welcome',
        text: context === 'admin'
          ? `Hello! I'm BT Buddy, your AI assistant for the admin panel. I can help you with writing emails, generating business ideas, marketing strategies, and more. How can I assist you today?`
          : `Hi there! I'm BT Buddy, your BrandTURN executive assistant. I'm here to help you understand our services, provide marketing suggestions, or guide you to the right resources. What can I help you with?`,
        isUser: false,
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, context, messages.length]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'auto' });
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
      <div className="bg-white rounded-2xl shadow-2xl w-96 h-[550px] flex flex-col overflow-hidden border border-gray-200">
        {/* Header with BT Branding */}
        <div className="bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* BT Logo in Black Box */}
            <div className="relative flex-shrink-0">
              <div className="w-12 h-12 bg-black border-2 border-white rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl tracking-tight">{chatbotName}</span>
              </div>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            {/* Title */}
            <div className="flex-1">
              <h3 className="font-bold text-base leading-tight">{chatbotTitle}</h3>
              <p className="text-xs text-gray-300 mt-0.5">{chatbotSubtitle}</p>
              <div className="flex items-center gap-1 mt-1">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-green-400">Online</span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close chat"
            className="text-white hover:bg-white/20 rounded-lg p-2 transition-all duration-200 hover:rotate-90"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div
          className="flex-1 overflow-y-auto p-4 space-y-3 bg-gradient-to-b from-gray-50 to-white"
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
        >
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} animate-fadeIn`}
            >
              <div
                className={`max-w-[85%] px-4 py-3 text-sm leading-relaxed ${message.isUser
                    ? 'bg-black text-white rounded-2xl rounded-br-sm shadow-lg'
                    : 'bg-white text-gray-800 rounded-2xl rounded-bl-sm shadow-md border border-gray-200'
                  }`}
              >
                <p className="whitespace-pre-wrap">{message.text}</p>
                <p className={`text-[10px] mt-1.5 ${message.isUser ? 'text-white/70' : 'text-gray-500'
                  }`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start animate-fadeIn">
              <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-sm shadow-md border border-gray-200">
                <div className="flex space-x-1.5">
                  <span className="w-2 h-2 bg-gray-600 rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                  <span className="w-2 h-2 bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-200 bg-white">
          <div className="flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              aria-label="Type a message"
              placeholder="Type your message..."
              className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-black text-sm text-black placeholder-gray-400 bg-gray-50 transition-all duration-200"
              disabled={isTyping}
            />
            <button
              onClick={sendMessage}
              aria-label="Send message"
              disabled={!inputMessage.trim() || isTyping}
              className="bg-black text-white p-3 w-12 h-12 rounded-xl hover:bg-gray-800 transition-all duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
            >
              <svg className="w-5 h-5 transform rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
