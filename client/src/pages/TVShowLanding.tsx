import TVAiringToday from "../components/tvlanding/TVAiringToday"
import TVGenreSection from "../components/tvlanding/TVGenreSection"
import TVOnTheAir from "../components/tvlanding/TVOnTheAir"
import TVTopRatedSection from "../components/tvlanding/TVTopRatedSection"

const TVShowLanding = () => {
  return (
    <div className="w-full flex flex-col overflow-y-auto scrollbar-hide">
      <TVGenreSection />
      <TVAiringToday />
      <TVOnTheAir />
      <TVTopRatedSection />
    </div>
  )
}

export default TVShowLanding