import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";



export default function RoomJoinPage() {
    const navigate = useNavigate();
    const [roomCode, setRoomCode] = useState('');
    const [errorMessage, setErrorMessage] = useState('');


    const handleJoinRoom = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios(`http://localhost:8000/api/room/join/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true,
                data: {
                    code: roomCode
                }
            });
            if (response.status === 200) {
                navigate(`/room/${roomCode}`);
            }
        }
        catch (error) {
            setErrorMessage(`Failed to join room.  with error: ${error} . Please try again.`);
            console.error("Error joining room:", error);
        }
    }

    return (
        <div className="w-full h-full flex flex-col items-center justify-center gap-4">
            <h1 className="font-bold text-violet-700 text-4xl text-shadow-lg">Join a Room</h1>
            <p className="text-gray-600 text-lg">Enter the room code to join:</p>
            <form className="flex flex-col gap-4 p-6 " onSubmit={handleJoinRoom}>
                <input
                    type="text"
                    placeholder="Room Code"
                    className="border border-gray-300 rounded-md py-2 px-4 focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-violet-500 duration-300"
                    value={roomCode}
                    onChange={(e) => setRoomCode(e.target.value)}
                />

                <div>
                    <button
                        className="bg-violet-700 w-40 m-auto hover:bg-violet-800 text-white font-bold py-2 px-4 rounded-lg transition duration-300 cursor-pointer mt-4"
                        type="submit"
                    >
                        Join Room
                    </button>
                    <button className="bg-gray-500 w-40 m-auto hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 cursor-pointer mt-4 ml-4"
                        onClick={() => navigate('/')}
                    >
                        Back
                    </button>
                </div>
            </form >
            {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>
            }
        </div >

    )
}
