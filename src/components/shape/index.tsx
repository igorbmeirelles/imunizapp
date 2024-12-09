import ShapeImg from "../../assets/shape.svg";
import ShapeDesk from "../../assets/shape-desktop.svg";
import { useEffect, useState } from "react";

export function Shape() {
  const [size, setSize] = useState(window.innerWidth);
  useEffect(() => {
    window.addEventListener("resize", () => {
      setSize(window.innerWidth);
    });
  });

  return (
    <figure>
      {size > 767 ? (
        <img src={ShapeDesk} className="w-full max-h-50" />
      ) : (
        <img src={ShapeImg} className="w-full max-h-50" />
      )}
    </figure>
  );
}
