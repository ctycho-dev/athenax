import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu } from '@mantine/core';
import Title from "./title";

const DashboardHeader = () => {
    const [openedDropdown, setOpenedDropdown] = useState(false);

    return (
        <div className="border-b border-gray-2 px-6 py-3.5 flex justify-between items-center">
            <Title>Dashboard</Title>
            <div>
                <Menu opened={openedDropdown} onChange={setOpenedDropdown} shadow="md" width={200}>
                    <Menu.Target>
                        <button
                            onClick={() => { setOpenedDropdown(true) }}
                            className="group h-[46px] rounded-medium w-full border border-border text-border px-4 flex gap-2 items-center justify-center hover:cursor-pointer hover:text-white hover:border-white hover:opacity-80">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="stroke-border group-hover:stroke-white">
                                <path d="M8 3.33301V12.6663" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M3.3335 8H12.6668" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span className="text-sm font-semibold">Add your Project Info</span>
                        </button>
                    </Menu.Target>

                    <Menu.Dropdown styles={{
                        dropdown: {
                            background: '#23232B',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.25)',
                            border: 0
                        }
                    }}>
                        <Menu.Item color="white">
                            <Link to='/audit-form'>
                                Create Audit Report
                            </Link>
                        </Menu.Item>
                        <Menu.Item color="white">
                            <Link to='/research-form'>
                                Create Research Report
                            </Link>
                        </Menu.Item>
                    </Menu.Dropdown>
                </Menu>
            </div>
        </div>
    )
}

export default DashboardHeader