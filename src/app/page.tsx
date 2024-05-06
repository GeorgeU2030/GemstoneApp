"use client"

import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";
import Image from 'next/image';


export default function Home() {

  return (
    <div className={'flex flex-col min-h-screen w-full bg-teal-100'}>
      <Navbar shouldHideOnScroll className={'bg-teal-600 py-2'}>
        <NavbarBrand>
            <Image src="/gemstone.png" alt="logo"  width={32} height={32}/>
            <p className="font-semibold text-inherit text-2xl ml-2">GemStone</p>
        </NavbarBrand>

        <NavbarContent justify="end" className={'ml-5'}>
          <NavbarItem >
            <Button as={Link} className={'bg-gradient-to-tr from-teal-500 to-green-500 text-white font-bold'} href="#" variant="flat"
            radius={'full'}
            >
              Login
            </Button>
          </NavbarItem>
          <NavbarItem>
            <Button as={Link} className={'bg-gradient-to-tr from-cyan-500 to-teal-500 text-white font-bold'} href="#" variant="flat"
            radius={'full'}
            >
              Sign Up
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>


      <div className={'flex flex-grow bg-red-600'}>
           <section className={'w-1/2'}>

           </section>
          <section className={'w-1/2'}>

          </section>
      </div>
    </div>
  );
}
