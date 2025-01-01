import React from "react";
import ZipSearchForm from "./ZipSearchForm";
import ResultsDashboard from "./ResultsDashboard";

interface HomeProps {
  initialZipCode?: string;
}

const Home = ({ initialZipCode = "" }: HomeProps) => {
  const [zipCode, setZipCode] = React.useState(initialZipCode);
  const [isAnalyzing, setIsAnalyzing] = React.useState(false);
  const [showResults, setShowResults] = React.useState(false);

  const handleZipSubmit = (submittedZipCode: string) => {
    setZipCode(submittedZipCode);
    setIsAnalyzing(true);
    // Simulate API call
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResults(true);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">
            Business Opportunity Analyzer
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Enter a ZIP code to discover promising business opportunities backed
            by AI-powered market analysis and demographic insights.
          </p>
        </div>

        {/* Search Form Section */}
        <div className="flex justify-center">
          <ZipSearchForm
            onSubmit={handleZipSubmit}
            isLoading={isAnalyzing}
            defaultZipCode={zipCode}
          />
        </div>

        {/* Results Section */}
        {(showResults || isAnalyzing) && (
          <div className="mt-8 bg-white rounded-lg shadow-lg overflow-hidden">
            <ResultsDashboard
              zipCode={zipCode}
              isLoading={isAnalyzing}
              businessRecommendations={[
                {
                  id: "1",
                  businessType: "Coffee Shop",
                  confidenceScore: 85,
                  marketPotential: "High",
                  description:
                    "Prime opportunity for a specialty coffee shop with remote work facilities",
                  metrics: {
                    competition: "Low",
                    growthRate: "12% annually",
                    customerBase: "Young professionals",
                  },
                },
                {
                  id: "2",
                  businessType: "Fitness Studio",
                  confidenceScore: 78,
                  marketPotential: "Medium",
                  description:
                    "Boutique fitness studio focusing on group classes and personal training",
                  metrics: {
                    competition: "Medium",
                    growthRate: "8% annually",
                    customerBase: "Health-conscious adults",
                  },
                },
              ]}
              locationData={{
                latitude: 40.7128,
                longitude: -74.006,
                marketData: {
                  competitorDensity: 0.7,
                  trafficScore: 85,
                  businessZones: ["Commercial", "Retail", "Restaurant"],
                },
              }}
              demographicData={{
                populationDensity: 5280,
                medianIncome: 75000,
                competitorCount: 12,
                metrics: [
                  {
                    label: "Population Growth",
                    value: 75,
                    description: "Annual population growth rate",
                  },
                  {
                    label: "Business Density",
                    value: 60,
                    description: "Relative to city average",
                  },
                  {
                    label: "Market Saturation",
                    value: 45,
                    description: "Available market opportunity",
                  },
                ],
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
