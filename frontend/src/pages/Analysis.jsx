import NavBar from "../components/NavBar"

function Analysis() {
  return (
    <>
      <div className="z-0 w-screen h-screen bg-[url(/bg-auth.jpg)] bg-repeat-y bg-cover"></div>
    <div className="absolute top-0 backdrop-blur-2xl w-screen h-screen flex flex-col">
      <NavBar />
      <div className="w-full flex flex-col md:flex-row justify-between flex-grow h-full overflow-y-auto">
        <div className="md:w-2/4 px-10 md:px-20 flex flex-col space-y-6">
          
        </div>
        <div className="md:w-3/5 px-10 md:px-20 h-full flex">
          
        </div>
      </div>
    </div>
    </>
  )
}

export default Analysis