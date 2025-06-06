import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from '@mantine/form';
import { TextInput, Button } from '@mantine/core';
import { Toaster, toast } from 'sonner';
import { useAddToWishlistMutation } from "@/services/wishlistApi";

import CustomSection from "@/views/home/components/customSection";
import Title from '@/views/home/components/title'
import {
    BsTwitterX,
    // BsDiscord 
} from "react-icons/bs";
import { FaLinkedin } from "react-icons/fa6";
// import { FaTelegram } from "react-icons/fa6";
import checkIcon from '@/assets/home/check.svg';



interface FooterProps {
    formRef: any
}

export const Footer: React.FC<FooterProps> = ({ formRef }) => {
    const [isDisabled, setIsDisabled] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [addToWishlist] = useAddToWishlistMutation();


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
            const response = await addToWishlist(form.values.email)

            if (response && 'data' in response) {
                setSubmitted(true);
            } else {
                toast.error('Something went wrong. Try again in a few minutes.');
            }
        } catch (error) {
            toast.error('Something went wrong. Try again in a few minutes.');
        } finally {
            setIsDisabled(false);
        }
    };

    return (
        <footer className="relative h-[calc(90vh-48px)] md:h-[calc(90vh-96px)] flex flex-col">
            <CustomSection className="w-full flex-1 flex flex-col justify-center">
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
                <picture>
                    <source srcSet="https://link.storjshare.io/raw/jwrof5hro7gcailiwsxdjr4nzuqq/athenax/footer-gradient.webp" type="image/webp" />
                    <source srcSet="https://link.storjshare.io/raw/jxq6kkwr3jptldjtqi35umni6chq/athenax/footer-gradient.png" type="image/png" />
                    <img src="https://link.storjshare.io/raw/jxq6kkwr3jptldjtqi35umni6chq/athenax/footer-gradient.png" srcSet="https://link.storjshare.io/raw/jxq6kkwr3jptldjtqi35umni6chq/athenax/footer-gradient.png" alt="Footer gradient" />
                </picture>
            </div>
            <Toaster richColors position="top-right" />
        </footer>
    )
}

// white opacity 40