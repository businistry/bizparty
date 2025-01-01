import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Progress } from "./ui/progress";
import { BarChart, Users, DollarSign, Building } from "lucide-react";

interface DemographicData {
  populationDensity: number;
  medianIncome: number;
  competitorCount: number;
  metrics: {
    label: string;
    value: number;
    description: string;
  }[];
}

interface DemographicAnalysisProps {
  data?: DemographicData;
}

const defaultData: DemographicData = {
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
};

const DemographicAnalysis = ({
  data = defaultData,
}: DemographicAnalysisProps) => {
  return (
    <Card className="w-full h-full bg-white">
      <CardHeader>
        <CardTitle className="text-xl font-bold">
          Demographic Analysis
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="metrics">Key Metrics</TabsTrigger>
            <TabsTrigger value="competition">Competition</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-3 gap-4 mt-4">
              <Card className="p-4">
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <h3 className="text-sm font-medium">Population Density</h3>
                </div>
                <p className="text-2xl font-bold mt-2">
                  {data.populationDensity}
                </p>
                <p className="text-xs text-muted-foreground">
                  people per sq mile
                </p>
              </Card>

              <Card className="p-4">
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <h3 className="text-sm font-medium">Median Income</h3>
                </div>
                <p className="text-2xl font-bold mt-2">
                  ${data.medianIncome.toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground">per household</p>
              </Card>

              <Card className="p-4">
                <div className="flex items-center space-x-2">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  <h3 className="text-sm font-medium">Competitors</h3>
                </div>
                <p className="text-2xl font-bold mt-2">
                  {data.competitorCount}
                </p>
                <p className="text-xs text-muted-foreground">in target area</p>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="metrics" className="space-y-4">
            {data.metrics.map((metric, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between">
                  <div className="space-y-1">
                    <h4 className="text-sm font-medium">{metric.label}</h4>
                    <p className="text-xs text-muted-foreground">
                      {metric.description}
                    </p>
                  </div>
                  <span className="text-sm font-bold">{metric.value}%</span>
                </div>
                <Progress value={metric.value} className="h-2" />
              </div>
            ))}
          </TabsContent>

          <TabsContent value="competition" className="space-y-4">
            <Card className="p-4">
              <div className="flex items-center space-x-2">
                <BarChart className="h-4 w-4 text-muted-foreground" />
                <h3 className="text-sm font-medium">
                  Market Competition Analysis
                </h3>
              </div>
              <div className="mt-4 space-y-2">
                <p className="text-sm">
                  Total Competitors: {data.competitorCount}
                </p>
                <Progress value={70} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  Market saturation level
                </p>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default DemographicAnalysis;
