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

// No need for the modal VideoPlayer anymore as videos play inline

// Keep track of the currently playing video
let currentlyPlayingVideo: HTMLVideoElement | null = null;

// Video Thumbnail Component with inline playing
function VideoThumbnail({ 
  video
}: { 
  video: typeof videos[0];
}) {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({
    threshold: 0.2,
    triggerOnce: true
  });
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Effect to handle play and pause events to update UI state
  useEffect(() => {
    if (videoRef.current) {
      const videoElement = videoRef.current;
      
      // Event handlers for play and pause
      const handlePlay = () => setIsPlaying(true);
      const handlePause = () => setIsPlaying(false);
      
      videoElement.addEventListener('play', handlePlay);
      videoElement.addEventListener('pause', handlePause);
      
      // Clean up event listeners on unmount
      return () => {
        videoElement.removeEventListener('play', handlePlay);
        videoElement.removeEventListener('pause', handlePause);
      };
    }
  }, []);
  
  // Toggle play/pause
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        // Pause this video
        videoRef.current.pause();
        setIsPlaying(false);
        currentlyPlayingVideo = null;
      } else {
        // Pause any currently playing video first
        if (currentlyPlayingVideo && currentlyPlayingVideo !== videoRef.current) {
          currentlyPlayingVideo.pause();
        }
        
        // Play this video
        videoRef.current.play()
          .then(() => {
            setIsPlaying(true);
            currentlyPlayingVideo = videoRef.current;
          })
          .catch(err => {
            console.log("Could not play video:", err);
          });
      }
    }
  };
  
  return (
    <div 
      ref={ref} 
      className={`relative overflow-hidden rounded-lg shadow-lg transform transition-all duration-500 ease-out group ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      {/* 9:16 aspect ratio container for vertical videos */}
      <div className="relative pb-[177.78%] bg-black/40">
        {/* Video element */}
        <video 
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          preload="metadata"
          muted
          playsInline
          loop
          src={video.src}
          onClick={togglePlay}
        />
        
        {/* Play button overlay - only show when not playing */}
        {!isPlaying && (
          <div 
            className="absolute inset-0 flex items-center justify-center cursor-pointer"
            onClick={togglePlay}
          >
            <div className="w-16 h-16 rounded-full bg-accent-color/80 flex items-center justify-center shadow-lg transform transition-transform group-hover:scale-110">
              <Play className="text-white ml-1" size={24} />
            </div>
          </div>
        )}
        
        {/* Controls overlay - show when playing */}
        {isPlaying && (
          <div 
            className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer flex items-end justify-center"
            onClick={togglePlay}
          >
            <div className="p-4 flex items-center w-full">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  togglePlay();
                }}
                className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm hover:bg-white/30 transition-colors mb-2"
              >
                <Pause size={18} className="text-white" />
              </button>
              <div className="flex-1"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function GallerySection() {
  const { language } = useLanguage();
  const [showAllVideos, setShowAllVideos] = useState(false);
  
  // Get content based on the current language
  const content = contentByLanguage[language];
  
  // Initial videos (first 4)
  const initialVideos = videos.slice(0, 4);
  // Videos to show after clicking "Explore More"
  const remainingVideos = videos.slice(4);
  
  // Toggle to show all videos
  const handleShowMore = () => {
    setShowAllVideos(true);
  };

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
          
          {/* Video Gallery Grid - 4 videos in a row for initial view */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {initialVideos.map((video) => (
              <VideoThumbnail 
                key={video.id} 
                video={video}
              />
            ))}
          </div>
          
          {/* Additional videos - hidden initially */}
          {showAllVideos && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-8 animate-fadeIn">
              {remainingVideos.map((video) => (
                <VideoThumbnail 
                  key={video.id} 
                  video={video}
                />
              ))}
            </div>
          )}
          
          {/* Show More Button - only visible when not all videos are shown */}
          {!showAllVideos && (
            <div className="mt-12">
              <button 
                onClick={handleShowMore}
                className="px-8 py-3 bg-accent-color text-white rounded-lg font-medium hover:bg-accent-color/90 transition-colors transform hover:-translate-y-1 duration-200"
              >
                {language === 'de' ? 'Mehr Videos anzeigen' : language === 'sv' ? 'Visa fler videos' : 'Explore More'}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}