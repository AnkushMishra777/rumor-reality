import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Home from "./pages/Home";
import Investigation from "./pages/Investigation";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/investigate/:symbol"
          element={<Investigation />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;