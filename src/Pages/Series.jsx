import React, { useState, useEffect } from "react";
import { PopularSeries,TopRated,TrandingSeries } from "../services/SeriesService";
import { List,NewList } from "../services/MultiService";
import {ListHeader} from "../components/ListHeader";
import { useFavourites } from "../services/FavouritesContext";
import { DisplayGallery } from "../components/DisplayGallery";
import { Loader } from "../Loader";
import { FinalList } from "../services/FinalList";

const Series = () => {
  const [popularTv, setPopularTv] = useState([]);
  const { favourites, addFavourite, removeFavourite } = useFavourites();
  const [topRatedSeries,setTopRatedSeries] = useState([]);
  const [trendingSeries,setTrendingSeries] = useState([]);


  
  useEffect(() => {
    const fetchTrendingSeries = async () => {
      try {
        const series = await TrandingSeries();
        setTrendingSeries(series?.results);
      } catch (error) {
        console.error("Error fetching trending series:", error);
      }
    };
    fetchTrendingSeries();
  }, []);

  useEffect(() => {
    const fetchPopularSeries = async () => {
      try {
        const movies = await PopularSeries();
        setPopularTv(movies?.results);
      } catch (error) {
        console.error("Error fetching poppular series:", error);
      }
    };
    fetchPopularSeries();
  }, []);

  useEffect(() => {
    const fetchTopRatedSeries = async () => {
      try {
        const toprated = await TopRated();
        setTopRatedSeries(toprated?.results);
      } catch (error) {
        console.error("Error fetching TopRated series:", error);
      }
    };
    fetchTopRatedSeries();
  }, []);
  return (
    <>
      {(popularTv?.length && topRatedSeries?.length) ? (
        <div className="main-page">
          <ListHeader heading="Now on Cinemate" />
          <DisplayGallery elements = {topRatedSeries.slice(0,6)} />
           <ListHeader heading="Popular on Cinemate" />
          <FinalList
            elements={popularTv.slice(0,12)}
            handleOnClick={addFavourite}
            isFavourite={false}
          />
           <ListHeader heading="Trending" />
          <FinalList
            elements={trendingSeries.slice(0,12)}
            handleOnClick={addFavourite}
            isFavourite={false}
          />
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Series;
