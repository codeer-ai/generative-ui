import { streamText } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";

export const runtime = "edge";

const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_API_KEY || "",
});

const dataTemplates = [
  "Monthly sales data with products, revenue, and regions",
  "Employee performance metrics with departments and ratings", 
  "Customer feedback survey results with ratings and comments",
  "Website analytics data with page views, bounce rates, and conversions",
  "Inventory management data with stock levels and categories",
  "Project management tasks with status, priority, and deadlines",
  "Financial expense tracking with categories and amounts",
  "Event attendance data with dates, locations, and participant counts",
  "Student grades and test scores across different subjects",
  "Weather data with temperature, humidity, and precipitation",
  "E-commerce order data with products, quantities, and customer info",
  "Social media engagement metrics with posts, likes, and shares"
];

export async function POST() {
  console.log("POST /api/generate-data - Start");

  if (!process.env.GOOGLE_API_KEY) {
    return new Response("Google API key not configured", { status: 500 });
  }

  // Pick a random template
  const randomTemplate = dataTemplates[Math.floor(Math.random() * dataTemplates.length)];
  
  const systemPrompt = `
    Generate realistic sample data for: ${randomTemplate}
    
    Requirements:
    1. Return ONLY the raw data in CSV format
    2. Include headers as the first row
    3. Generate 8-12 rows of realistic data
    4. Use realistic values, names, dates, and numbers
    5. Make the data interesting and varied
    6. DO NOT include any markdown formatting or code blocks
    7. DO NOT include any explanations or additional text
    
    Example format:
    Product,Sales,Region,Date
    Laptop Pro,15000,North,2024-01-15
    Wireless Mouse,2500,South,2024-01-16
    
    Generate data for: ${randomTemplate}
  `;

  try {
    console.log("Creating streamText result for data generation...");
    const result = await streamText({
      model: google("gemini-2.5-flash-lite-preview-06-17"),
      prompt: systemPrompt,
    });

    console.log("Returning streaming response...");
    return result.toDataStreamResponse();
  } catch (error) {
    console.error("Error generating data:", error);
    return new Response("Error generating sample data.", { status: 500 });
  }
}