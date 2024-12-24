import { ICastDetails } from "../../lib/data.interface";

const CastDetailsSection = ({
  castDetails,
}: {
  castDetails: ICastDetails[];
}) => {
  return (
    <div className="w-full md:w-1/2">
      <div className="font-Manrope font-semibold text-lg md:text-xl mb-4 text-center md:text-left pl-4">
        Cast Members
      </div>
      <div className="grid grid-cols-2 md:grid-cols-2 gap-4 px-4">
        {castDetails.map((cast, index) => (
          <div
            key={index}
            className="bg-slate-400 rounded-lg p-3 hover:scale-105 transition duration-200 ease-in-out hover:cursor-pointer"
          >
            <div className="w-full flex justify-center">
              <img
                src={`https://media.themoviedb.org/t/p/w260_and_h390_bestv2/${cast.profile_path}`}
                alt={cast.name}
                className="w-[80%] md:w-full rounded-md"
              />
            </div>
            <div className="mt-2 text-center md:text-left">
              <p className="font-Manrope font-semibold text-sm md:text-base line-clamp-1">
                {cast.name}
              </p>
              <p className="font-Poppins text-xs md:text-sm text-gray-700 line-clamp-1">
                as {cast.character}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CastDetailsSection;
