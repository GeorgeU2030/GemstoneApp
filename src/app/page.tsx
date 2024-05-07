"use client"

import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, Popover, PopoverTrigger, PopoverContent,Card, CardHeader, CardBody} from "@nextui-org/react";
import {Image} from "@nextui-org/react";
import {Diamond} from "@/icons/Diamond";
import {Ruby} from "@/icons/Ruby";
import {Emerald} from "@/icons/Emerald";
import {Sapphire} from "@/icons/Sapphire";


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


      <div className={'flex flex-col md:flex-row flex-grow '}>
           <section className={'w-full md:w-2/3 flex flex-col justify-center items-center mt-3 md:mt-0'}>
               <div className={'w-5/6 md:w-2/3 mb-4'}>
                    <span className={'text-xl text-teal-950 font-semibold text-center'}> Welcome to Gemstone, your ultimate music discovery app! </span>
                    <h3 className={'text-teal-800 text-center md:text-start'}>
                    Gemstone is a way you explore music. with Gemstone, you will embark on a journey to discover your favorite artists like never before.
                    Our unique platform awards artists on a weekly, monthly, semiannual, and annual basis, recognizing their talent and contribution to the world of music. Each artist has the chance to shine bright like a diamond, as we classify their songs into four distinct gem categories
                    </h3>
                   <div className={'flex mt-3 justify-center'}>
                       <Popover placement="bottom" showArrow={true} >
                           <PopoverTrigger>
                               <Button isIconOnly aria-label="Like" className={'w-12 h-12 bg-sky-200 border-teal-600'} variant={'bordered'}>
                                   <Diamond/>
                               </Button>
                           </PopoverTrigger>
                           <PopoverContent>
                               <div className="px-1 py-2">
                                   <div className="text-small font-bold text-sky-600">Diamond</div>
                               </div>
                           </PopoverContent>
                       </Popover>
                       <Popover placement="bottom" showArrow={true} >
                           <PopoverTrigger>
                               <Button isIconOnly aria-label="Like" className={'w-12 h-12 bg-red-200 border-teal-600 ml-2'} variant={'bordered'}>
                                   <Ruby/>
                               </Button>
                           </PopoverTrigger>
                           <PopoverContent>
                               <div className="px-1 py-2">
                                   <div className="text-small font-bold text-red-600">Ruby</div>
                               </div>
                           </PopoverContent>
                       </Popover>
                       <Popover placement="bottom" showArrow={true} >
                           <PopoverTrigger>
                               <Button isIconOnly aria-label="Like" className={'w-12 h-12 bg-emerald-300 border-teal-600 ml-2'} variant={'bordered'}>
                                   <Emerald/>
                               </Button>
                           </PopoverTrigger>
                           <PopoverContent>
                               <div className="px-1 py-2">
                                   <div className="text-small font-bold text-emerald-600">Emerald</div>
                               </div>
                           </PopoverContent>
                       </Popover>
                       <Popover placement="bottom" showArrow={true} >
                           <PopoverTrigger>
                               <Button isIconOnly aria-label="Like" className={'w-12 h-12 bg-purple-300 border-teal-600  ml-2'} variant={'bordered'}>
                                   <Sapphire/>
                               </Button>
                           </PopoverTrigger>
                           <PopoverContent>
                               <div className="px-1 py-2">
                                   <div className="text-small font-bold text-purple-600">Sapphire</div>
                               </div>
                           </PopoverContent>
                       </Popover>
                   </div>
               </div>
           </section>
          <section
              className={'w-full mt-3 mb-3 md:mt-0 md:mb-0 md:w-1/2 flex flex-col items-center justify-center flex-grow'}>
              <h1 className={'mb-3 text-teal-950 font-semibold'}>Top Artist 2023</h1>
              <div className={'w-5/6 md:w-2/3 flex '}>
                  <Card className="py-1 bg-teal-400">
                      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                          <p className="text-tiny uppercase font-bold text-teal-950">Taylor Swift</p>
                      </CardHeader>
                      <CardBody className="overflow-visible py-2">
                          <Image
                              alt="Card background"
                              className="object-cover rounded-xl"
                              src="https://media.glamour.mx/photos/65c044c855e502e6b3eb125d/1:1/w_2000,h_2000,c_limit/taylor-swift.grammys-2024.jpg"
                              width={200}
                              height={200}
                          />
                      </CardBody>
                  </Card>
                  <Card className="py-1 ml-4 bg-teal-400">
                      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                          <p className="text-tiny uppercase font-bold text-teal-950">Bad Bunny</p>
                      </CardHeader>
                      <CardBody className="overflow-visible py-2">
                          <Image
                              alt="Card background"
                              className="object-cover rounded-xl"
                              src="https://media.vogue.mx/photos/6536e3dd03527b847813ad07/1:1/w_1992,h_1992,c_limit/bad-bunny-conciertos.jpg"
                              width={200}
                              height={200}
                          />
                      </CardBody>
                  </Card>
              </div>
              <div className={'w-5/6 md:w-2/3 flex mt-4 mb-4'}>
                  <Card className="py-1 bg-teal-400">
                      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                          <p className="text-xs font-bold text-teal-950">The Weeknd</p>
                      </CardHeader>
                      <CardBody className="overflow-visible py-2">
                          <Image
                              alt="Card background"
                              className="object-cover rounded-xl"
                              src="https://images.sk-static.com/images/media/profile_images/artists/4363463/huge_avatar"
                              width={250}
                              height={250}
                          />
                      </CardBody>
                  </Card>
                  <Card className="py-1 ml-4 bg-teal-400">
                      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                          <p className="text-tiny font-bold text-teal-950 mt-2 md:mt-0">Drake</p>
                      </CardHeader>
                      <CardBody className="overflow-visible py-2 mt-2 md:mt-0">
                          <Image
                              alt="Card background"
                              className="object-cover rounded-xl"
                              src="https://parade.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MjAzNTM0NzYwMzE0Njc2NTcy/drake-net-worth.jpg"
                              width={250}
                              height={250}
                          />
                      </CardBody>
                  </Card>
                  <Card className="py-1 ml-4 bg-teal-400">
                      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                          <p className="text-tiny font-bold text-teal-950 mt-2 md:mt-0">Peso Pluma</p>
                      </CardHeader>
                      <CardBody className="overflow-visible py-2 mt-2 md:mt-0">
                          <Image
                              alt="Card background"
                              className="object-cover rounded-xl"
                              src="https://notidex.com/wp-content/uploads/2024/01/Peso-pluma-en-Festival-Vina-del-Mar.jpg"
                              width={250}
                              height={250}
                          />
                      </CardBody>
                  </Card>
              </div>
          </section>
      </div>
    </div>
  );
}
