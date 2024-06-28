"use client"

import {Card, CardBody, Image, Avatar} from "@nextui-org/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage
} from "@/components/ui/form"
import {Button} from "@/components/ui/button";
import {Input} from "@nextui-org/input";
import React from "react";
import {EyeSlashFilledIcon} from "@/icons/EyeSlashFilledicon";
import {EyeFilledIcon} from "@/icons/EyeFilledIcon";
import {useRouter} from "next/navigation"
import Cookies from "js-cookie"
import { asOptionalField } from "@/schema/schemaUtils";

const formSchema = z.object({
    email: z.string().email({
        message: "Enter a valid email address"
    }),
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    password: z.string().min(7,{
        message: "Password must be at least 7 characters long"
    }),
    first_name: z.string(),
    last_name: z.string(),
    avatar: asOptionalField(z.string().url())
})


export default function SignupPage() {

    const [userExist, setUserExist] = React.useState(false)
    const [userNameExist, setUserNameExist] = React.useState(false)

    const router = useRouter()

    const [isVisible, setIsVisible] = React.useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email:"",
            username: "",
            password:"",
            first_name:"",
            last_name:"",
            avatar:""
        },
    })

    async function onSubmit (values: z.infer<typeof formSchema>) {

        if(values.avatar === undefined){
            values.avatar = 'https://images.unsplash.com/broken'
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/signup`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(values)
        })

        if(!response.ok){
            const errorData = await response.json()
            if (errorData.error){
                setUserExist(true)
                setUserNameExist(false)
                return
            }
            setUserExist(false)
            setUserNameExist(true)
            return
        }
        const data = await response.json()
        Cookies.set('token', data.token)
        router.push('/menu')
    }


  return (
    <div className={'min-h-screen bg-gradient-to-tr from-cyan-500 to-teal-500 flex flex-col md:flex-row flex-grow'}>
        <section className={'w-full md:w-1/2 flex flex-col justify-center items-center mt-5 md:mt-0'}>
            <div className={'w-5/6 md:w-2/3'}>
                <Card className="py-1 bg-teal-400 flex flex-row">
                    <CardBody className="overflow-visible py-2 flex flex-row ml-8 items-center">
                        <Image
                            alt="Card background"
                            className="object-cover rounded-xl"
                            src="https://m.media-amazon.com/images/M/MV5BNmE0NDVmNTktYTM1Yy00ZmJlLTlhMmYtODdhYTE1NjRmNzEyXkEyXkFqcGdeQXVyMjAzMjcxNTE@._V1_FMjpg_UX1000_.jpg"
                            width={100}
                            height={100}
                        />
                        <div className={'flex flex-col'}>
                            <h1 className={'ml-3 text-teal-900'}>Flowers</h1>
                            <h1 className={'ml-3 font-semibold text-teal-900'}>Record of the Year</h1>
                            <h2 className={'ml-3 font-semibold text-teal-900 text-sm'}>Miley Cyrus</h2>
                        </div>
                    </CardBody>

                </Card>
            </div>
            <div className={'w-5/6 md:w-2/3 mt-3'}>
                <Card className="py-1 bg-teal-400 flex flex-row">
                    <CardBody className="overflow-visible py-2 flex flex-row ml-8 items-center">
                        <Image
                            alt="Card background"
                            className="object-cover rounded-xl"
                            src="https://i.discogs.com/lDQyhZ50p8QgKVUywVp_n-LkrTq0H1JxSJzhNO27uDM/rs:fit/g:sm/q:90/h:597/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTI5OTcy/MTEwLTE3MDk5MTcy/NTMtMzM0NS5qcGVn.jpeg"
                            width={100}
                            height={100}
                        />
                        <div className={'flex flex-col'}>
                            <h1 className={'ml-3 text-teal-900'}>What Was I Made For?</h1>
                            <h1 className={'ml-3 font-semibold text-teal-900'}>Song of the Year</h1>
                            <h2 className={'ml-3 font-semibold text-teal-900 text-sm'}>Billie Eillish</h2>
                        </div>
                    </CardBody>

                </Card>
            </div>
            <div className={'w-5/6 md:w-2/3 mt-3'}>
                <Card className="py-1 bg-teal-400 flex flex-row">
                    <CardBody className="overflow-visible py-2 flex flex-row ml-8 items-center">
                        <Image
                            alt="Card background"
                            className="object-cover rounded-xl"
                            src="https://upload.wikimedia.org/wikipedia/en/9/9f/Midnights_-_Taylor_Swift.png"
                            width={100}
                            height={100}
                        />
                        <div className={'flex flex-col'}>
                            <h1 className={'ml-3 text-teal-900'}>Midnights</h1>
                            <h1 className={'ml-3 font-semibold text-teal-900'}>Album of the Year</h1>
                            <h2 className={'ml-3 font-semibold text-teal-900 text-sm'}>Taylor Swift</h2>
                        </div>
                    </CardBody>

                </Card>
            </div>

        </section>
        <section className={'w-full md:w-1/2 flex flex-col justify-center items-center'}>
                <h1 className={'text-3xl font-semibold text-white mb-3 mt-5 md:mt-0'}>Sign Up</h1>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4 px-4 w-4/5 md:w-1/2 bg-gray-200 rounded-lg mb-4">

                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl >
                                        <Input {...field}
                                                variant={'underlined'}
                                                type={'email'}
                                                isRequired
                                                label={'Email'}
                                                className={'max-w-xs h-14'}
                                                errorMessage={'Enter a valid email address'}
                                        />
                                    </FormControl>

                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl >
                                        <Input {...field}
                                               variant={'underlined'}
                                               type={'text'}
                                               isRequired
                                               label={'Username'}
                                               className={'max-w-xs h-12'}
                                               errorMessage={'Enter a valid Username'}
                                        />
                                    </FormControl>

                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl >
                                        <Input {...field}
                                            label="Password"
                                            isRequired
                                               variant={'underlined'}
                                            endContent={
                                                <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                                                    {isVisible ? (
                                                        <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                                    ) : (
                                                        <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                                    )}
                                                </button>
                                            }
                                            type={isVisible ? "text" : "password"}
                                            className="max-w-xs h-12"
                                            errorMessage={'Complete the field'}
                                        />
                                    </FormControl>
                                    <FormMessage className={'mt-1 text-tiny'}></FormMessage>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="first_name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl >
                                        <Input {...field}
                                               type={'text'}
                                               variant={'underlined'}
                                               isRequired
                                               label={'First Name'}
                                               className={'max-w-xs h-12 text-tiny'}
                                               errorMessage={'Enter your first name'}
                                        />
                                    </FormControl>

                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="last_name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl >
                                        <Input {...field}
                                               type={'text'}
                                               variant={'underlined'}
                                               isRequired
                                               label={'Last Name'}
                                               className={'max-w-xs h-12 text-tiny'}
                                               errorMessage={'Enter your lastname'}
                                        />
                                    </FormControl>

                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="avatar"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl className="flex justify-center items-center">
                                        <div>
                                            <Avatar showFallback src={field.value} radius={'full'} />
                                            <Input {...field}
                                                   type={'text'}
                                                   variant={'underlined'}
                                                   label={'Avatar'}
                                                   className={'max-w-xs h-12 text-tiny ml-2'}
                                            />
                                        </div>
                                    </FormControl>
                                </FormItem>

                            )}
                        />
                        {userExist && <p className="text-teal-500 text-sm text-center">User already exists</p>}
                        {userNameExist && <p className="text-teal-500 text-sm text-center">Username already exists</p>}
                        <div className="flex justify-center">
                            <Button type="submit" className={'bg-teal-700 text-white font-semibold'}>Submit</Button>
                        </div>
                    </form>
                </Form>

        </section>
    </div>
  );
}