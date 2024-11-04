import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import AboutUs from './pages/aboutUs';
import HomePage from './pages/homePage';
import Login from './pages/Login';
import ProfilePage from './pages/MyProfile';
import NaturalRemedies from './pages/NaturalRemedies';
import SearchHistory from './pages/SearchHistory';
import Signup from './pages/Signup';
import NavBar from './components/NavBar';
import Remedies from './pages/Remedies';
import RemediesList from './pages/RemediesList'; // Make sure to import RemediesList
import EditProfile from './pages/EditProfile';



function App() {
    const [remedies, setRemedies] = useState([]); // Initialize remedies state

    return (
        <Router>
            <NavBar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/aboutus" element={<AboutUs />} />
                <Route path="/searchhistory" element={<SearchHistory />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/natural-remedies" element={<NaturalRemedies />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/remedies" element={<Remedies setRemedies={setRemedies} />} />
                <Route path="/remedies-list" element={<RemediesList remedies={remedies} />} />
                <Route path="/edit-profile" element={<EditProfile />} />
            </Routes>
        </Router>
    );
}

export default App;
