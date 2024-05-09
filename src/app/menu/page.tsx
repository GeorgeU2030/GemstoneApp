"use client"

import React from "react";
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
    Image
} from "@nextui-org/react";
import {BarChart3} from "lucide-react";

export default function Menu(){
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const menuItems = [
        "Profile",
        "Dashboard",
        "Activity",
        "Analytics",
        "System",
        "Deployments",
        "My Settings",
        "Team Settings",
        "Help & Feedback",
        "Log Out",
    ];

    return (
        <Navbar
            isBordered
            isMenuOpen={isMenuOpen}
            onMenuOpenChange={setIsMenuOpen}
            className={'bg-gradient-to-tr from-teal-500 to-green-500 py-1'}
        >
            <NavbarContent className="sm:hidden" justify="start">
                <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
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
                    <Link href="#" aria-current={'page'} className={'text-white'}>
                        Songs
                    </Link>
                </NavbarItem>
                <NavbarItem isActive>
                    <Link href="#" aria-current="page" className={'text-white'}>
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
                <NavbarItem >
                    <Button as={Link} href="#" variant="flat" className={'bg-sky-600 text-white font-semibold px-3'}
                            isIconOnly
                    >
                        <BarChart3 size={20}/>
                    </Button>
                </NavbarItem>
                <NavbarItem className="hidden lg:flex">
                    <Button as={Link} href="#" variant="flat" className={'bg-sky-600 text-white font-semibold px-3'}
                    radius={"full"}
                    >
                        History
                    </Button>
                </NavbarItem>
                <NavbarItem className={'hidden lg:flex'}>
                    <Button as={Link} href="#" variant="flat" className={'bg-sky-600 text-white font-semibold px-3'}
                            radius={"full"}
                    >
                        Items
                    </Button>
                </NavbarItem>
            </NavbarContent>

            <NavbarMenu>
                {menuItems.map((item, index) => (
                    <NavbarMenuItem key={`${item}-${index}`}>
                        <Link
                            className="w-full"
                            color={
                                index === 2 ? "warning" : index === menuItems.length - 1 ? "danger" : "foreground"
                            }
                            href="#"
                            size="lg"
                        >
                            {item}
                        </Link>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar>
    );
}