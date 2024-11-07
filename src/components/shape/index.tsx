import ShapeImg from "../../assets/shape.svg";
import ShapeDesk from "../../assets/shape-desktop.svg";

export function Shape() {
  return (
    <figure>
      <source
        srcSet={ShapeDesk}
        media="(min-width: 768px)"
        className="w-full"
      />
      <source
        srcSet={ShapeImg}
        media="(max-width: 767px)"
        className="w-full max-h-50"
      />
      <img src={ShapeImg} className="w-full max-h-50" />
    </figure>
  );
}
