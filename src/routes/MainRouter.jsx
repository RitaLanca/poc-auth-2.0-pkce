import { Routes, Route } from "react-router";
import App from '../App';
import { Profile } from "../pages/Profile";

export const MainRouter =  () => {

  return (
    <Routes>
       <Route path="/" element={<App />} />
       <Route path="/profile" element={<Profile/>}/>
    </Routes>
  )
}