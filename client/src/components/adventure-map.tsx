import { useEffect, useState, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { adventureLocations, typeLabels } from '@/data/adventureLocations';
import { useLanguage } from '@/contexts/LanguageContext';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';

// Fix for the missing icon issue in react-leaflet
import L from 'leaflet';

// Define the interface for a selected location
interface SelectedLocation {
  id: number;
  coordinates: [number, number];
}

// Define the Custom Marker component styles
const markerColors = {
  accommodation: '#10b981', // emerald-500
  experience: '#3b82f6',   // blue-500
  landmark: '#8b5cf6'      // violet-500
};

export function AdventureMap() {
  const { language } = useLanguage();
  const [selectedLocation, setSelectedLocation] = useState<SelectedLocation | null>(null);
  
  // Set up map when component mounts
  useEffect(() => {
    // Fix for Leaflet icon issues
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    
    L.Icon.Default.mergeOptions({
      iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    });
  }, []);

  // Center position of the map (Arvidsjaur area)
  const center: [number, number] = useMemo(() => [65.5905, 19.1791], []);
  
  // Create a function to handle marker click
  const handleMarkerClick = (id: number, coordinates: [number, number]) => {
    setSelectedLocation({ id, coordinates });
  };

  // Function to close the selected location
  const handleCloseSelected = () => {
    setSelectedLocation(null);
  };

  return (
    <div className="w-full relative">
      <div className="absolute top-4 right-4 z-[400] px-4 py-2 bg-black/80 backdrop-blur-sm rounded-lg text-white text-sm">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: markerColors.accommodation }}></div>
            <span>{typeLabels.accommodation[language]}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: markerColors.experience }}></div>
            <span>{typeLabels.experience[language]}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: markerColors.landmark }}></div>
            <span>{typeLabels.landmark[language]}</span>
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="h-[500px] w-full rounded-xl overflow-hidden border border-white/10 shadow-lg">
        <MapContainer 
          center={center} 
          zoom={12} 
          style={{ height: '100%', width: '100%' }}
          zoomControl={false}
          attributionControl={false}
        >
          {/* Dark-themed map style */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          />
          
          {/* Place markers for all adventure locations */}
          {adventureLocations.map((location) => (
            <CircleMarker
              key={location.id}
              center={location.coordinates}
              radius={6}
              pathOptions={{ 
                fillColor: markerColors[location.type],
                fillOpacity: 0.8,
                color: 'white',
                weight: 1,
                opacity: 0.8
              }}
              eventHandlers={{
                click: () => handleMarkerClick(location.id, location.coordinates)
              }}
            >
              <Popup>
                <div className="text-black">
                  <h3 className="font-bold">{location.name}</h3>
                  <p className="text-sm">{location.description}</p>
                  <Badge variant="outline" className="mt-1">
                    {typeLabels[location.type][language]}
                  </Badge>
                </div>
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>
      </div>

      {/* Selected location info card with animation */}
      <AnimatePresence>
        {selectedLocation && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="mt-4"
          >
            <Card className="bg-black/40 backdrop-blur-lg border border-white/10 text-white overflow-hidden">
              {adventureLocations.find(loc => loc.id === selectedLocation.id)?.image && (
                <div className="w-full h-48 relative overflow-hidden">
                  <img 
                    src={adventureLocations.find(loc => loc.id === selectedLocation.id)?.image} 
                    alt={adventureLocations.find(loc => loc.id === selectedLocation.id)?.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl font-bold">
                    {adventureLocations.find(loc => loc.id === selectedLocation.id)?.name}
                  </CardTitle>
                  <button 
                    onClick={handleCloseSelected}
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                  </button>
                </div>
                <Badge 
                  variant="outline" 
                  className="mt-1 inline-flex"
                  style={{ 
                    borderColor: markerColors[adventureLocations.find(loc => loc.id === selectedLocation.id)?.type || 'experience'],
                    color: markerColors[adventureLocations.find(loc => loc.id === selectedLocation.id)?.type || 'experience']
                  }}
                >
                  {typeLabels[adventureLocations.find(loc => loc.id === selectedLocation.id)?.type || 'experience'][language]}
                </Badge>
              </CardHeader>
              <CardContent>
                <p>{adventureLocations.find(loc => loc.id === selectedLocation.id)?.description}</p>
                <div className="mt-2 text-sm text-white/70">
                  <p>
                    {language === 'en' ? 'Coordinates' : language === 'de' ? 'Koordinaten' : 'Koordinater'}: {selectedLocation.coordinates[0].toFixed(4)}, {selectedLocation.coordinates[1].toFixed(4)}
                  </p>
                </div>
              </CardContent>
              <CardFooter className="border-t border-white/10 pt-4">
                <button className="text-xs uppercase tracking-wider font-semibold text-blue-400 hover:text-blue-300">
                  {language === 'en' ? 'Add to itinerary' : language === 'de' ? 'Zum Reiseplan hinzufügen' : 'Lägg till i resplan'}
                </button>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}