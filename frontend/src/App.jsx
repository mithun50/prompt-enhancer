import { Route, Routes } from "react-router-dom";

import Landing from "./pages/Landing";
import Enhance from "./pages/Enhance";

function App() {
  return (
    <div className="bg-linear-to-br from-[#BDE8DC] from-0% via-[#317F84] via-13% via-[#317F84] via-[26%] to-[#305A6C] to-80% h-screen w-full">
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/enhance' element={<Enhance />} />
      </Routes>
    </div>
  );
}

export default App;
