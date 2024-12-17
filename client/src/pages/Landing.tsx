// import Navbar from "../components/common/Navbar"
import Sidebar from "../components/common/Sidebar"
import HeroSection from "../components/landing/HeroSection"
import SearchHeader from "../components/landing/SearchHeader"

const Landing = () => {
  return (
    <div className="w-full min-h-screen bg-slate-500 flex flex-row">
      {/* <Navbar /> */}
      <div className="w-[20%] bg-slate-400 flex flex-col">
      <Sidebar />
      </div>
      <div className="w-[80%] bg-slate-500 flex flex-col">
        {/* Search Header */}
        <div className="w-full h-[5rem] bg-slate-600 flex flex-row justify-center items-center">
          <SearchHeader />
        </div>
        {/* Main Landing Section */}
        <HeroSection />
      </div>
    </div>
  )
}

export default Landing