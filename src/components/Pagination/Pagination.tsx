import React from "react";
import {GrPrevious ,GrNext} from "react-icons/gr";
import { Button, IconButton } from "@material-tailwind/react";
 
export function Pagination() {
  const [active, setActive] = React.useState(1);
 
  const getItemProps = (index) =>
    ({
      variant: active === index ? "filled" : "text",
      color: "black",
      backgroundColor:"red",
      onClick: () => setActive(index),
      className: "rounded-full bg-[#4D44B5] flex items-center justify-center  ",
    } as any);
 
  const next = () => {
    if (active === 5) return;
 
    setActive(active + 1);
  };
 
  const prev = () => {
    if (active === 1) return;
 
    setActive(active - 1);
  };
 
  return (
    <div className="flex items-center gap-4">
      <Button
        variant="text"
        className="flex items-center gap-2 rounded-full"
        onClick={prev}
        disabled={active === 1}
      >
        <GrPrevious  />
        {/* Previous */}
      </Button>
      <div className="flex items-center gap-2">
        <IconButton {...getItemProps(1)}>1</IconButton>
        <IconButton {...getItemProps(2)}>2</IconButton>
        <IconButton {...getItemProps(3)}>3</IconButton>
       
      </div>
      <Button
        variant="text"
        className="flex items-center gap-2 rounded-full"
        onClick={next}
        disabled={active === 5}
      >
        {/* Next */}
       <GrNext />
      </Button>
    </div>
  );
}