import GenreSection from "./HeroSection/GenreSection";
import NowPlayingSection from "./HeroSection/NowPlayingSection";
import PopularSection from "./HeroSection/PopularSection";
import TopRatedSection from "./HeroSection/TopRatedSection";

const HeroSection = () => {
  return (
    <div className="w-full flex flex-col overflow-x-hidden">
      {/* genres section */}
      <GenreSection />
      <NowPlayingSection />
      <PopularSection />
      <TopRatedSection />
    </div>
  );
};

export default HeroSection;
