import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
import { Building2, TrendingUp, Users, Star } from "lucide-react";

interface BusinessRecommendation {
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
}

interface BusinessRecommendationsProps {
  recommendations?: BusinessRecommendation[];
}

const defaultRecommendations: BusinessRecommendation[] = [
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
];

const BusinessRecommendations = ({
  recommendations = defaultRecommendations,
}: BusinessRecommendationsProps) => {
  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-900 to-slate-800 p-6 rounded-xl">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <Star className="h-6 w-6 text-yellow-400" />
          Top Recommendations
        </h2>
        <p className="text-slate-400 mt-1">
          AI-powered insights based on market analysis
        </p>
      </div>

      <ScrollArea className="h-[700px] pr-4">
        <div className="space-y-4">
          {recommendations.map((recommendation) => (
            <Card
              key={recommendation.id}
              className="w-full bg-white/5 backdrop-blur-sm border-white/10 hover:border-blue-400/30 transition-all duration-300 group"
            >
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl text-white group-hover:text-blue-400 transition-colors">
                    {recommendation.businessType}
                  </CardTitle>
                  <Badge
                    variant={
                      recommendation.confidenceScore >= 80
                        ? "default"
                        : "secondary"
                    }
                    className="ml-2 bg-blue-500 hover:bg-blue-400"
                  >
                    {recommendation.confidenceScore}% Confidence
                  </Badge>
                </div>
                <CardDescription className="text-slate-300">
                  {recommendation.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-slate-300">
                    <Building2 className="h-4 w-4 text-blue-400" />
                    <span className="text-sm">
                      Competition: {recommendation.metrics.competition}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <TrendingUp className="h-4 w-4 text-blue-400" />
                    <span className="text-sm">
                      Growth Rate: {recommendation.metrics.growthRate}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <Users className="h-4 w-4 text-blue-400" />
                    <span className="text-sm">
                      Target Customers: {recommendation.metrics.customerBase}
                    </span>
                  </div>
                  <Badge
                    variant={
                      recommendation.marketPotential === "High"
                        ? "default"
                        : "outline"
                    }
                    className={`mt-2 ${recommendation.marketPotential === "High" ? "bg-green-500 hover:bg-green-400" : "text-slate-300 border-slate-300"}`}
                  >
                    {recommendation.marketPotential} Market Potential
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default BusinessRecommendations;
