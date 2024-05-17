"use client";
import SongDTO from "@/interfaces/Song";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import YouTube from "react-youtube";
import {Spinner} from "@nextui-org/react";

export default function Page() {

    const opts = { 
        height: "390", 
        width: "640", 
        playerVars: { 
          autoplay: 1, 
        }, 
    }; 

    const [song, setSong] = useState<SongDTO>()
    const { id } = useParams()
    const router = useRouter()

    useEffect(() => {
        const token = Cookies.get('token')
            if(token){
            fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/music/song/${id}`,{
                headers:{
                    'Authorization': `Token ${token}`
                }
            }).then(response => {
                if (!response.ok) {
                    Cookies.remove('token')
                    router.push('/login')
                }
                return response.json()
            }).then((data: SongDTO) => {
                setSong(data)
            })
        }else {
            router.push('/login')
        }
    }, [])

    const onReady = (event:any) => {
        event.target.pauseVideo()
    }

    return <div className="min-h-screen bg-gradient-to-tr from-teal-600 to-black flex flex-col items-center justify-center">
            <div>
                {song ? (
                    <>
                    <div className="bg-emerald-200 rounded-lg">
                        <h1 className="text-center text-teal-900 text-3xl font-semibold px-2 py-2">{song?.name}</h1>
                        <h4 className="text-center text-teal-900">{song?.release_year}</h4>
                    </div>
                    
                    <YouTube videoId={song?.youtube} opts={opts} onReady={onReady} />
                    </>
                ) : (<div className="text-teal-900">
                    <Spinner/>
                    </div>)}
            </div>
    </div>
}