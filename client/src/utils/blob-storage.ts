import { put, list, del } from '@vercel/blob';

/**
 * Uploads a file to Vercel Blob Storage
 * @param file The file to upload
 * @param folder Optional folder path (e.g., 'videos/reels')
 * @returns The URL of the uploaded file
 */
export async function uploadToBlob(file: File, folder?: string): Promise<string> {
  try {
    const filename = folder 
      ? `${folder}/${file.name}` 
      : file.name;
    
    const { url } = await put(filename, file, {
      access: 'public',
      addRandomSuffix: false, // Keep the original filename
    });
    
    return url;
  } catch (error) {
    console.error('Error uploading to Vercel Blob:', error);
    throw error;
  }
}

/**
 * Lists all files in Vercel Blob Storage
 * @param prefix Optional prefix to filter files (e.g., 'videos/')
 * @returns Array of blob objects
 */
export async function listBlobFiles(prefix?: string) {
  try {
    const { blobs } = await list({ prefix });
    return blobs;
  } catch (error) {
    console.error('Error listing Vercel Blob files:', error);
    throw error;
  }
}

/**
 * Deletes a file from Vercel Blob Storage
 * @param url The URL of the file to delete
 */
export async function deleteFromBlob(url: string) {
  try {
    await del(url);
  } catch (error) {
    console.error('Error deleting from Vercel Blob:', error);
    throw error;
  }
}
