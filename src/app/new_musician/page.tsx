"use client"

import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
} from "@/components/ui/form"
import { Button} from "@/components/ui/button";
import { Input } from "@nextui-org/input";
import {Avatar} from "@nextui-org/react";
import React, {useState, useEffect} from "react";
import Cookies from "js-cookie"
import {useRouter} from "next/navigation"


const CreateMusician = z.object({
    name: z.string().min(3,{
        message: "Name must be at least 3 characters long"
    }),
    photo: z.string().url({
        message: "Invalid URL"
    }),
    country: z.string().min(3,{
        message: "Country must be at least 3 characters long"
    }),
    flag: z.string().url({
        message: "Invalid URL"
    }),

})


export default function NewMusician(){

    const router = useRouter()
    const [id,setId]= useState<number>(0)

    useEffect(()=>{
        const token = Cookies.get('token')
        if(token){
            fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/music/get-id-user`, {
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
            }).then((data:any)=>{
                setId(data)
            })
        }else {
            router.push('/login')
        }

    },[router])


    const form = useForm<z.infer<typeof CreateMusician>>({
        resolver: zodResolver(CreateMusician),
        defaultValues: {
            name: "",
            photo: "",
            country: "",
            flag: "",
        },
    })

    async function onSubmit(data: z.infer<typeof CreateMusician>) {
        const values = {
            ...data,
            profile: id
        }
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/music/api/v1/musicians/`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        }).then(response => {
            if(response.ok){
                router.push('/menu')
            }else{
                Cookies.remove('token')
                router.push('/login')
            }
        })
    }

    return (
        <div
            className={'min-h-screen bg-gradient-to-tr from-teal-500 to-green-500 flex flex-col justify-center items-center'}>
            <div className={'w-5/6 md:w-3/5 lg:w-1/3 bg-slate-200 rounded-lg'}>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 text-center lg:py-12 lg:px-12 md:py-6 md:px-6 py-4 px-4">
                        <div >
                            <h1 className={'text-teal-700 font-semibold'}> New Musician </h1>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl >
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
                            name="photo"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl className="flex flex-col justify-center items-center mt-4">
                                        <div>
                                            <Avatar showFallback src={field.value} radius={'full'} />
                                            <Input {...field}
                                                   type={'text'}
                                                   variant={'underlined'}
                                                   label={'Photo'}
                                                   isRequired
                                                   className={'max-w-xs h-14 text-tiny ml-2'}
                                                   errorMessage={'Enter the Photo'}
                                            />
                                        </div>
                                    </FormControl>
                                </FormItem>

                            )}
                        />
                            <FormField
                                control={form.control}
                                name="country"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl >
                                            <Input {...field}
                                                   type={'text'}
                                                   variant={'underlined'}
                                                   isRequired
                                                   label={'Country'}
                                                   className={'max-w-xs h-14 text-tiny ml-2 mt-4'}
                                                   errorMessage={'Enter the Country'}
                                            />
                                        </FormControl>

                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="flag"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl className="flex flex-col justify-center items-center mt-2">
                                            <div>
                                                <Avatar src={field.value} radius={'sm'}
                                                name={'Flag'}
                                                />
                                                <Input {...field}
                                                       type={'text'}
                                                       variant={'underlined'}
                                                       label={'Flag'}
                                                       isRequired
                                                       className={'max-w-xs h-14 text-tiny ml-2'}
                                                       errorMessage={'Enter the Flag'}
                                                />
                                            </div>
                                        </FormControl>
                                    </FormItem>

                                )}
                            />
                        <div className="flex justify-center mt-4">
                            <Button type="submit" className={'bg-teal-700 text-white font-semibold'}>Submit</Button>
                        </div>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    )
}