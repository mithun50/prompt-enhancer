import { Route, Routes } from "react-router-dom";

import Landing from "./pages/Landing";
import Enhance from "./pages/Enhance";

function App() {
  return (
    <div className="bg-gradient-to-br from-[#1a3a3a] via-[#305A6C] to-[#203a43] min-h-screen w-full">
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/enhance' element={<Enhance />} />
      </Routes>
    </div>
  );
}

export default App;
