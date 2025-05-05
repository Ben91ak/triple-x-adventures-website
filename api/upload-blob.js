import { put } from '@vercel/blob';
import { createRouter } from 'next-connect';

const router = createRouter();

// Middleware to ensure only authorized users can upload
function isAuthorized(req) {
  // In a real app, you would check for authentication
  // For now, we'll use a simple check for development
  const authHeader = req.headers.authorization;
  return process.env.NODE_ENV === 'development' || 
    (authHeader && authHeader.startsWith('Bearer '));
}

// Handle POST requests for file uploads
router.post(async (req, res) => {
  try {
    // Check authorization
    if (!isAuthorized(req)) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Get the file from the request
    const file = req.body;
    if (!file) {
      return res.status(400).json({ error: 'No file provided' });
    }

    // Get the filename and folder from the query parameters
    const { filename, folder } = req.query;
    if (!filename) {
      return res.status(400).json({ error: 'Filename is required' });
    }

    // Construct the path
    const path = folder ? `${folder}/${filename}` : filename;

    // Upload to Vercel Blob
    const { url } = await put(path, file, {
      access: 'public',
      addRandomSuffix: false,
    });

    // Return the URL of the uploaded file
    return res.status(200).json({ url });
  } catch (error) {
    console.error('Error uploading to Vercel Blob:', error);
    return res.status(500).json({ error: 'Failed to upload file' });
  }
});

export default router.handler();

// Configure the API route to handle large files
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '100mb',
    },
  },
};
