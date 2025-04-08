
import React, { useState, useRef, useEffect } from 'react';
import { 
  Camera, CameraIcon, Sparkles, Timer, X, Send, 
  Download, User, Sticker, Text, PencilLine,
  Image, Video, FlipHorizontal, Zap, FileImage
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

interface CameraViewProps {
  mode?: 'regular' | 'story';
  onCapture?: (imageData: string) => void;
  onCancel?: () => void;
}

const CameraView: React.FC<CameraViewProps> = ({ 
  mode = 'regular',
  onCapture,
  onCancel
}) => {
  const [isCapturing, setIsCapturing] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [cameraMode, setCameraMode] = useState<'photo' | 'video'>('photo');
  const [flashMode, setFlashMode] = useState<'off' | 'on' | 'auto'>('off');
  const [isFrontCamera, setIsFrontCamera] = useState(false);
  
  // For story mode
  const [storyCaption, setStoryCaption] = useState('');
  const captionInputRef = useRef<HTMLInputElement>(null);

  // For image editing
  const [activeEditTool, setActiveEditTool] = useState<string | null>(null);
  const [drawingColor, setDrawingColor] = useState('#FFFFFF');
  const [textInput, setTextInput] = useState('');
  const [textPosition, setTextPosition] = useState({ x: 50, y: 50 });
  const [stickerType, setStickerType] = useState<string | null>(null);
  const [stickers, setStickers] = useState<Array<{id: string, type: string, x: number, y: number}>>([]);
  const [textOverlays, setTextOverlays] = useState<Array<{id: string, text: string, x: number, y: number, color: string}>>([]);
  const [drawings, setDrawings] = useState<Array<{id: string, points: {x: number, y: number}[], color: string}>>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentDrawing, setCurrentDrawing] = useState<{x: number, y: number}[]>([]);
  const imageRef = useRef<HTMLDivElement>(null);

  const filters = [
    { id: 'solana', name: 'Solana' },
    { id: 'nft', name: 'NFT' },
    { id: 'crypto', name: 'Crypto' },
    { id: 'web3', name: 'Web3' },
  ];

  const editingTools = [
    { id: 'text', icon: Text, label: 'Text' },
    { id: 'draw', icon: PencilLine, label: 'Draw' },
    { id: 'sticker', icon: Sticker, label: 'Sticker' },
    { id: 'nft', icon: FileImage, label: 'NFT' },
  ];

  const availableStickers = [
    { id: 'smile', emoji: '😊' },
    { id: 'heart', emoji: '❤️' },
    { id: 'fire', emoji: '🔥' },
    { id: 'rocket', emoji: '🚀' },
    { id: 'money', emoji: '💰' },
    { id: 'solana', emoji: '◎' },
  ];

  const colorOptions = [
    '#FFFFFF', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#00FFFF', '#FF00FF'
  ];

  const handleCapture = () => {
    setIsCapturing(true);
    // Simulate camera capture
    setTimeout(() => {
      setCapturedImage('/placeholder.svg');
      setIsCapturing(false);
      
      // If in story mode, focus on caption input
      if (mode === 'story' && captionInputRef.current) {
        setTimeout(() => {
          captionInputRef.current?.focus();
        }, 100);
      }
    }, 500);
  };

  const handleDiscard = () => {
    setCapturedImage(null);
    setActiveFilter(null);
    setStoryCaption('');
    setStickers([]);
    setTextOverlays([]);
    setDrawings([]);
    setActiveEditTool(null);
  };

  const handleSave = () => {
    if (capturedImage) {
      if (onCapture) {
        onCapture(capturedImage);
      } else {
        toast.success('Image saved to your gallery');
      }
      setCapturedImage(null);
      setActiveFilter(null);
      setStoryCaption('');
      setStickers([]);
      setTextOverlays([]);
      setDrawings([]);
    }
  };

  const handleSend = () => {
    if (capturedImage) {
      if (mode === 'story') {
        // Send as story
        toast.success('Story created successfully!');
        if (onCapture) onCapture(capturedImage);
      } else {
        // Show send options
        toast("Choose who to send this to", {
          action: {
            label: "Send",
            onClick: () => toast.info("Opening contacts selector"),
          },
        });
      }
    }
  };

  const handleToggleCamera = () => {
    setIsFrontCamera(!isFrontCamera);
    toast.info(`Switched to ${!isFrontCamera ? 'front' : 'back'} camera`);
  };

  const handleToggleFlash = () => {
    const modes: Array<'off' | 'on' | 'auto'> = ['off', 'on', 'auto'];
    const currentIndex = modes.indexOf(flashMode);
    const nextIndex = (currentIndex + 1) % modes.length;
    setFlashMode(modes[nextIndex]);
    toast.info(`Flash: ${modes[nextIndex]}`);
  };

  // Image Editing Functions
  const handleToolClick = (toolId: string) => {
    if (activeEditTool === toolId) {
      setActiveEditTool(null);
    } else {
      setActiveEditTool(toolId);
      
      if (toolId === 'text') {
        setTextInput('');
      } else if (toolId === 'sticker') {
        setStickerType(null);
      }
    }
  };

  const handleImageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current || !activeEditTool) return;
    
    const rect = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    if (activeEditTool === 'sticker' && stickerType) {
      addSticker(x, y);
    } else if (activeEditTool === 'text' && textInput) {
      addTextOverlay(x, y);
    }
  };

  const addSticker = (x: number, y: number) => {
    if (!stickerType) return;
    
    const newSticker = {
      id: `sticker-${Date.now()}`,
      type: stickerType,
      x,
      y
    };
    
    setStickers([...stickers, newSticker]);
    setStickerType(null);
  };

  const addTextOverlay = (x: number, y: number) => {
    if (!textInput.trim()) return;
    
    const newText = {
      id: `text-${Date.now()}`,
      text: textInput,
      x,
      y,
      color: drawingColor
    };
    
    setTextOverlays([...textOverlays, newText]);
    setTextInput('');
  };

  const handleDrawStart = (e: React.MouseEvent<HTMLDivElement>) => {
    if (activeEditTool !== 'draw' || !imageRef.current) return;
    
    setIsDrawing(true);
    
    const rect = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setCurrentDrawing([{ x, y }]);
  };

  const handleDrawMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDrawing || !imageRef.current) return;
    
    const rect = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setCurrentDrawing([...currentDrawing, { x, y }]);
  };

  const handleDrawEnd = () => {
    if (!isDrawing || currentDrawing.length < 2) {
      setIsDrawing(false);
      setCurrentDrawing([]);
      return;
    }
    
    const newDrawing = {
      id: `drawing-${Date.now()}`,
      points: currentDrawing,
      color: drawingColor
    };
    
    setDrawings([...drawings, newDrawing]);
    setIsDrawing(false);
    setCurrentDrawing([]);
  };

  const renderDrawings = () => {
    return drawings.map(drawing => {
      if (drawing.points.length < 2) return null;
      
      let pathData = `M ${drawing.points[0].x} ${drawing.points[0].y}`;
      drawing.points.slice(1).forEach(point => {
        pathData += ` L ${point.x} ${point.y}`;
      });
      
      return (
        <svg key={drawing.id} className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 3 }}>
          <path
            d={pathData}
            stroke={drawing.color}
            strokeWidth="2"
            fill="none"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      );
    });
  };

  const renderCurrentDrawing = () => {
    if (!isDrawing || currentDrawing.length < 2) return null;
    
    let pathData = `M ${currentDrawing[0].x} ${currentDrawing[0].y}`;
    currentDrawing.slice(1).forEach(point => {
      pathData += ` L ${point.x} ${point.y}`;
    });
    
    return (
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 4 }}>
        <path
          d={pathData}
          stroke={drawingColor}
          strokeWidth="2"
          fill="none"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    );
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (capturedImage) {
          handleDiscard();
        } else if (onCancel) {
          onCancel();
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [capturedImage, onCancel]);

  return (
    <div className="relative h-full w-full flex flex-col">
      {/* Camera Viewfinder */}
      <div className="absolute inset-0 bg-black">
        {capturedImage ? (
          <div 
            ref={imageRef}
            className="relative h-full"
            onClick={handleImageClick}
            onMouseDown={handleDrawStart}
            onMouseMove={handleDrawMove}
            onMouseUp={handleDrawEnd}
            onMouseLeave={handleDrawEnd}
          >
            <img 
              src={capturedImage} 
              alt="Captured" 
              className={`h-full w-full object-cover ${activeFilter ? `filter-${activeFilter}` : ''}`}
            />
            
            {/* Filters */}
            {activeFilter === 'solana' && (
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-4 right-4 bg-solana-purple text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
                  Verified on Solana
                </div>
                <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 web3-gradient p-0.5 rounded-2xl">
                  <div className="bg-black/80 backdrop-blur-md px-4 py-2 rounded-2xl">
                    <p className="text-white text-sm font-medium">SOL Balance: 24.56</p>
                  </div>
                </div>
              </div>
            )}

            {/* Stickers */}
            {stickers.map(sticker => {
              const emojiSticker = availableStickers.find(s => s.id === sticker.type);
              return (
                <div 
                  key={sticker.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 text-4xl pointer-events-none"
                  style={{ 
                    left: `${sticker.x}%`, 
                    top: `${sticker.y}%`,
                    zIndex: 2 
                  }}
                >
                  {emojiSticker?.emoji || '😊'}
                </div>
              );
            })}

            {/* Text Overlays */}
            {textOverlays.map(textOverlay => (
              <div 
                key={textOverlay.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                style={{ 
                  left: `${textOverlay.x}%`, 
                  top: `${textOverlay.y}%`,
                  zIndex: 2 
                }}
              >
                <p className="text-2xl font-bold break-words max-w-[150px] text-center" style={{ color: textOverlay.color }}>
                  {textOverlay.text}
                </p>
              </div>
            ))}

            {/* Drawings */}
            {renderDrawings()}
            {renderCurrentDrawing()}

            {/* Story caption input */}
            {mode === 'story' && (
              <div className="absolute bottom-32 left-0 right-0 px-4">
                <input
                  ref={captionInputRef}
                  type="text"
                  value={storyCaption}
                  onChange={(e) => setStoryCaption(e.target.value)}
                  placeholder="Add a caption to your story..."
                  className="w-full bg-black/50 backdrop-blur-md border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-snap-yellow"
                />
              </div>
            )}

            {/* Text input for text tool */}
            {activeEditTool === 'text' && (
              <div className="absolute top-20 left-0 right-0 px-4 flex flex-col items-center">
                <input
                  type="text"
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  placeholder="Type text here..."
                  className="w-full max-w-md bg-black/50 backdrop-blur-md border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-snap-yellow mb-2"
                />
                <p className="text-white text-xs">Tap on the image to place your text</p>
                <div className="flex gap-2 mt-2">
                  {colorOptions.map(color => (
                    <button
                      key={color}
                      className={`w-8 h-8 rounded-full border-2 ${drawingColor === color ? 'border-white' : 'border-transparent'}`}
                      style={{ backgroundColor: color }}
                      onClick={() => setDrawingColor(color)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Sticker selector for sticker tool */}
            {activeEditTool === 'sticker' && (
              <div className="absolute top-20 left-0 right-0 px-4">
                <div className="bg-black/50 backdrop-blur-md rounded-xl p-3">
                  <div className="grid grid-cols-6 gap-2">
                    {availableStickers.map(sticker => (
                      <button
                        key={sticker.id}
                        className={`w-12 h-12 flex items-center justify-center text-2xl rounded-lg ${stickerType === sticker.id ? 'bg-white/30' : 'bg-white/10'}`}
                        onClick={() => setStickerType(sticker.id)}
                      >
                        {sticker.emoji}
                      </button>
                    ))}
                  </div>
                  <p className="text-white text-xs text-center mt-2">Tap on the image to place your sticker</p>
                </div>
              </div>
            )}

            {/* Color picker for drawing tool */}
            {activeEditTool === 'draw' && (
              <div className="absolute top-20 left-0 right-0 px-4 flex justify-center">
                <div className="bg-black/50 backdrop-blur-md rounded-xl p-3 flex gap-2">
                  {colorOptions.map(color => (
                    <button
                      key={color}
                      className={`w-8 h-8 rounded-full border-2 ${drawingColor === color ? 'border-white' : 'border-transparent'}`}
                      style={{ backgroundColor: color }}
                      onClick={() => setDrawingColor(color)}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="h-full w-full flex items-center justify-center">
            <Camera className="text-white opacity-20" size={48} />
          </div>
        )}
      </div>

      {/* Top Camera Controls */}
      {!capturedImage && (
        <div className="relative z-10 p-4 flex justify-between items-center">
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full bg-black/20 text-white"
            onClick={onCancel || (() => toast.info("Profile options"))}
          >
            {onCancel ? <X size={18} /> : <User size={18} />}
          </Button>
          <div className="flex gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full bg-black/20 text-white"
              onClick={handleToggleFlash}
            >
              <Zap size={18} className={flashMode !== 'off' ? 'text-snap-yellow' : ''} />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full bg-black/20 text-white"
              onClick={handleToggleCamera}
            >
              <FlipHorizontal size={18} />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full bg-black/20 text-white"
            >
              <Timer size={18} />
            </Button>
          </div>
        </div>
      )}

      {/* Camera Mode Selector */}
      {!capturedImage && (
        <div className="absolute top-16 left-0 right-0 z-10 flex justify-center">
          <Tabs
            defaultValue="photo"
            value={cameraMode}
            onValueChange={(value) => setCameraMode(value as 'photo' | 'video')}
            className="w-auto"
          >
            <TabsList className="bg-black/30 backdrop-blur-sm p-1 rounded-full">
              <TabsTrigger value="photo" className="rounded-full px-4 data-[state=active]:bg-snap-yellow data-[state=active]:text-black">
                <Image size={16} className="mr-1" />
                <span>Photo</span>
              </TabsTrigger>
              <TabsTrigger value="video" className="rounded-full px-4 data-[state=active]:bg-snap-yellow data-[state=active]:text-black">
                <Video size={16} className="mr-1" />
                <span>Video</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      )}

      {/* Filter Carousel (only when not in captured state) */}
      {!capturedImage && (
        <div className="absolute top-28 left-0 right-0 z-10 px-4">
          <div className="flex gap-2 overflow-x-auto py-2 scrollbar-none">
            {filters.map(filter => (
              <button
                key={filter.id}
                className={`flex-shrink-0 px-4 py-1.5 rounded-full ${
                  activeFilter === filter.id ? 'bg-snap-yellow text-black' : 'bg-black/30 text-white'
                }`}
                onClick={() => setActiveFilter(filter.id)}
              >
                <span className="text-sm font-medium">{filter.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Mode indicator for story mode */}
      {mode === 'story' && !capturedImage && (
        <div className="absolute top-40 left-0 right-0 z-10 flex justify-center">
          <div className="bg-snap-yellow text-black px-3 py-1 rounded-full text-sm font-medium">
            Story Mode
          </div>
        </div>
      )}

      {/* Bottom Controls */}
      <div className="relative z-10 mt-auto mb-10 px-6 py-4">
        {capturedImage ? (
          <div className="flex flex-col">
            <div className="flex justify-between mb-4">
              {editingTools.map(tool => (
                <button
                  key={tool.id}
                  className={`flex flex-col items-center gap-1 ${activeEditTool === tool.id ? 'opacity-100' : 'opacity-70'}`}
                  onClick={() => handleToolClick(tool.id)}
                >
                  <div className={`snap-icon-button ${activeEditTool === tool.id ? 'bg-snap-yellow text-black' : ''}`}>
                    <tool.icon size={20} className={activeEditTool === tool.id ? 'text-black' : 'text-white'} />
                  </div>
                  <span className="text-xs text-white">{tool.label}</span>
                </button>
              ))}
            </div>
            <div className="flex justify-between">
              <Button 
                variant="outline" 
                size="icon"
                className="rounded-full w-12 h-12 bg-white/10 border-0 text-white"
                onClick={handleDiscard}
              >
                <X size={24} />
              </Button>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full w-12 h-12 bg-white/10 border-0 text-white"
                  onClick={handleSave}
                >
                  <Download size={20} />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full w-12 h-12 bg-snap-yellow border-0 text-black"
                  onClick={handleSend}
                >
                  <Send size={20} />
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <Button
              variant="outline"
              size="icon"
              className={`rounded-full w-16 h-16 border-4 ${isCapturing ? 'border-gray-500 bg-gray-700' : 'border-white bg-transparent'}`}
              onClick={handleCapture}
            />
          </div>
        )}
      </div>

      {/* Footer Message for Mode */}
      {!capturedImage && (
        <div className="absolute bottom-4 left-0 right-0 z-10 flex justify-center">
          <p className="text-xs text-white/60">
            {mode === 'story' ? 'Capture a photo for your story' : 'Swipe right for stories'}
          </p>
        </div>
      )}
    </div>
  );
};

export default CameraView;
