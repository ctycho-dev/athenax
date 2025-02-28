import React, { useRef, useState, FormEvent } from "react";
import { Link } from "react-router-dom";
import logoWhite from '/athenax-white.svg';
import gradientTop from '../assets/gradient-top.png';
import gradientBottom from '../assets/gradient-bottom.png';
import checkIcon from '../assets/check.svg';

import { BsTwitterX, BsDiscord } from "react-icons/bs";
import { FaTelegram } from "react-icons/fa6";
import axios from "axios";
import { Toaster, toast } from 'sonner';

interface HomeProps { }

export const Home: React.FC<HomeProps> = ({ }) => {
    const emailRef = useRef<HTMLInputElement>(null);
    const [isDisabled, setIsDisabled] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!emailRef.current || !emailRef.current.value) {
            setError('Please enter an email address.');
            return;
        }

        if (!emailRef.current.checkValidity()) {
            setError('Please enter a valid email address.');
            return;
        }

        setIsDisabled(true)
        const email = emailRef.current.value;

        try {
            const res = await axios.post('https://athenax-backend.tech/store-email', {
                email: email
            });

            if (res.status !== 200) {
                toast.error('Something went wrong. Try again in a few minutes.');
            } else {
                setSubmitted(true);
                setError('');
            }
        } catch (error) {
            toast.error('Something went wrong. Try again in a few minutes.');
        } finally {
            setIsDisabled(false);
        }
    };

    const handleInputChange = () => {
        if (error) {
            setError('');
        }
    };

    return (
        <>
            <div className="pt-14 px-4 h-screen flex flex-col justify-between">
                <div className="flex flex-col justify-center">
                    <div className="flex justify-center">
                        <img src={logoWhite} alt="" className="h-12 md:h-14 z-10" />
                    </div>
                </div>
                <div>
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6">Athena X: Your All-in-One<br /> Web3 Data &<br /> Research Hub</h1>
                    <h3 className="text-sm sm:text-md md:text-lg text-center mb-12">
                        Access in-depth blockchain data analytics<br /> and cryptocurrency insights.<br />Leverage expert-driven research for real-time Web3 intelligence.
                    </h3>
                    <div className="flex justify-center">
                        {submitted ? (
                            <div className="flex items-center justify-center gap-x-2 text-light-4">
                                <img src={checkIcon} alt="Check" />
                                Thanks! We‘ve added you to the waitlist.
                            </div>
                        ) : (
                            <form action='#' onSubmit={handleSubmit} noValidate className="w-full flex justify-center">
                                <div className="w-full justify-center grid gap-y-2 sm:flex">
                                    <div className="">
                                        <input
                                            ref={emailRef}
                                            id="email"
                                            name="email"
                                            type="email"
                                            autoComplete="email"
                                            placeholder="Enter Your Email"
                                            className={`h-12 sm:h-14 w-80 sm:w-96 bg-dark-1 px-4 outline-none rounded-lg ${
                                                error ? 'border border-red-500' : ''
                                            } disabled:opacity-50 disabled:cursor-not-allowed`}
                                            pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                                            required
                                            onChange={handleInputChange}
                                            disabled={isDisabled}
                                        />
                                        {error && <div className="text-xs text-red-500 mt-2">{error}</div>}
                                    </div>
                                    <button
                                        type="submit"
                                        className="h-12 sm:h-14 px-4 sm:-ml-4 bg-light-1 hover:bg-light-2 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                        disabled={isDisabled}
                                    >
                                        Join the Waitlist Now
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
                <div className="py-6 flex justify-center gap-x-6 z-10">
                    <Link to={'https://x.com/athenax_co?s=21'} target="_blank">
                        <BsTwitterX className="text-2xl text-dark-2 hover:text-gray-600" />
                    </Link>
                    {/* <BsDiscord className="text-2xl text-dark-2 hover:text-gray-600" /> */}
                    {/* <FaTelegram className="text-2xl text-dark-2 hover:text-gray-600" /> */}
                </div>
            </div>
            <div className="absolute left-0 top-0 -z-10">
                <img src={gradientTop} alt="" />
            </div>
            <div className="absolute right-0 bottom-0 -z-10">
                <img src={gradientBottom} alt="" />
            </div>
            <Toaster richColors position="top-right" />
        </>
    );
};