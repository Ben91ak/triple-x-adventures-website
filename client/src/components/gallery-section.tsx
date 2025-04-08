import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "@/translations";
import { useState, useRef, useEffect } from "react";
import { Play, Pause, X, Volume2, VolumeX } from "lucide-react";
import { useScrollAnimation, getAnimationClasses } from "@/hooks/use-scroll-animation";

// Section content by language
const contentByLanguage = {
  en: {
    title: "ADVENTURE REELS",
    subtitle: "Experience the thrill of our Arctic adventures through immersive video content",
    viewGalleryLink: "View Full Gallery",
    closeVideo: "Close",
    loading: "Loading video...",
    watchMore: "Watch More Reels"
  },
  de: {
    title: "ABENTEUER REELS",
    subtitle: "Erleben Sie den Nervenkitzel unserer arktischen Abenteuer durch immersive Videoinhalte",
    viewGalleryLink: "Vollständige Galerie ansehen",
    closeVideo: "Schließen",
    loading: "Video wird geladen...",
    watchMore: "Mehr Reels ansehen"
  },
  sv: {
    title: "ÄVENTYRS REELS",
    subtitle: "Upplev spänningen i våra arktiska äventyr genom fördjupande videoinnehåll",
    viewGalleryLink: "Visa hela galleriet",
    closeVideo: "Stäng",
    loading: "Laddar video...",
    watchMore: "Se fler reels"
  }
};

// Videos from the Reels folder
const videos = [
  { id: 1, src: "/videos/Reels/TXA Reels_1.mp4", title: "Snowmobile Adventure" },
  { id: 2, src: "/videos/Reels/TXA Reels_2.mp4", title: "Arctic Landscapes" },
  { id: 3, src: "/videos/Reels/TXA Reels_3.mp4", title: "Husky Experience" },
  { id: 4, src: "/videos/Reels/TXA Reels_4.mp4", title: "Winter Activities" },
  { id: 5, src: "/videos/Reels/TXA Reels_5.mp4", title: "Northern Lights" },
  { id: 6, src: "/videos/Reels/TXA Reels_6.mp4", title: "Ice Fishing" },
  { id: 7, src: "/videos/Reels/TXA Reels_7.mp4", title: "Arctic Tundra" },
  { id: 8, src: "/videos/Reels/TXA Reels_8.mp4", title: "Snow Adventures" }
];

interface VideoPlayerProps {
  src: string;
  onClose: () => void;
  title?: string;
}

// Optimized Video Player Component with preload "metadata" for faster loading
function VideoPlayer({ src, onClose, title }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Toggle play/pause
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
  
  // Toggle mute
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };
  
  // Handle video loaded
  const handleLoadedData = () => {
    setIsLoading(false);
    // Auto-play when loaded
    if (videoRef.current) {
      videoRef.current.play().catch(e => console.log("Auto-play prevented:", e));
      setIsPlaying(true);
    }
  };
  
  // Clean up when component unmounts
  useEffect(() => {
    return () => {
      if (videoRef.current) {
        videoRef.current.pause();
      }
    };
  }, []);
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl">
        {/* Loading indicator */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-dark-bg/50 z-10">
            <div className="flex flex-col items-center">
              <div className="loading-spinner mb-4"></div>
              <p className="text-white text-opacity-90">Loading video...</p>
            </div>
          </div>
        )}
        
        {/* Video */}
        <div className="relative rounded-lg overflow-hidden shadow-2xl">
          <video 
            ref={videoRef}
            src={src}
            className="w-full aspect-video object-cover"
            onLoadedData={handleLoadedData}
            preload="metadata"
            playsInline
          />
          
          {/* Video title */}
          {title && (
            <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/70 to-transparent">
              <h3 className="text-white font-medium">{title}</h3>
            </div>
          )}
          
          {/* Video controls */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent flex items-center">
            <button 
              onClick={togglePlay} 
              className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm mr-3 hover:bg-white/30 transition-colors"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause size={18} className="text-white" /> : <Play size={18} className="text-white" />}
            </button>
            
            <button 
              onClick={toggleMute} 
              className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm mr-3 hover:bg-white/30 transition-colors"
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <VolumeX size={18} className="text-white" /> : <Volume2 size={18} className="text-white" />}
            </button>
            
            <div className="flex-1"></div>
            
            <button 
              onClick={onClose} 
              className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm hover:bg-white/30 transition-colors"
              aria-label="Close"
            >
              <X size={18} className="text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Video Thumbnail Component
