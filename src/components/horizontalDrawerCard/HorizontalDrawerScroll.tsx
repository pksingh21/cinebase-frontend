import React, { useState } from "react";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import "react-horizontal-scrolling-menu/dist/styles.css";

import { Card } from "@/components/MovieCard/MovieCard";

import { ActorsForCurrentMovie, CreditsForMovie, Movies } from "@/atoms/atom";
import { Actor, Credits, Movie } from "@/types/types";
import axios from "axios";
import { SetterOrUpdater, useRecoilValue, useSetRecoilState } from "recoil";
import usePreventBodyScroll from "./usePreventBodyScroll";
type scrollVisibilityApiType = React.ContextType<typeof VisibilityContext>;

const elemPrefix = "test";
const getId = (index: number) => `${elemPrefix}${index}`;

const getItems = () =>
  Array(20)
    .fill(0)
    .map((_, ind) => ({ id: getId(ind) }));

function onWheel(apiObj: scrollVisibilityApiType, ev: React.WheelEvent): void {
  const isTouchpad = Math.abs(ev.deltaX) > 1;
  if (isTouchpad) {
    ev.stopPropagation();
    return;
  }

  if (ev.deltaX < 0) {
    apiObj.scrollNext();
  } else if (ev.deltaX > 0) {
    apiObj.scrollPrev();
  }
}
async function getActorById(actorID: number) {
  try {
    const body = { actorID: actorID };
    const result = axios.get(`/api/actors/getActorById/${actorID}`);
    return result;
  } catch (err) {
    //console.log(err, "cant fetch movie");
    return new Promise((resolve, reject) => {
      reject(err);
    });
  }
}
async function getAllActors(
  credits: Credits[],
  setActorsForMovie: SetterOrUpdater<Actor[]>
) {
  try {
    const actorIds = credits.map((credit) => credit.person);
    const promises = actorIds.map((actorId) => getActorById(actorId));
    //console.log(promises, "promises promises");
    const results = await Promise.all(promises);
    //console.log(results, "Results");
    const resultData = results.map((result: any) => {
      return result.data;
    });
    console.log(resultData, "resultData");
    setActorsForMovie(resultData);
  } catch (err) {
    //console.log(err, "something went wrong while fetching all actors");
  }
}

export default function HorizontalScroll(props: { whatToRender: string }) {
  const { disableScroll, enableScroll } = usePreventBodyScroll();
  const AllMovies = useRecoilValue(Movies);
  // const setActorsForMovie = useSetRecoilState(ActorsForCurrentMovie);
  // const allActorsForMovie = useRecoilValue(ActorsForCurrentMovie);
  const [allActorsForMovie, setActorsForMovie] = useState<Actor[]>([]);
  const credits = useRecoilValue(CreditsForMovie);
  const [testingMovies, setTestingMovies] = React.useState<(Movie | Actor)[]>(
    []
  );

  React.useEffect(() => {
    getAllActors(credits, setActorsForMovie);
    console.log("in get all actors method");
  }, [credits]);
  React.useEffect(() => {
    console.log("in what to render area", props.whatToRender);
    if (props.whatToRender === "allMovieDetails") {
      setTestingMovies(AllMovies);
    } else {
      console.log(allActorsForMovie, "All the current actors for movie");
      setTestingMovies(allActorsForMovie);
    }
  }, [props.whatToRender, allActorsForMovie, AllMovies, credits]);
  React.useEffect(() => {
    console.log(testingMovies, "testing movies");
  }, [testingMovies]);
  return (
    <>
      <div className="example" style={{ width: "90vw" }}>
        <div onMouseEnter={disableScroll} onMouseLeave={enableScroll}>
          <ScrollMenu onWheel={onWheel}>
            {testingMovies.map((Movies, indx) => (
              <div style={{ marginRight: "50px" }} key={indx}>
                <Card
                  title={"title" in Movies ? Movies.title : Movies.name}
                  itemId={
                    "title" in Movies ? Movies.title : Movies.name + `${indx}`
                  } // NOTE: itemId is required for track items
                  MovieDetails={"title" in Movies ? Movies : undefined}
                  ActorDetails={"name" in Movies ? Movies : undefined}
                  credits={credits[indx]}
                />
              </div>
            ))}
          </ScrollMenu>
        </div>
      </div>
    </>
  );
}
