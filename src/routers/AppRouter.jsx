import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import ScrollToTop from "../helpers/ScrollToTop";
import { AuthRouter } from "./AuthRouter";
import { DashboardRoutes } from "./DashboardRoutes";
import { DataRoutes } from "./DataRoutes";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";


export const AppRouter = () => {
  return (
    <BrowserRouter>
      <ScrollToTop>
        <Routes>
    
        <Route path="/*" element={
                  <DashboardRoutes />
              } 
          />
  
          <Route path="/auth/*" element={
                <PublicRoute>
                  <AuthRouter />
                </PublicRoute>
              } 
          />
  
          <Route path="/data/*" element={
                <PrivateRoute>
                  <DataRoutes />
                </PrivateRoute>
              } 
          />
  
        </Routes>
      </ScrollToTop>
    </BrowserRouter>
  )
}