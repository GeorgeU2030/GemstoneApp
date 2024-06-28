"use client"
import React,{useState, useEffect} from "react"
import { useRouter } from "next/navigation"
import Cookies from "js-cookie"
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Avatar} from "@nextui-org/react"
import Stats from "@/interfaces/Stats"
import NavBarGeneric from "@/elements/NavBarGeneric"

export default function StatsPage() {

    const [ranks, setRanks] = useState<Stats[]>([])
    const [loaded, setLoaded] = useState<boolean>(false)
    const [maxWeek, setMaxWeek] = useState<number>(0)

    const columns = [
        { key: 'photo', label: 'Photo' },
        { key: 'name', label: 'Name' },
        ...Array.from({ length: 10 }, (_, i) => ({ key: `week_${maxWeek - i}`, label: `Week ${maxWeek - i}` })),
    ]

    const maptoRank = (data: {musiciansData: Stats[], maxWeek: number}): {stats: Stats[], maxWeek: number} => {
        const stats = data.musiciansData.map(musicianData => ({
            id: musicianData.id,
            name: musicianData.name,
            photo: musicianData.photo,
            ranks: musicianData.ranks,
        }));
    
        return { stats, maxWeek: data.maxWeek };
    }

    const router = useRouter()

    useEffect(() => {
        const token = Cookies.get('token')
        if(token){
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/music/history_ranking/`,{
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
                const result = maptoRank(data)
                setRanks(result.stats)
                setMaxWeek(result.maxWeek)
                
            }).finally(() => {
                setLoaded(true)
            })
        }else{
            router.push('/login')
        }
    }, [])

    const renderCell = React.useCallback((item: Stats, key: keyof Stats) => {
        const cellvalue = item[key]
        if (key === 'photo') {
            return (
            <div className="flex justify-center">
                <Avatar src={item.photo} alt={item.name} className={'w-10 h-10 rounded-full'} />
            </div>
        )
        }
        if (key === 'name') {
            return (
                <div className="flex justify-center w-48">
                    <span className="font-semibold text-center">{item.name}</span>
                </div>
            )
        }
        if (key.startsWith('week_')) {
            const week = key.slice(5);
            return (
                <div className="flex justify-center">
                    <span className="font-semibold text-teal-950">{item.ranks[week] || '-'}</span> 
                </div>
            )
        }
        else {
            return null;
        }

    },[])

    return (
        <div className="min-h-screen bg-emerald-400">
            <NavBarGeneric text='My Stats'/>
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
                    <TableBody items={ranks.map((item) => ({...item})) as Stats[]}>
                        {(item: Stats) => (
                            <TableRow key={item.id}>
                                {columns.map((column) => (
                                    <TableCell key={column.key}>
                                        {renderCell(item, column.key as keyof Stats)}
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