
function Button({onClick, children, className, disabled}) {
  return (
    <button className={`${className} px-4 py-1.5 text-base rounded-md text-center text-white font-mono`} onClick={onClick} disabled={disabled}>
        {children}
    </button>
  )
}

export default Button