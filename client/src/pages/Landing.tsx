import HeroSection from "../components/landing/HeroSection";
import SearchHeader from "../components/landing/SearchHeader";

const Landing = () => {
  return (
    <div className="w-full bg-slate-500 flex flex-col overflow-y-auto scrollbar-hide">
      {/* Search Header */}
      <div className="w-full h-[5rem] bg-slate-600 flex flex-row justify-center items-center py-4">
        <SearchHeader />
      </div>
      {/* Main Landing Section */}
      <HeroSection />
    </div>
  );
};

export default Landing;
