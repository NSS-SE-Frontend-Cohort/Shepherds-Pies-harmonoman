import { Route, Routes } from "react-router-dom";
import { ApplicationViews } from "./components/views/ApplicationViews";

function App() {
  
    // return (
    //   <div className="font-sans">    
    //     <div className="font-italianno text-6xl text-red-700 bg-gradient-to-r from-green-500 via-white to-red-500 font-bold p-10 text-center shadow-xl rounded-xl border-4 border-white">
    //       Shepherd's Pies 🇮🇹
    //     </div>
    //   </div>
    // );
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