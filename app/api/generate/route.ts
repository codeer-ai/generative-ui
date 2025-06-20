import { streamText } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";

export const runtime = "edge";

const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_API_KEY || "",
});

export async function POST(req: Request) {
  console.log("POST /api/generate - Start");
  console.log("API Key exists:", !!process.env.GOOGLE_API_KEY);

  if (!process.env.GOOGLE_API_KEY) {
    return new Response("Google API key not configured", { status: 500 });
  }

  const body = await req.json();
  console.log("Request body:", JSON.stringify(body));

  // The useCompletion hook sends the prompt directly in the body
  const userInput = body.prompt || body.data || "";
  console.log(
    "Extracted prompt/data:",
    userInput ? String(userInput).substring(0, 100) + "..." : "NO DATA",
  );

  const systemPrompt = `
    You are an expert at creating React components using shadcn/ui and Tailwind CSS.
    A user has provided the following data:

    ---
    ${userInput}
    ---

    Create a React component that visualizes this data. Follow these EXACT rules:

    CRITICAL REQUIREMENTS:
    1. DO NOT include ANY import statements
    2. DO NOT include markdown code blocks (no \`\`\`)
    3. All shadcn/ui components are already available: Card, CardHeader, CardTitle, CardContent, Button, Badge, Progress, Alert, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, Tabs, Select, Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger, Input, Switch, Slider, RadioGroup, Checkbox, ScrollArea, Separator, Sheet, Accordion, Carousel, Command, ContextMenu, DropdownMenu, NavigationMenu, Popover, Tooltip, Label, SelectTrigger, SelectValue, SelectContent, SelectItem, TabsList, TabsTrigger, TabsContent
    4. All chart components are available: ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent
    5. All Recharts components are available: AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, ResponsiveContainer
    6. All Lucide React icons are available (use PlusIcon for plus, not Plus)
    7. Start with: const ComponentName = () => {
    8. End with: export default ComponentName
    9. Use Tailwind CSS for styling
    10. Return JSX that visualizes the provided data
    11. For charts, use ChartContainer wrapper with proper config and Recharts components
    12. NEVER use DialogDialogDescription - use DialogDescription instead
    13. Be very careful with JSX tag names - they must match exactly
    14. CRITICAL: ChartLegend and ChartLegendContent MUST be inside ChartContainer, never outside
    15. CRITICAL: All chart components (ChartTooltip, ChartLegend, etc.) must be children of ChartContainer

    EXAMPLE FORMAT:
    const DataVisualization = () => {
      // component logic here
      return (
        <Card>
          <CardHeader>
            <CardTitle>Title</CardTitle>
          </CardHeader>
          <CardContent>
            {/* content here */}
          </CardContent>
        </Card>
      );
    };

    export default DataVisualization;
  `;

  try {
    console.log("Creating streamText result...");
    const result = await streamText({
      model: google("gemini-2.5-flash-lite-preview-06-17"),
      prompt: systemPrompt,
    });

    console.log("Returning streaming response...");
    return result.toDataStreamResponse();
  } catch (error) {
    console.error("Error generating component:", error);
    console.error(
      "Error stack:",
      error instanceof Error ? error.stack : "No stack",
    );
    return new Response("Error generating component.", { status: 500 });
  }
}
