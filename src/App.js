import "./App.css";
import HomePage from "./Components/HomePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./Components/LoginPage";
import SignupPage from "./Components/SignupPage";
import ManagerHomePage from "./Components/ManagerHomePage";
import PostJob from "./Components/postjob";
import StudentHomePage from "./Components/StudentHomePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignupPage />} />
        <Route path="/manager-homepage" element={<ManagerHomePage />} />
        <Route path="/post-job" element={<PostJob />} />
        <Route path="/student-homepage" element={<StudentHomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
