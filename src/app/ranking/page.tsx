"use client"

import NavBarGeneric from "@/elements/NavBarGeneric";
import {useState, useEffect } from "react";
import Cookies from "js-cookie";
import MusicianDTO from "@/interfaces/Musician";
import React from "react";
import {useRouter} from 'next/navigation'
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Avatar} from "@nextui-org/react";
import {Icon} from "@/icons/Icon";

export default function Ranking(){

    const columns = [
        {
            key: "position",
            label: "Position",
        },
        {
            key:"photo",
            label:"Photo"
        },
        {
            key: "name",
            label: "Name",
        },
        {
            key: "flag",
            label: "Flag",
        },
        {
            key: "points",
            label: "Points",
        },
        {
            key:"rating",
            label:"Rating",
        },
        {
            key: "gem",
            label: "Gem",
        },
    ];

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


    const renderCell = React.useCallback((user: MusicianWithPosition, columnKey: keyof MusicianWithPosition, positionnumber?:number) => {

        const cellValue = user[columnKey];

        switch (columnKey) {
            case "position":
                return (
                    <div className="flex w-12 text-teal-950 justify-center ">
                        <span className={'text-center text-xl'}>{positionnumber}</span>
                    </div>
                );
            case "photo":
                return (
                    <div className={'flex items-center justify-center'}>
                    <Avatar
                      src={user.photo}
                    />
                    </div>
                );
            case "name":
                return (
                    <div className="flex flex-col">
                        <span className={'text-center font-semibold'}>{user.name}</span>
                    </div>
                );
            case "flag":
                return (
                    <div className={'flex justify-center'}>
                        <Avatar
                          src={user.flag}
                          radius={'sm'}
                        />
                    </div>
                );
            case "points":
                return (
                    <div className={'flex justify-center'}>
                        <span className={'text-xl'}>{user.points}</span>
                    </div>
                )
            case "rating":
                return (
                    <div className={'flex justify-center'}>
                        <span className={'text-xl'}>{user.rating}</span>
                    </div>
                )
            case "gem":
                return (
                    <div className={'flex justify-center'}>
                        {user.rating > 95 ? <Icon src={'/diamond.png'}/> : user.rating > 85 && user.rating <= 95 ? <Icon src={'/ruby.png'}/> : user.rating > 78 && user.rating <=85 ? <Icon src={'/emerald.png'}/> : user.rating >=70 && user.rating < 79 ? <Icon src={'/saphire.png'}/> : <Icon src={'/interrogation.png'}/>}
                    </div>
                )

            default:
                return cellValue;
        }
    }, []);

    interface MusicianWithPosition extends MusicianDTO {
        position: number;
        gem:string;
    }

    return (
        <div className={'min-h-screen bg-sky-100 flex flex-col'}>
            <NavBarGeneric text={'My Ranking'}/>
            <div className={'flex-grow flex flex-col items-center'}>
                {loaded && ( musicians.length > 0 ? <section className={'w-full md:w-4/5 mt-3'}>

                        <Table aria-label="Example table with dynamic content"
                               selectionMode={'single'}
                        >
                            <TableHeader columns={columns}>
                                {(column) => (
                                    <TableColumn
                                        key={column.key}
                                        style={column.key === 'position' ? { width: '20px' } : {}}
                                        className={'text-center bg-teal-600 text-white'}
                                    >
                                        {column.label}
                                    </TableColumn>
                                )}
                            </TableHeader>
                            <TableBody items={musicians.map((item, index) => ({...item, position: index + 1})) as MusicianWithPosition[]}>
                                {(item: MusicianWithPosition) => (
                                    <TableRow key={item.id}>
                                        {columns.map((column) => (
                                            <TableCell key={column.key}>
                                                {renderCell(item, column.key as keyof MusicianWithPosition, column.key === 'position' ? item.position : undefined)}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
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