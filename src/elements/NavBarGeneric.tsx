"use client"

import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem, Image, Link, Button
} from "@nextui-org/react";
import React from "react";
import {Icon} from "@/icons/Icon";
import {useRouter} from "next/navigation";
import {ArrowLeft} from "lucide-react"

interface NavBarGenericProps {
    text: string
}

export default function NavBarGeneric({text}: NavBarGenericProps){

    const router = useRouter();

    return (
        <Navbar className={'bg-gradient-to-tr from-teal-500 to-green-500 py-1'}>
            <NavbarContent justify="start" className={'md:hidden'}>
                <Button isIconOnly className={'bg-teal-700 text-white'}
                onClick={()=>router.push('/menu')}
                >
                    <ArrowLeft/>
                </Button>
            </NavbarContent>
            <NavbarBrand className={'hidden md:flex cursor-pointer'}
            onClick={()=>router.push('/menu')}
            >
                <Image src={'/gemstone.png'} width={32} height={32} alt={'Gemstone'}/>
                <p className="font-bold text-inherit ml-2">Gemstone</p>
            </NavbarBrand>
            <NavbarContent justify="center" >
                <NavbarItem>
                    <Link color="foreground" className={'font-semibold text-white text-2xl ml-2 md:ml-0'} >
                        {text}
                    </Link>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">
                <NavbarItem>
                    {text === 'My Ranking' &&
                    <Button as={Link} variant="flat" startContent={<Icon src={'/singer.png'}/>}
                    className={'bg-sky-600 text-white font-semibold'}
                    onClick={()=>router.push('/new_musician')}
                    >
                        Add Musician
                    </Button>
                    }
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    )
}