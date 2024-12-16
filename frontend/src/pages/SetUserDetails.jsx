import NavBar from "../components/NavBar"
import Users from "../components/Users"

function SetUserDetails() {
  return (
    <>
      <div className="z-0 w-screen h-screen bg-[url(/bg-auth.jpg)] bg-repeat-y bg-cover"></div>
      <div className="absolute top-0 backdrop-blur-2xl w-screen h-screen flex flex-col">
        <NavBar />
        <div className="w-full h-[550px] px-20 flex flex-col md:flex-row justify-between items-start">
          <div className="md:w-2/5 h-full">
            <Users />
          </div>
          <div className="md:w-2/4 flex flex-col justify-center">
              <div className="flex flex-row justify-between p-5 mt-10 border-t-2 rounded-md shadow-md">
                  <div className="px-10 py-3 bg-cyan-800 text-slate-100 rounded-md m-2 font-mono">Family</div>
                  <div className="px-10 py-3 bg-cyan-800 text-slate-100 rounded-md m-2 font-mono">Friend</div>
                  <div className="px-10 py-3 bg-cyan-800 text-slate-100 rounded-md m-2 font-mono">Business</div>
                  <div className="px-10 py-3 bg-cyan-800 text-slate-100 rounded-md m-2 font-mono">Others</div>
              </div>
              <div className="flex flex-row justify-between p-5 mt-10 border-t-2 rounded-md backdrop-blur-2xl shadow-2xl">
                ra
              </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SetUserDetails