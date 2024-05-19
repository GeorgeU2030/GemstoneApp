"use client"
import { NoOptionsMessageCp, customOption } from '@/elements/Customitem'
import MusicianDTO from '@/interfaces/Musician'
import Select from 'react-select'
import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { Image } from '@nextui-org/react'
import { toast } from 'react-hot-toast'


export default function Items(){

    const router = useRouter()
    const [musicians, setMusicians] = useState<MusicianDTO[]>([])
    const [selectedMusicians, setSelectedMusicians] = useState<any[]>([])
    const [filteredMusicians, setFilteredMusicians] = useState<MusicianDTO[]>([])

    useEffect(() => {
        const token = Cookies.get('token');
        if (!token) {
            router.push('/login');
        } else {
            const fetchData = async () => {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/music/all_musicians/`, {
                    headers: {
                        'Authorization': `Token ${token}`
                    }
                });
                const data = await response.json();
                setMusicians(data);
            };
            fetchData().catch(error=>{
                console.log(error)
            })
    }},[])

    const handleAddPoints = async (classification: string) => {
        const musiciansIds = selectedMusicians.map((musician) => musician.id); 

        if (musiciansIds.length === 0) {
            toast.error('Please select at least one musician');
            return;
        }
        const token = Cookies.get('token');

        await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/music/add_points_to_musicians/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },
            body: JSON.stringify({
                musicianIds: musiciansIds,
                pointsToAdd: 50,
                classification: classification,
            }),
        });

        toast.success('You has been added points and award succesfull', {
            duration: 1000,
        });

        router.push('/menu')
        
    }


    const handleAddTroph = async (points:number,classification: string, semester_id:number) => {
        const musiciansIds = selectedMusicians.map((musician) => musician.id); 

        if (musiciansIds.length === 0) {
            toast.error('Please select at least one musician');
            return;
        }
        const token = Cookies.get('token');

        await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/music/add_points_trophy/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },
            body: JSON.stringify({
                musicianIds: musiciansIds,
                pointsToAdd: points,
                classification: classification,
                semesterId: semester_id
            }),
        });

        toast.success('You has been added points and award succesfull', {
            duration: 1000,
        });

        router.push('/menu')
        
    }



    const handleAddWeek = async (points:number) => {
        const musiciansIds = selectedMusicians.map((musician) => musician.id); 

        if (musiciansIds.length === 0) {
            toast.error('Please select at least one musician');
            return;
        }
        const token = Cookies.get('token');

        await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/music/add_points_week/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },
            body: JSON.stringify({
                musicianIds: musiciansIds,
                pointsToAdd: points,
            }),
        });

        toast.success('You has been added points and award succesfull', {
            duration: 1000,
        });

        router.push('/menu')
        
    }


    const handleSearchChange = (searchValue: string) => {
        const lowerCaseSearchValue = searchValue.toLowerCase();
    
        const newFilteredMusicians = musicians.filter(musician =>
            musician.name.toLowerCase().startsWith(lowerCaseSearchValue)
        );
    
        setFilteredMusicians(newFilteredMusicians);
    };


    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-tr from-teal-500 to-green-500">
            <h1 className="text-center mb-4 font-semibold text-2xl text-teal-950 mt-6">Items Page</h1>
            <div className="w-5/6 md:w-2/3 bg-slate-300 flex flex-col items-center mb-8">
                <h1 className="text-teal-900 font-semibold mt-4">Musicians</h1>
                <Select
                    isMulti
                    options={filteredMusicians.map((musician:MusicianDTO) => ({
                        label: musician.name,
                        value: musician.id,
                        photo: musician.photo,
                    }))}
                    components={{ Option: customOption , NoOptionsMessage: NoOptionsMessageCp}}
                    isSearchable={true}
                    onInputChange={handleSearchChange}
                    onChange={(selectedOptions) => {
                        const selectedMusicians = selectedOptions.map(option => ({
                            id: option.value,
                            name: option.label,
                            photo: option.photo,
                        }));
                        setSelectedMusicians(selectedMusicians);
                    }}
                    className='w-1/3 mt-2'
                />   

                <div className='grid grid-cols-4 gap-4 w-4/5 mt-20'>
                    <button className='bg-[#132490] flex flex-col items-center rounded-lg'
                    onClick={() => handleAddPoints('January')}
                    >
                        <div className='bg-slate-300 mt-1 rounded-lg'>
                        <Image src='/awjanuary.png' className='w-16 h-16'/>
                        </div>
                        <h1 className='text-white mt-1'>January Award</h1>
                    </button>

                    <button className='bg-[#dd0078] flex flex-col items-center rounded-lg'
                    onClick={() => handleAddPoints('February')}
                    >
                        <div className='bg-slate-300 mt-1 rounded-lg'>
                        <Image src='/awfebruary.png' className='w-16 h-16'/>
                        </div>
                        <h1 className='text-white mt-1'>February Award</h1>
                    </button>
                    
                    <button className='bg-[#64b200] flex flex-col items-center rounded-lg'
                    onClick={() => handleAddPoints('March')}
                    >
                        <div className='bg-slate-300 mt-1 rounded-lg'>
                        <Image src='/awmarch.png' className='w-16 h-16'/>
                        </div>
                        <h1 className='text-white mt-1'>March Award</h1>
                    </button>

                    <button className='bg-[#714003] flex flex-col items-center rounded-lg'
                    onClick={() => handleAddPoints('April')}
                    >
                        <div className='bg-slate-300 mt-1 rounded-lg'>
                        <Image src='/awapril.png' className='w-16 h-16'/>
                        </div>
                        <h1 className='text-white mt-1'>April Award</h1>
                    </button>
                </div>

                <div className='grid grid-cols-4 gap-4 w-4/5 mt-3'>
                    <button className='bg-[#cb0000] flex flex-col items-center rounded-lg'
                    onClick={() => handleAddPoints('May')}
                    >
                        <div className='bg-slate-300 mt-1 rounded-lg'>
                        <Image src='/awmay.png' className='w-16 h-16'/>
                        </div>
                        <h1 className='text-white mt-1'>May Award</h1>
                    </button>

                    <button className='bg-[#c7b201] flex flex-col items-center rounded-lg'
                    onClick={() => handleAddPoints('June')}
                    >
                        <div className='bg-slate-300 mt-1 rounded-lg'>
                        <Image src='/awjune.png' className='w-16 h-16'/>
                        </div>
                        <h1 className='text-white mt-1'>June Award</h1>
                    </button>
                    
                    <button className='bg-[#45009c] flex flex-col items-center rounded-lg'
                    onClick={() => handleAddPoints('July')}
                    >
                        <div className='bg-slate-300 mt-1 rounded-lg'>
                        <Image src='/awjuly.png' className='w-16 h-16'/>
                        </div>
                        <h1 className='text-white mt-1'>July Award</h1>
                    </button>

                    <button className='bg-[#017cc7] flex flex-col items-center rounded-lg'
                    onClick={() => handleAddPoints('August')}
                    >
                        <div className='bg-slate-300 mt-1 rounded-lg'>
                        <Image src='/awaugust.png' className='w-16 h-16'/>
                        </div>
                        <h1 className='text-white mt-1'>August Award</h1>
                    </button>
                </div>

                <div className='grid grid-cols-4 gap-4 w-4/5 mt-3'>
                    <button className='bg-[#009c82] flex flex-col items-center rounded-lg'
                    onClick={() => handleAddPoints('September')}
                    >
                        <div className='bg-slate-300 mt-1 rounded-lg'>
                        <Image src='/awseptember.png' className='w-16 h-16'/>
                        </div>
                        <h1 className='text-white mt-1'>September Award</h1>
                    </button>

                    <button className='bg-[#e55000] flex flex-col items-center rounded-lg'
                    onClick={() => handleAddPoints('October')}
                    >
                        <div className='bg-slate-300 mt-1 rounded-lg'>
                        <Image src='/awoctober.png' className='w-16 h-16'/>
                        </div>
                        <h1 className='text-white mt-1'>October Award</h1>
                    </button>
                    
                    <button className='bg-[#b83b1c] flex flex-col items-center rounded-lg'
                    onClick={() => handleAddPoints('November')}
                    >
                        <div className='bg-slate-300 mt-1 rounded-lg'>
                        <Image src='/awnovember.png' className='w-16 h-16'/>
                        </div>
                        <h1 className='text-white mt-1'>November Award</h1>
                    </button>

                    <button className='bg-[#0a5d00] flex flex-col items-center rounded-lg'
                    onClick={() => handleAddPoints('December')}
                    >
                        <div className='bg-slate-300 mt-1 rounded-lg'>
                        <Image src='/awdecember.png' className='w-16 h-16'/>
                        </div>
                        <h1 className='text-white mt-1'>December Award</h1>
                    </button>
                </div>

                <div className='grid grid-cols-3 gap-4 w-4/5 mt-6'>
                    <button className='bg-[#dfce1e] flex flex-col items-center rounded-lg'
                    onClick={() => handleAddTroph(200,'Year',0)}
                    >
                        <div className='bg-slate-300 mt-1 rounded-lg'>
                        <Image src='/troph.png' className='w-16 h-16'/>
                        </div>
                        <h1 className='font-semibold mt-1'>Year Award</h1>
                    </button>

                    <button className='bg-[#f2e027] flex flex-col items-center rounded-lg'
                    onClick={() => handleAddTroph(100,'Six Month',1)}
                    >
                        <div className='bg-slate-300 mt-1 rounded-lg'>
                        <Image src='/winner.png' className='w-16 h-16'/>
                        </div>
                        <h1 className='font-semibold mt-1'>Six Month Award </h1>
                        <h1 className='text-tiny'>Semester 1</h1>
                    </button>

                    <button className='bg-[#f2e027] flex flex-col items-center rounded-lg'
                    onClick={() => handleAddTroph(100,'Six Month',2)}
                    >
                        <div className='bg-slate-300 mt-1 rounded-lg'>
                        <Image src='/winner.png' className='w-16 h-16'/>
                        </div>
                        <h1 className='font-semibold mt-1'>Six Month Award </h1>
                        <h1 className='text-tiny'>Semester 2</h1>
                    </button>
                    
                </div>

                <h1 className='text-center font-semibold text-teal-900 mt-6'>Weeks in Line</h1>
                <div className='grid grid-cols-3 gap-4 w-4/5 mt-2 mb-3'>
                    <button className='bg-teal-600 rounded-lg py-2 text-white font-bold'
                    onClick={() => handleAddWeek(10)}
                    >
                        2nd Week
                    </button>
                    <button className='bg-teal-700 rounded-lg py-2 text-white font-bold'
                    onClick={() => handleAddWeek(20)}
                    >
                        3rd Week
                    </button>
                    <button className='bg-teal-800 rounded-lg py-2 text-white font-bold'
                    onClick={() => handleAddWeek(30)}
                    >
                        4th Week + 
                    </button>
                </div>
            </div>
        </div>
    )
}