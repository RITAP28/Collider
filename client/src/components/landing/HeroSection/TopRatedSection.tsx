import { useState } from "react";
import { IMoviesByGenre } from "../../../lib/data.interface";
import axios from "axios";

const TopRatedSection = () => {
  const [sectionLoading, setSectionLoading] = useState<boolean>(false);
  const [topRatedMovies, setTopRatedMovies] = useState<IMoviesByGenre[]>([]);

  const handleGetTopRatedMovies = async () => {
    try {
        const response = await axios.get(``);
    } catch (error) {
        console.error("Error while searching for top rated movies: ", error);
    }
  }
  return <div>TopRatedSection</div>;
};

export default TopRatedSection;
