"use client"

import NavBarGeneric from "@/elements/NavBarGeneric";
import MusicianDTO from "@/interfaces/Musician";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Avatar, Button } from "@nextui-org/react";
import { Icon } from "@/icons/Icon";
import { Headphones } from "lucide-react";


export default function Awards(){

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
            key: "country",
            label: "Country",
        },
        {
            key: "awards",
            label: "Awards",
        },
        {
            key: "description",
            label: "",
        }
    ];

    interface MusicianAward extends MusicianDTO {
        position: number;
        description: string;
    }

    const [musicians, setMusicians] = useState<MusicianDTO[]>([])
    const [loaded, setLoaded] = useState<boolean>(false)
    const router = useRouter()

    useEffect(() => {
        const token = Cookies.get('token');
        if(token) {
            fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/music/ranking_awards`, {
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

    const renderCell = React.useCallback((user: MusicianAward, columnKey: keyof MusicianAward, positionnumber?:number) => {

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
            case "country":
                return (
                    <div className={'flex justify-center items-center'}>
                        <Avatar
                          src={user.flag}
                          radius={'sm'}
                        />
                        <h3 className={'text-tiny ml-2'}>{user.country}</h3>
                    </div>
                );
            case "awards":
                return (
                    <div className={'flex justify-center items-center'}>
                        <Icon src='/grammy.png'/>
                        <h3 className={'text-2xl ml-4'}>{user.awards.length}</h3>
                    </div>
                );
            case "description":
                return (
                    <div className={'flex justify-center items-center'}>
                        <Button isIconOnly className="bg-teal-600"
                        onClick={() => router.push(`/musician/${user.id}`)}
                        >
                            <Headphones className="text-white" />
                        </Button>
                    </div>
                );

            default:
                return cellValue;
        }
    }, []);

    return (
        <div className="min-h-screen bg-emerald-100 flex flex-col">
           <NavBarGeneric text={'Your Awards'}/>
                <div className={'flex-grow flex flex-col items-center'}>
                {loaded && ( musicians.length > 0 ? <section className={'w-full md:w-4/5 mt-3'}>

                        <Table aria-label="Example table with dynamic content"
                               selectionMode={'single'}
                        >
                            <TableHeader columns={columns}>
                                {(column) => (
                                    <TableColumn
                                        key={column.key}
                                        style={column.key === 'position' ? { width: '20px' } : column.key == 'description' ? {width:'12px'}:{}}
                                        className={'text-center bg-teal-600 text-white'}
                                    >
                                        {column.label}
                                    </TableColumn>
                                )}
                            </TableHeader>
                            <TableBody items={musicians.map((item, index) => ({...item, position: index + 1})) as MusicianAward[]}>
                                {(item: MusicianAward) => (
                                    <TableRow key={item.id}>
                                        {columns.map((column) => (
                                            <TableCell key={column.key}>
                                                {renderCell(item, column.key as keyof MusicianAward, column.key === 'position' ? item.position : undefined)}
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