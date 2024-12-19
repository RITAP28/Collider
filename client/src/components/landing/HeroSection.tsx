import GenreSection from "./HeroSection/GenreSection";
import NowPlayingSection from "./HeroSection/NowPlayingSection";
// import PopularSection from "./HeroSection/PopularSection";
import TopRatedSection from "./HeroSection/TopRatedSection";
import TrendingSection from "./HeroSection/TrendingSection";
import UpcomingSection from "./HeroSection/UpcomingSection";

const HeroSection = () => {
  return (
    <div className="w-full flex flex-col overflow-x-hidden">
      {/* genres section */}
      <GenreSection />
      <TrendingSection />
      <NowPlayingSection />
      {/* <PopularSection /> */}
      <TopRatedSection />
      <UpcomingSection />
    </div>
  );
};

export default HeroSection;
