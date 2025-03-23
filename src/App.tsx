import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import WeatherDashboard from "./components/WeatherDashboard";

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="app-container py-4">
        <WeatherDashboard />
      </div>
    </QueryClientProvider>
  );
}

export default App;
