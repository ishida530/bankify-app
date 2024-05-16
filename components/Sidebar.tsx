'use client'
import { sidebarLinks } from '@/constants'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const Sidebar = ({ user }: SiderbarProps) => {


    const pathName = usePathname()
    return (
        <section className='sidebar'>
            <nav className='flex flex-col gap-4'>
                <Link href='/' className='mb-12 cursor-pointer items-center gap-2 flex'>
                    <Image
                        src={'/icons/logo.svg'}
                        width={34}
                        height={34}
                        alt='Horizon logo'
                        className='size-[24px] max-xl:size-14' />
                    <h1 className='sidebar-logo'>Horizon</h1>
                </Link>

                {sidebarLinks.map(item => {
                    const isActive = pathName === item.route || pathName.startsWith(`${item.route}/`)
                    return (
                        <Link
                            className={cn('sidebar-link', {
                                "bg-bank-gradient": isActive
                            })}
                            href={item.route}
                            key={item.label}>
                            <div className='relative size-6'>
                                <Image
                                    className={cn({ 'brightness-[3] invert-0': isActive })}
                                    src={item.imgURL}
                                    alt={item.label}
                                    fill
                                />

                            </div>
                            <div className={cn('sidebar-label', { '!text-white': isActive })}>
                                {item.label}
                            </div>
                        </Link>
                    )
                })}
                USER
            </nav>
            FOOTER
        </section>
    )
}

export default Sidebar