function VideoThumbnail({ 
  video, 
  onClick 
}: { 
  video: typeof videos[0]; 
  onClick: () => void;
}) {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({
    threshold: 0.2,
    triggerOnce: true
  });
  
  return (
    <div 
      ref={ref} 
      className={`relative overflow-hidden rounded-lg shadow-lg cursor-pointer transform transition-all duration-500 ease-out group hover:scale-[1.03] ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      onClick={onClick}
    >
      <div className="relative pb-[177.7%] bg-black/40">
        {/* Video preview using poster or first frame */}
        <video 
          className="absolute inset-0 w-full h-full object-cover"
          preload="metadata"
          muted
          playsInline
          src={video.src}
        />
        
        {/* Play button overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-accent-color/80 flex items-center justify-center shadow-lg transform transition-transform group-hover:scale-110">
            <Play className="text-white ml-1" size={24} />
          </div>
        </div>
        
        {/* Title overlay at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
          <h3 className="text-white font-medium text-lg">{video.title}</h3>
        </div>
      </div>
    </div>
  );
}

export function GallerySection() {
  const { language } = useLanguage();
  const [selectedVideo, setSelectedVideo] = useState<typeof videos[0] | null>(null);
  
  // Get content based on the current language
  const content = contentByLanguage[language];
  
  // Close video modal
  const closeVideo = () => {
    setSelectedVideo(null);
  };
  
  // Open video modal
  const openVideo = (video: typeof videos[0]) => {
    setSelectedVideo(video);
  };
  
  // Disable scrolling when video is open
  useEffect(() => {
    if (selectedVideo) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedVideo]);

  return (
    <section id="gallery" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background effects - Northern Lights style overlay */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none transform-gpu" style={{ zIndex: 1 }}>
        <div className="aurora-glow-strong absolute inset-0 opacity-30"></div>
      </div>
      
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMTIxMjEiIGZpbGwtb3BhY2l0eT0iMC4wNCIgZmlsbC1ydWxlPSJub256ZXJvIj48cGF0aCBkPSJNMjkgNTguNWE3LjUgNy41IDAgMSAxIDAgMTUgNy41IDcuNSAwIDAgMSAwLTE1em0wIDFhNi41IDYuNSAwIDEgMCAwIDEzIDYuNSA2LjUgMCAwIDAgMC0xM3ptMS0uMDg3YTcuNSA3LjUgMCAxIDEgMCAxNSA3LjUgNy41IDAgMCAxIDAtMTV6TTIwIDU5LjVhNy41IDcuNSAwIDEgMSAwIDE1IDcuNSA3LjUgMCAwIDEgMC0xNXptMCAxYTYuNSA2LjUgMCAxIDAgMCAxMyA2LjUgNi41IDAgMCAwIDAtMTN6bTAtMWE3LjUgNy41IDAgMSAxIDAgMTUgNy41IDcuNSAwIDAgMSAwLTE1eiIvPjwvZz48L2c+PC9zdmc+')]  opacity-60 pointer-events-none transform-gpu" style={{ zIndex: 2 }}></div>
      
      <div className="container mx-auto px-4 relative" style={{ zIndex: 10 }}>
        <div className="text-center mb-16">
          <span className="inline-block text-accent-color text-sm font-medium tracking-wider uppercase mb-2">
            {language === 'de' ? 'Galerie' : language === 'sv' ? 'Galleri' : 'Gallery'}
          </span>
          <h2 className="font-bold text-3xl md:text-5xl mb-6 text-white">
            {content.title}
          </h2>
          <p className="text-lg max-w-3xl mx-auto text-white text-opacity-80 mb-12">
            {content.subtitle}
          </p>
          
          {/* Video Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {videos.map((video) => (
              <VideoThumbnail 
                key={video.id} 
                video={video} 
                onClick={() => openVideo(video)} 
              />
            ))}
          </div>
        </div>
      </div>
      
      {/* Video Modal */}
      {selectedVideo && (
        <VideoPlayer 
          src={selectedVideo.src} 
          title={selectedVideo.title}
          onClose={closeVideo} 
        />
      )}
      
      {/* Note: CSS for loading spinner is in index.css */}
    </section>
  );
}