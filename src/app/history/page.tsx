"use client"

import NavBarGeneric from "@/elements/NavBarGeneric"
import AwardInfo from "@/interfaces/Award"
import React, {useEffect, useState} from "react"
import Cookies from "js-cookie"
import { useRouter } from "next/navigation"
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Avatar, Button} from "@nextui-org/react"
import { BarChart } from "lucide-react"

export default function HistoryPage() {

    const columns = [
        { key: 'type_award', label: '' },
        { key: 'description', label: 'Award' },
        { key: 'year', label: 'Year' },
        { key: 'musician_photo', label: 'Photo'},
        { key: 'musician_name', label: 'Winner' },
    ]

    const [awards, setAwards] = useState<AwardInfo[]>([])
    const [loaded, setLoaded] = useState<boolean>(false)
    const router = useRouter()

    const mapToAwardInfo = (data: any): AwardInfo => {
        return {
            id: data.award.id,
            musician_name: data.musician_name,
            musician_photo: data.musician_photo,
            id_award: data.award.id,
            description: data.award.description,
            year: data.award.year,
            type_award: data.award.type_award,
        };
    }

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

    const getBackgroundColor = (type_award: number, description:string) => {
        if (type_award == 4) {
            return 'bg-[#dfce1e]'
        }
        if (type_award == 3) {
            return 'bg-[#f2e027]'
        }
        if (type_award == 2) {
            if (description == 'January') {
                return 'bg-[#132490]'
            }
            if(description == 'February'){
                return 'bg-[#dd0078]'
            }
            if(description == 'March'){
                return 'bg-[#64b200]'
            }
            if(description == 'April'){
                return 'bg-[#714003]'
            }
            if(description == 'May'){
                return 'bg-[#cb0000]'
            }
            if(description == 'June'){
                return 'bg-[#c7b201]'
            }
            if(description == 'July'){
                return 'bg-[#45009c]'
            }
            if(description == 'August'){
                return 'bg-[#017cc7]'
            }
            if(description == 'September'){
                return 'bg-[#009c82]'
            }
            if(description == 'October'){
                return 'bg-[#e55000]'
            }
            if(description == 'November'){
                return 'bg-[#b83b1c]'
            }
            if(description == 'December'){
                return 'bg-[#0a5d00]'
            }
        }
    }

    const renderCell = React.useCallback((item: AwardInfo, key: keyof AwardInfo) => {

        const cellValue = item[key];

        switch (key) {
            case "musician_photo":
                return (
                    <div className="flex justify-center">
                        <Avatar src={item.musician_photo} size="sm" />
                    </div>
                );
            case "type_award":
                return (
                    <div className={`flex justify-center ${getBackgroundColor(item.type_award, item.description)}`}>
                        {item.type_award == 3 ? <Avatar src='/winner.png'/> : item.type_award == 4 ? <Avatar src='/troph.png'/> : null  }
                        {item.type_award == 2 && item.description == 'January' ? <Avatar src='/awjanuary.png'/>:null}
                        {item.type_award == 2 && item.description == 'February' ? <Avatar src='/awfebruary.png'/>:null}
                        {item.type_award == 2 && item.description == 'March' ? <Avatar src='/awmarch.png'/>:null}
                        {item.type_award == 2 && item.description == 'April' ? <Avatar src='/awapril.png'/>:null}
                        {item.type_award == 2 && item.description == 'May' ? <Avatar src='/awmay.png'/>:null}
                        {item.type_award == 2 && item.description == 'June' ? <Avatar src='/awjune.png'/>:null}
                        {item.type_award == 2 && item.description == 'July' ? <Avatar src='/awjuly.png'/>:null}
                        {item.type_award == 2 && item.description == 'August' ? <Avatar src='/awaugust.png'/>:null}
                        {item.type_award == 2 && item.description == 'September' ? <Avatar src='/awseptember.png'/>:null}
                        {item.type_award == 2 && item.description == 'October' ? <Avatar src='/awoctober.png'/>:null}
                        {item.type_award == 2 && item.description == 'November' ? <Avatar src='/awnovember.png'/>:null}
                        {item.type_award == 2 && item.description == 'December' ? <Avatar src='/awdecember.png'/>:null}
                    </div>
                );

            case "description":
                return (
                    <div className="flex justify-center font-semibold text-teal-800 text-lg">
                        {item.description}
                    </div>
                );
            case "year":
                return (
                    <div className="flex justify-center font-semibold text-teal-800 text-lg">
                        {item.year}
                    </div>
                );
            case "musician_name":
                return (
                    <div className="flex items-center ">
                    <div className="flex justify-center w-5/6">
                        {item.musician_name}
                    </div>
                    {item.type_award == 3 ? 
                    <Button isIconOnly
                    className="ml-4 w-8 h-8 bg-teal-500 text-white"
                    onClick={() => router.push(`/rank/Semester 1 - ${item.year}`)}
                    >
                        <BarChart className="w-6 h-6"/>
                    </Button>
                    :null}

                    {item.type_award == 4 ? 
                    <Button isIconOnly
                    className="ml-4 w-8 h-8 bg-teal-500 text-white"
                    onClick={() => router.push(`/rank/Semester 2 - ${item.year}`)}
                    >
                        <BarChart className="w-6 h-6"/>
                    </Button>
                    :null}

                    {item.type_award == 5 ? 
                    <Button isIconOnly
                    className="ml-4 w-8 h-8 bg-teal-500 text-white"
                    onClick={() => router.push(`/rank/Period - ${item.year-1} - ${item.year}`)}
                    >
                        <BarChart className="w-6 h-6"/>
                    </Button>
                    :null}

                    </div>
                );

            default:
                return cellValue;
        }
       
        

    },[]);

    return(
        <div className="min-h-screen bg-emerald-200 flex flex-col">
            <NavBarGeneric text="History"/>
            <div className={'flex-grow flex flex-col items-center'}>
                {loaded && ( awards.length > 0 ? <section className={'w-full md:w-4/5 mt-3'}>

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
                    <TableBody items={awards.map((item, index) => ({...item, position: index + 1})) as AwardInfo[]}>
                        {(item: AwardInfo) => (
                            <TableRow key={item.id}>
                                {columns.map((column) => (
                                    <TableCell key={column.key}>
                                        {renderCell(item, column.key as keyof AwardInfo)}
                                    </TableCell>
                                ))}
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
                </section> :
                <section className={'flex-grow flex flex-col items-center justify-center'}>
                <h1 className={'text-teal-950 text-2xl text-center'}>You do not have Awards yet...</h1>
                </section>
                )}
            </div>
        </div>
    )
}