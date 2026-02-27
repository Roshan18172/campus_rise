// import logo from './logo.svg';
import  {useState} from 'react'
// import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SplashScreen from './components/SplashScreen';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Footer from './components/Footer';
import StudentDashboard from './pages/Student/StudentDashboard';
import CollegeDashboard from './pages/College/CollegeDashboard';
import CompanyDashboard from './pages/Company/CompanyDashboard';

function App() {
  const [loading, setLoading] = useState(true);
  return loading ?(
    <SplashScreen onFinish={() => setLoading(false)} />
  ):(
    <div>
      <Router>
      <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/student-dashboard/*" element={<StudentDashboard />} />
          <Route path="/college-dashboard/*" element={<CollegeDashboard />} />
          <Route path="/company-dashboard/*" element={<CompanyDashboard />} />
        </Routes>
      <Footer />
      </Router>
    </div>
  );
}

export default App;
