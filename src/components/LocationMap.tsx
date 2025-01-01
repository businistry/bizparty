import React, { useEffect, useState } from "react";
import { Card } from "./ui/card";
import { MapPin, Layers, Navigation } from "lucide-react";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default marker icons
const DefaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

interface LocationMapProps {
  zipCode?: string;
  latitude?: number;
  longitude?: number;
  marketData?: {
    competitorDensity: number;
    trafficScore: number;
    businessZones: string[];
  };
}

const getCoordinatesFromZip = async (zipCode: string) => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?postalcode=${zipCode}&country=US&format=json`
    );
    const data = await response.json();
    if (data.length > 0) {
      return {
        lat: parseFloat(data[0].lat),
        lon: parseFloat(data[0].lon)
      };
    }
    return null;
  } catch (error) {
    console.error("Error fetching coordinates:", error);
    return null;
  }
};

const LocationMap = ({
  zipCode = "10001",
  latitude: initialLat = 40.7128,
  longitude: initialLon = -74.006,
  marketData = {
    competitorDensity: 0.7,
    trafficScore: 85,
    businessZones: ["Commercial", "Retail", "Restaurant"],
  },
}: LocationMapProps) => {
  const [coordinates, setCoordinates] = useState({
    lat: initialLat,
    lon: initialLon
  });

  useEffect(() => {
    const fetchCoordinates = async () => {
      if (zipCode) {
        const coords = await getCoordinatesFromZip(zipCode);
        if (coords) {
          setCoordinates({
            lat: coords.lat,
            lon: coords.lon
          });
        }
      }
    };

    fetchCoordinates();
  }, [zipCode]);

  return (
    <Card className="w-[600px] h-[400px] bg-gradient-to-br from-slate-900 to-slate-800 p-4 relative border-white/10 hover:border-blue-400/30 transition-all duration-300">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <Navigation className="h-5 w-5 text-blue-400" />
          Location Analysis - {zipCode}
        </h3>
        <div className="flex gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="border-white/20 bg-white/5 hover:bg-white/10 hover:border-blue-400/30"
                >
                  <Layers className="h-4 w-4 text-blue-400" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Toggle Map Layers</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      <div className="relative w-full h-[300px] rounded-lg overflow-hidden border border-white/10">
        <MapContainer
          center={[coordinates.lat, coordinates.lon]}
          zoom={13}
          scrollWheelZoom={false}
          className="h-full w-full"
          key={`${coordinates.lat}-${coordinates.lon}`} // Force re-render on location change
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={[coordinates.lat, coordinates.lon]}>
            <Popup>
              <div className="space-y-1">
                <p className="font-semibold">Location Center</p>
                <p>Lat: {coordinates.lat.toFixed(4)}</p>
                <p>Lng: {coordinates.lon.toFixed(4)}</p>
              </div>
            </Popup>
          </Marker>
        </MapContainer>

        {/* Market data overlay */}
        <div className="absolute bottom-4 left-4 right-4 bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/20">
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-slate-400">Competitor Density</p>
              <p className="text-white font-semibold">
                {marketData.competitorDensity * 100}%
              </p>
            </div>
            <div>
              <p className="text-slate-400">Traffic Score</p>
              <p className="text-white font-semibold">
                {marketData.trafficScore}/100
              </p>
            </div>
            <div>
              <p className="text-slate-400">Zones</p>
              <p className="text-white font-semibold truncate">
                {marketData.businessZones.join(", ")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default LocationMap;
