"use client"

import NavBarGeneric from "@/elements/NavBarGeneric";
import React, {useState, useEffect } from "react";
import Cookies from "js-cookie";
import {useRouter} from "next/navigation"
import SongDTO from "@/interfaces/Song";


export default function Songs(){

    const [songs, setSongs] = useState<SongDTO[]>([])
    const router = useRouter()
    const [loaded, setLoaded] = useState<boolean>(false)

    useEffect(()=>{
        const token = Cookies.get('token')
        if(token){
            fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/music/all_songs`,{
                headers:{
                    'Authorization': `Token ${token}`
                }
            }).then(response=>{
                if(!response.ok){
                    Cookies.remove('token')
                    router.push('/login')
                    throw new Error('Failed to fetch')
                }
                return response.json()
            }).then((data:SongDTO[])=>{
                setSongs(data)
            }).finally(()=>{
                setLoaded(true)
            })
        }else{
            router.push('/login')
        }

    },[router])


    return (
        <div className={'min-h-screen bg-emerald-100 flex flex-col'}>
            <NavBarGeneric text={'Your Songs'}/>
            {loaded && (songs.length > 0 ? <></> :
                    <section className={'flex-grow flex flex-col items-center justify-center'}>
                        <h1 className={'text-teal-950 text-2xl text-center'}>You do not have songs, you can add
                            a song click in the button ... ⬆️</h1>
                    </section>
            )}
        </div>
    )
}