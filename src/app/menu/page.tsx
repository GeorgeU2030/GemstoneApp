"use client"

import React, {useEffect} from "react";
import {
    Navbar,
    NavbarBrand,
    NavbarMenuToggle,
    NavbarMenuItem,
    NavbarMenu,
    NavbarContent,
    NavbarItem,
    Link,
    Button,
    Image,
    Card,
    CardFooter,
    CardBody,
    Tooltip
} from "@nextui-org/react";
import {BarChart3, LogOut, ArrowLeft, ArrowRight, CirclePlay} from "lucide-react";
import {useRouter} from "next/navigation";
import Cookies from "js-cookie";
import MusicianDTO from "@/interfaces/Musician";
import {Icon} from "@/icons/Icon";
import SongDTO from "@/interfaces/Song";

export default function Menu(){
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(true)
    const [topMusicians, setTopMusicians] = React.useState<MusicianDTO[]>([]);
    const [topMusiciansAwards, setTopMusiciansAwards] = React.useState<MusicianDTO[]>([]);
    const [numberMusician, setNumberMusician] = React.useState(0);
    const [latestSong, setLatestSong] = React.useState<SongDTO | null>(null);

    const router = useRouter()

    const menuItems = {
        "Songs": "/songs",
        "Ranking": "/ranking",
        "Awards": "/awards",
        "History": "/history",
        "Items": "/items",
        "Log Out": "/logout",
    };

    const next = () => {
        setNumberMusician(numberMusician+1)
    }

    const previous = () => {
        setNumberMusician(numberMusician-1)
    }

    const gotoRoute = (route: string) => {
        router.push(`/${route}`)
    }


    useEffect(()=>{
        const token = Cookies.get('token')
        if(token){
            fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/music/top-musicians-points/`, {
                headers: {
                    'Authorization': `Token ${token}`
                }
            }).then(response => {
                if(!response.ok){
                    throw new Error('Failed to fetch')
                }
                return response.json()
            }).then((data:MusicianDTO[])=>{
                setTopMusicians(data)
            })

            fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/music/top-musicians-awards/`, {
                headers: {
                    'Authorization': `Token ${token}`
                }
            }).then(response => {
                if(!response.ok){
                    throw new Error('Failed to fetch')
                }
                return response.json()
            }).then((data:MusicianDTO[])=>{
                setTopMusiciansAwards(data)
            })

            fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/music/latest-song/`, {
                headers: {
                    'Authorization': `Token ${token}`
                }
            }).then(response => {
                if(!response.ok){
                    return;
                }
                return response.json()
            }).then((data:SongDTO)=>{
                setLatestSong(data)
            }).finally(()=>{
                setLoading(false)
            })

        }else {
            Cookies.remove('token')
            router.push('/login')
        }
    },[router])


    const getColor = (index: number) => {
        switch(index){
            case 0:
                return 'text-teal-900'
            case 1:
                return 'text-emerald-800'
            case 2:
                return 'text-cyan-800'
            default:
                return 'bg-red-500'
        }
    }

    const handleLogout = () => {
        Cookies.remove('token')
        router.push('/login')
    }

    return (
        <div className={'flex flex-col min-h-screen bg-sky-200 w-full'}>
            <Navbar
                isBordered
                isMenuOpen={isMenuOpen}
                onMenuOpenChange={setIsMenuOpen}
                className={'bg-gradient-to-tr from-teal-500 to-green-500 py-1'}
            >
                <NavbarContent className="sm:hidden" justify="start">
                    <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"}/>
                </NavbarContent>

                <NavbarContent className="sm:hidden pr-3" justify="center">
                    <NavbarBrand>
                        <Image src={'/gemstone.png'} width={20} height={20} alt={'Gemstone'}/>
                        <p className="font-bold text-inherit text-teal-950 ml-2">Gemstone</p>
                    </NavbarBrand>
                </NavbarContent>

                <NavbarContent className="hidden sm:flex gap-4" justify="center">
                    <NavbarBrand>
                        <Image src={'/gemstone.png'} width={20} height={20} alt={'Gemstone'}/>
                        <p className="font-bold text-inherit text-teal-950 ml-2">Gemstone</p>
                    </NavbarBrand>
                    <NavbarItem isActive>
                        <Link onClick={()=>gotoRoute('songs')} aria-current={'page'} className={'text-white cursor-pointer'}>
                            Songs
                        </Link>
                    </NavbarItem>
                    <NavbarItem isActive>
                        <Link onClick={()=>gotoRoute('ranking')} aria-current="page" className={'text-white cursor-pointer'}>
                            Ranking
                        </Link>
                    </NavbarItem>
                    <NavbarItem isActive>
                        <Link href="#" aria-current={'page'} className={'text-white'}>
                            Awards
                        </Link>
                    </NavbarItem>
                </NavbarContent>

                <NavbarContent justify="end">
                    <NavbarItem>
                        <Button as={Link} variant="flat" className={'bg-sky-600 text-white font-semibold px-3'}
                                isIconOnly
                        >
                            <BarChart3 size={20}/>
                        </Button>
                    </NavbarItem>
                    <NavbarItem className="hidden lg:flex">
                        <Button as={Link}  variant="flat" className={'bg-sky-600 text-white font-semibold px-3'}
                                radius={"full"}
                        >
                            History
                        </Button>
                    </NavbarItem>
                    <NavbarItem className={'hidden lg:flex'}>
                        <Button as={Link} variant="flat" className={'bg-sky-600 text-white font-semibold px-3'}
                                radius={"full"}
                        >
                            Items
                        </Button>
                    </NavbarItem>
                    <NavbarItem className={'hidden lg:flex'}>
                        <Button as={Link}  variant="flat"
                                className={'bg-teal-900 text-white font-semibold px-3'}
                                isIconOnly
                                onClick={handleLogout}
                        >
                            <LogOut size={20}/>
                        </Button>
                    </NavbarItem>
                </NavbarContent>

                <NavbarMenu>
                    {Object.entries(menuItems).map(([item, path], index) => (
                        <NavbarMenuItem key={`${item}-${index}`}>
                            <Link
                                className={`w-full font-semibold ${index === Object.keys(menuItems).length - 1 ? 'text-red-500' : 'text-teal-900'}`}
                                onClick={path === '/logout' ? handleLogout : () => router.push(path)}
                                size="lg"
                            >
                                {item}
                            </Link>
                        </NavbarMenuItem>
                    ))}
                </NavbarMenu>
            </Navbar>

            <div className={'flex flex-col md:flex-row w-full flex-grow h-full '}>
                {loading ? null : (
                
                topMusicians && topMusicians.length > 0 && topMusiciansAwards.length > 0 ? (
                    <>
                <section className={'w-full md:w-1/2 mb-4 mt-4 md:mt-0 md:mb-0 flex justify-center items-center'}>
                    <div className={'w-5/6 lg:w-1/2'}>
                        <h1 className={'text-center mb-2 text-teal-800 font-semibold text-xl'}>Your Top 3 Artist</h1>
                        <Card className="py-4 bg-slate-200">
                            <CardBody className="overflow-visible py-2 flex justify-center items-center ">
                                <Image
                                    isZoomed
                                    alt="Card background"
                                    className="object-cover rounded-xl h-72 w-72"
                                    src={topMusicians[numberMusician]?.photo}
                                />
                            </CardBody>
                            <CardFooter className="pb-0 pt-2 px-4 flex-col items-center">
                                <h4 className={`font-bold text-large ${getColor(numberMusician)}`}>{numberMusician+1}. {topMusicians[numberMusician]?.name}</h4>
                            </CardFooter>
                        </Card>

                        <div className={'flex justify-center mt-4'}>
                            {numberMusician > 0 ? <Button onClick={previous} className={'bg-teal-700 text-white '} isIconOnly><ArrowLeft /></Button>: null}
                            {numberMusician < 2 ? <Button onClick={next} className={'bg-teal-700 text-white ml-2'} isIconOnly><ArrowRight /></Button> : null}
                        </div>
                    </div>
                </section>
                <section className={'w-full md:w-1/2 mt-6 md:mt-0 flex flex-col justify-center '}>
                        {latestSong ? <div className={'flex flex-col items-center mb-3'}>
                            <div className='text-center mt-2 font-init text-xl text-teal-800 font-semibold mb-2'>
                                Last Song
                            </div>
                            
                            <div className="w-3/4 bg-gradient-to-tr from-teal-500 to-green-500 flex mb-3 rounded-lg">
                                <div className={'flex justify-center items-center mt-2 mb-2'}>
                                    <Image src={latestSong?.album} alt="Image Song" className={'rounded-lg border w-20 h-20 ml-2 object-cover'}/>
                                </div>
                                <div className="flex flex-col w-3/4">
                                    <h1 className='mt-5 ml-3 text-2xl text-white font-init font-semibold'>{latestSong.name}</h1>
                                    <label className='mt-2 ml-3 font-init font-normal overflow-hidden line-clamp-2'>
                                    {latestSong.musicians && latestSong.musicians.map((musician, index) => (
                                    <span key={index}>
                                    {musician.name}
                                    {index < latestSong.musicians.length - 1 ? ', ' : ''} 
                                    </span>
                                    ))}
                                    </label>
                                </div>
                                <div className="flex items-center mr-2">
                                    <Button isIconOnly color="primary"
                                    onClick={()=>{router.push(`/songs/${latestSong.id}`)}}
                                    >
                                        <CirclePlay />
                                    </Button>
                                </div>
                            </div>

                        </div> : <div className={'flex md:w-full justify-center mb-8'}>
                            <div className={'w-4/5'}>
                            <h1 className={'text-center text-teal-800 mb-6 font-semibold'}>You do not have Song, start adding one in Songs </h1>
                            </div>
                            </div>
                        }

                        <div className={'flex flex-col justify-center mb-6 md:mb-6'}>
                            <h1 className={'text-center mb-2 font-semibold text-teal-900'}>Musicians with Most Awards</h1>
                            <div className={'flex flex-row justify-center'}>
                                <Image
                                    isZoomed
                                    src={topMusiciansAwards.length > 0 ? topMusiciansAwards[0]?.photo : '/gemstone.png'}
                                    alt="Image awards" className='rounded-lg border w-36 h-36 ml-2 object-cover'/>
                                <Image
                                    isZoomed
                                    src={topMusiciansAwards.length > 1 ? topMusiciansAwards[1]?.photo : '/gemstone.png'}
                                    alt="Image awards" className='rounded-lg border w-36 h-36 ml-2 object-cover'/>
                                <Image
                                    isZoomed
                                    src={topMusiciansAwards.length > 2 ? topMusiciansAwards[2]?.photo : '/gemstone.png'}
                                    alt="Image awards"
                                    className='rounded-lg border w-36 h-36 ml-2 mr-2 object-cover'/>
                            </div>
                            <div className={'flex flex-row justify-center mt-4'}>
                                <Tooltip content={topMusiciansAwards[0]?.name}>
                                    <Button disabled className={'bg-emerald-100 w-36 border-2 border-sky-700 text-tiny'}><Icon src={'/grammy.png'}/><span className={'text-lg'}>{topMusiciansAwards[0]?.award_count}</span>Awards</Button>
                                </Tooltip>
                                <Tooltip content={topMusiciansAwards[1]?.name}>
                                    <Button disabled className={'bg-emerald-100 w-36 ml-2 border-2 border-sky-700 text-tiny'}><Icon src={'/grammy.png'}/><span className={'text-lg'}>{topMusiciansAwards[1]?.award_count}</span> Awards</Button>
                                </Tooltip>
                                <Tooltip content={topMusiciansAwards[2]?.name}>
                                    <Button disabled className={'bg-emerald-100 w-36 ml-2 border-2 border-sky-700 text-tiny'}><Icon src={'/grammy.png'}/><span className={'text-lg'}>{topMusiciansAwards[2]?.award_count}</span> Awards</Button>
                                </Tooltip>
                            </div>
                        </div>
                </section>
                </>) :
                    <div className={'flex flex-grow items-center justify-center '}>
                        <h1 className={'w-4/5 text-center text-teal-900'}>Welcome to Gemstone , start creating your three favorite Musicians, this App works adding your favorite Song for Week with your respect musician , Enjoy it! &#128512;</h1>
                    </div>
                )}
            </div>
        </div>
    );
}