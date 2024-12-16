import {Link} from "react-router-dom"

function BottomWarning({children, buttonText, to}) {
  return (
    <div className="mt-2 flex flex-row justify-center items-center text-slate-100 font-mono">
        <p className="font-medium justify-center items-center">{children}</p>
        <Link className="font-medium ml-1 text-cyan-300" to={to}>
        {buttonText}
        </Link>
    </div>
  )
}

export default BottomWarning