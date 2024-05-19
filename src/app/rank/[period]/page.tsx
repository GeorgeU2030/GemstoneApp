"use client"
import NavBarGeneric from "@/elements/NavBarGeneric";
import React,{useState, useEffect} from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function RankDetails({params}:{params:{period:string}}) {

    const decodedPeriod = decodeURIComponent(params.period);

    useEffect(() => {
        const token = Cookies.get('token')
        if(token){
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/music/get_awards/`,{
            headers: {
                'Authorization': `Token ${token}`
            }
        })
            .then(response => {
                if(!response.ok){
                    Cookies.remove('token')
                    router.push('/login')
                }
                return response.json()
            })
            .then(data => {
                const awardInfo = data.map(mapToAwardInfo)
                setAwards(awardInfo)
                
            }).finally(() => {
                setLoaded(true)
            })
        }else{
            router.push('/login')
        }
    }, [])

    return (
        <div className="min-h-screen bg-emerald-400">
           <NavBarGeneric text={decodedPeriod}/>
        </div>
    )
}