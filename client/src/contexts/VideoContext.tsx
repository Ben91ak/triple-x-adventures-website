import React, { createContext, useState, useContext, useRef, useCallback, ReactNode } from 'react';

type VideoContextType = {
  currentlyPlaying: string | null;
  playVideo: (id: string) => void;
  pauseAllVideos: () => void;
  registerVideo?: (id: string, videoElement: HTMLVideoElement | null) => void;
};

const VideoContext = createContext<VideoContextType | undefined>(undefined);

export function VideoProvider({ children }: { children: ReactNode }) {
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);
  const videoRefs = useRef<Map<string, HTMLVideoElement>>(new Map());

  // Register video element with its ID
  const registerVideo = (id: string, videoElement: HTMLVideoElement | null) => {
    if (videoElement) {
      videoRefs.current.set(id, videoElement);
    } else {
      videoRefs.current.delete(id);
    }
  };

  // Play a video by its ID and pause all others
  const playVideo = useCallback((id: string) => {
    // Pause currently playing video (if any)
    if (currentlyPlaying && currentlyPlaying !== id) {
      const currentVideo = videoRefs.current.get(currentlyPlaying);
      if (currentVideo) {
        currentVideo.pause();
      }
    }

    // Play the new video
    const videoToPlay = videoRefs.current.get(id);
    if (videoToPlay) {
      videoToPlay.play()
        .then(() => {
          setCurrentlyPlaying(id);
        })
        .catch((error) => {
          console.error("Error playing video:", error);
        });
    }
  }, [currentlyPlaying]);

  // Pause all videos
  const pauseAllVideos = useCallback(() => {
    videoRefs.current.forEach((video) => {
      video.pause();
    });
    setCurrentlyPlaying(null);
  }, []);

  const value = {
    currentlyPlaying,
    playVideo,
    pauseAllVideos,
    registerVideo,
  };

  return (
    <VideoContext.Provider value={value}>
      {children}
    </VideoContext.Provider>
  );
}

export function useVideo() {
  const context = useContext(VideoContext);
  if (context === undefined) {
    throw new Error('useVideo must be used within a VideoProvider');
  }
  return context;
}