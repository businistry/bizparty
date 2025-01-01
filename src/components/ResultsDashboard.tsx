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
      <div className="w-full h-full bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto" />
          <p className="mt-4 text-gray-500">Analyzing zip code {zipCode}...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-white p-6">
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
