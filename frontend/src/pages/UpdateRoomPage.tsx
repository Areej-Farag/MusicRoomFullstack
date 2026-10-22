import axios from "axios";
import { useCallback, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
export default function UpdateRoomPage() {
    const { id } = useParams()
    const navigate = useNavigate();
    const [updateRoom, setUpdateRoom] = useState({
        guest_can_pause: true,
        votes_to_skip: 2
    })
    const fetchRoomDetails = useCallback(async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8001/api/room/${id}/`, {
                withCredentials: true,
            });
            setUpdateRoom((prev) => ({ ...prev, votes_to_skip: response?.data.votes_to_skip }));
            setUpdateRoom((prev) => ({ ...prev, guest_can_pause: response?.data?.guest_can_pause }));

        } catch (error) {
            console.error("Error fetching room details:", error);
        }
    }
        , [id]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchRoomDetails();
    }, [id, fetchRoomDetails
    ]);
    const handleUpdateRoom = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.patch('http://127.0.0.1:8001/api/room/update/', updateRoom, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true

            });

            navigate(`/room/${response.data.code}`);
        } catch (error) {
            console.error("Error creating room:", error);
        }
    }
    return (
        <div className="w-full h-full flex flex-col items-center justify-center gap-4">
            <h1 className="font-bold text-violet-700 text-4xl text-shadow-lg">Update Your Room</h1>

            <form className="flex flex-col gap-4 lg:w-1/3 p-6 " onSubmit={handleUpdateRoom}>
                <div className="flex items-center justify-start mt-8">
                    <input
                        type="checkbox"
                        id="guest_can_pause"
                        checked={updateRoom.guest_can_pause}
                        onChange={(e) => setUpdateRoom({ ...updateRoom, guest_can_pause: e.target.checked })}
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
                        value={updateRoom.votes_to_skip}
                        onChange={(e) => setUpdateRoom({ ...updateRoom, votes_to_skip: parseInt(e.target.value) || 0 })}
                        className="form-control border border-purple-600 rounded-lg py-1 px-2 focus:outline-none focus:shadow-lg focus:ring-violet-500 duration-300"
                    />
                </div>
                <button
                    className="bg-violet-700 w-40 m-auto hover:bg-violet-800 text-white font-bold py-2 px-4 rounded-lg transition duration-300 cursor-pointer mt-4"
                    type="submit"
                >
                    Update Room
                </button>
            </form>
        </div>
    )
}
