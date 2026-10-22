import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
export default function RoomPage() {
    const { id } = useParams<{ id: string }>();
    const [spotifyAuth, setSpotifyAuth] = useState(false)
    const [votesToSkip, setVotesToSkip] = useState(2);
    const [guestCanPause, setGuestCanPause] = useState(true);
    const [isHost, setIsHost] = useState(false);
    const [host, setHost] = useState<string | null>(null);
    const navigate = useNavigate()
    const authenticateSpotify = async () => {
        if (!isHost) return;
        try {
            const res = await axios.get('http://127.0.0.1:8001/spotify/is_auth/', { withCredentials: true });
            setSpotifyAuth(res.data.status);
            if (!res.data.status && !sessionStorage.getItem('spotify_redirected')) {
                sessionStorage.setItem('spotify_redirected', '1');
                const r = await axios.get('http://127.0.0.1:8001/spotify/get-auth-url/', { withCredentials: true });
                window.location.replace(r.data.url);
            }
            if (res.data.status) sessionStorage.removeItem('spotify_redirected');

        } catch (e) {
            console.log(e);
        }
    };

    const fetchRoomDetails = useCallback(async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8001/api/room/${id}/`, {
                withCredentials: true,


            });
            console.log("Room details fetched:", response.data);
            setVotesToSkip(response.data.votes_to_skip);
            setGuestCanPause(response.data.guest_can_pause);
            setIsHost(response.data.is_host);
            setHost(response.data.host);
        } catch (error) {
            console.error("Error fetching room details:", error);
        }
    }
        , [id]);
    useEffect(() => { fetchRoomDetails(); }, [fetchRoomDetails]);
    useEffect(() => { authenticateSpotify(); }, [isHost]);

    const handleLeaveRoom = async () => {
        try {
            const response = await axios.post(`http://127.0.0.1:8001/api/leave-room/`, {
                "room-code": id
            }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true

            });
            console.log(response.data)
            navigate("/")
        } catch (error) {
            console.log("Error Happened :", error)
        }
    }
    const handleSkipSong = () => {

    }
    return (
        <div className="w-full h-full flex flex-col items-center justify-center gap-4">
            <h1 className="font-bold text-violet-700 text-4xl text-shadow-lg">Welcome to Room: {id}</h1>
            <p>Votes to Skip: {votesToSkip}</p>
            <p>Guest Can Pause: {guestCanPause ? "Yes" : "No"}</p>
            {isHost ? <p>You are the host of this room.</p> : <p>Host  : {host}</p>}
            {isHost && (
                <div className="flex flex-col items-center justify-center " >
                    <h2 className="font-bold text-xl text-violet-700 my-3 delay-300">Host Controls  </h2>
                    <div className="flex gap-4">
                        <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 font-bold rounded-2xl delay-300" onClick={() => navigate(`/update-room/${id}`)}>
                            Update Room
                        </button>
                        <button className="bg-violet-500 hover:bg-violet-600 text-white py-2 px-4 font-bold rounded-2xl delay-300" onClick={handleSkipSong}>
                            Skip Song
                        </button>
                    </div>
                </div>
            )}
            <button className="bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded-2xl delay-300" onClick={handleLeaveRoom}>
                Leave Room
            </button>
        </div>
    )
}
