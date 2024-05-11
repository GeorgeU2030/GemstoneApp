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
    Image,
    Card,
    CardFooter,
    CardBody
} from "@nextui-org/react";
import {BarChart3, LogOut} from "lucide-react";
import {useRouter} from "next/navigation";

export default function Menu(){
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const router = useRouter()
    const menuItems = [
        "Songs",
        "Ranking",
        "Awards",
        "History",
        "Items",
        "Log Out",
    ];

    const gotoRoute = (route: string) => {
        router.push(`/${route}`)
    }

    return (
        <div className={'flex flex-col min-h-screen bg-sky-200 w-full'}>
            <Navbar
                isBordered
                isMenuOpen={isMenuOpen}
                onMenuOpenChange={setIsMenuOpen}
                className={'bg-gradient-to-tr from-teal-500 to-green-500 py-1'}
            >
                <NavbarContent className="sm:hidden" justify="start">
                    <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"}/>
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
                        <Link onClick={()=>gotoRoute('ranking')} aria-current="page" className={'text-white cursor-pointer'}>
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
                    <NavbarItem>
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
                    <NavbarItem className={'hidden lg:flex'}>
                        <Button as={Link} href="#" variant="flat"
                                className={'bg-teal-900 text-white font-semibold px-3'}
                                isIconOnly
                        >
                            <LogOut size={20}/>
                        </Button>
                    </NavbarItem>
                </NavbarContent>

                <NavbarMenu>
                    {menuItems.map((item, index) => (
                        <NavbarMenuItem key={`${item}-${index}`}>
                            <Link
                                className={`w-full font-semibold ${index === menuItems.length - 1 ? 'text-red-500' : 'text-teal-900'}`}
                                href="#"
                                size="lg"
                            >
                                {item}
                            </Link>
                        </NavbarMenuItem>
                    ))}
                </NavbarMenu>
            </Navbar>

            <div className={'flex flex-col md:flex-row w-full flex-grow h-full bg-purple-600'}>
                <section className={'w-full md:w-1/2 bg-red-500 mb-4 mt-4 md:mt-0 md:mb-0 flex justify-center items-center'}>
                    <div className={'w-1/2'}>
                        <h1 className={'text-center mb-2'}>Your Top 3 Artist</h1>
                        <Card className="py-4">
                            <CardBody className="overflow-visible py-2 flex justify-center items-center">
                                <Image
                                    alt="Card background"
                                    className="object-cover rounded-xl"
                                    src="https://nextui.org/images/hero-card-complete.jpeg"
                                    width={270}
                                />
                            </CardBody>
                            <CardFooter className="pb-0 pt-2 px-4 flex-col items-start">
                                <p className="text-tiny uppercase font-bold">Daily Mix</p>
                                <small className="text-default-500">12 Tracks</small>
                                <h4 className="font-bold text-large">Frontend Radio</h4>
                            </CardFooter>
                        </Card>
                    </div>
                </section>
                <section className={'w-full md:w-1/2 bg-yellow-500'}>

                </section>
            </div>
        </div>
    );
}