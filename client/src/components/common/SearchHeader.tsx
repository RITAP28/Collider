const SearchHeader = () => {
  return (
    <>
      <div className="w-[80%] flex flex-row items-center py-2">
        <div className="w-[30%] flex justify-end pr-4 items-center text-lg font-medium">
          Search any movie/tvshow:
        </div>
        <div className="w-[70%] flex items-center">
          <input
            type="search"
            name=""
            id=""
            className="w-full py-1 rounded-lg placeholder:pl-2"
            placeholder="Search"
          />
        </div>
      </div>
    </>
  );
};

export default SearchHeader;
