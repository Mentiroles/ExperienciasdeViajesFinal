import './App.css'
import Home from './pages/home/Home'
import About from './pages/about/About'
import UserProfile from './pages/userProfile/UserProfile'
import LoginRegister from './pages/LoginRegister/LoginRegister'
import CreateRecommendation from './pages/createRecommendation/CreateRecommendation'
import EditRecommendation from './pages/editRecommendation/EditRecommendation'
import Recommendations from './pages/recommendations/Recommendations'
import RegisterForm from './pages/RegisterForm/RegisterForm'
import { Routes, Route, BrowserRouter } from 'react-router-dom'

function App() {
  return (
    <main className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/userProfile" element={<UserProfile />} />
          <Route path="/loginRegister" element={<LoginRegister />} />
          <Route path="/createRecommendation" element={<CreateRecommendation />} />
          <Route path="/editRecommendation" element={<EditRecommendation />} />
          <Route path="/recommendations" element={<Recommendations />} />
          <Route path="/registerForm" element={<RegisterForm />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;