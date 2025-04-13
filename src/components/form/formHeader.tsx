import { Link } from "react-router-dom";
import arrowLeft from '@/assets/audit/arrow-left.svg'


interface FormHeaderProps {
    title: string;
    description: React.ReactNode;
}

export const FormHeader = ({ title, description }: FormHeaderProps) => (
    <header className="pt-[48px] grid gap-12 pb-12">
        <div>
            <Link to={'/audit'} className="group flex gap-x-2 items-center">
                <img src={arrowLeft} alt="" className="group-hover:stroke-[#fff]" />
                <span className="text-sm font-normal">Exit Editing</span>
            </Link>
        </div>
        <div>
            <h2 className="text-[22px] font-semibold mb-4">{title}</h2>
            <div className="text-gray-3" style={{ lineHeight: '28px' }}>
                {description}
            </div>
        </div>
    </header>
);