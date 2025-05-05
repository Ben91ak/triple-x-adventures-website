import React, { useState, useEffect } from 'react';
import { uploadToBlob, listBlobFiles, deleteFromBlob } from '@/utils/blob-storage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, Upload, Trash2, RefreshCw, Copy, Check } from 'lucide-react';

interface VideoFile {
  url: string;
  pathname: string;
  size: number;
  uploadedAt: Date;
}

export function BlobVideoManager() {
  const [videos, setVideos] = useState<VideoFile[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedFolder, setSelectedFolder] = useState('videos');
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  // Load videos on component mount
  useEffect(() => {
    loadVideos();
  }, []);

  // Function to load videos from Vercel Blob
  const loadVideos = async () => {
    setIsLoading(true);
    try {
      const blobs = await listBlobFiles(selectedFolder);
      setVideos(blobs as VideoFile[]);
    } catch (error) {
      console.error('Error loading videos:', error);
      alert('Failed to load videos. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Function to handle file upload
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    setUploadProgress(0);

    try {
      // Upload each file
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        await uploadToBlob(file, selectedFolder);
        setUploadProgress(Math.round(((i + 1) / files.length) * 100));
      }

      // Reload the video list
      await loadVideos();
    } catch (error) {
      console.error('Error uploading files:', error);
      alert('Failed to upload files. Please try again.');
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  // Function to delete a video
  const handleDeleteVideo = async (url: string) => {
    if (!confirm('Are you sure you want to delete this video?')) return;

    setIsLoading(true);
    try {
      await deleteFromBlob(url);
      await loadVideos();
    } catch (error) {
      console.error('Error deleting video:', error);
      alert('Failed to delete video. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Function to copy video URL to clipboard
  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  // Function to format file size
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
    if (bytes < 1024 * 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
    return (bytes / (1024 * 1024 * 1024)).toFixed(2) + ' GB';
  };

  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Video Asset Manager</h2>
      
      {/* Folder selection and upload controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <label className="block text-sm font-medium mb-2">Storage Folder</label>
          <div className="flex gap-2">
            <Input
              type="text"
              value={selectedFolder}
              onChange={(e) => setSelectedFolder(e.target.value)}
              placeholder="videos/reels"
              className="bg-gray-800 border-gray-700"
            />
            <Button 
              variant="outline" 
              onClick={loadVideos}
              disabled={isLoading}
              className="flex items-center gap-2"
            >
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
              Refresh
            </Button>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Upload Videos</label>
          <label className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md cursor-pointer">
            <Upload className="h-4 w-4" />
            {isUploading ? `Uploading ${uploadProgress}%` : 'Select Files'}
            <input
              type="file"
              accept="video/*"
              multiple
              onChange={handleFileUpload}
              disabled={isUploading}
              className="hidden"
            />
          </label>
        </div>
      </div>
      
      {/* Progress bar for uploads */}
      {isUploading && (
        <div className="w-full bg-gray-700 rounded-full h-2.5 mb-6">
          <div 
            className="bg-blue-600 h-2.5 rounded-full" 
            style={{ width: `${uploadProgress}%` }}
          ></div>
        </div>
      )}
      
      {/* Video list */}
      <div className="bg-gray-800 rounded-lg overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center p-8">
            <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
          </div>
        ) : videos.length === 0 ? (
          <div className="text-center p-8 text-gray-400">
            No videos found in this folder. Upload some videos to get started.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left">Preview</th>
                  <th className="px-4 py-3 text-left">Filename</th>
                  <th className="px-4 py-3 text-left">Size</th>
                  <th className="px-4 py-3 text-left">Uploaded</th>
                  <th className="px-4 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {videos.map((video) => (
                  <tr key={video.url} className="hover:bg-gray-700/50">
                    <td className="px-4 py-3">
                      <video 
                        src={video.url} 
                        className="h-16 w-28 object-cover rounded"
                        controls={false}
                        onMouseOver={(e) => (e.target as HTMLVideoElement).play()}
                        onMouseOut={(e) => {
                          (e.target as HTMLVideoElement).pause();
                          (e.target as HTMLVideoElement).currentTime = 0;
                        }}
                      />
                    </td>
                    <td className="px-4 py-3 font-mono text-sm">
                      {video.pathname.split('/').pop()}
                    </td>
                    <td className="px-4 py-3 text-gray-300">
                      {formatFileSize(video.size)}
                    </td>
                    <td className="px-4 py-3 text-gray-300">
                      {new Date(video.uploadedAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(video.url)}
                          className="text-gray-300 hover:text-white"
                        >
                          {copiedUrl === video.url ? (
                            <Check className="h-4 w-4 text-green-500" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteVideo(video.url)}
                          className="text-red-400 hover:text-red-300"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      
      {/* Usage instructions */}
      <div className="mt-6 p-4 bg-gray-800 rounded-lg">
        <h3 className="text-lg font-medium mb-2">How to use videos in your code</h3>
        <div className="bg-gray-900 p-3 rounded font-mono text-sm">
          <p className="mb-2">{'<video src="https://your-blob-url.vercel-storage.com/videos/example.mp4" />'}</p>
          <p>{'// or for background videos'}</p>
          <p>{'<div style={{ backgroundImage: `url(${videoUrl})` }} />'}</p>
        </div>
      </div>
    </div>
  );
}
