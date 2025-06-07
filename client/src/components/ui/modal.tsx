import { X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { disableBodyScroll, enableBodyScroll, cleanupScrollState } from '../../utils/scroll-preservation';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkMobile();
    
    // Add resize listener
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Handle scroll position preservation and escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      // Use utility function to disable body scroll and preserve position
      disableBodyScroll();
      document.addEventListener('keydown', handleEscape);
    } else {
      // Use utility function to restore body scroll and position
      enableBodyScroll();
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      // Cleanup on unmount
      cleanupScrollState();
    };
  }, [isOpen, onClose]);

  // Close when clicking outside the modal
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Don't render anything if modal is closed
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-sm transition-opacity">
      <div 
        ref={modalRef}
        className={`relative bg-card-bg border border-white/10 rounded-lg shadow-xl w-full ${isMobile ? 'max-w-full' : 'max-w-2xl'} max-h-[90vh] overflow-y-auto touch-manipulation z-10`}
        aria-modal="true"
        role="dialog"
        aria-labelledby="modal-title"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between p-4 sm:p-6 border-b border-white/10 bg-card-bg">
          <h2 id="modal-title" className="text-lg sm:text-xl font-semibold text-white pr-2">{title}</h2>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
            aria-label="Close"
          >
            <X size={24} />
          </button>
        </div>
        <div className="p-4 sm:p-6">
          {children}
        </div>
        {isMobile && (
          <div className="sticky bottom-0 p-4 border-t border-white/10 bg-card-bg">
            <button
              onClick={onClose}
              className="w-full py-3 px-4 bg-accent-color text-white rounded-lg font-medium flex items-center justify-center"
              aria-label="Close modal"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
