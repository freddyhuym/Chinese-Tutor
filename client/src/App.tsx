import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import Philosophy from "@/pages/philosophy";
import Chapter1 from "@/pages/chapter1";
import Chapter2 from "@/pages/chapter2";
import Chapter3 from "@/pages/chapter3";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home}/>
      <Route path="/philosophy" component={Philosophy}/>
      <Route path="/chapter1" component={Chapter1}/>
      <Route path="/chapter2" component={Chapter2}/>
      <Route path="/chapter3" component={Chapter3}/>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
