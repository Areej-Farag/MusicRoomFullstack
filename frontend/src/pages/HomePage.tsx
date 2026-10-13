import { Link } from "react-router-dom";

export default function HomePage() {

    return (
        <div className="w-full h-full flex flex-col items-center justify-center gap-4">


            <h1 className="text-4xl font-bold text-purple-800">
                Welcome to the Home Page!
            </h1>

            <div className="flex gap-4">
                <Link to="/create-room">
                    <button className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded duration-300 cursor-pointer">
                        Create Room
                    </button>
                </Link>

                <Link to="/join-room">
                    <button className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded ml-4 duration-300 cursor-pointer">
                        Join Room
                    </button>
                </Link>
            </div>
        </div>
    )
}
