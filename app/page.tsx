// app/page.tsx
"use client";

import { useState } from "react";
import { useCompletion } from "ai/react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Toaster, toast } from "sonner";
import { Sparkles, Zap, ArrowRight, Database, Wand2 } from "lucide-react";
import DynamicComponent from "@/components/dynamic-component";
import { ThemeToggle } from "@/components/theme-toggle";

const exampleData = {
  fitness: `Activity,Duration(min),Calories,HeartRate,Distance(km)\nMorning Run,45,420,145,6.2\nYoga Session,60,180,95,0\nCycling,90,650,138,25.5\nSwimming,30,280,125,1.2\nHIIT Workout,25,310,162,0\nEvening Walk,40,150,98,3.8\nWeight Training,50,220,118,0`,
  library: `Title,Author,Genre,Rating,Year,Available\nThe Midnight Library,Matt Haig,Fiction,4.8,2020,Yes\nAtomic Habits,James Clear,Self-Help,4.9,2018,No\nProject Hail Mary,Andy Weir,Sci-Fi,4.7,2021,Yes\nEducated,Tara Westover,Memoir,4.6,2018,Yes\nThe Silent Patient,Alex Michaelides,Thriller,4.5,2019,No\nSapiens,Yuval Noah Harari,History,4.8,2011,Yes\nDune,Frank Herbert,Sci-Fi,4.9,1965,Yes`,
  orders: `Order ID,Customer,Items,Total,Time,Status\n#1234,Sarah Chen,"Pizza Margherita, Salad",$28.50,12:15 PM,Delivered\n#1235,Mike Johnson,"Burger Deluxe, Fries, Coke",$18.99,12:30 PM,Preparing\n#1236,Emily Davis,"Pasta Carbonara, Wine",$35.00,12:45 PM,Ready\n#1237,Alex Wong,"Sushi Platter, Miso Soup",$42.80,1:00 PM,In Transit\n#1238,Lisa Brown,"Caesar Salad, Smoothie",$16.75,1:15 PM,Confirmed`,
  weather: `Location | Time | Temp(°C) | Humidity(%) | Condition | Wind(km/h)\nTokyo | 08:00 | 22 | 65 | Partly Cloudy | 12\nLondon | 08:00 | 14 | 78 | Light Rain | 18\nNew York | 08:00 | 18 | 52 | Clear | 8\nSydney | 08:00 | 26 | 70 | Sunny | 15\nDubai | 08:00 | 35 | 45 | Hot & Dry | 22\nParis | 08:00 | 16 | 68 | Overcast | 10`,
  employees: `- John Smith (Engineering) - Senior Developer - john.smith@company.com - Ext: 2154\n- Maria Garcia (Marketing) - Brand Manager - maria.garcia@company.com - Ext: 3287\n- David Lee (Sales) - Account Executive - david.lee@company.com - Ext: 4156\n- Emma Wilson (HR) - Talent Acquisition - emma.wilson@company.com - Ext: 5623\n- Robert Chen (Finance) - Financial Analyst - robert.chen@company.com - Ext: 6789\n- Sophie Turner (Design) - UX Designer - sophie.turner@company.com - Ext: 7432\n- James Park (Engineering) - DevOps Engineer - james.park@company.com - Ext: 8901`,
};

