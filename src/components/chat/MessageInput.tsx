
import React, { useState, useRef } from 'react';
import { Send, Smile, Paperclip, Mic, X, Camera, Image, CreditCard, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  onStartRecording: () => void;
  onStopRecording: () => void;
  onAttachmentClick: () => void;
  onCameraClick: () => void;
  onTransactionClick: () => void;
  isRecording?: boolean;
}

const MessageInput: React.FC<MessageInputProps> = ({
  onSendMessage,
  onStartRecording,
  onStopRecording,
  onAttachmentClick,
  onCameraClick,
  onTransactionClick,
  isRecording = false,
}) => {
  const [message, setMessage] = useState('');
  const [showAttachmentOptions, setShowAttachmentOptions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSendMessage = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
      inputRef.current?.focus();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleAttachmentOptions = () => {
    setShowAttachmentOptions(!showAttachmentOptions);
  };

  return (
    <div className="glass-morphism p-3">
      <div className="flex items-center gap-2">
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-full text-gray-400 hover:text-solana-purple hover:bg-solana-purple/10"
          onClick={toggleAttachmentOptions}
        >
          <Plus size={20} />
        </Button>
        
        <div className="relative flex-1">
          <Input
            ref={inputRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type a message"
            className="pl-3 pr-10 py-2 bg-white/5 border-none rounded-full w-full focus:ring-0 focus:ring-offset-0"
            disabled={isRecording}
          />
          {!isRecording && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute right-1 top-1/2 -translate-y-1/2 text-gray-400 h-8 w-8 hover:text-solana-purple"
            >
              <Smile size={18} />
            </Button>
          )}
          {isRecording && (
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center">
              <div className="w-2 h-2 rounded-full bg-red-500 mr-2 animate-pulse"></div>
              <span className="text-sm text-gray-400">Recording...</span>
            </div>
          )}
        </div>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className={cn(
            "rounded-full",
            message.trim() ? "text-solana-purple" : "text-gray-400 hover:text-solana-purple",
            isRecording && "text-red-500 hover:text-red-500"
          )}
          onClick={isRecording ? onStopRecording : message.trim() ? handleSendMessage : onStartRecording}
        >
          {message.trim() ? (
            <Send size={20} />
          ) : isRecording ? (
            <X size={20} />
          ) : (
            <Mic size={20} />
          )}
        </Button>
      </div>
      
      {showAttachmentOptions && (
        <div className="mt-3 p-2 bg-white/5 rounded-xl animate-fade-in">
          <div className="grid grid-cols-4 gap-4">
            <button 
              className="flex flex-col items-center gap-1"
              onClick={() => {
                onAttachmentClick();
                setShowAttachmentOptions(false);
              }}
            >
              <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center">
                <Image size={24} className="text-purple-400" />
              </div>
              <span className="text-xs text-gray-400">Gallery</span>
            </button>
            <button 
              className="flex flex-col items-center gap-1"
              onClick={() => {
                onCameraClick();
                setShowAttachmentOptions(false);
              }}
            >
              <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                <Camera size={24} className="text-blue-400" />
              </div>
              <span className="text-xs text-gray-400">Camera</span>
            </button>
            <button 
              className="flex flex-col items-center gap-1"
              onClick={() => {
                setShowAttachmentOptions(false);
              }}
            >
              <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                <Paperclip size={24} className="text-green-400" />
              </div>
              <span className="text-xs text-gray-400">File</span>
            </button>
            <button 
              className="flex flex-col items-center gap-1"
              onClick={() => {
                onTransactionClick();
                setShowAttachmentOptions(false);
              }}
            >
              <div className="w-12 h-12 rounded-full bg-solana-purple/20 flex items-center justify-center">
                <CreditCard size={24} className="text-solana-purple" />
              </div>
              <span className="text-xs text-gray-400">SOL</span>
            </button>
          </div>
        </div>
      )}
      
      <div className="flex justify-center mt-2">
        <Button 
          variant="ghost" 
          size="sm" 
          className="rounded-full text-xs flex items-center gap-1 px-3 py-1 bg-white/10 text-gray-300 hover:bg-solana-purple/20 hover:text-solana-purple"
          onClick={() => {
            onTransactionClick();
            setShowAttachmentOptions(false);
          }}
        >
          <CreditCard size={14} />
          <span>Send SOL</span>
        </Button>
      </div>
    </div>
  );
};

export default MessageInput;
