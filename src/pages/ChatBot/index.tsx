'use client';

import { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

export function ChatBot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const editor = useEditor({
    extensions: [StarterKit],
    content: '',
  });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!editor || editor.isEmpty) return;

    const markdown = editor.getText();
    const userMessage: Message = { role: 'user', content: markdown };
    setMessages((prev) => [...prev, userMessage]);
    editor.commands.clearContent();
    setIsLoading(true);

    try {
      const response = await fetch('https://rag.igormeirelles.dev/agent', {
        method: 'POST',
        body: JSON.stringify({ query: markdown }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();

      const assistantMessage: Message = { role: 'assistant', content: data.answer };
      setMessages((prev) => [...prev, assistantMessage]);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant' as const,
          content: '⚠️ Ocorreu um erro ao buscar a resposta.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-84px)] bg-gray-50">
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4 pb-[100px]">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`whitespace-pre-wrap px-4 py-3 rounded-md max-w-2xl ${
              msg.role === 'user'
                ? 'bg-blue-100 ml-auto'
                : 'bg-gray-200 mr-auto'
            }`}
          >
            <ReactMarkdown>{msg.content}</ReactMarkdown>
          </div>
        ))}
        {isLoading && (
          <div className="text-gray-500 italic">Digitando...</div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="border-t border-gray-200 p-4">
        <div className="flex items-start gap-2">
          <EditorContent editor={editor} className="flex-1 min-h-[100px] max-h-[250px] overflow-y-auto p-3 border border-gray-300 rounded-md focus:outline-none focus-visible:ring focus-visible:border-blue-400" onKeyDown={handleKeyDown} />
          <button
            onClick={sendMessage}
            className="h-10 w-10 mt-1 flex items-center justify-center bg-blue-500 text-white rounded-full hover:bg-blue-600"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}