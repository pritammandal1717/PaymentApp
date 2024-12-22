
function Profile({firstname, lastname, className}) {
  return (
    <p className={`${className} w-10 h-10 p-2 text-slate-700 rounded-full font-medium`}>{String(firstname).slice(0,1).toUpperCase()}{String(String(lastname).split(" ")[1]).slice(0,1).toUpperCase()}</p>
  )
}

export default Profile