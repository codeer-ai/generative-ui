// components/dynamic-component.tsx
"use client";

import React, { useState, useEffect, useMemo } from "react";
import * as Babel from "@babel/standalone";
// Import all shadcn components you might need
import * as shadcnUI from "@/components/ui";
import * as lucide from "lucide-react";
import * as Recharts from "recharts";

interface DynamicComponentProps {
  componentCode: string;
}

const DynamicComponent: React.FC<DynamicComponentProps> = ({
  componentCode,
}) => {
  const [Component, setComponent] = useState<React.ComponentType | null>(null);

  const scope = useMemo(
    () => ({
      React,
      ...shadcnUI,
      ...Recharts,
      // Only include commonly used Lucide icons to avoid naming conflicts
      ChevronDown: lucide.ChevronDown,
      ChevronUp: lucide.ChevronUp,
      ChevronLeft: lucide.ChevronLeft,
      ChevronRight: lucide.ChevronRight,
      Check: lucide.Check,
      X: lucide.X,
      Plus: lucide.Plus,
      Minus: lucide.Minus,
      Search: lucide.Search,
      Settings: lucide.Settings,
      User: lucide.User,
      Calendar: lucide.Calendar,
      Clock: lucide.Clock,
      Heart: lucide.Heart,
      Star: lucide.Star,
      Home: lucide.Home,
      Mail: lucide.Mail,
      Phone: lucide.Phone,
      MapPin: lucide.MapPin,
      Camera: lucide.Camera,
      Download: lucide.Download,
      Upload: lucide.Upload,
      Edit: lucide.Edit,
      Trash: lucide.Trash,
      Save: lucide.Save,
      Copy: lucide.Copy,
      Share: lucide.Share,
      Bell: lucide.Bell,
      Lock: lucide.Lock,
      Unlock: lucide.Unlock,
      Eye: lucide.Eye,
      EyeOff: lucide.EyeOff,
      ArrowUp: lucide.ArrowUp,
      ArrowDown: lucide.ArrowDown,
      ArrowLeft: lucide.ArrowLeft,
      ArrowRight: lucide.ArrowRight,
      ExternalLink: lucide.ExternalLink,
      Info: lucide.Info,
      AlertCircle: lucide.AlertCircle,
      CheckCircle: lucide.CheckCircle,
      XCircle: lucide.XCircle,
      HelpCircle: lucide.HelpCircle,
      Loader: lucide.Loader,
      Spinner: lucide.Loader2,
      RefreshCw: lucide.RefreshCw,
      MoreHorizontal: lucide.MoreHorizontal,
      MoreVertical: lucide.MoreVertical,
      Menu: lucide.Menu,
      Grid: lucide.Grid3X3,
      List: lucide.List,
      Filter: lucide.Filter,
      Sort: lucide.ArrowUpDown,
      Folder: lucide.Folder,
      File: lucide.File,
      Image: lucide.Image,
      Video: lucide.Video,
      Music: lucide.Music,
      PlusIcon: lucide.Plus,
      MinusIcon: lucide.Minus,
      // Note: Excluding 'Table' icon to avoid conflict with shadcn Table component
    }),
    [],
  );

  useEffect(() => {
    if (!componentCode) return;

    console.log("Received component code:", componentCode.substring(0, 100) + "...");

    try {
      // Strip markdown code blocks if present
      const cleanedCode = componentCode
        .replace(/^```(jsx|tsx|javascript|typescript)?\n?/m, '')
        .replace(/\n?```$/m, '')
        .trim();
      
      console.log("Cleaned code:", cleanedCode.substring(0, 100) + "...");

      // Remove all import statements - more aggressive approach
      let componentWithoutImports = cleanedCode;
      
      // Remove individual import lines
      componentWithoutImports = componentWithoutImports.replace(/^import\s+.*?from\s+['"].*?['"];?\s*$/gm, '');
      
      // Remove multi-line imports
      componentWithoutImports = componentWithoutImports.replace(/^import\s*\{[\s\S]*?\}\s*from\s+['"].*?['"];?\s*$/gm, '');
      
      // Remove any remaining import lines
      componentWithoutImports = componentWithoutImports.replace(/^import.*$/gm, '');
      
      // Fix common JSX errors that AI might generate
      componentWithoutImports = componentWithoutImports.replace(/DialogDialogDescription/g, 'DialogDescription');
      componentWithoutImports = componentWithoutImports.replace(/DialogDialogHeader/g, 'DialogHeader');
      componentWithoutImports = componentWithoutImports.replace(/DialogDialogFooter/g, 'DialogFooter');
      componentWithoutImports = componentWithoutImports.replace(/DialogDialogTitle/g, 'DialogTitle');
      componentWithoutImports = componentWithoutImports.replace(/DialogDialogTrigger/g, 'DialogTrigger');
      componentWithoutImports = componentWithoutImports.replace(/DialogDialogContent/g, 'DialogContent');
      
      // Fix chart component placement issues - remove ChartLegend outside ChartContainer
      componentWithoutImports = componentWithoutImports.replace(
        /<\/ChartContainer>\s*[\s\S]*?<ChartLegend[\s\S]*?<\/ChartLegend>/g,
        '</ChartContainer>'
      );
      
      // Fix common chart structure issues
      componentWithoutImports = componentWithoutImports.replace(
        /(<div[^>]*>)\s*<ChartLegend/g,
        '$1<!-- ChartLegend moved inside ChartContainer -->'
      );
      
      // Clean up multiple newlines
      componentWithoutImports = componentWithoutImports.replace(/\n\s*\n\s*\n/g, '\n\n').trim();
      
      console.log("Component without imports:", componentWithoutImports.substring(0, 100) + "...");

      // Simply remove export statements and extract component name
      let finalCode = componentWithoutImports;
      let componentName = 'Component';
      
      // Remove export default and capture component name
      const exportMatch = finalCode.match(/export\s+default\s+(\w+);?\s*$/m);
      if (exportMatch) {
        componentName = exportMatch[1];
        finalCode = finalCode.replace(/export\s+default\s+\w+;?\s*$/m, '').trim();
      }
      
      // Extract component name from function or const declaration if no export
      if (componentName === 'Component') {
        const functionMatch = finalCode.match(/^(?:function|const)\s+(\w+)/);
        if (functionMatch) {
          componentName = functionMatch[1];
        }
      }
      
      // If it's just JSX, wrap it in a function
      if (!finalCode.match(/^(function|const)\s+\w+/)) {
        finalCode = `function ${componentName}() { return (${finalCode}) }`;
      }

      console.log("Final code to transform:", finalCode.substring(0, 100) + "...");
      console.log("Component name:", componentName);

      const transformedCode = Babel.transform(finalCode, {
        presets: ["react", "typescript"],
        filename: "component.tsx",
      }).code;

      console.log("Transformed code:", transformedCode?.substring(0, 100) + "...");

      if (transformedCode) {
        const factory = new Function(
          ...Object.keys(scope),
          `${transformedCode}; return ${componentName};`,
        );
        
        // Create a wrapper component that handles chart errors
        const WrappedComponent = () => {
          try {
            const GeneratedComponent = factory(...Object.values(scope));
            return React.createElement(GeneratedComponent);
          } catch (error) {
            console.error("Chart component error:", error);
            if (error instanceof Error && error.message.includes('useChart must be used within')) {
              return React.createElement('div', 
                { className: 'p-4 text-amber-600 bg-amber-50 border border-amber-200 rounded-md' },
                'Chart component structure issue detected. The component has been partially rendered.'
              );
            }
            throw error; // Re-throw other errors
          }
        };
        
        setComponent(() => WrappedComponent);
      }
    } catch (error) {
      console.error("Failed to render component:", error);
      console.error("Component code that failed:", componentCode);
      setComponent(null);
    }
  }, [componentCode, scope]);

  if (!Component) {
    return (
      <div className="p-4 text-red-500">
        Error rendering component or no component generated yet.
      </div>
    );
  }

  return (
    <div className="p-4 border-t mt-4">
      <Component />
    </div>
  );
};

export default DynamicComponent;
