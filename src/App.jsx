import { Route, Routes } from "react-router-dom";
import { ApplicationViews } from "./components/views/ApplicationViews";

function App() {

    return (
      <Routes>
        <Route 
          path="*"
          element ={
            <ApplicationViews />
          } />
      </Routes>
    )
}

export default App;