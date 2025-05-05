import React from "react";
import { Link, useNavigate } from "react-router-dom";

import sky from '@/assets/audit/sky.png'


interface SubmitedProps { }


export const Submited: React.FC<SubmitedProps> = ({ }) => {
    const navigate = useNavigate()



    return (
        <main className="bg-gray-1 h-screen w-screen">
            <div className="relative flex w-full h-full items-center justify-center">
                <div>
                    <h2 className="text-center text-white text-[28px] font-semibold mb-2" style={{ lineHeight: '28px' }}>Thanks! All Done!</h2>
                    <div className="mx-2 mb-10 text-center text-base font-normal text-gray-3">
                        We’ll double-check the info, we’ll create<br />
                        a page with your researches and we’ll notify<br /> you as soon as it’s done
                    </div>
                    <button
                        onClick={() => { navigate('/') }}
                        className="w-full px-5 py-4 rounded-[8px] bg-light-blue-3 hover:bg-light-blue-2 duration-150 transition-all hover:cursor-pointer">
                        <span className="text-white text-lg font-semibold">Go to Main Page</span>
                    </button>
                </div>
                <div className="absolute left-1/2 -translate-x-1/2 bg-black-1 rounded-2xl px-8 py-6 bottom-16">
                    <div className="flex gap-8">
                        <div className="flex items-center">
                            <img src={sky} alt="" className="w-[106px]"/>
                        </div>
                        <div>
                            <div className="text-base font-semibold text-white mb-2">Athena X Needs Your Help!</div>
                            <div className="max-w-[466px] text-gray-3 font-normal text-base" style={{ lineHeight: '22px' }}>If you have any idea how to make the process of adding researches easier or more comfortable, please don’t hesitate to <Link to={'mailto:info@athenax.co'} className="underline hover:text-white">drop us a line</Link></div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
} 