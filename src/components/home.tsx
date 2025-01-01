import React from "react";
import ZipSearchForm from "./ZipSearchForm";
import ResultsDashboard from "./ResultsDashboard";
import { ArrowRight, Building2, TrendingUp, Users } from "lucide-react";

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
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResults(true);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-6xl">
              <span className="block">Discover Your Next</span>
              <span className="block text-blue-400">Business Opportunity</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Transform any ZIP code into a goldmine of business intelligence
              with our AI-powered market analysis platform.
            </p>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 mt-12 text-center">
            {[
              { icon: Building2, stat: "1,000+", label: "Businesses Launched" },
              { icon: Users, stat: "50,000+", label: "Entrepreneurs Helped" },
              { icon: TrendingUp, stat: "92%", label: "Success Rate" },
            ].map((item, index) => (
              <div
                key={index}
                className="p-6 bg-white/5 rounded-lg backdrop-blur-sm border border-white/10 hover:border-blue-400/50 transition-colors"
              >
                <item.icon className="h-8 w-8 text-blue-400 mx-auto mb-3" />
                <div className="text-3xl font-bold text-white mb-1">
                  {item.stat}
                </div>
                <div className="text-slate-400">{item.label}</div>
              </div>
            ))}
          </div>

          {/* Search Section */}
          <div className="mt-12">
            <div className="flex justify-center">
              <ZipSearchForm
                onSubmit={handleZipSubmit}
                isLoading={isAnalyzing}
                defaultZipCode={zipCode}
              />
            </div>
            <p className="mt-4 text-sm text-slate-400">
              Try it now - Analyze any US ZIP code in seconds
            </p>
          </div>

          {/* Features Section */}
          <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "AI-Powered Analysis",
                description:
                  "Get intelligent business recommendations based on deep market analysis",
              },
              {
                title: "Demographic Insights",
                description:
                  "Understand your target market with rich demographic data",
              },
              {
                title: "Competition Mapping",
                description:
                  "Visualize the competitive landscape in your chosen area",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-6 bg-white/5 rounded-lg backdrop-blur-sm border border-white/10 hover:border-blue-400/50 transition-colors group cursor-pointer"
              >
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-slate-400">{feature.description}</p>
                <ArrowRight className="h-5 w-5 text-blue-400 mt-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Results Section */}
      {(showResults || isAnalyzing) && (
        <div className="bg-white py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
        </div>
      )}
    </div>
  );
};

export default Home;
