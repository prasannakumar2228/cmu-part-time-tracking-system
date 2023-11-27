import "./App.css";
import HomePage from "./Components/HomePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./Components/LoginPage";
import SignupPage from "./Components/SignupPage";
import ManagerHomePage from "./Components/ManagerHomePage";
import PostJob from "./Components/postjob";
import StudentHomePage from "./Components/StudentHomePage";
import ApplyJob from "./Components/ApplyJob";
import StudentApplications from "./Components/StudentApplications";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignupPage />} />
        <Route path="/manager-homepage" element={<ManagerHomePage />} />
        <Route path="/post-job" element={<PostJob />} />
        <Route path="/post-job/:id" element={<PostJob />} />
        <Route path="/student-homepage" element={<StudentHomePage />} />
        <Route path="/apply-job" element={<ApplyJob />} />
        <Route path="/apply-job/:id" element={<ApplyJob />} />
        <Route path="/my-applications" element={<StudentApplications />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
