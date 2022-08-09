import React from 'react'
import { Routes, Route } from "react-router-dom";
import { LoginScreen } from '../components/login/LoginScreen';
import { RegisterScreen } from '../components/login/RegisterScreen';


export const AuthRouter = () => {
  return (
    <div className='auth__main'>
        <div className='auth__box-container'>
            <Routes>
                <Route path="login" element={ <LoginScreen /> } />
                <Route path="register" element={ <RegisterScreen /> } />

                {/* <Route path="/auth/*" element={<Navigate to="/auth/login" replace />} /> */}
            </Routes>
        </div>
    </div>
  )
}