'use client';
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
import { useState, useEffect } from 'react';

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
      title: headerDict['home'] || 'Inicio',
      href: '/',
      description: '',
    },
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

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const mobileMenu = document.getElementById('mobile-menu');
      const hamburgerButton = document.getElementById('hamburger-button');

      if (mobileMenu && hamburgerButton &&
        !mobileMenu.contains(event.target as Node) &&
        !hamburgerButton.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <header className="container mx-auto sticky top-0 left-0 z-40 w-full bg-white lg:bg-[#1D4971] text-[#1D4971] lg:text-white shadow-sm">
      <div className=" relative flex min-h-20 flex-row items-center px-4 lg:px-6">
        {/* Logo on the left */}
        <div className="flex items-center gap-2">
          <Link href="/" className="relative w-20 h-20 rounded-full overflow-hidden flex items-center justify-center">
            <Image
              src={Logo}
              alt="Logo"
              fill
              className="lg:dark:invert object-contain p-1"
              priority
            />
          </Link>
        </div>

        {/* Navigation items in center for desktop */}
        <div className="hidden lg:flex justify-center flex-1">
          <NavigationMenu>
            <NavigationMenuList className="flex flex-row justify-center gap-4">
              {navigationItems.map((item, index) => (
                <NavigationMenuItem key={`nav-item-${index}`}>
                  {item.href ? (
                    <>
                      <NavigationMenuLink asChild>
                        <Button variant="ghost" className="text-[#1D4971] lg:text-white hover:text-[#1D4971] lg:hover:text-white hover:bg-gray-100 lg:hover:bg-[#2E5A86]" asChild>
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
                      <NavigationMenuTrigger className="font-medium text-sm text-[#1D4971] lg:text-white hover:text-[#1D4971] lg:hover:text-white hover:bg-gray-100 lg:hover:bg-[#2E5A86]">
                        {item.title}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent className="!w-[450px] p-4 bg-white lg:bg-[#1D4971]">
                        <div className="flex grid-cols-2 flex-col gap-4 lg:grid">
                          <div className="flex h-full flex-col justify-between">
                            <div className="flex flex-col">
                              <p className="text-base text-[#1D4971] lg:text-white">{item.title}</p>
                              <p className="text-gray-600 lg:text-gray-300 text-sm">
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

        {/* Mobile menu button */}
        <div className="ml-auto lg:hidden">
          <Button
            variant="ghost"
            className="text-[#1D4971] p-3"
            onClick={() => setOpen(!isOpen)}
            id="hamburger-button"
          >
            {isOpen ?
              <X style={{ width: '30px', height: '30px', minWidth: '30px', minHeight: '30px' }} strokeWidth={2.5} /> :
              <Menu style={{ width: '30px', height: '30px', minWidth: '30px', minHeight: '30px' }} strokeWidth={2.5} />
            }
          </Button>
        </div>

        {/* Mobile menu overlay */}
        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setOpen(false)}
            />

            {/* Mobile menu */}
            <div
              id="mobile-menu"
              className="fixed top-20 left-0 w-full bg-white py-6 shadow-lg z-40 lg:hidden"
            >
              <nav className="flex flex-col gap-2 px-4">
                {navigationItems.map((item, index) => (
                  <div
                    key={`mobile-nav-item-${index}`}
                    className="border-b border-gray-200 last:border-none"
                  >
                    {item.href ? (
                      <Link
                        href={item.href}
                        className="flex items-center justify-between py-4 text-[#1D4971] hover:text-cyan-600 transition-colors"
                        target={item.href.startsWith('http') ? '_blank' : undefined}
                        rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        onClick={() => setOpen(false)}
                      >
                        <span className="text-base font-medium">{item.title}</span>
                        <MoveRight className="h-4 w-4 stroke-2" />
                      </Link>
                    ) : (
                      <p className="py-4 text-base font-medium text-[#1D4971]">{item.title}</p>
                    )}
                  </div>
                ))}
              </nav>
            </div>
          </>
        )}
      </div>
    </header>
  );
};

