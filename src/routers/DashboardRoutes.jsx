import { Route, Routes } from "react-router-dom";
import { Home } from "../components/home/Home";
// import { Footer } from "../components/home/Footer";
// import { NavBar } from "../components/ui/NavBar";


export const DashboardRoutes = () => {
  return (
    <>
    {/* <NavBar /> */}
      <Routes>
         <Route path="/" element={<Home />} />


         {/* <Route path="/*" element={<Navigate to="/" replace />} /> */}
       </Routes>
      
      {/* <!-- Back to Top --> */}
    
    {/* <Footer /> */}
    </>
  )
}