export default function Home() {
  const [data, setData] = useState<string>("");
  const [generatedComponent, setGeneratedComponent] = useState<string>("");

  const { complete, isLoading } = useCompletion({
    api: "/api/generate",
    onFinish: (prompt, completion) => {
      console.log("onFinish called with completion:", completion);
      setGeneratedComponent(completion);
      toast.success("Component generated successfully!");
    },
    onError: (err) => {
      console.error("onError called:", err);
      toast.error("Error generating component.", { description: err.message });
    },
  });

  const { complete: generateData, isLoading: isGeneratingData } = useCompletion({
    api: "/api/generate-data",
    onFinish: (prompt, completion) => {
      console.log("Generated data:", completion);
      setData(completion);
      toast.success("Sample data generated successfully!");
    },
    onError: (err) => {
      console.error("Data generation error:", err);
      toast.error("Error generating data.", { description: err.message });
    },
  });

  const handleGenerate = () => {
    if (!data) {
      toast.warning("Please paste some data first.");
      return;
    }
    console.log("handleGenerate called with data:", data);
    setGeneratedComponent(""); // Clear previous component
    complete(data); // Pass data directly, not as an object
  };

  const handleGenerateData = () => {
    const prompt = "Generate sample data for data visualization";
    generateData(prompt);
  };

  return (
    <main className="min-h-screen bg-[#fafafa] dark:bg-[#0d1117]">
      <Toaster richColors position="top-center" />
      
      {/* Header */}
      <div className="border-b border-[#e6e6e6] dark:border-[#30363d] bg-white dark:bg-[#161b22]">
        <div className="max-w-5xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between mb-8">
            <div /> {/* Spacer */}
            <ThemeToggle />
          </div>
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#f6f6f6] dark:bg-[#21262d] border border-[#e6e6e6] dark:border-[#30363d] rounded-full text-sm text-[#666666] dark:text-[#8b949e] font-medium">
              <Zap className="h-3 w-3" />
              <span>Powered by Google Gemini</span>
            </div>
            <h1 className="text-5xl font-[650] text-[#0f1419] dark:text-[#f0f6fc] tracking-[-0.02em] leading-[1.1]">
              Generative UI
            </h1>
            <p className="text-[#666666] dark:text-[#8b949e] text-lg font-[450] max-w-2xl mx-auto leading-relaxed">
              Transform your data into beautiful, interactive React components instantly.
              No coding required.
            </p>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-6 py-12">

        <div className="bg-white dark:bg-[#161b22] border border-[#e6e6e6] dark:border-[#30363d] rounded-[12px] overflow-hidden">
          <div className="p-6 border-b border-[#e6e6e6] dark:border-[#30363d]">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 bg-[#f6f6f6] dark:bg-[#21262d] rounded-lg">
                  <Database className="h-4 w-4 text-[#666666] dark:text-[#8b949e]" />
                </div>
                <div>
                  <h2 className="text-[#0f1419] dark:text-[#f0f6fc] font-[600] text-base">Input Data</h2>
                  <p className="text-[#666666] dark:text-[#8b949e] text-sm font-[450]">
                    Paste any structured data: CSV, JSON, tables, or lists
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleGenerateData}
                disabled={isGeneratingData}
                className="h-8 px-3 text-xs font-[500] border-[#e6e6e6] dark:border-[#30363d] hover:border-[#0969da] dark:hover:border-[#58a6ff] hover:bg-[#f6f8fa] dark:hover:bg-[#21262d] text-[#0f1419] dark:text-[#f0f6fc]"
              >
                {isGeneratingData ? (
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 border border-[#666666] dark:border-[#8b949e] border-t-transparent rounded-full animate-spin" />
                    <span>Generating...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5">
                    <Wand2 className="w-3 h-3" />
                    <span>Generate Data</span>
                  </div>
                )}
              </Button>
            </div>
          </div>
          
          <div className="p-6">
            <Textarea
              className="min-h-[240px] font-mono text-sm border-[#e6e6e6] dark:border-[#30363d] focus:border-[#0969da] dark:focus:border-[#58a6ff] focus:ring-1 focus:ring-[#0969da] dark:focus:ring-[#58a6ff] resize-none bg-[#fafafa] dark:bg-[#0d1117] text-[#0f1419] dark:text-[#f0f6fc]"
              placeholder="Quarter,Revenue,Deals,Pipeline\nQ1,125000,45,280000\nQ2,145000,52,320000\n...\n\nOr try one of the examples below"
              value={data}
              onChange={(e) => setData(e.target.value)}
            />
            
            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-[500] text-[#666666] dark:text-[#8b949e]">Quick examples:</span>
                <Badge variant="outline" className="text-xs font-[450] bg-[#f6f6f6] dark:bg-[#21262d] text-[#666666] dark:text-[#8b949e] border-[#e6e6e6] dark:border-[#30363d]">
                  Click to try
                </Badge>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 px-3 text-xs font-[500] border-[#e6e6e6] dark:border-[#30363d] hover:border-[#0969da] dark:hover:border-[#58a6ff] hover:bg-[#f6f8fa] dark:hover:bg-[#21262d] text-[#0f1419] dark:text-[#f0f6fc]"
                  onClick={() => setData(exampleData.fitness)}
                >
                  🏃 Fitness Tracking
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 px-3 text-xs font-[500] border-[#e6e6e6] dark:border-[#30363d] hover:border-[#0969da] dark:hover:border-[#58a6ff] hover:bg-[#f6f8fa] dark:hover:bg-[#21262d] text-[#0f1419] dark:text-[#f0f6fc]"
                  onClick={() => setData(exampleData.library)}
                >
                  📚 Library Collection
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 px-3 text-xs font-[500] border-[#e6e6e6] dark:border-[#30363d] hover:border-[#0969da] dark:hover:border-[#58a6ff] hover:bg-[#f6f8fa] dark:hover:bg-[#21262d] text-[#0f1419] dark:text-[#f0f6fc]"
                  onClick={() => setData(exampleData.orders)}
                >
                  🍕 Restaurant Orders
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 px-3 text-xs font-[500] border-[#e6e6e6] dark:border-[#30363d] hover:border-[#0969da] dark:hover:border-[#58a6ff] hover:bg-[#f6f8fa] dark:hover:bg-[#21262d] text-[#0f1419] dark:text-[#f0f6fc]"
                  onClick={() => setData(exampleData.weather)}
                >
                  🌡️ Weather Monitoring
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 px-3 text-xs font-[500] border-[#e6e6e6] dark:border-[#30363d] hover:border-[#0969da] dark:hover:border-[#58a6ff] hover:bg-[#f6f8fa] dark:hover:bg-[#21262d] text-[#0f1419] dark:text-[#f0f6fc]"
                  onClick={() => setData(exampleData.employees)}
                >
                  💼 Employee Directory
                </Button>
              </div>
            </div>
            
            <Button
              onClick={handleGenerate}
              disabled={isLoading || !data.trim()}
              className="w-full mt-8 h-12 bg-[#0969da] dark:bg-[#58a6ff] hover:bg-[#0860ca] dark:hover:bg-[#4493f8] text-white font-[500] rounded-[8px] border-0 disabled:bg-[#e6e6e6] dark:disabled:bg-[#30363d] disabled:text-[#8c9196] dark:disabled:text-[#6e7681]"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Generating component...</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  <span>Generate UI Component</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              )}
            </Button>
          </div>
        </div>

        {generatedComponent && (
          <div className="mt-8 bg-white dark:bg-[#161b22] border border-[#e6e6e6] dark:border-[#30363d] rounded-[12px] overflow-hidden">
            <div className="p-4 border-b border-[#e6e6e6] dark:border-[#30363d] bg-[#f6f8fa] dark:bg-[#21262d]">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#22c55e] dark:bg-[#3fb950] rounded-full" />
                <span className="text-sm font-[500] text-[#0f1419] dark:text-[#f0f6fc]">Generated Component</span>
                <Badge variant="outline" className="text-xs font-[450] bg-white dark:bg-[#161b22] text-[#666666] dark:text-[#8b949e] border-[#e6e6e6] dark:border-[#30363d] ml-auto">
                  Live Preview
                </Badge>
              </div>
            </div>
            <DynamicComponent componentCode={generatedComponent} />
          </div>
        )}
      </div>
    </main>
  );
}
