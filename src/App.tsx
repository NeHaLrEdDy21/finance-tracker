import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import Index from "./pages/Index";
import Budgets from "./pages/Budgets";
import Analysis from "./pages/Analysis";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-background">
            <Navbar />
            <main className="container mx-auto py-4">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/budgets" element={<Budgets />} />
                <Route path="/analysis" element={<Analysis />} />
              </Routes>
            </main>
          </div>
          <Toaster />
          <Sonner />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
