import { ICastDetails } from "../../lib/data.interface"

const CastDetailsSection = ({
    castDetails
} : {
    castDetails: ICastDetails[]
}) => {
  return (
    <div className="basis-1/2 w-full flex flex-col">
          <div className="w-full flex justify-start py-2 pl-2 font-Poppins font-semibold text-xl">
            <p className="">Cast Details:</p>
          </div>
          <div className="w-full flex flex-col gap-2">
            {castDetails.map((cast, index) => (
              <div className="px-2 w-full flex flex-row" key={index}>
                <div className="w-[30%]">
                  <img
                    src={`https://media.themoviedb.org/t/p/w260_and_h390_bestv2/${cast.profile_path}`}
                    alt={cast.original_name}
                    className="w-[11.5rem] h-[11.5rem] rounded-full"
                  />
                </div>
                <div className="w-[70%] flex flex-col">
                  <div className="w-full text-3xl font-Manrope font-bold text-white pl-3 pt-4">
                    {cast.original_name}
                  </div>
                  <div className="w-full text-xl font-Manrope font-semibold pl-3">
                    <span className="underline">character:</span>{" "}
                    {cast.character}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
  )
}

export default CastDetailsSection