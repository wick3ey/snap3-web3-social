import React, { useState, useEffect, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, Heart, MessageCircle, Send, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { toast } from 'sonner';

interface StoryItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  duration: number;
  caption?: string;
}

interface Story {
  id: string;
  name: string;
  avatar: string;
  hasUnviewed: boolean;
  isOfficial: boolean;
  hasNFT: boolean;
  items: StoryItem[];
}

interface StoryViewerProps {
  stories: Story[];
  initialStoryIndex: number;
  onClose: () => void;
}

const StoryViewer: React.FC<StoryViewerProps> = ({ stories, initialStoryIndex, onClose }) => {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(initialStoryIndex);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState('');
  
  const progressIntervalRef = useRef<number | null>(null);
  const story = stories[currentStoryIndex];
  const storyItem = story?.items[currentItemIndex];
  const totalItems = story?.items.length || 0;

  useEffect(() => {
    setCurrentItemIndex(0);
    setProgress(0);
    
    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, [currentStoryIndex]);

  useEffect(() => {
    setProgress(0);
    
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }
    
    if (!isPaused && storyItem) {
      const duration = storyItem.duration * 1000;
      const interval = 100;
      const step = (interval / duration) * 100;
      
      progressIntervalRef.current = window.setInterval(() => {
        setProgress(prevProgress => {
          const newProgress = prevProgress + step;
          if (newProgress >= 100) {
            goToNextItem();
            return 0;
          }
          return newProgress;
        });
      }, interval);
    }
    
    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, [currentItemIndex, isPaused, storyItem]);

  const goToPreviousItem = () => {
    if (currentItemIndex > 0) {
      setCurrentItemIndex(currentItemIndex - 1);
    } else if (currentStoryIndex > 0) {
      setCurrentStoryIndex(currentStoryIndex - 1);
      setCurrentItemIndex(stories[currentStoryIndex - 1].items.length - 1);
    }
  };

  const goToNextItem = () => {
    if (currentItemIndex < totalItems - 1) {
      setCurrentItemIndex(currentItemIndex + 1);
    } else if (currentStoryIndex < stories.length - 1) {
      setCurrentStoryIndex(currentStoryIndex + 1);
      setCurrentItemIndex(0);
    } else {
      onClose();
    }
  };

  const handlePause = () => {
    setIsPaused(true);
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }
  };

  const handleResume = () => {
    setIsPaused(false);
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      toast.success(`Message sent to ${story.name}`);
      setMessage('');
    }
  };

  const handleLike = () => {
    toast.success('Story liked');
  };

  const handleShare = () => {
    toast.success('Story sharing options opened');
  };

  const handleMore = () => {
    toast.info("Report, download or save story");
  };

  const handleLeftSideClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    goToPreviousItem();
  };

  const handleRightSideClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    goToNextItem();
  };

  const handleFirstStoryYourStory = () => {
    if (currentStoryIndex === 0 && story.name === 'Your Story') {
      toast.info("You can create a new story here", {
        action: {
          label: "Create",
          onClick: () => {
            onClose();
            toast.success("Opening camera for story creation");
          },
        },
      });
    }
  };

  useEffect(() => {
    handleFirstStoryYourStory();
  }, [currentStoryIndex]);

  if (!story) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col">
      <div className="absolute top-0 left-0 right-0 z-20 p-2 flex gap-1">
        {story.items.map((item, idx) => (
          <Progress 
            key={item.id} 
            value={idx === currentItemIndex ? progress : idx < currentItemIndex ? 100 : 0} 
            className="h-1 flex-1 bg-white/20"
            indicatorClassName="bg-white"
          />
        ))}
      </div>
      
      <div className="p-4 z-20 flex items-center justify-between">
        <div className="flex items-center">
          <Avatar className="h-9 w-9 mr-3 border border-white/20">
            <AvatarImage src={story.avatar} />
            <AvatarFallback>{story.name.substring(0, 2)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-sm">{story.name}</p>
            <p className="text-xs text-gray-400">3h ago</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="text-white" onClick={onClose}>
          <X size={24} />
        </Button>
      </div>
      
      <div 
        className="relative flex-1 flex items-center justify-center"
        onClick={() => isPaused ? handleResume() : handlePause()}
      >
        <div 
          className="absolute left-0 top-0 bottom-0 w-1/3 z-10"
          onClick={handleLeftSideClick}
        />
        
        <div 
          className="absolute right-0 top-0 bottom-0 w-1/3 z-10"
          onClick={handleRightSideClick}
        />
        
        <div className="w-full h-full">
          {storyItem.type === 'image' ? (
            <>
              <img 
                src={storyItem.url} 
                alt="Story content" 
                className="w-full h-full object-contain"
              />
              {storyItem.caption && (
                <div className="absolute bottom-20 left-0 right-0 p-4 text-center">
                  <p className="text-white text-lg font-medium">{storyItem.caption}</p>
                </div>
              )}
            </>
          ) : (
            <video 
              src={storyItem.url} 
              className="w-full h-full object-contain" 
              autoPlay 
              playsInline 
              muted
            />
          )}
        </div>
        
        {isPaused && (
          <>
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 rounded-full"
              onClick={(e) => {
                e.stopPropagation();
                goToPreviousItem();
              }}
            >
              <ChevronLeft size={24} />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 rounded-full"
              onClick={(e) => {
                e.stopPropagation();
                goToNextItem();
              }}
            >
              <ChevronRight size={24} />
            </Button>
          </>
        )}
      </div>
      
      <div className="p-4 glass-morphism z-20">
        <div className="flex items-center gap-2 mb-3">
          <Button variant="ghost" size="sm" className="text-white p-2" onClick={handleLike}>
            <Heart size={20} />
          </Button>
          <div className="relative flex-1">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Send a message"
              className="pr-10 py-2 bg-white/10 border-none rounded-full w-full focus:ring-0"
            />
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
              onClick={handleSendMessage}
            >
              <Send size={16} className={message ? "text-snap-yellow" : "text-gray-400"} />
            </Button>
          </div>
          <Button variant="ghost" size="sm" className="text-white p-2" onClick={handleShare}>
            <MessageCircle size={20} />
          </Button>
          <Button variant="ghost" size="sm" className="text-white p-2" onClick={handleMore}>
            <MoreVertical size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StoryViewer;
