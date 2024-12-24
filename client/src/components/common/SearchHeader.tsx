import { apiKey, IMoviesByGenre } from "../../lib/data.interface";
import { useDebounce } from "../../hooks/useDebounce";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { config } from "../../lib/utils";
import { useNavigate } from "react-router-dom";

const SearchHeader = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");
  const debouncedQuery = useDebounce(query, 500);
  const [suggestions, setSuggestions] = useState<IMoviesByGenre[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    setQuery(searchTerm);
    setIsSearching(true);
  };

  useEffect(() => {
    const handleSearchMovies = async () => {
      if (!debouncedQuery.trim()) {
        setIsSearching(false);
        setSuggestions([]);
        return;
      }
      try {
        setLoading(true);

        const suggestedMovies = await axios.get(
          `https://api.themoviedb.org/3/search/movie?query=${debouncedQuery}&api_key=${apiKey}`,
          config
        );
        setSuggestions(suggestedMovies.data.results);

        setLoading(false);
      } catch (error) {
        console.error("Error while searching for movies: ", error);
      }
    };

    handleSearchMovies();
  }, [debouncedQuery]);

  const handleSearchBtn = async () => {
    try {
      const searchQuery = await axios.get(
        `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${apiKey}`,
        config
      );
      navigate(`/movie/${searchQuery.data.results[0].id}`);
      setIsSearching(false);
      setQuery("");
      setSuggestions([]);
      console.log(searchQuery.data.results[0]);
    } catch (error) {
      console.error("Error while searching for movies: ", error);
    }
  };

  return (
    <>
      <div className="relative w-full">
        <div className="w-[80%] flex flex-row items-center py-2">
          <div className="w-[30%] flex justify-end pr-4 items-center text-sm md:text-lg font-medium font-Poppins">
            Search:
          </div>
          {/* search input bar */}
          <div className="md:w-[50%] w-[70%] flex items-center relative">
            <input
              type="search"
              name=""
              id=""
              className="w-full py-1 rounded-lg pl-2 font-Manrope"
              placeholder="Search"
              onChange={handleInputChange}
            />
            {isSearching && (
              <div className="absolute top-[100%] left-0 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto z-50">
                {loading ? (
                  <div className="px-4 py-2">Loading...</div>
                ) : suggestions.length > 0 ? (
                  suggestions.map((s, index) => (
                    <div
                      key={index}
                      className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                      onClick={() => {
                        navigate(`/movie/${s.id}`);
                        setIsSearching(false);
                        setQuery("");
                        setSuggestions([]);
                      }}
                    >
                      {s.original_title}
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-2 font-Manrope font-medium text-red-400">
                    No results found
                  </div>
                )}
              </div>
            )}
          </div>
          {/* dropdown menu suggesting movies */}

          {/* search button */}
          <div className="w-[10%] md:w-[20%] flex justify-start pl-2">
            <button
              type="button"
              className="px-3 rounded-lg py-[0.50rem] bg-slate-800 text-white font-Poppins font-medium hover:cursor-pointer hover:bg-slate-300 hover:text-black transition duration-200 ease-in-out hover:scale-105"
              onClick={handleSearchBtn}
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchHeader;
