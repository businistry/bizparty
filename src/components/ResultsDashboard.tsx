import React from "react";
import BusinessRecommendations from "./BusinessRecommendations";
import LocationMap from "./LocationMap";
import DemographicAnalysis from "./DemographicAnalysis";

interface ResultsDashboardProps {
  zipCode?: string;
  isLoading?: boolean;
  businessRecommendations?: Array<{
    id: string;
    businessType: string;
    confidenceScore: number;
    marketPotential: string;
    description: string;
    metrics: {
      competition: string;
      growthRate: string;
      customerBase: string;
    };
  }>;
  locationData?: {
    latitude: number;
    longitude: number;
    marketData: {
      competitorDensity: number;
      trafficScore: number;
      businessZones: string[];
    };
  };
  demographicData?: {
    populationDensity: number;
    medianIncome: number;
    competitorCount: number;
    metrics: Array<{
      label: string;
      value: number;
      description: string;
    }>;
  };
}

const ResultsDashboard = ({
  zipCode = "12345",
  isLoading = false,
  businessRecommendations,
  locationData,
  demographicData,
}: ResultsDashboardProps) => {
  if (isLoading) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center rounded-xl">
        <div className="text-center space-y-4">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-blue-400/20 border-t-blue-400 rounded-full animate-spin" />
            <div className="absolute inset-0 blur-xl bg-blue-400/20 rounded-full animate-pulse" />
          </div>
          <p className="text-lg text-slate-300">
            Analyzing zip code {zipCode}...
          </p>
          <p className="text-sm text-slate-400">
            Discovering business opportunities
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-900 to-slate-800 p-6 rounded-xl">
      <div className="grid grid-cols-12 gap-6 h-full">
        {/* Business Recommendations Section */}
        <div className="col-span-4 h-full">
          <BusinessRecommendations recommendations={businessRecommendations} />
        </div>

        {/* Map and Demographics Section */}
        <div className="col-span-8 space-y-6">
          <LocationMap
            zipCode={zipCode}
            latitude={locationData?.latitude}
            longitude={locationData?.longitude}
            marketData={locationData?.marketData}
          />
          <DemographicAnalysis data={demographicData} />
        </div>
      </div>
    </div>
  );
};

export default ResultsDashboard;
