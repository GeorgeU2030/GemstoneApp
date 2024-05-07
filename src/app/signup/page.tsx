"use client"

import {Button, Card, CardBody, Image} from "@nextui-org/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import {Input} from "@nextui-org/input";
import React from "react";
import {EyeSlashFilledIcon} from "@/icons/EyeSlashFilledicon";
import {EyeFilledIcon} from "@/icons/EyeFilledIcon";

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
    avatar: z.string().url({
        message: "Enter a valid URL"
    })
})

export default function SignupPage() {


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
        },
    })

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }

    const [isVisible, setIsVisible] = React.useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div className={'min-h-screen bg-gradient-to-tr from-cyan-500 to-teal-500 flex flex-col md:flex-row flex-grow'}>
        <section className={'w-full md:w-1/2 flex flex-col justify-center items-center'}>
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
                                                errorMessage={'Please enter a valid email'}
                                                className={'max-w-xs h-14'}
                                        />
                                    </FormControl>

                                    <FormMessage className={'text-white text-sm'} />
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
                                               errorMessage={'complete the field'}
                                               className={'max-w-xs h-12'}
                                        />
                                    </FormControl>

                                    <FormMessage className={'text-white text-sm'} />
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
                                               errorMessage={'complete the field'}
                                            type={isVisible ? "text" : "password"}
                                            className="max-w-xs h-12"
                                        />
                                    </FormControl>

                                    <FormMessage className={'text-white text-sm'} />
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
                                               className={'max-w-xs h-12 text-sm'}
                                               errorMessage={'complete the field'}
                                        />
                                    </FormControl>

                                    <FormMessage className={'text-white text-sm'} />
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
                                               className={'max-w-xs h-12 text-sm'}
                                               errorMessage={'complete the field'}
                                        />
                                    </FormControl>

                                    <FormMessage className={'text-white text-sm'} />
                                </FormItem>
                            )}
                        />
                        <div className="flex justify-center">
                        <Button type="submit" className={'bg-teal-700 text-white font-semibold'}>Submit</Button>
                        </div>
                    </form>
                </Form>

        </section>
    </div>
  );
}