"use client"

import {z} from 'zod'
import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form"
import {Input} from "@nextui-org/input";
import {Avatar, DatePicker, SelectItem} from "@nextui-org/react";
import React, {useEffect} from "react";
import {Select as NextSelect} from "@nextui-org/react";
import MusicianDTO from "@/interfaces/Musician";
import Cookies from "js-cookie"
import {useRouter} from "next/navigation"
import {Button} from "@/components/ui/button";
import AsyncSelect from 'react-select/async';
import {customOption, NoOptionsMessageCp} from "@/elements/Customitem";
import {DiscAlbum} from "lucide-react";
import {parseDate} from "@internationalized/date";

const CreateSong = z.object({
    name: z.string().min(3, {
        message: "Name must be at least 3 characters long"
    }),
    gem: z.string().max(20),
    start_date: z.string({
        message: "Start date is required"
    }),
    end_date: z.string({
        message: "End date is required"
    }),
    week: z.number().int().default(0),
    release_year: z.string(),
    genre: z.string().max(100),
    album: z.string(),
    youtube: z.string(),
    musicians: z.array(z.number()),
});

export default function NewSong(){

    const [id,setId]= React.useState<number>(0)
    const router = useRouter()
    const [musicians,setMusicians] = React.useState<MusicianDTO[]>([])

    const form = useForm<z.infer<typeof CreateSong>>({
        resolver: zodResolver(CreateSong),
        defaultValues:{
            name: "",
            gem: "",
            start_date: "2024-04-04",
            end_date: "2024-04-04",
            week: 0,
            release_year: "2024",
            genre: "",
            album: "",
            youtube: "",
            musicians: []
        }
    })


    useEffect(() => {
    const token = Cookies.get('token');
    if (!token) {
        router.push('/login');
    } else {
        const fetchData = async () => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/music/last_week/`, {
                headers: {
                    'Authorization': `Token ${token}`
                }
            });
            const data = await response.json();
            form.setValue('week', data.week);
        };
        fetchData().catch(error=>{
            console.log(error)
        })

        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/music/get-id-user`, {
            headers: {
                'Authorization': `Token ${token}`
            }
        }).then(response => {
            return response.json()
        }).then((data: any) => {
            setId(data)
        })
    }
    }, [router]);

    function calculatePoints(gem: string): number {
        switch (gem) {
            case 'diamond':
                return 100;
            case 'ruby':
                return 90;
            case 'emerald':
                return 80;
            case 'sapphire':
                return 70;
            default:
                return 0;
        }
    }

    const onSubmit = async (data: z.infer<typeof CreateSong>) => {

        const { release_year,start_date,end_date, ...restOfData}= data;

        const releaseYear = Number(data.release_year);
        const startDate = new Date(data.start_date);
        const endDate = new Date(data.end_date);
        
        const musicianUpdates = data.musicians.map((musician)=>({
            id: musician,
            pointsToAdd: calculatePoints(data.gem)
        }))

        const values = {
            ...restOfData,
            release_year: releaseYear,
            start_date: startDate,
            end_date: endDate,
            profile: id
        }

    
        
        await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/music/api/v1/songs/`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        }).then(response => {
            if(!response.ok){
                Cookies.remove('token')
                router.push('/login')
            }
        })

        const valuesUpdate = {
            musicianUpdates,
            start_date: startDate,
            end_date: endDate,
            value_week: data.week
        }

        const token = Cookies.get('token');

        await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/music/update_musicians/`,{
            method: 'POST',
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(valuesUpdate)
        }).then(response => {
            if(response.ok){
                router.push('/menu')
            }else{
                Cookies.remove('token')
                router.push('/login')
            }
        })
        
    }

    async function searchMusicians(search: string) {
        const token = Cookies.get('token');

        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/music/search_musician?search=${encodeURIComponent(search)}`,{
            headers: {
                'Authorization': `Token ${token}`
            }
        });

        if (response.status === 401) {
            Cookies.remove('token');
            router.push('/');
            return;
        }

        const newMusicians = await response.json();
        setMusicians(prevMusicians => {
            const MusicianMap = new Map(prevMusicians.map(musician => [musician.id, musician]));

            newMusicians.forEach((musician:MusicianDTO) => {
                if (!MusicianMap.has(musician.id)) {
                    MusicianMap.set(musician.id, musician);
                }
            });

            return Array.from(MusicianMap.values());
        });

        return newMusicians.map((musician: MusicianDTO) => ({
            value: musician.id,
            label: musician.name,
            photo: musician.photo
        }));
    }

    return (
        <div className={'min-h-screen bg-gradient-to-tr from-teal-500 to-green-500 flex flex-col justify-center items-center'}>
            <div className={'w-5/6 md:w-3/5 lg:w-1/3 bg-slate-200 rounded-lg mt-8 mb-8'}>
                <Form {...form}>
                    <form className="space-y-8 text-center lg:py-12 lg:px-12 md:py-6 md:px-6 py-4 px-4"
                          onSubmit={form.handleSubmit(onSubmit)}>
                        <div>
                            <h1 className={'text-teal-700 text-xl mb-2 font-semibold'}> New Song </h1>
                            <FormField
                                control={form.control}
                                name="name"
                                render={({field}) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input {...field}
                                                   type={'text'}
                                                   variant={'underlined'}
                                                   isRequired
                                                   label={'Name'}
                                                   className={'max-w-xs h-14 text-tiny ml-2'}
                                                   errorMessage={'Enter the Name'}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="musicians"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel className={'font-normal text-start'}>Musicians of the
                                            Song</FormLabel>
                                        <FormControl>
                                            <AsyncSelect
                                                {...field}
                                                cacheOptions
                                                defaultOptions
                                                loadOptions={searchMusicians}
                                                isMulti
                                                className="text-black border-2 border-teal-600 rounded-lg"
                                                placeholder="Select Musicians"
                                                components={{
                                                    Option: customOption,
                                                    NoOptionsMessage: NoOptionsMessageCp
                                                }}
                                                getOptionLabel={(option) => option.label}
                                                getOptionValue={(option) => option.value.toString()}
                                                onChange={(selectedOptions) => {
                                                    const MusiciansIds = selectedOptions ? selectedOptions.map(option => option.value) : [];
                                                    form.setValue('musicians', MusiciansIds);
                                                }}
                                                value={field.value ? field.value.map(value => ({
                                                    value,
                                                    label: musicians.find(musician => musician.id === value)?.name ?? 'Unknown'
                                                })) : []}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <div className={'flex ml-2 justify-between mt-3'}>
                                <FormField
                                    control={form.control}
                                    name="start_date"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormControl>
                                                <DatePicker {...field}
                                                            label={"Start Date"}
                                                            variant={'underlined'}
                                                            showMonthAndYearPickers
                                                            value={parseDate(field.value.toString())}
                                                            onChange={(date) => field.onChange(date.toString())}
                                                />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="end_date"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormControl>
                                                <DatePicker {...field}
                                                            label={"End Date"}
                                                            variant={'underlined'}
                                                            showMonthAndYearPickers
                                                            value={parseDate(field.value.toString())}
                                                            onChange={(date) => field.onChange(date.toString())}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className={'flex'}>
                                <FormField
                                    control={form.control}
                                    name="week"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input {...field}
                                                       type={'number'}
                                                       variant={'underlined'}
                                                       label={'Week'}
                                                       disabled
                                                       className={'max-w-xs h-14 text-tiny ml-2'}
                                                       value={field.value.toString()}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="release_year"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input {...field}
                                                       type={'number'}
                                                       variant={'underlined'}
                                                       label={'Release Year'}
                                                       className={'max-w-xs h-14 text-tiny ml-2'}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className={'flex'}>
                                <FormField
                                    control={form.control}
                                    name="genre"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input {...field}
                                                       type={'text'}
                                                       variant={'underlined'}
                                                       label={'Genre'}
                                                       className={'max-w-xs h-14 text-tiny ml-2'}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="youtube"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input {...field}
                                                       type={'text'}
                                                       variant={'underlined'}
                                                       label={'YouTube Id'}
                                                       className={'max-w-xs h-14 text-tiny ml-2'}
                                                       value={field.value.toString()}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <FormField
                                control={form.control}
                                name="gem"
                                render={({field}) => (
                                    <FormItem>
                                        <FormControl className="flex flex-col justify-center items-center mt-4">
                                            <NextSelect {...field}
                                                        className="max-w-xs ml-2"
                                                        variant={'underlined'}
                                                        label={'Select the category of Gem'}
                                            >
                                                <SelectItem
                                                    key="diamond"
                                                    startContent={<Avatar alt="Diamond" className="w-6 h-6"
                                                                          src="/diamond.png"/>}
                                                >
                                                    Diamond - 100 pts
                                                </SelectItem>
                                                <SelectItem
                                                    key="ruby"
                                                    startContent={<Avatar alt="Ruby" className="w-6 h-6"
                                                                          src="/ruby.png"/>}
                                                >
                                                    Ruby - 90 pts
                                                </SelectItem>
                                                <SelectItem
                                                    key="emerald"
                                                    startContent={<Avatar alt="Emerald" className="w-6 h-6"
                                                                          src="/emerald.png"/>}
                                                >
                                                    Emerald - 80 pts
                                                </SelectItem>
                                                <SelectItem
                                                    key="sapphire"
                                                    startContent={<Avatar alt="Sapphire" className="w-6 h-6"
                                                                          src="/saphire.png"/>}
                                                >
                                                    Sapphire - 70 pts
                                                </SelectItem>
                                            </NextSelect>
                                        </FormControl>
                                    </FormItem>

                                )}
                            />

                            <FormField
                                control={form.control}
                                name="album"
                                render={({field}) => (
                                    <FormItem>
                                        <FormControl className="flex flex-col justify-center items-center mt-4">
                                            <div>
                                                <Avatar src={field.value} radius={'sm'}
                                                fallback={<DiscAlbum/>}
                                                />
                                                <Input {...field}
                                                       type={'text'}
                                                       variant={'underlined'}
                                                       label={'Album'}
                                                       className={'max-w-xs h-14 text-tiny ml-2'}
                                                />
                                            </div>
                                        </FormControl>
                                    </FormItem>

                                )}
                            />
                            <div className={'mt-4'}>
                                <Button type={'submit'} className={'bg-teal-700 hover:bg-teal-500'}>Create</Button>
                            </div>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    )
}