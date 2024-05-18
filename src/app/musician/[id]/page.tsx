"use client";

import SongSimple from '@/interfaces/SongSimple';
import MusicianDTO from '@/interfaces/Musician'
import React, {useState, useEffect} from 'react'
import {useParams, useRouter} from 'next/navigation'
import Cookies from 'js-cookie'
import { Button, Image } from '@nextui-org/react';
import { Icon } from '@/icons/Icon';
import { CirclePlay } from 'lucide-react';
import StatsAward from '@/interfaces/StatsAward';

export default function Musician(){


    const [musician, setMusician] = useState<MusicianDTO>()
    const [songs, setSongs] = useState<SongSimple[]>([])
    const [awards, setAwards] = useState<StatsAward>()

    const {id} = useParams()
    const router = useRouter()

    useEffect(() => {
        const token = Cookies.get('token')
            if(token){
            fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/music/get_musician/${id}`,{
                headers:{
                    'Authorization': `Token ${token}`
                }
            }).then(response => {
                if (!response.ok) {
                    Cookies.remove('token')
                    router.push('/login')
                }
                return response.json()
            }).then((data: MusicianDTO) => {
                setMusician(data)
            })

            fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/music/get_song_musician/${id}`,{
                headers:{
                    'Authorization': `Token ${token}`
                }
            }).then(response => {
                if (!response.ok) {
                    Cookies.remove('token')
                    router.push('/login')
                }
                return response.json()
            }).then((data: SongSimple[]) => {
                setSongs(data)
            })

            fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/music/get_awards_musician/${id}`,{
                headers:{
                    'Authorization': `Token ${token}`
                }
            }).then(response => {
                if (!response.ok) {
                    Cookies.remove('token')
                    router.push('/login')
                }
                return response.json()
            }).then((data: StatsAward) => {
                setAwards(data)
            })


        }else {
            router.push('/login')
        }
    }, [])

    const getBackgroundColor = (rating: number) => {
        if (rating > 95) {
            return 'bg-gradient-to-tr from-sky-600 to-blue-900';
        } else if (rating > 85 && rating <= 95) {
            return 'bg-gradient-to-tr from-rose-800 to-red-800';
        } else if (rating > 78 && rating <= 85) {
            return 'bg-gradient-to-tr from-emerald-600 to-green-800';
        } else if (rating < 79) {
            return 'bg-gradient-to-tr from-purple-700 to-violet-900';
        }
        return '';
    };

    const getTextColor = (rating: number) => {
        if (rating > 95) {
            return 'text-blue-900';
        } else if (rating > 85 && rating <= 95) {
            return 'text-red-800';
        } else if (rating > 78 && rating <= 85) {
            return 'text-green-800';
        } else if (rating < 79) {
            return 'text-violet-900';
        }
        return '';
    };

    return (
        <div className={`flex min-h-screen ${musician ? getBackgroundColor(musician.rating): ''}`}>
            <div className='flex flex-col flex-grow'>
            <h1 className='text-center text-white text-2xl mt-4'>{musician?.name}</h1>
            <div className='flex flex-col md:flex-row mt-4'>
                <section className='w-full md:w-1/2 flex flex-col items-center justify-center'>
                    <Image src={musician?.photo} isZoomed radius='lg' className='w-56 h-56'/>
                    <div className='flex mt-4 items-center'>
                        <Image src={musician?.flag} radius='lg' className='w-12 h-12' />
                        <h3 className='ml-2 text-white'>{musician?.country}</h3>
                    </div>
                    <div className='cursor-default flex flex-col items-center bg-slate-300 py-2 mt-4 w-5/6 md:w-1/3 rounded-lg'>

                        <h2 className={`font-semibold text-center text-2xl ${musician ? getTextColor(musician.rating):''}`}>
                            # {musician?.current_position} <span className="text-base">in your Ranking</span>
                        </h2>
                        <h2 className={`${musician ? getTextColor(musician.rating): ''} font-semibold text-center text-2xl`}>
                        {musician?.points} <span className="text-base">Points</span>
                        </h2>
                        <div className='flex'>
                            <h3 className={`${musician ? getTextColor(musician.rating): ''} text-center text-base`}>
                            <span className="text-sm">with Rating</span> {musician?.rating} 
                            </h3>
                        </div>
                        <div className='mt-2 flex'>
                            <h2 className={`${musician ? getTextColor(musician.rating):''} font-semibold mr-2`}>Gem: </h2>
                            {musician ? musician?.rating > 95 ? <Icon src={'/diamond.png'}/> : musician.rating > 85 && musician.rating <= 95 ? <Icon src={'/ruby.png'}/> : musician.rating > 78 && musician.rating <=85 ? <Icon src={'/emerald.png'}/> : musician.rating >=70 && musician.rating < 79 ? <Icon src={'/saphire.png'}/> : <Icon src={'/interrogation.png'}/>: null}
                        </div>
                        <h2 className={`${musician ? getTextColor(musician.rating) : ''} font-semibold mt-2`}>Highest Rank: # {musician?.best_position}</h2>
                        <h2 className={`${musician ? getTextColor(musician.rating) : ''} font-semibold mt-1 text-tiny`}>Best Week</h2>
                        <h2 className={`${musician ? getTextColor(musician.rating) : ''} font-semibold mt-1 text-tiny`}>{musician?.start_date_best_position} - {musician?.end_date_best_position}</h2>
                    </div>
                </section>
                <section className='w-full mt-6 md:mt-0 md:w-1/4 bg-slate-300 rounded-lg flex flex-col items-center mr-4'>
                    <div className='flex flex-col'>
                        <h1 className={`text-center mt-2 ${musician ? getTextColor(musician.rating): ''} font-semibold`}>Songs</h1>
                    </div>
                    <div className='overflow-y-auto flex-grow w-5/6'>
                    <table className='bg-gray-100 w-full mt-5'>
                    <thead>
                        <tr>
                        <th></th>
                        <th></th>
                        <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {songs.map((song) => (
                        <tr key={song.id} className='h-12 border-2 border-slate-300 cursor-default'>
                            <td className='bg-gray-200 w-12 '>
                            <img
                                src={song.album}
                                alt="Musician Photo"
                                className="w-10 h-10 rounded-md ml-1 "
                            />
                            </td>
                            <td className='text-center'>{song.name}</td>
                            <td className='w-8'>
                                <Button isIconOnly className={`${musician ? getBackgroundColor(musician.rating):''} text-white`}
                                onClick={() => router.push(`/songs/${song.id}`)}
                                >
                                <CirclePlay/>    
                                </Button>
                            </td>
                        </tr>
                        ))}
                        </tbody>
  
                    </table>
                    </div>
                </section>
                <section className='w-full mt-6 md:w-1/4 md:mt-0 bg-slate-300 rounded-lg flex flex-col items-center md:mr-4'>
                    <div className='flex flex-col'>
                        <h1 className={`text-center mt-2 ${musician ? getTextColor(musician.rating): ''} font-semibold`}>Awards</h1>
                    </div> 

                    <div className='overflow-y-auto flex-grow w-5/6'>
                    <table className='bg-gray-100 w-full mt-5'>
                        <thead>
                            <tr>
                            <th className='w-12'></th>
                            <th className='w-2/3'></th>
                            <th></th>
                            </tr>
                        </thead>
                       
                        <tbody>
                            {awards && awards?.year > 0 ?(
                                <tr className='rounded-lg bg-amber-200'>
                                    <td>
                                        <Image src='/troph.png' className='h-12'/>
                                    </td>
                                    <td className='text-center'>
                                        Songs Awards
                                    </td>
                                    <td className='text-center font-semibold text-xl'>
                                        {awards.year}
                                    </td>
                                </tr>
                            ):null}

                            {awards && awards?.sixmonth > 0 ?(
                                <tr className='rounded-lg bg-yellow-200'>
                                    <td>
                                        <Image src='/winner.png' className='h-12'/>
                                    </td>
                                    <td className='text-center'>
                                        Songs Awards
                                    </td>
                                    <td className='text-center font-semibold text-xl'>
                                        {awards.sixmonth}
                                    </td>
                                </tr>
                            ):null}

                            {awards && awards?.week > 0 ?(
                                <tr className='rounded-lg bg-yellow-100'>
                                    <td>
                                        <Image src='/trophy.png' className='h-12'/>
                                    </td>
                                    <td className='text-center'>
                                        Songs Awards
                                    </td>
                                    <td className='text-center font-semibold text-xl'>
                                        {awards.week}
                                    </td>
                                </tr>
                            ):null}

                            {awards && awards?.january > 0 ?(
                                <tr className='rounded-lg bg-indigo-300'>
                                    <td>
                                        <Image src='/awjanuary.png' className='h-12'/>
                                    </td>
                                    <td className='text-center'>
                                        January Awards
                                    </td>
                                    <td className='text-center font-semibold text-xl'>
                                        {awards.january}
                                    </td>
                                </tr>
                            ):null}

                            {awards && awards?.february > 0 ?(
                                <tr className='rounded-lg bg-pink-300'>
                                    <td>
                                        <Image src='/awfebruary.png' className='h-12'/>
                                    </td>
                                    <td className='text-center'>
                                        February Awards
                                    </td>
                                    <td className='text-center font-semibold text-xl'>
                                        {awards.february}
                                    </td>
                                </tr>
                            ):null}


                            {awards && awards?.march > 0 ?(
                                <tr className='rounded-lg bg-lime-200'>
                                    <td>
                                        <Image src='/awmarch.png' className='h-12'/>
                                    </td>
                                    <td className='text-center'>
                                        March Awards
                                    </td>
                                    <td className='text-center font-semibold text-xl'>
                                        {awards.march}
                                    </td>
                                </tr>
                            ):null}


                            {awards && awards?.april > 0 ?(
                                <tr className='rounded-lg bg-[#bf8b80]'>
                                    <td>
                                        <Image src='/awapril.png' className='h-12'/>
                                    </td>
                                    <td className='text-center'>
                                        April Awards
                                    </td>
                                    <td className='text-center font-semibold text-xl'>
                                        {awards.april}
                                    </td>
                                </tr>
                            ):null}

                            {awards && awards?.may > 0 ?(
                                <tr className='rounded-lg bg-[#e66464]'>
                                    <td>
                                        <Image src='/awmay.png' className='h-12'/>
                                    </td>
                                    <td className='text-center'>
                                        May Awards
                                    </td>
                                    <td className='text-center font-semibold text-xl'>
                                        {awards.may}
                                    </td>
                                </tr>
                            ):null}

                            {awards && awards?.june > 0 ?(
                                <tr className='rounded-lg bg-[#f7df98]'>
                                    <td>
                                        <Image src='/awjune.png' className='h-12'/>
                                    </td>
                                    <td className='text-center'>
                                        June Awards
                                    </td>
                                    <td className='text-center font-semibold text-xl'>
                                        {awards.june}
                                    </td>
                                </tr>
                            ):null}

                            {awards && awards?.july > 0 ?(
                                <tr className='rounded-lg bg-purple-300'>
                                    <td>
                                        <Image src='/awjuly.png' className='h-12'/>
                                    </td>
                                    <td className='text-center'>
                                        July Awards
                                    </td>
                                    <td className='text-center font-semibold text-xl'>
                                        {awards.july}
                                    </td>
                                </tr>
                            ):null}

                            {awards && awards?.august > 0 ?(
                                <tr className='rounded-lg bg-sky-200'>
                                    <td>
                                        <Image src='/awaugust.png' className='h-12'/>
                                    </td>
                                    <td className='text-center'>
                                        August Awards
                                    </td>
                                    <td className='text-center font-semibold text-xl'>
                                        {awards.august}
                                    </td>
                                </tr>
                            ):null}


                            {awards && awards?.september > 0 ?(
                                <tr className='rounded-lg bg-teal-200'>
                                    <td>
                                        <Image src='/awseptember.png' className='h-12'/>
                                    </td>
                                    <td className='text-center'>
                                        September Awards
                                    </td>
                                    <td className='text-center font-semibold text-xl'>
                                        {awards.september}
                                    </td>
                                </tr>
                            ):null}


                            {awards && awards?.october > 0 ?(
                                <tr className='rounded-lg bg-orange-200'>
                                    <td>
                                        <Image src='/awoctober.png' className='h-12'/>
                                    </td>
                                    <td className='text-center'>
                                        October Awards
                                    </td>
                                    <td className='text-center font-semibold text-xl'>
                                        {awards.october}
                                    </td>
                                </tr>
                            ):null}


                            {awards && awards?.november > 0 ?(
                                <tr className='rounded-lg bg-[#d9a69f]'>
                                    <td>
                                        <Image src='/awnovember.png' className='h-12'/>
                                    </td>
                                    <td className='text-center'>
                                        November Awards
                                    </td>
                                    <td className='text-center font-semibold text-xl'>
                                        {awards.november}
                                    </td>
                                </tr>
                            ):null}

                            {awards && awards?.december > 0 ?(
                                <tr className='rounded-lg bg-green-200'>
                                    <td>
                                        <Image src='/awdecember.png' className='h-12'/>
                                    </td>
                                    <td className='text-center'>
                                        December Awards
                                    </td>
                                    <td className='text-center font-semibold text-xl'>
                                        {awards.december}
                                    </td>
                                </tr>
                            ):null}
                        </tbody>
                    </table>
                    </div>       
                </section>
            </div>
            </div>
        </div>
    )
}