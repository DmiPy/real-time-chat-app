import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react'
import AuthPage from './pages/AuthPage'
import ChatPage from './pages/ChatPage';
import ProfilePage from './pages/ProfilePage';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NotFoundPage from './pages/NotFoundPage';
import CreateProfilePage from './pages/CreateProfilePage';

function App() {

  return (
    <>
      <div className="min-h-screen bg-background text-foreground">
        <Router>
          <Routes>
            <Route path="/" element={<AuthPage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="create/profile" element={<CreateProfilePage /> } />
            <Route path="*" element={<NotFoundPage></NotFoundPage>} />
          </Routes>
        </Router>
      </div>
    </>
  )
}

export default App;
