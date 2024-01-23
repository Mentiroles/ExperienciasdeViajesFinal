import './App.css'
import Home from './pages/home/Home'
import About from './pages/about/About'
import UserProfile from './pages/userProfile/UserProfile'
import Login from './pages/Login/Login'
import CreateRecommendation from './pages/createRecommendation/CreateRecommendation'
import EditRecommendation from './pages/editRecommendation/EditRecommendation'
import Recommendations from './pages/recommendations/Recommendations'
import Register from './pages/Register/Register'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';
import Navbarx from './components/NavBar/Navbarx';


function App() {
  return (
    <main className="App">
    <Navbarx /> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/user" element={<UserProfile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/createRecommendation" element={<CreateRecommendation />} />
        <Route path="/editRecommendation" element={<EditRecommendation />} />
        <Route path="/recommendations" element={<Recommendations />} />
        <Route path="/register" element={<Register />} />
        </Routes>
    </main>
    
    
  );
}

export default App;