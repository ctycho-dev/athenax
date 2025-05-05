// src/components/Layout.js
import { AppShell } from '@mantine/core';
import { Outlet } from 'react-router-dom';
import { Navbar } from './projectNavbar';

export default function Layout() {
    return (
        <AppShell
            navbar={{
                width: '280px',
                breakpoint: 'sm',
            }}
            padding="md"
        >

            <AppShell.Navbar>
                <Navbar />
            </AppShell.Navbar>

            <AppShell.Main style={{
                paddingLeft: '280px',
                paddingTop: '0',
                paddingBottom: '0',
                paddingRight: '0',
            }}>
                <Outlet />
            </AppShell.Main>
        </AppShell>
    );
}