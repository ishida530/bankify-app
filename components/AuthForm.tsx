'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import CustomInput from './CustomInput'
import { authFormSchema } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import SignUp from '@/app/(auth)/sign-up/page'
import { useRouter } from 'next/navigation'
import { signIn, signUp } from '@/lib/actions/user.actions'



const AuthForm = ({ type }: { type: string }) => {
    const router = useRouter()
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(false)



    const formSchema = authFormSchema(type)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: ''
        },
    })

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        setIsLoading(true)

        try {
            console.log(data)
            setIsLoading(false)
            if (type === 'sign-up') {
                const newUser = await signUp(data)

                setUser(newUser)
            }
            if (type === 'sign-in') {
                const response = await signIn({
                    email: data.email,
                    password: data.password
                })
                if (response) router.push('/')
            }
        } catch (error) {
            console.log(error)

        } finally {
            setIsLoading(false)
        }
    }


    return (
        <section className='auth-form'>
            <header className='flex flex-col gap-5 md:gap-8'>
                <Link href='/' className='mb-12 cursor-pointer items-center gap-1 flex '>
                    <Image
                        src={'/icons/logo.svg'}
                        width={34}
                        height={34}
                        alt='Horizon logo'
                        className='size-[24px] max-xl:size-14' />
                    <h1 className='text-26 font-ibm-plex-serif font-bold text-black-1'>Horizon</h1>
                </Link>
                <div className='flex flex-col gap-1 md:gap:3'>
                    <h1 className='text-24 lg:text-36 font-semibold text-gray-900'>
                        {user
                            ? 'Link Account'
                            : type === 'sign-in'
                                ? 'Sign-In'
                                : 'Sign-Up'
                        }
                        <p className='text-16 font-normal text-gray-600'>
                            {user
                                ? 'Link your account to get started'
                                : 'Please enter your details'
                            }
                        </p>
                    </h1>
                </div>
            </header>
            {user ? (
                <div className='flex flex-col gap-4'>
                    {/* PlaidLink */}
                </div>
            ) : (
                <>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            {type === 'sign-up' && (
                                <>
                                    <div className='flex gap-4'>
                                        <CustomInput control={form.control} placeholder={'Enter your first  name'} label={'First Name'} name={'firstName'} />
                                        <CustomInput control={form.control} placeholder={'Enter your last  name'} label={'Last Name'} name={'lastName'} />
                                    </div>

                                    <CustomInput control={form.control} placeholder={'Enter your last  specific address'} label={'Address'} name={'address1'} />
                                    <CustomInput control={form.control} placeholder={'Enter your city'} label={'City'} name={'city'} />
                                    <div className='flex gap-4'>
                                        <CustomInput control={form.control} placeholder={'Example: NY'} label={'State'} name={'state'} />
                                        <CustomInput control={form.control} placeholder={'Example: 11101'} label={'Postal Code'} name={'postalCode'} />
                                    </div>

                                    <div className='flex gap-4'>
                                        <CustomInput control={form.control} placeholder={'YYYY-MM-DD'} label={'Date of Birth'} name={'dateOfBirth'} />
                                        <CustomInput control={form.control} placeholder={'Example: 1234'} label={'SSN'} name={'ssn'} />
                                    </div>
                                </>

                            )}

                            <CustomInput control={form.control} placeholder={'Enter your Email'} label={'Email'} name={'email'} />

                            <CustomInput control={form.control} placeholder={'Enter your password'} label={'Password'} name={'password'} />

                            <div className='flex flex-col gap-4'>
                                <Button className='form-btn' type="submit" disabled={isLoading}>
                                    {isLoading ? (
                                        <>
                                            <Loader2 size={20} className='animate-spin' /> &nbsp; Loading...
                                        </>
                                    ) : type === 'sign-in'
                                        ? 'Sign-in' : 'Sign-up'}

                                </Button>
                            </div>

                        </form>
                    </Form>
                    <footer className='flex justify-center gap-1'>
                        <p className='text-14 font-normal teext-gray-600'>
                            {type === 'sign-in'
                                ? "Don't have an account?"
                                : "Alreadt have an account?"}</p>
                        <Link href={type === 'sign-in' ? '/sign-up' : '/sign-in'} className='form-link'>
                            {type === 'sign-in'
                                ? 'Sign-up'
                                : 'Sing-in'}
                        </Link>
                    </footer>
                </>
            )}

        </section >
    )
}

export default AuthForm