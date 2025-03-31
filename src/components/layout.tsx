// src/components/Layout.js
import { AppShell } from '@mantine/core';
import { Link, Outlet } from 'react-router-dom';

export default function Layout() {
    return (
        <AppShell
            // header={{ height: "64px", }}
            navbar={{
                width: '280px',
                breakpoint: 'sm',
            }}
            padding="md"
        >
            {/* <AppShell.Header zIndex={1} className='bg-[#20505E] h-16 grid px-4' >
            <div>header</div>
            </AppShell.Header> */}

            <AppShell.Navbar>
                <div>navbar</div>
            </AppShell.Navbar>

            <AppShell.Main>
                <Outlet />
            </AppShell.Main>
        </AppShell>
    );
}