'use client';

import { env } from '@/env';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@repo/design-system/components/ui/navigation-menu';
import { Button } from '@repo/design-system/components/ui/button';
import { Menu, MoveRight, X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import type { Dictionary } from '@repo/internationalization';
import Image from 'next/image';
import Logo from '@/public/logo.png';

type HeaderProps = {
  dictionary: Dictionary;
};

export const Header = ({ dictionary }: HeaderProps) => {
  // Utilizar acceso indexado para evitar errores de TypeScript
  const headerDict = dictionary.web.header as Record<string, any>;

  const navigationItems = [
    {
      title: headerDict['about'] || 'Nosotros',
      href: '/about',
      description: '',
    },
    {
      title: headerDict['contact'] || 'Contacto',
      href: '/contact',
      description: '',
    },
    {
      title: headerDict['sucursalVirtual'] || 'Sucursal virtual',
      href: 'https://clientes.netfull.net/cliente/login',
      target: '_blank',
      description: '',
    },
    {
      title: headerDict['pagaTuBoleta'] || 'Pagá tu boleta',
      href: 'https://clientes.netfull.net/cliente/webpay',
      target: '_blank',
      description: '',
    },
  ];

  const [isOpen, setOpen] = useState(false);
  return (
    <header className="sticky top-0 left-0 z-40 w-full bg-[#1D4971] text-white">
      <div className="container relative mx-auto flex min-h-20 flex-row items-center">
        {/* Logo on the left */}
        <div className="flex items-center gap-2 w-1/4">
          <Link href="/" className="relative w-14 h-14 rounded-full overflow-hidden">
            <Image
              src={Logo}
              alt="Logo"
              fill
              className="dark:invert"
              priority
            />
          </Link>
        </div>

        {/* Navigation items in center for desktop */}
        <div className="hidden lg:flex justify-center w-1/2">
          <NavigationMenu>
            <NavigationMenuList className="flex flex-row justify-center gap-4">
              {navigationItems.map((item, index) => (
                <NavigationMenuItem key={`nav-item-${index}`}>
                  {item.href ? (
                    <>
                      <NavigationMenuLink asChild>
                        <Button variant="ghost" className="text-white hover:text-white hover:bg-[#2E5A86]" asChild>
                          <Link href={item.href}
                            target={
                              item.href.startsWith('http') ? '_blank' : undefined
                            }
                          >{item.title}</Link>
                        </Button>
                      </NavigationMenuLink>
                    </>
                  ) : (
                    <>
                      <NavigationMenuTrigger className="font-medium text-sm text-white hover:text-white hover:bg-[#2E5A86]">
                        {item.title}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent className="!w-[450px] p-4 bg-[#1D4971]">
                        <div className="flex grid-cols-2 flex-col gap-4 lg:grid">
                          <div className="flex h-full flex-col justify-between">
                            <div className="flex flex-col">
                              <p className="text-base text-white">{item.title}</p>
                              <p className="text-gray-300 text-sm">
                                {item.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      </NavigationMenuContent>
                    </>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Empty space to balance the layout */}
        <div className="w-1/4 flex justify-end">
          {/* Mobile menu toggle */}
          <div className="flex items-center lg:hidden">
            <Button variant="ghost" className="text-white" onClick={() => setOpen(!isOpen)}>
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            {isOpen && (
              <div className="container absolute top-20 right-0 flex w-full flex-col gap-8 border-t bg-[#1D4971] py-4 shadow-lg">
                {navigationItems.map((item, index) => (
                  <div key={`mobile-nav-item-${index}`}>
                    <div className="flex flex-col gap-2">
                      {item.href ? (
                        <Link
                          href={item.href}
                          className="flex items-center justify-between text-white"
                          target={
                            item.href.startsWith('http') ? '_blank' : undefined
                          }
                          rel={
                            item.href.startsWith('http')
                              ? 'noopener noreferrer'
                              : undefined
                          }
                        >
                          <span className="text-lg">{item.title}</span>
                          <MoveRight className="h-4 w-4 stroke-1 text-gray-300" />
                        </Link>
                      ) : (
                        <p className="text-lg text-white">{item.title}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
