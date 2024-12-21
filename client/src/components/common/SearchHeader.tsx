const SearchHeader = () => {
  return (
    <>
      <div className="w-[80%] flex flex-row items-center py-2">
        <div className="w-[30%] flex justify-end pr-4 items-center text-lg font-medium font-Poppins">
          Search any movie:
        </div>
        <div className="w-[50%] flex items-center">
          <input
            type="search"
            name=""
            id=""
            className="w-full py-1 rounded-lg pl-2 font-Manrope"
            placeholder="Search"
          />
        </div>
        <div className="w-[20%] flex justify-start pl-2">
          <button
            type="button"
            className="px-3 rounded-lg py-[0.50rem] bg-slate-800 text-white font-Poppins font-medium hover:cursor-pointer hover:bg-slate-300 hover:text-black transition duration-200 ease-in-out hover:scale-105"
          >
            Search
          </button>
        </div>
      </div>
    </>
  );
};

export default SearchHeader;
