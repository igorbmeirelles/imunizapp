interface IProps {
  color?: "black" | "#713EA2";
  className?: string;
}

export function CalendarIcon({ color = "black", className = "" }: IProps) {
  return (
    <svg
      className={className}
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22.5 20H20M20 20H17.5M20 20V17.5M20 20V22.5M8.75 5V3.125M21.25 5V3.125M26.875 11.25H13.4375M2.5 11.25H7.34375M17.5 27.5H12.5C7.78625 27.5 5.42875 27.5 3.965 26.035C2.50125 24.57 2.5 22.2137 2.5 17.5V15C2.5 10.2863 2.5 7.92875 3.965 6.465C5.43 5.00125 7.78625 5 12.5 5H17.5C22.2137 5 24.5712 5 26.035 6.465C27.4987 7.93 27.5 10.2863 27.5 15V17.5C27.5 22.2137 27.5 24.5712 26.035 26.035C25.2187 26.8525 24.125 27.2138 22.5 27.3725"
        stroke={color}
        strokeWidth="1.875"
        strokeLinecap="round"
      />
    </svg>
  );
}
