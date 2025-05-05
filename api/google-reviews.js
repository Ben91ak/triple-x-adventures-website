// API endpoint to fetch Google reviews
export default async function handler(req, res) {
  try {
    // Google Places API requires an API key
    const apiKey = process.env.GOOGLE_PLACES_API_KEY;
    
    if (!apiKey) {
      return res.status(500).json({ 
        error: 'Google Places API key is not configured' 
      });
    }

    // Your Google Place ID - this identifies your business on Google
    const placeId = process.env.GOOGLE_PLACE_ID;
    
    if (!placeId) {
      return res.status(500).json({ 
        error: 'Google Place ID is not configured' 
      });
    }

    // Fetch reviews from Google Places API
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews&key=${apiKey}`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(`Google API error: ${data.error_message || 'Unknown error'}`);
    }

    // Extract and format the reviews
    const reviews = data.result?.reviews || [];
    
    const formattedReviews = reviews.map(review => ({
      id: review.time, // Using the timestamp as a unique ID
      text: review.text,
      author: review.author_name,
      location: 'Google Review', // Google doesn't provide location in reviews
      rating: review.rating,
      image: review.profile_photo_url || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(review.author_name),
      language: review.language // Original language of the review
    }));

    return res.status(200).json({ reviews: formattedReviews });
  } catch (error) {
    console.error('Error fetching Google reviews:', error);
    return res.status(500).json({ 
      error: 'Failed to fetch Google reviews',
      details: error.message
    });
  }
}
