import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function RoomPage() {
    const { id } = useParams<{ id: string }>();
    const [votesToSkip, setVotesToSkip] = useState(2);
    const [guestCanPause, setGuestCanPause] = useState(true);
    const [isHost, setIsHost] = useState(false);

    const fetchRoomDetails = useCallback(async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/room/${id}/`, {
                withCredentials: true
            });
            console.log("Room details fetched:", response.data);
            setVotesToSkip(response.data.votes_to_skip);
            setGuestCanPause(response.data.guest_can_pause);
            setIsHost(response.data.is_host);
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

    return (
        <div className="w-full h-full flex flex-col items-center justify-center gap-4">
            <h1 className="font-bold text-violet-700 text-4xl text-shadow-lg">Welcome to Room: {id}</h1>
            <p>Votes to Skip: {votesToSkip}</p>
            <p>Guest Can Pause: {guestCanPause ? "Yes" : "No"}</p>
            <p>Is Host: {isHost ? "Yes" : "No"}</p>
        </div>
    )
}
