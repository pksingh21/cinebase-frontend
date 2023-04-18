import React from "react";
import ReactDOM from "react-dom";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import "react-horizontal-scrolling-menu/dist/styles.css";

import { Card } from "@/components/MovieCard/MovieCard";

import usePreventBodyScroll from "./usePreventBodyScroll";
import { Movies } from "@/atoms/atom";
import { useRecoilValue } from "recoil";
import { Movie } from "@/types/types";
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

export default function HorizontalScroll() {
  const [items] = React.useState(getItems);
  const { disableScroll, enableScroll } = usePreventBodyScroll();
  const AllMovies = useRecoilValue(Movies);
  const testtingMovies: Movie[] = [];
  // copy AllMovies 20 times
  for (let i = 0; i < 20; i++) {
    testtingMovies.push(...AllMovies);
  }
  return (
    <>
      <div className="example" style={{ width: "90vw" }}>
        <div onMouseEnter={disableScroll} onMouseLeave={enableScroll}>
          <ScrollMenu onWheel={onWheel}>
            {testtingMovies.map((Movies, indx) => (
              <div style={{ marginRight: "50px" }}>
                <Card
                  title={Movies.title}
                  itemId={Movies.title + `${indx}`} // NOTE: itemId is required for track items
                  MovieDetails={Movies}
                  key={Movies.id}
                />
              </div>
            ))}
          </ScrollMenu>
        </div>
      </div>
    </>
  );
}
