import './App.css';

import CreateRoomPage from './pages/CreateRoomPage';
import HomePage from './pages/HomePage';
import RoomJoinPage from './pages/RoomJoinPage';
import RoomPage from './pages/RoomPage';

import {
  Routes,
  Route,
  BrowserRouter,
  Navigate,
} from 'react-router-dom';

import { useEffect, useState } from 'react';
import axios from 'axios';
import UpdateRoomPage from './pages/UpdateRoomPage';

function App() {
  const [roomCode, setRoomCode] = useState<string | null>(null);
  const [isCheckingRoom, setIsCheckingRoom] = useState(true);

  useEffect(() => {
    const checkUserInRoom = async () => {
      try {
        const response = await axios.get(
          'http://127.0.0.1:8001/api/user-in-room/',
          { withCredentials: true }
        );

        if (response.status === 200) {
          const code = response.data.code;

          console.log('User is in room with code:', code);
          setRoomCode(code || null);
        }
      } catch (error) {
        console.error('Error checking user in room:', error);
      } finally {
        setIsCheckingRoom(false);
      }
    };

    checkUserInRoom();
  }, []);

  if (isCheckingRoom) {
    return <div>Checking room...</div>;
  }

  return (
    <main
      id="main"
      className="animated-background d-flex flex-column align-items-center justify-content-center"
    >
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              roomCode ? (
                <Navigate to={`/room/${roomCode}`} replace />
              ) : (
                <HomePage />
              )
            }
          />

          <Route path="/join-room" element={<RoomJoinPage />} />

          <Route path="/create-room" element={<CreateRoomPage />} />
          <Route path="/update-room/:id" element={<UpdateRoomPage />} />

          <Route path="/room/:id" element={<RoomPage />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;