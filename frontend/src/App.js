import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./components/Home/Home"
import Doctorprofile from "./components/Doctorprofile/DoctorProfile"


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/doctors/:id" element={<Doctorprofile />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App