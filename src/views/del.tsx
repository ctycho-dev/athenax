import React from "react";
import { Link } from "react-router-dom";

import logoWithName from '@/assets/logo-with-name.svg'


interface AuditProps { }


export const Audit: React.FC<AuditProps> = ({ }) => {

    return (
        <>
            <main className="bg-gray-1 grid grid-cols-2 h-screen p-4">
                <aside className="flex flex-col justify-center items-center">
                    <div className="max-w-[397px]">
                        <img src={logoWithName} alt="" className="mb-[48px] group-hover:stroke-[#fff]" />
                        <h1 className="text-white text-[28px] font-semibold mb-4" style={{ lineHeight: '42px' }}>
                            Showcase & Verify<br />
                            Your Project on Athena X
                        </h1>
                        <h3 className="text-base font-normal mb-[32px]">
                            Upload key information, audits, and research
                            about your project to build trust, enhance visibility,
                            and provide transparency to the Web3 community. Help investors and users make informed decisions with verified data.
                        </h3>
                        <Link
                            to={'/audit-form'}
                            className="bg-light-blue-3 hover:bg-light-blue-2 transition-all duration-150 py-4 px-5 rounded-[8px] text-[18px] text-white"
                            style={{ fontWeight: 600 }}
                        >Add Documents About The Project</Link>
                    </div>
                </aside>
                <aside className="flex items-center">
                    <picture className="h-full">
                        <source srcSet="https://link.storjshare.io/raw/jxqdphanw5xdvjsdrrdp7wwajsoq/athenax/audit/auditLogo.webp" type="image/webp" />
                        <source srcSet="https://link.storjshare.io/raw/jwzmowueczxhmzuofq3746b3hn6q/athenax/audit/auditLogo-2x.png 2x, https://link.storjshare.io/raw/jxc5qu7cvasp6m4vtxfjslsny2ia/athenax/audit/auditLogo-3x.png 3x" type="image/png" />
                        <img src="https://link.storjshare.io/raw/jxc5qu7cvasp6m4vtxfjslsny2ia/athenax/audit/auditLogo-3x.png" srcSet="https://link.storjshare.io/raw/jwzmowueczxhmzuofq3746b3hn6q/athenax/audit/auditLogo-2x.png 2x, https://link.storjshare.io/raw/jxc5qu7cvasp6m4vtxfjslsny2ia/athenax/audit/auditLogo-3x.png 3x" alt="News" />
                    </picture>
                </aside>
            </main>
        </>
    )
} 