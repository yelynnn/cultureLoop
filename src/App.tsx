import "./App.css";
import Router from "./routes/Router";

function App() {
  return (
    <div className="bg-gray-200 min-h-screen flex justify-center">
      <div className="bg-white w-full max-w-md min-h-screen shadow-lg overflow-y-auto">
        <Router />
      </div>
    </div>
  );
}

export default App;
