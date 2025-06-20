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
  vitals: `Day,Systolic,Diastolic,Pulse\nMonday AM,120,80,72\nMonday PM,118,78,70\nTuesday AM,122,82,74\nTuesday PM,125,84,76\nWednesday AM,119,79,71\nWednesday PM,121,81,73`,
  tasks: `- Complete project proposal (done)\n- Review pull requests (in progress)\n- Update documentation (todo)\n- Fix critical bug (urgent)\n- Team standup at 2pm (done)\n- Deploy to production (blocked)\n- Write test cases (in progress)`,
  sales: `Quarter,Revenue,Deals,Pipeline\nQ1,125000,45,280000\nQ2,145000,52,320000\nQ3,180000,67,410000\nQ4,220000,78,520000`,
  events: `Event Name | Date | Attendees | Rating\nTech Conference 2024 | 2024-03-15 | 250 | 4.8\nWorkshop: React Best Practices | 2024-03-22 | 45 | 4.6\nNetworking Mixer | 2024-04-05 | 120 | 4.2\nProduct Launch Event | 2024-04-18 | 300 | 4.9\nCode Review Session | 2024-04-25 | 28 | 4.7`,
  inventory: `Product,Stock,Price,Category,Status\nLaptop Pro 15,25,$1299,Electronics,In Stock\nWireless Mouse,150,$29,Electronics,In Stock\nOffice Chair Premium,8,$599,Furniture,Low Stock\nStanding Desk,3,$899,Furniture,Critical\nWebcam 4K,45,$149,Electronics,In Stock\nDesk Lamp LED,67,$79,Furniture,In Stock\nKeyboard Mechanical,12,$199,Electronics,Low Stock`,
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
                  onClick={() => setData(exampleData.vitals)}
                >
                  📊 Health Vitals
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 px-3 text-xs font-[500] border-[#e6e6e6] dark:border-[#30363d] hover:border-[#0969da] dark:hover:border-[#58a6ff] hover:bg-[#f6f8fa] dark:hover:bg-[#21262d] text-[#0f1419] dark:text-[#f0f6fc]"
                  onClick={() => setData(exampleData.tasks)}
                >
                  ✅ Task List
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 px-3 text-xs font-[500] border-[#e6e6e6] dark:border-[#30363d] hover:border-[#0969da] dark:hover:border-[#58a6ff] hover:bg-[#f6f8fa] dark:hover:bg-[#21262d] text-[#0f1419] dark:text-[#f0f6fc]"
                  onClick={() => setData(exampleData.sales)}
                >
                  💰 Sales Data
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 px-3 text-xs font-[500] border-[#e6e6e6] dark:border-[#30363d] hover:border-[#0969da] dark:hover:border-[#58a6ff] hover:bg-[#f6f8fa] dark:hover:bg-[#21262d] text-[#0f1419] dark:text-[#f0f6fc]"
                  onClick={() => setData(exampleData.events)}
                >
                  🎪 Events
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 px-3 text-xs font-[500] border-[#e6e6e6] dark:border-[#30363d] hover:border-[#0969da] dark:hover:border-[#58a6ff] hover:bg-[#f6f8fa] dark:hover:bg-[#21262d] text-[#0f1419] dark:text-[#f0f6fc]"
                  onClick={() => setData(exampleData.inventory)}
                >
                  📦 Inventory
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
