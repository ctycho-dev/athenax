import { Link } from "react-router-dom";
import {
    BsTwitterX,
    // BsDiscord 
} from "react-icons/bs";
import { FaLinkedin } from "react-icons/fa6";
// import { FaTelegram } from "react-icons/fa6";

interface FooterProps { }

export const Footer: React.FC<FooterProps> = ({ }) => {

    return (
        <footer>
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
        </footer>
    )
}