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
import PostList from './pages/PostList'; // New post list page
import PostForm from './pages/PostForm'; // New form for creating/editing posts
import PostDetails from './pages/PostDetails'; // New post details page
import AddRemediesForm from './pages/AddRemediesForm';

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
                <Route path="/add-remedies" element={<AddRemediesForm remedies={remedies} />} />

                <Route path="/edit-profile" element={<EditProfile />} />

                {/* Post-related routes */}
                <Route path="/posts" element={<PostList />} /> {/* List of all posts */}
                <Route path="/create" element={<PostForm />} /> {/* Create a new post */}
                <Route path="/update/:id" element={<PostForm />} /> {/* Edit a post */}
                <Route path="/posts/:id" element={<PostDetails />} /> {/* View post details */}
            </Routes>
        </Router>
    );
}

export default App;
