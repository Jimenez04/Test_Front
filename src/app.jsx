import { Routes, Route } from "react-router-dom";
import NoMatch from "./pages/NotRoute";
import Feature from "./features/index";
import NotRoute from "./pages/NotRoute";
import GetFeature from "./features/get";

function App() {
  return (
    <>
      {/* <NavBar /> */}
      <Routes>
        <Route path="/" element={<Feature />} />
        <Route path="/feature/:id" element={<GetFeature />} />
        <Route path="*" element={<NotRoute />} />
      </Routes>
    </>
  );
}

export default App;
