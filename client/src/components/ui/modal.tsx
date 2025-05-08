import { X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

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

  // Close on escape key press
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'auto'; // Restore scrolling when modal is closed
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-sm transition-opacity">
      <div 
        ref={modalRef}
        className={`relative bg-card-bg border border-white/10 rounded-lg shadow-xl w-full ${isMobile ? 'max-w-full' : 'max-w-2xl'} max-h-[90vh] overflow-y-auto touch-manipulation`}
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
