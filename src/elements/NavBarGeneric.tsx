"use client"

import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem, Image, Link, Button
} from "@nextui-org/react";
import React from "react";
import {Icon} from "@/icons/Icon";

interface NavBarGenericProps {
    text: string
}

export default function NavBarGeneric({text}: NavBarGenericProps){
    return (
        <Navbar className={'bg-gradient-to-tr from-teal-500 to-green-500 py-1'}>
            <NavbarBrand className={'hidden md:flex'}>
                <Image src={'/gemstone.png'} width={32} height={32} alt={'Gemstone'}/>
                <p className="font-bold text-inherit ml-2">Gemstone</p>
            </NavbarBrand>
            <NavbarContent justify="center">

                <NavbarItem>
                    <Link color="foreground" className={'font-semibold text-white text-2xl'} >
                        {text}
                    </Link>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">
                <NavbarItem>
                    {text === 'My Ranking' &&
                    <Button as={Link} href="#" variant="flat" startContent={<Icon src={'/singer.png'}/>}
                    className={'bg-sky-600 text-white font-semibold px-3'}
                    >
                        Add Musician
                    </Button>
                    }
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    )
}