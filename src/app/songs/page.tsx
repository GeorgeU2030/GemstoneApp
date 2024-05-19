"use client"

import NavBarGeneric from "@/elements/NavBarGeneric";
import React, {useState, useEffect } from "react";
import Cookies from "js-cookie";
import {useRouter} from "next/navigation"
import SongDTO from "@/interfaces/Song";
import {Avatar, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button, Input} from "@nextui-org/react";
import { Icon } from "@/icons/Icon";
import { CirclePlay, Search } from "lucide-react";

export default function Songs(){

    const columns = [
        {
            key:"album",
            label:"Album"
        },
        {
            key: "name",
            label: "Name",
        },
        {
            key: "musicians",
            label: "Musicians",
        },
        {
            key: "gem",
            label: "Gem",
        },
        {
            key:"start_date",
            label:"Start Date",
        },
        {
            key: "end_date",
            label: "End Date",
        },
        {
            key: "week",
            label: "Week",
        },
        {
            key: "release_year",
            label: "Release",
        },
        {
            key: "genre",
            label: "Genre",
        },
        {
            key: "press",
            label: "",
        }
    ];

    const [songs, setSongs] = useState<SongDTO[]>([])
    const router = useRouter()
    const [loaded, setLoaded] = useState<boolean>(false)
    const [search, setSearch] = useState<string>('')

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


    interface SongColumn extends SongDTO {
        press : string
    }

    const renderCell = React.useCallback((user: SongColumn, columnKey: keyof SongColumn) => {

        const cellValue = user[columnKey];

        switch (columnKey) {

            case "album":
                return (
                    <div className={'flex items-center justify-center'}>
                    <Avatar
                      src={user.album}
                      radius='sm'
                    />
                    </div>
                );
            case "name":
                return (
                    <div className="flex flex-col w-56">
                        <span className={'text-center font-semibold'}>{user.name}</span>
                    </div>
                );
            case "gem":
                return (
                    <div className={'flex justify-center'}>
                        {user.gem == 'diamond' ? <Icon src={'/diamond.png'}/> : user.gem == 'ruby' ? <Icon src={'/ruby.png'}/> : user.gem == 'emerald' ? <Icon src={'/emerald.png'}/> : user.gem == 'sapphire' ? <Icon src={'/saphire.png'}/> : <Icon src={'/interrogation.png'}/>}
                    </div>
                )
            case "musicians":
            return (
                <div className="flex justify-center w-56">
                    {user.musicians.map((musician, index) => (
                        <div key={index}>
                            <h1 className="text-center">{musician.name}</h1>
                        </div>
                    )).reduce((prev:any, curr:any, index:any) => {
                        return index === 0 ? [curr] : [...prev, <span key={index}>, </span>, curr];
                    }, [])}
                </div>
            );
            case "start_date":
                return (
                    <div className={'flex justify-center'}>
                        <span>{user.start_date}</span>
                    </div>
                );
            case "end_date":
                return (
                    <div className={'flex justify-center'}>
                        <span>{user.end_date}</span>
                    </div>
                );
            case "week":
                return (
                    <div className={'flex justify-center'}>
                        <span className="text-center">{user.week}</span>
                    </div>
                );
            case "release_year":
                return (
                    <div className={'flex justify-center'}>
                        <span>{user.release_year}</span>
                    </div>
                );
            case "genre":
                return (
                    <div className={'flex justify-center w-24'}>
                        <span className="text-tiny">{user.genre}</span>
                    </div>
                );
            case "press":
                return (
                    <div className={'flex justify-center'}>
                        <Button onClick={() => router.push(`/songs/${user.id}`)} className={'bg-teal-600 text-white rounded-full w-8 h-10'}
                        isIconOnly
                        radius="full"
                        >
                            <CirclePlay  />
                        </Button>
                    </div>
                );
            
            default:
            if (Array.isArray(cellValue)) {
                return (
                    <div>
                        {cellValue.map((item, index) => (
                            <div key={index}>
                                {}
                            </div>
                        ))}
                    </div>
                );
            } else {
                return cellValue;
            }
        }
    }, []);


    return (
        <div className={'min-h-screen bg-emerald-100 flex flex-col'}>
            <NavBarGeneric text={'Your Songs'}/>
            <div className={'flex-grow flex flex-col items-center'}>
            {loaded && (songs.length > 0 ? <section className={'w-full md:w-4/5 mt-3'}>

            <div className="flex justify-end">
                <div className="w-1/3"> 
                    <Input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by name"
                    className="p-2 "
                    endContent={<Search className="text-teal-800"/>}
                    />
                </div>
            </div>
            <div className="overflow-auto max-h-[28rem] mb-2">
            <Table aria-label="Example table with dynamic content"
                selectionMode={'single'}
            >
                <TableHeader columns={columns}>
                    {(column) => (
                        <TableColumn
                            key={column.key}
                            className={'text-center bg-teal-600 text-white'}
                        >
                            {column.label}
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody items={songs.filter(song => song.name.startsWith(search)).map((item) => ({...item})) as SongColumn[]}>
                    {(item: SongColumn) => (
                        <TableRow key={item.id}>
                            {columns.map((column) => (
                                <TableCell key={column.key}>
                                    {renderCell(item, column.key as keyof SongDTO)}
                                </TableCell>
                            ))}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            </div>
            </section> :
                    <section className={'flex-grow flex flex-col items-center justify-center'}>
                        <h1 className={'text-teal-950 text-2xl text-center'}>You do not have songs, you can add
                            a song click in the button ... ⬆️</h1>
                    </section>
            )}
            </div>
        </div>
    )
}