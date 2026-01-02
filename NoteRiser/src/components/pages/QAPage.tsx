import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, MessageCircle, Globe, FileText, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  source: 'pdf' | 'web';
  timestamp: Date;
}

export default function QAPage() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchSource, setSearchSource] = useState<'pdf' | 'web'>('pdf');
  const [showSidebar, setShowSidebar] = useState(false);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      text: inputText,
      isUser: true,
      source: searchSource,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: crypto.randomUUID(),
        text: searchSource === 'pdf' 
          ? `Based on the uploaded PDF content, here's what I found: ${inputText.includes('what') ? 'The document discusses several key concepts related to your question.' : 'The information you requested can be found in section 3 of the document.'} This answer is derived from semantic search through the document content.`
          : `Based on web search results: ${inputText.includes('what') ? 'Here are the latest findings from reliable sources on the internet.' : 'I found comprehensive information from multiple web sources.'} This information comes from current web resources and may include the most up-to-date data.`,
        isUser: false,
        source: searchSource,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="bg-deep-space-blue border-b border-neon-teal/20 p-3 md:p-6 sticky top-0 z-40">
        <div className="max-w-[100rem] mx-auto flex items-center gap-2 md:gap-4">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="text-neon-teal hover:bg-neon-teal/10 text-xs md:text-sm p-2 h-auto"
          >
            <ArrowLeft className="w-4 h-4 mr-1 md:mr-2" />
            <span className="hidden sm:inline">Back</span>
          </Button>
          <div className="flex items-center gap-2 md:gap-3 flex-1 min-w-0">
            <MessageCircle className="w-5 md:w-8 h-5 md:h-8 text-neon-teal flex-shrink-0" />
            <h1 className="text-base md:text-2xl font-heading font-bold text-white truncate">
              Q&A Assistant
            </h1>
          </div>
          <Button
            variant="ghost"
            onClick={() => setShowSidebar(!showSidebar)}
            className="lg:hidden text-neon-teal hover:bg-neon-teal/10 p-2 h-auto"
          >
            {showSidebar ? '✕' : '☰'}
          </Button>
        </div>
      </div>

      <div className="max-w-[100rem] mx-auto p-3 md:p-8 h-[calc(100vh-120px)] md:h-[calc(100vh-140px)]">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 md:gap-8 h-full">
          {/* Source Selection - Mobile Sidebar */}
          {(showSidebar || window.innerWidth >= 1024) && (
            <div className="lg:col-span-1 order-2 lg:order-1">
              <Card className="bg-deep-space-blue border-neon-teal/20 p-3 md:p-6 h-auto lg:h-full overflow-y-auto">
                <h3 className="text-sm md:text-lg font-heading font-bold text-white mb-2 md:mb-4">
                  Search Source
                </h3>
                
                <div className="space-y-2 md:space-y-3">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`p-2 md:p-4 rounded-lg border cursor-pointer transition-all ${
                      searchSource === 'pdf'
                        ? 'border-neon-teal bg-neon-teal/10'
                        : 'border-white/20 hover:border-neon-teal/50'
                    }`}
                    onClick={() => {
                      setSearchSource('pdf');
                      setShowSidebar(false);
                    }}
                  >
                    <div className="flex items-center gap-2 md:gap-3">
                      <FileText className={`w-4 md:w-6 h-4 md:h-6 flex-shrink-0 ${searchSource === 'pdf' ? 'text-neon-teal' : 'text-white/60'}`} />
                      <div className="min-w-0">
                        <p className={`font-paragraph font-medium text-xs md:text-base ${searchSource === 'pdf' ? 'text-neon-teal' : 'text-white'}`}>
                          PDF Content
                        </p>
                        <p className="text-xs font-paragraph text-white/60">
                          Search document
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`p-2 md:p-4 rounded-lg border cursor-pointer transition-all ${
                      searchSource === 'web'
                        ? 'border-magenta bg-magenta/10'
                        : 'border-white/20 hover:border-magenta/50'
                    }`}
                    onClick={() => {
                      setSearchSource('web');
                      setShowSidebar(false);
                    }}
                  >
                    <div className="flex items-center gap-2 md:gap-3">
                      <Globe className={`w-4 md:w-6 h-4 md:h-6 flex-shrink-0 ${searchSource === 'web' ? 'text-magenta' : 'text-white/60'}`} />
                      <div className="min-w-0">
                        <p className={`font-paragraph font-medium text-xs md:text-base ${searchSource === 'web' ? 'text-magenta' : 'text-white'}`}>
                          Web Search
                        </p>
                        <p className="text-xs font-paragraph text-white/60">
                          Search internet
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>

                <div className="mt-4 md:mt-8">
                  <h4 className="text-xs md:text-sm font-heading font-bold text-white mb-2 md:mb-3">
                    Suggested
                  </h4>
                  <div className="space-y-1 md:space-y-2">
                    {[
                      'Main topics?',
                      'Key points',
                      'Conclusions?',
                      'Methodology'
                    ].map((question, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setInputText(question);
                          setShowSidebar(false);
                        }}
                        className="w-full text-left p-2 text-xs font-paragraph text-white/80 hover:text-neon-teal hover:bg-neon-teal/5 rounded transition-colors"
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* Chat Area */}
          <div className="lg:col-span-3 order-1 lg:order-2 flex flex-col min-h-0">
            <Card className="bg-deep-space-blue border-neon-teal/20 flex-1 flex flex-col p-0 overflow-hidden">
              {/* Messages */}
              <div className="flex-1 p-3 md:p-6 overflow-y-auto space-y-3 md:space-y-4">
                {messages.length === 0 ? (
                  <div className="text-center py-8 md:py-12 flex flex-col items-center justify-center h-full">
                    <MessageCircle className="w-12 md:w-16 h-12 md:h-16 text-white/20 mx-auto mb-3 md:mb-4" />
                    <p className="text-sm md:text-lg font-paragraph text-white/60">
                      Ask a question to get started
                    </p>
                    <p className="text-xs md:text-sm font-paragraph text-white/40 mt-2">
                      Choose your search source and type below
                    </p>
                  </div>
                ) : (
                  messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[85%] md:max-w-[80%] p-2 md:p-4 rounded-lg text-xs md:text-sm ${
                          message.isUser
                            ? 'bg-neon-teal text-black'
                            : 'bg-white/10 text-white border border-white/20'
                        }`}
                      >
                        {!message.isUser && (
                          <div className="flex items-center gap-2 mb-1 md:mb-2">
                            {message.source === 'pdf' ? (
                              <FileText className="w-3 md:w-4 h-3 md:h-4 text-neon-teal flex-shrink-0" />
                            ) : (
                              <Globe className="w-3 md:w-4 h-3 md:h-4 text-magenta flex-shrink-0" />
                            )}
                            <span className="text-xs font-paragraph text-white/60">
                              {message.source === 'pdf' ? 'PDF' : 'Web'}
                            </span>
                          </div>
                        )}
                        <p className="font-paragraph leading-relaxed break-words">
                          {message.text}
                        </p>
                        <p className="text-xs opacity-60 mt-1">
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </motion.div>
                  ))
                )}
                
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="bg-white/10 border border-white/20 p-2 md:p-4 rounded-lg">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-neon-teal rounded-full animate-pulse" />
                        <div className="w-2 h-2 bg-neon-teal rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                        <div className="w-2 h-2 bg-neon-teal rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
                        <span className="text-xs font-paragraph text-white/60 ml-1">
                          Thinking...
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Input Area */}
              <div className="border-t border-white/10 p-3 md:p-6 bg-deep-space-blue">
                <div className="flex gap-2 md:gap-3">
                  <Input
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask..."
                    className="flex-1 bg-white/5 border-white/20 text-white placeholder:text-white/40 focus:border-neon-teal text-xs md:text-sm h-9 md:h-10 px-2 md:px-3"
                    disabled={isLoading}
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!inputText.trim() || isLoading}
                    className={`flex-shrink-0 h-9 md:h-10 px-2 md:px-4 text-xs md:text-sm ${
                      searchSource === 'pdf' 
                        ? 'bg-neon-teal text-black hover:bg-neon-teal/90' 
                        : 'bg-magenta text-black hover:bg-magenta/90'
                    }`}
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-xs font-paragraph text-white/40 mt-1 md:mt-2">
                  {searchSource === 'pdf' ? 'PDF' : 'Web'} • Enter to send
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
