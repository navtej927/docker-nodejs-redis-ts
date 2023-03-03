import { HomePage } from "./HomePage";
import { Routes, Route } from "react-router-dom";
import { DetailPage } from "./DetailPage";


function App() {
  return (
    <div className="flex flex-col">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/todo/:id" element={<DetailPage />} />
      </Routes>
    </div>
  );
}

export default App;
