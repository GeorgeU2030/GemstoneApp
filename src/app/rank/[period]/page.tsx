"use client"
import NavBarGeneric from "@/elements/NavBarGeneric";
import React,{useState, useEffect} from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Rank from "@/interfaces/Rank";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Avatar} from "@nextui-org/react";


export default function RankDetails({params}:{params:{period:string}}) {

    const columns = [
        { key: 'position', label: 'Position' },
        { key: 'photo', label: 'Photo' },
        { key: 'musician_name', label: 'Name' },
        { key: 'flag', label: 'Country'},
        { key: 'points', label: 'Points' },
    ]

    const router = useRouter()
    const decodedPeriod = decodeURIComponent(params.period);
    const [ranks, setRanks] = useState<Rank[]>([])
    const [loaded, setLoaded] = useState<boolean>(false)

    const maptoRank = (data: any, index:number): Rank => {
        return {
            id: data.id,
            musician_name: data.musician.name,
            photo: data.musician.photo,
            flag: data.musician.flag,
            points: data.points,
            position: index + 1
        }
    }

    useEffect(() => {
        const token = Cookies.get('token')
        if(token){
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/music/ranking_by_history/${decodedPeriod}`,{
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
                const rankInfo = data.map(maptoRank)
                setRanks(rankInfo)
                
            }).finally(() => {
                setLoaded(true)
            })
        }else{
            router.push('/login')
        }
    }, [])


    const renderCell = React.useCallback((item: Rank, key: keyof Rank) => {
        
        const cellValue = item[key];

        switch(key){
            case 'position':
            return (
                <div className="flex justify-center">
                    <h1 className="text-teal-800 text-xl">{item.position}</h1>
                </div>
            )
            case 'photo':
                return (
                    <div className="flex justify-center">
                        <Avatar src={item.photo} size="lg" />
                    </div>
                )
            case 'musician_name':
                return (
                    <div className="flex justify-center">
                        <h1 className="text-teal-800 text-lg">{item.musician_name}</h1>
                    </div>
                )
            case 'flag':
                return (
                    <div className="flex justify-center">
                        <Avatar src={item.flag} size="lg" radius="sm"/>
                    </div>
                )
            case 'points':
                return (
                    <div className="flex justify-center">
                        <h1 className="font-semibold text-lg">{item.points}</h1>
                    </div>
                )

            default:
                return cellValue
        }

    },[])


    return (
        <div className="min-h-screen bg-emerald-400">
           <NavBarGeneric text={decodedPeriod}/>
           <div className={'flex-grow flex flex-col items-center'}>
                {loaded && ( ranks.length > 0 ? <section className={'w-full md:w-4/5 mt-3'}>
                <div className="overflow-auto max-h-[30rem]">
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
                    <TableBody items={ranks.map((item) => ({...item})) as Rank[]}>
                        {(item: Rank) => (
                            <TableRow key={item.id}>
                                {columns.map((column) => (
                                    <TableCell key={column.key}>
                                        {renderCell(item, column.key as keyof Rank)}
                                    </TableCell>
                                ))}
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
                </div>
                </section> :
                <section className={'flex-grow flex flex-col items-center justify-center'}>
                <h1 className={'text-teal-950 text-2xl text-center'}>You do not have Ranks yet...</h1>
                </section>
                )}
            </div>
        </div>
    )
}