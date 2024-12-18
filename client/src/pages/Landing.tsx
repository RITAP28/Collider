import HeroSection from "../components/landing/HeroSection";

const Landing = () => {
  return (
    <div className="w-full bg-slate-500 flex flex-col overflow-y-auto scrollbar-hide">
      {/* Main Landing Section */}
      <HeroSection />
    </div>
  );
};

export default Landing;
