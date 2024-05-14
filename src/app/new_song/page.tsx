"use client"

import {z} from 'zod'
import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {Form, FormControl, FormField, FormItem,} from "@/components/ui/form"
import {Input} from "@nextui-org/input";
import {Avatar, DatePicker, SelectItem} from "@nextui-org/react";
import React, {useEffect} from "react";
import {Select as NextSelect} from "@nextui-org/react";
import MusicianDTO from "@/interfaces/Musician";
import Cookies from "js-cookie"
import {useRouter} from "next/navigation"
import {Button} from "@/components/ui/button";
import AsyncSelect from 'react-select/async';

const CreateSong = z.object({
    name: z.string().min(3, {
        message: "Name must be at least 3 characters long"
    }),
    gem: z.string().max(20),
    start_date: z.date(),
    end_date: z.date(),
    week: z.number().int().default(0),
    release_year: z.number().int().positive(),
    genre: z.string().max(100),
    album: z.string(),
    youtube: z.string(),
    musicians: z.array(z.number()),
});

export default function NewSong(){

    const router = useRouter()
    const [musicians,setMusicians] = React.useState<MusicianDTO[]>([])

    const form = useForm<z.infer<typeof CreateSong>>({
        resolver: zodResolver(CreateSong),
        defaultValues:{
            name: "",
            gem: "",
            start_date: new Date("2024-04-04"),
            end_date: new Date("2024-04-04"),
            week: 0,
            release_year: 2024,
            genre: "",
            album: "",
            youtube: "",
            musicians: []
        }
    })


    useEffect(()=>{
    const token = Cookies.get('token')
    if(token) {
        searchMusicians('').then((musicians)=> setMusicians(musicians))
    }else {
        router.push('/login')
    }
    },[router, searchMusicians])


    const onSubmit = (data: z.infer<typeof CreateSong>) => {
        console.log(data)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        }));
    }

    return (
        <div className={'min-h-screen bg-gradient-to-tr from-teal-500 to-green-500 flex flex-col justify-center items-center'}>
            <div className={'w-5/6 md:w-3/5 lg:w-1/3 bg-slate-200 rounded-lg mt-8 mb-8'}>
                <Form {...form}>
                    <form className="space-y-8 text-center lg:py-12 lg:px-12 md:py-6 md:px-6 py-4 px-4" onSubmit={form.handleSubmit(onSubmit)}>
                        <div>
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
                            <div className={'flex ml-2 justify-between'}>
                            <FormField
                                control={form.control}
                                name="start_date"
                                render={({field}) => (
                                    <FormItem>
                                        <FormControl>
                                            <DatePicker {...field.value}
                                                        label={"Start Date"}
                                                        variant={'underlined'}
                                                        showMonthAndYearPickers
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="end_date"
                                render={({field}) => (
                                    <FormItem>
                                        <FormControl>
                                            <DatePicker {...field.value}
                                                        label={"End Date"}
                                                        variant={'underlined'}
                                                        showMonthAndYearPickers
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
                                                       value={field.value.toString()}
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
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl className="flex flex-col justify-center items-center mt-4">
                                            <NextSelect {...field}
                                                    className="max-w-xs ml-2"
                                                    variant={'underlined'}
                                                    label={'Select the category of Gem'}
                                            >
                                                <SelectItem
                                                    key="diamond"
                                                    startContent={<Avatar alt="Diamond" className="w-6 h-6" src="/diamond.png" />}
                                                >
                                                    Diamond - 100 pts
                                                </SelectItem>
                                                <SelectItem
                                                    key="ruby"
                                                    startContent={<Avatar alt="Ruby" className="w-6 h-6" src="/ruby.png" />}
                                                >
                                                    Ruby - 90 pts
                                                </SelectItem>
                                                <SelectItem
                                                    key="emerald"
                                                    startContent={<Avatar alt="Emerald" className="w-6 h-6" src="/emerald.png" />}
                                                >
                                                    Emerald - 80 pts
                                                </SelectItem>
                                                <SelectItem
                                                    key="sapphire"
                                                    startContent={<Avatar alt="Sapphire" className="w-6 h-6" src="/saphire.png" />}
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
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl className="flex flex-col justify-center items-center mt-4">
                                            <div>
                                                <Avatar showFallback src={field.value} radius={'sm'} />
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
                            <FormField
                                control={form.control}
                                name="musicians"
                                render={({field}) => (
                                    <FormItem>
                                        <FormControl>
                                            <AsyncSelect
                                                {...field}
                                                cacheOptions
                                                defaultOptions
                                                loadOptions={searchMusicians}
                                                isMulti
                                                className="text-black"
                                                placeholder="Select directors"
                                                getOptionLabel={(option) => option.label}
                                                getOptionValue={(option) => option.value.toString()}
                                                onChange={(selectedOptions) => {
                                                    const MusiciansIds = selectedOptions ? selectedOptions.map(option => option.value) : [];
                                                    form.setValue('musicians', MusiciansIds);
                                                }}
                                                value={field.value ? field.value.map(value => ({ value, label: musicians.find(musician => musician.id === value)?.name ?? 'Unknown' })) : []}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                               <Button type={'submit'}>Submit</Button>
                            </div>
                    </form>
                </Form>
            </div>
        </div>
)
}