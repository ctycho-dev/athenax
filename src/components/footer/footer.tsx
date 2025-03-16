import { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import { useForm } from '@mantine/form';
import { TextInput, Button, Box, Group } from '@mantine/core';
import { Toaster, toast } from 'sonner';

import CustomSection from "@/components/customSection";
import Title from '@/components/title'
import Subtitle from '@/components/subtitle'
import {
    BsTwitterX,
    // BsDiscord 
} from "react-icons/bs";
import { FaLinkedin } from "react-icons/fa6";
// import { FaTelegram } from "react-icons/fa6";

import checkIcon from '@/assets/check.svg';
import gradient from '@/assets/footer-gradient.png';



interface FooterProps {
    formRef: any
}

export const Footer: React.FC<FooterProps> = ({ formRef }) => {
    const [isDisabled, setIsDisabled] = useState(false);
    const [submitted, setSubmitted] = useState(false);


    const form = useForm({
        initialValues: {
            email: '',
        },
        validate: {
            email: (value: string) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value) ? null : 'Please enter a valid email address.',
        },
    });

    const handleSubmit = async () => {
        if (form.validate().hasErrors) {
            toast.error('Пожалуйста, заполните все обязательные поля корректно.');
            return;
        }
        setIsDisabled(true)

        try {
            const res = await axios.post('https://athenax-backend.tech/store-email/', {
                email: form.values.email
            });

            if (res.status !== 200) {
                toast.error('Something went wrong. Try again in a few minutes.');
            } else {
                setSubmitted(true);
            }
        } catch (error) {
            toast.error('Something went wrong. Try again in a few minutes.');
        } finally {
            setIsDisabled(false);
        }
    };

    return (
        <footer className="relative">
            <CustomSection>
                <Title className="mb-10">Join Waitlist Now</Title>
                <div className="md:flex justify-center">
                    {submitted ? (
                        <div className="flex items-center justify-center gap-x-2 text-light-4">
                            <img src={checkIcon} alt="Check" />
                            Thanks! We‘ve added you to the waitlist.
                        </div>
                    ) : (
                        <form ref={formRef} id="wishlist" onSubmit={form.onSubmit(handleSubmit)} className="relative grid">
                            <TextInput
                                name="email"
                                autoComplete="email"
                                required
                                placeholder="Enter Your Email"
                                {...form.getInputProps('email')}
                                className="md:w-xl mb-2"
                                size='lg'
                            />
                            <Button
                                type="submit"
                                className="wishlist-btn"
                                disabled={isDisabled}
                                loaderProps={{ type: 'dots' }}
                                size="lg"
                            >Join the Waitlist Now</Button>
                        </form>
                    )}
                </div>
            </CustomSection>
            <div>
                <div className="py-6 flex justify-center gap-x-6 z-10">
                    <Link to={'https://x.com/athenax_co?s=21'} target="_blank">
                        <BsTwitterX className="text-2xl text-dark-2 hover:text-gray-600" />
                    </Link>
                    <Link to={'https://x.com/athenax_co?s=21'} target="_blank">
                        <FaLinkedin className="text-2xl text-dark-2 hover:text-gray-600" />
                    </Link>
                    {/* <BsDiscord className="text-2xl text-dark-2 hover:text-gray-600" /> */}
                    {/* <FaTelegram className="text-2xl text-dark-2 hover:text-gray-600" /> */}
                </div>
            </div>
            <div className="absolute left-0 bottom-0 -z-10 w-96">
                <img src={gradient} alt="" />
            </div>
            <Toaster richColors position="top-right" />
        </footer>
    )
}

// white opacity 40