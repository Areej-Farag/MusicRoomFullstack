import axios from "axios";
import { useState } from "react"
import { useNavigate } from "react-router-dom";
export default function CreateRoomPage() {
    const navigate = useNavigate();
    const [createRoom, setCreateRoom] = useState({
        guest_can_pause: true,
        votes_to_skip: 2
    })

    const handleCreateRoom = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                'http://127.0.0.1:8001/api/room/create/',
                createRoom,
                { withCredentials: true }
            );

            navigate(`/room/${response.data.code}`);
        } catch (error) {
            console.error("Error creating room:", error);
        }
    }
    return (
        <div className="w-full h-full flex flex-col items-center justify-center gap-4">
            <h1 className="font-bold text-violet-700 text-4xl text-shadow-lg">Create Your Room</h1>

            <form className="flex flex-col gap-4 lg:w-1/3 p-6 " onSubmit={handleCreateRoom}>
                <div className="flex items-center justify-start mt-8">
                    <input
                        type="checkbox"
                        id="guest_can_pause"
                        checked={createRoom.guest_can_pause}
                        onChange={(e) => setCreateRoom({ ...createRoom, guest_can_pause: e.target.checked })}
                        className="mx-2 size-4 accent-violet-800 cursor-pointer"
                    />

                    <label
                        htmlFor="guest_can_pause"
                        className="text-purple-700 cursor-pointer"
                    >
                        Guest Can Pause
                    </label>
                </div>
                <div className="flex items-center justify-start mt-4">
                    <label htmlFor="votes_to_skip" className="text-purple-700 mx-2 ">Votes to Skip a Song:</label>
                    <input
                        type="number"
                        id="votes_to_skip"
                        value={createRoom.votes_to_skip}
                        onChange={(e) => setCreateRoom({ ...createRoom, votes_to_skip: parseInt(e.target.value) || 0 })}
                        className="form-control border border-purple-600 rounded-lg py-1 px-2 focus:outline-none focus:shadow-lg focus:ring-violet-500 duration-300"
                    />
                </div>
                <button
                    className="bg-violet-700 w-40 m-auto hover:bg-violet-800 text-white font-bold py-2 px-4 rounded-lg transition duration-300 cursor-pointer mt-4"
                    type="submit"
                >
                    Create Room
                </button>
            </form>
        </div>
    )
}
