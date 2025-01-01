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
import { Building2, TrendingUp, Users } from "lucide-react";

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
  {
    id: "3",
    businessType: "Tech Repair Shop",
    confidenceScore: 72,
    marketPotential: "High",
    description:
      "Electronics repair service with focus on mobile devices and laptops",
    metrics: {
      competition: "Low",
      growthRate: "15% annually",
      customerBase: "All demographics",
    },
  },
];

const BusinessRecommendations = ({
  recommendations = defaultRecommendations,
}: BusinessRecommendationsProps) => {
  return (
    <div className="w-full h-full bg-white p-4">
      <div className="mb-4">
        <h2 className="text-2xl font-bold">Business Recommendations</h2>
        <p className="text-gray-500">
          Based on market analysis and demographic data
        </p>
      </div>

      <ScrollArea className="h-[700px] pr-4">
        <div className="space-y-4">
          {recommendations.map((recommendation) => (
            <Card key={recommendation.id} className="w-full">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl">
                    {recommendation.businessType}
                  </CardTitle>
                  <Badge
                    variant={
                      recommendation.confidenceScore >= 80
                        ? "default"
                        : "secondary"
                    }
                    className="ml-2"
                  >
                    {recommendation.confidenceScore}% Confidence
                  </Badge>
                </div>
                <CardDescription>{recommendation.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">
                      Competition: {recommendation.metrics.competition}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">
                      Growth Rate: {recommendation.metrics.growthRate}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-gray-500" />
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
                    className="mt-2"
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
