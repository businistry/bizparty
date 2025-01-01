import React from "react";
import { Card } from "./ui/card";
import { MapPin, Layers } from "lucide-react";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

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

const LocationMap = ({
  zipCode = "12345",
  latitude = 40.7128,
  longitude = -74.006,
  marketData = {
    competitorDensity: 0.7,
    trafficScore: 85,
    businessZones: ["Commercial", "Retail", "Restaurant"],
  },
}: LocationMapProps) => {
  return (
    <Card className="w-[600px] h-[400px] bg-white p-4 relative">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Location Analysis - {zipCode}</h3>
        <div className="flex gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon">
                  <Layers className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Toggle Map Layers</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      {/* Map placeholder */}
      <div className="relative w-full h-[300px] bg-slate-100 rounded-lg overflow-hidden">
        {/* Simulated map with a gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100">
          {/* Center pin */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <MapPin className="h-8 w-8 text-red-500" />
          </div>

          {/* Market data overlay */}
          <div className="absolute bottom-4 left-4 right-4 bg-white/90 p-3 rounded-lg shadow-sm">
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Competitor Density</p>
                <p className="font-semibold">
                  {marketData.competitorDensity * 100}%
                </p>
              </div>
              <div>
                <p className="text-gray-600">Traffic Score</p>
                <p className="font-semibold">{marketData.trafficScore}/100</p>
              </div>
              <div>
                <p className="text-gray-600">Zones</p>
                <p className="font-semibold truncate">
                  {marketData.businessZones.join(", ")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default LocationMap;
