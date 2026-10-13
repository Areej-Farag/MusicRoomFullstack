
import './App.css'
import CreateRoomPage from './pages/CreateRoomPage'
import HomePage from './pages/HomePage'
import RoomJoinPage from './pages/RoomJoinPage'

import { Routes, Route, BrowserRouter } from 'react-router-dom'
import RoomPage from './pages/RoomPage'
function App() {

  return (
    <main id="main" className="animated-background d-flex flex-column align-items-center justify-content-center">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create-room" element={<CreateRoomPage />} />
          <Route path="/room/:id" element={<RoomPage />} />
          <Route path="/join-room" element={<RoomJoinPage />} />
        </Routes>
      </BrowserRouter>
    </main>
  )
}

export default App
