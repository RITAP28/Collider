import { ICrewDetails } from "../../lib/data.interface";

const CrewDetailsSection = ({
  crewDetails,
}: {
  crewDetails: ICrewDetails[];
}) => {
  return (
    <div className="w-full md:w-1/2 px-4">
      <div className="font-Manrope font-semibold text-lg md:text-xl mb-4 text-center md:text-left">
        Crew Members
      </div>
      <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
        {crewDetails.map((crew, index) => (
          <div
            key={index}
            className="bg-slate-400 rounded-lg p-3 hover:scale-105 transition duration-200 ease-in-out hover:cursor-pointer"
          >
            <div className="w-full flex justify-center">
              <img
                src={`https://media.themoviedb.org/t/p/w260_and_h390_bestv2/${crew.profile_path}`}
                alt={crew.name}
                className="w-[80%] md:w-full rounded-md"
              />
            </div>
            <div className="mt-2 text-center md:text-left">
              <p className="font-Manrope font-semibold text-sm md:text-base line-clamp-1">
                {crew.name}
              </p>
              <p className="font-Poppins text-xs md:text-sm text-gray-700 line-clamp-1">
                {crew.job}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CrewDetailsSection;
