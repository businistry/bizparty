import React from "react";
import { Card } from "./ui/card";
import { MapPin, Layers, Navigation } from "lucide-react";
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

      {/* Map placeholder */}
      <div className="relative w-full h-[300px] rounded-lg overflow-hidden border border-white/10">
        {/* Simulated map with a gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900">
          {/* Grid lines effect */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.1)_1px,transparent_1px)] bg-[size:20px_20px]"></div>

          {/* Center pin */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="relative">
              <MapPin className="h-8 w-8 text-blue-500" />
              <div className="absolute -inset-2 bg-blue-500/20 rounded-full animate-pulse"></div>
            </div>
          </div>

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
      </div>
    </Card>
  );
};

export default LocationMap;
