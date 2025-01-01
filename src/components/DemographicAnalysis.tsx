import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Progress } from "./ui/progress";
import { BarChart, Users, DollarSign, Building } from "lucide-react";
import { Bar, Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

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
    <Card className="w-full h-full bg-gradient-to-br from-slate-900 to-slate-800 border-white/10 hover:border-blue-400/30 transition-all duration-300">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
          <BarChart className="h-5 w-5 text-blue-400" />
          Demographic Analysis
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-white/5 border border-white/10">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-blue-500 data-[state=active]:text-white text-slate-300"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="metrics"
              className="data-[state=active]:bg-blue-500 data-[state=active]:text-white text-slate-300"
            >
              Key Metrics
            </TabsTrigger>
            <TabsTrigger
              value="competition"
              className="data-[state=active]:bg-blue-500 data-[state=active]:text-white text-slate-300"
            >
              Competition
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              <Card className="p-4 bg-white/5 border-white/10 hover:border-blue-400/30 transition-all duration-300">
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-blue-400" />
                  <h3 className="text-sm font-medium text-slate-300">
                    Population Density
                  </h3>
                </div>
                <p className="text-2xl font-bold text-white mt-2">
                  {data.populationDensity}
                </p>
                <p className="text-xs text-slate-400">people per sq mile</p>
              </Card>

              <Card className="p-4 bg-white/5 border-white/10 hover:border-blue-400/30 transition-all duration-300">
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-4 w-4 text-blue-400" />
                  <h3 className="text-sm font-medium text-slate-300">
                    Median Income
                  </h3>
                </div>
                <p className="text-2xl font-bold text-white mt-2">
                  ${data.medianIncome.toLocaleString()}
                </p>
                <p className="text-xs text-slate-400">per household</p>
              </Card>

              <Card className="p-4 bg-white/5 border-white/10 hover:border-blue-400/30 transition-all duration-300">
                <div className="flex items-center space-x-2">
                  <Building className="h-4 w-4 text-blue-400" />
                  <h3 className="text-sm font-medium text-slate-300">
                    Competitors
                  </h3>
                </div>
                <p className="text-2xl font-bold text-white mt-2">
                  {data.competitorCount}
                </p>
                <p className="text-xs text-slate-400">in target area</p>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="metrics" className="space-y-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                <h3 className="text-lg font-semibold text-white mb-4">Key Metrics Overview</h3>
                <Pie
                  data={{
                    labels: data.metrics.map(m => m.label),
                    datasets: [{
                      label: 'Metric Value',
                      data: data.metrics.map(m => m.value),
                      backgroundColor: [
                        'rgba(99, 102, 241, 0.8)',
                        'rgba(59, 130, 246, 0.8)',
                        'rgba(14, 165, 233, 0.8)'
                      ],
                      borderColor: [
                        'rgba(99, 102, 241, 1)',
                        'rgba(59, 130, 246, 1)',
                        'rgba(14, 165, 233, 1)'
                      ],
                      borderWidth: 1,
                    }]
                  }}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        position: 'bottom',
                        labels: {
                          color: '#fff'
                        }
                      }
                    }
                  }}
                />
              </div>

              <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                <h3 className="text-lg font-semibold text-white mb-4">Metric Trends</h3>
                <Line
                  data={{
                    labels: data.metrics.map(m => m.label),
                    datasets: [{
                      label: 'Metric Value',
                      data: data.metrics.map(m => m.value),
                      borderColor: 'rgba(99, 102, 241, 0.8)',
                      backgroundColor: 'rgba(99, 102, 241, 0.2)',
                      borderWidth: 2,
                      pointRadius: 4,
                      pointBackgroundColor: 'rgba(99, 102, 241, 1)',
                      tension: 0.3
                    }]
                  }}
                  options={{
                    responsive: true,
                    scales: {
                      y: {
                        beginAtZero: true,
                        grid: {
                          color: 'rgba(255,255,255,0.1)'
                        },
                        ticks: {
                          color: '#fff'
                        }
                      },
                      x: {
                        grid: {
                          color: 'rgba(255,255,255,0.1)'
                        },
                        ticks: {
                          color: '#fff'
                        }
                      }
                    },
                    plugins: {
                      legend: {
                        labels: {
                          color: '#fff'
                        }
                      }
                    }
                  }}
                />
              </div>
            </div>

            <div className="mt-6">
              {data.metrics.map((metric, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between">
                    <div className="space-y-1">
                      <h4 className="text-sm font-medium text-white">
                        {metric.label}
                      </h4>
                      <p className="text-xs text-slate-400">
                        {metric.description}
                      </p>
                    </div>
                    <span className="text-sm font-bold text-blue-400">
                      {metric.value}%
                    </span>
                  </div>
                  <Progress
                    value={metric.value}
                    className="h-2 bg-white/5"
                    style={{
                      backgroundColor: 'rgba(255,255,255,0.05)',
                      backgroundImage: 'linear-gradient(to right, #3b82f6, #3b82f6)',
                      backgroundSize: `${metric.value}% 100%`,
                      backgroundRepeat: 'no-repeat'
                    }}
                  />
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="competition" className="mt-4">
            <Card className="p-4 bg-white/5 border-white/10">
              <div className="flex items-center space-x-2">
                <BarChart className="h-4 w-4 text-blue-400" />
                <h3 className="text-sm font-medium text-white">
                  Market Competition Analysis
                </h3>
              </div>
              <div className="mt-4 space-y-2">
                <p className="text-sm text-slate-300">
                  Total Competitors: {data.competitorCount}
                </p>
                <Progress
                  value={70}
                  className="h-2 bg-white/5"
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    backgroundImage: 'linear-gradient(to right, #3b82f6, #3b82f6)',
                    backgroundSize: `70% 100%`,
                    backgroundRepeat: 'no-repeat'
                  }}
                />
                <p className="text-xs text-slate-400">
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
