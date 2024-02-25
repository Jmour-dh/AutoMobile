import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Header from './Header/Header'
import Footer from './Footer/Footer'

function App() {
  return (
    <div>
    <Header />
        <Suspense>
          <Outlet />
        </Suspense>
        <Footer /></div>
  )
}

export default App