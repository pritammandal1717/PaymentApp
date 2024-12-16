
function InputBox({ label, placeholder, onChange, type }) {
    return (
        <>
            <div className="text-md font-semibold text-slate-200 text-left mb-2 mt-3 font-mono"><p>{label}</p></div>
            <input className="w-full px-2 py-1.5 border text-black border-slate-400 rounded-md shadow-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" type={type} placeholder={placeholder} onChange={onChange} />
        </>
    )
}

export default InputBox