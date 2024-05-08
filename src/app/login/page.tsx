"use client"

import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import { Button} from "@/components/ui/button";
import { Input } from "@nextui-org/input";
import { useState } from "react";
import Cookies from "js-cookie"
import { useRouter } from "next/navigation"

const SignInSchema = z.object({
    email: z.string().email(
        {
            message: "Invalid email address"
        }
    ),
    password: z.string().min(7,{
        message: "Password must be at least 7 characters long"
    }),
})

export default function Login () {

    const router = useRouter()
    const [userNotExist, setUserNotExist ] = useState(false)
    const [wrongPassword, setWrongPassword ] = useState(false)

    const form = useForm<z.infer<typeof SignInSchema>>({
        resolver: zodResolver(SignInSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    async function onSubmit(data: z.infer<typeof SignInSchema>) {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/login`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        if(response.status === 404){
            setUserNotExist(true)
            setWrongPassword(false)
        }
        else if(response.status === 400){
            setUserNotExist(false)
            setWrongPassword(true)
        }
        else{
            const data = await response.json()
            Cookies.set('token', data.token)
            router.push('/menu')
        }
    }

  return (
    <div className={'min-h-screen bg-gradient-to-tr from-teal-500 to-green-500 flex flex-col items-center justify-center'}>
        <div className={'w-5/6 md:w-3/5 lg:w-1/3 bg-lime-300 rounded-lg'}>
            <h1 className="text-center text-2xl font-bold text-teal-900 py-4">Login</h1>
            <Form {...form} >
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 text-center lg:py-12 lg:px-12 md:py-6 md:px-6 py-4 px-4 ">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input  className="text-end text-black" {...field}
                                    label={"Email"}
                                    variant={'faded'}
                                    color={'primary'}
                                    />
                                </FormControl>
                                <FormMessage className="text-teal font-semibold" />
                            </FormItem>

                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input type="password" className="text-end text-black" {...field}
                                           label={"Password"}
                                           variant={'faded'}
                                           color={'primary'}
                                    />
                                </FormControl>
                                <FormMessage className="text-teal-950 font-semibold"/>
                            </FormItem>

                        )}
                    />
                    {userNotExist && <p className="text-teal-900 font-semibold">User does not exist</p>}
                    {wrongPassword && <p className="text-teal-900 font-semibold">Wrong password</p>}
                    <Button type="submit" className="bg-teal-600 px-6">Login</Button>
                </form>
            </Form>
        </div>
    </div>
  )
}