import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App(){

  // console.log(import.meta.env.VITE_APP_BACKEND_URI);
  

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header/>
      <div style={{ flex: 1 }}>
        <Outlet/>
      </div>
      <Footer/>
    </div>
  )
}

export default App;