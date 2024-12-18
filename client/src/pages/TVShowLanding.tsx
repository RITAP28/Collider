import TVAiringToday from "../components/tvlanding/TVAiringToday"
import TVGenreSection from "../components/tvlanding/TVGenreSection"

const TVShowLanding = () => {
  return (
    <div className="w-full flex flex-col overflow-y-auto scrollbar-hide">
      <TVGenreSection />
      <TVAiringToday />
    </div>
  )
}

export default TVShowLanding