"use client"

import NavBarGeneric from "@/elements/NavBarGeneric";
import {useState, useEffect } from "react";
import Cookies from "js-cookie";
import MusicianDTO from "@/interfaces/Musician";
import {useRouter} from 'next/navigation'

export default function Ranking(){

    const router = useRouter();
    const [musicians, setMusicians] = useState<MusicianDTO[]>([]);
    const [loaded, setLoaded] = useState<boolean>(false);

    useEffect(() => {
        const token = Cookies.get('token');
        if(token) {
            fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/music/ranking`, {
                headers: {
                    'Authorization': `Token ${token}`
                }
            }).then(response => {
                if(!response.ok){
                    Cookies.remove('token')
                    router.push('/login')
                    throw new Error('Failed to fetch')
                }
                return response.json()
            }).then((data:MusicianDTO[])=>{
                setMusicians(data)
            }).finally(()=>{
              setLoaded(true)
            })
        }else{
            router.push('/login')
        }

    },[router]);


    return (
        <div className={'min-h-screen bg-sky-100 flex flex-col'}>
            <NavBarGeneric text={'My Ranking'}/>
            <div className={'flex-grow flex flex-col'}>
                {loaded && ( musicians.length > 0 ? <section className={'bg-blue-600'}>
                        <h1 className={'text-white text-2xl text-center'}></h1>
                    </section> :
                    <section className={'flex-grow flex flex-col items-center justify-center'}>
                        <h1 className={'text-teal-950 text-2xl text-center'}>You do not have musicians, you can add
                            a musician click in the button ... ⬆️</h1>
                    </section>
                )}
            </div>
        </div>
    )
}