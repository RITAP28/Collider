import HeroSection from "../components/landing/HeroSection"

const AuthenticatedLanding = () => {
  return (
    <div className="w-full bg-slate-500 flex flex-col overflow-y-auto scrollbar-hide">
      <HeroSection />
    </div>
  )
}

export default AuthenticatedLanding