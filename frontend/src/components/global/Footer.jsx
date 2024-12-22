import { FaGithub } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { LuMailPlus } from "react-icons/lu";
import { ImLinkedin } from "react-icons/im";
import { toast } from "sonner";

function Footer() {
    return (
        <div className="h-8 flex flex-row justify-between items-center bg-black px-10 border-t border-slate-700">
            <div className="w-20 flex flex-row justify-between text-slate-100 font-mono">
                <a className="hover:text-slate-400" href="https://github.com/pritammandal1717" target="blank"><FaGithub /></a>
                <a className="hover:text-yellow-500" href="https://leetcode.com/u/pritam1717/" target="blank"><SiLeetcode /></a>
                <button className="hover:text-red-500 cursor-copy" onClick={() => {
                    navigator.clipboard.writeText("pritammandal1717@gmail.com")
                    toast.success('Email copied')
                }}><LuMailPlus /></button>
                <a className="hover:text-blue-500" href="www.linkedin.com/in/pritam1717" target="blank"><ImLinkedin /></a>  
            </div>
            <p className="text-slate-100 font-mono">&copy; 2025 - All Rights Reserved</p>
            <p className="text-slate-50 font-mono">Made with ❤️ by Pritam</p>
        </div>
    )
}

export default Footer