import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Skeleton } from '@mantine/core';
import Title from "@/components/ui/pageTitle";
import { CombinedItem } from "@/types";
import State from "./state";
import { ReportState } from "@/enums";


interface SubmittedMaterialsProps {
    data: CombinedItem[];
    isLoading: boolean;
}

const SubmittedMaterials: React.FC<SubmittedMaterialsProps> = ({ data, isLoading }) => {
    const [openedDropdown, setOpenedDropdown] = useState(false);

    if (isLoading) {
        return (
            <>
                <Title className="mb-6">Submitted Materials</Title>
                <Skeleton height={300} radius="md" />
            </>
        );
    }

    if (data.length === 0) {
        return (
            <>
                <Title className="mb-6">Submitted Materials</Title>
                <div className="bg-console-card min-h-96 rounded-medium flex items-center justify-center">
                    <div>
                        <div className="mb-4 flex justify-center">
                            <picture>
                                <source srcSet="https://link.storjshare.io/raw/jxyu7fuxej6elzc4645wofi7dw4q/athenax/console/dashboard-file.webp 3x" type="image/webp" />
                                <source srcSet="https://link.storjshare.io/raw/jvd2kn43673r4vbe64gzygpsfypa/athenax/console/dashboard-file-2x.png 2x, https://link.storjshare.io/raw/jwrkdywgkbuoaefsvmgow6a6cyca/athenax/console/dashboard-file-3x.png 3x" type="image/png" />
                                <img src="https://link.storjshare.io/raw/jwrkdywgkbuoaefsvmgow6a6cyca/athenax/console/dashboard-file-3x.png" srcSet="https://link.storjshare.io/raw/jvd2kn43673r4vbe64gzygpsfypa/athenax/console/dashboard-file-2x.png 2x, https://link.storjshare.io/raw/jwrkdywgkbuoaefsvmgow6a6cyca/athenax/console/dashboard-file-3x.png 3x" alt="Chart" />
                            </picture>
                        </div>
                        <div className="text-center leading-6 mb-6">
                            <span className="text-gray-3 text-sm font-normal">Silence isn't very Web3.<br /> Drop your info, flex your project.<br />And Athena will write research about or audit you</span>
                        </div>
                        <div className="flex justify-center">
                            <Menu opened={openedDropdown} onChange={setOpenedDropdown} shadow="md" width={200}>
                                <Menu.Target>
                                    <button className="text-sm font-normal rounded-medium text-gray-3 border border-dashed border-gray-3 px-4 py-3 hover:text-white hover:border-white hover:cursor-pointer transition-colors duration-150">Add your Project Info</button>
                                </Menu.Target>

                                <Menu.Dropdown styles={{
                                    dropdown: {
                                        background: '#23232B',
                                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.25)',
                                        border: 0
                                    }
                                }}>
                                    {/* <Menu.Item color="white">
                                        <Link to='/submit/audit'>
                                            Create Audit Report
                                        </Link>
                                    </Menu.Item> */}
                                    <Menu.Item color="white">
                                        <Link to='/submit/research'>
                                            Create Research Report
                                        </Link>
                                    </Menu.Item>
                                </Menu.Dropdown>
                            </Menu>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <Title className="mb-6">Submitted Materials</Title>
            <table className="bg-console-card w-full overflow-scroll rounded-medium">
                <thead>
                    <tr className="border-b border-gray-2">
                        <th className="px-4 py-4 text-gray-3 font-normal text-sm text-start">Project Name</th>
                        <th className="px-4 py-4 text-gray-3 font-normal text-sm text-start">Status</th>
                        <th className="px-4 py-4 text-gray-3 font-normal text-sm text-start">Code</th>
                        <th className="px-4 py-4 text-gray-3 font-normal text-sm text-start">Research or Audit</th>
                        <th className="px-4 py-4 text-gray-3 font-normal text-sm text-start">Researcher Response</th>
                        <th className="px-4 py-4 text-gray-3 font-normal text-sm text-start">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.id} className="[&:not(:last-child)]:border-b border-gray-2">
                            <td className="px-4 py-4 text-sm font-medium">
                                {item.type === 'audit' ? item.steps.step1.name : item.steps.step1.name}
                            </td>
                            <td className="px-4 py-4">
                                <State state={item.state} />
                            </td>
                            <td className="px-4 py-4">
                                id
                                {/* {item.type === 'audit' ? item.steps.step2.codebase : 'N/A'} */}
                            </td>
                            <td className="px-4 py-4 text-sm capitalize font-medium">
                                {item.type}
                            </td>
                            <td className="px-4 py-4 text-sm font-medium">
                                {Array.isArray(item.comments) && item.comments.length > 0
                                    ? item.comments[item.comments.length - 1].content
                                    : 'No response yet'}
                            </td>
                            <td className="px-4 py-4 w-max">
                                <div className="flex gap-10 items-center w-max">
                                    {![ReportState.COMPLETED, ReportState.REJECTED].includes(item.state) &&
                                        <Link to={`/submit/${item.type}/${item.id}?step=1`} className="text-light-blue-3 hover:text-light-1 hover:cursor-pointer"><span className="font-medium text-sm">Edit Info</span></Link>
                                    }
                                    <button className="text-light-blue-3 hover:text-light-1 hover:cursor-pointer"><span className="font-medium text-sm">Delete Info</span></button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default SubmittedMaterials