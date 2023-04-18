import React from "react";
import ReactDOM from "react-dom";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import "react-horizontal-scrolling-menu/dist/styles.css";

import { Card } from "@/components/MovieCard/MovieCard";

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
  console.log(ev.deltaX, "ev.deltaX");
  console.log(ev.deltaY, "ev.deltaX");
  console.log(isTouchpad, "isTouchpad");
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

  return (
    <>
      <div className="example" style={{ paddingTop: "100px", width: "100vw" }}>
        <div onMouseEnter={disableScroll} onMouseLeave={enableScroll}>
          <ScrollMenu onWheel={onWheel}>
            {items.map(({ id }) => (
              <Card
                title={id}
                itemId={id} // NOTE: itemId is required for track items
                key={id}
              />
            ))}
          </ScrollMenu>
        </div>
      </div>
    </>
  );
}
