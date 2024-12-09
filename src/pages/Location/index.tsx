import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
export function Location() {
  const navigate = useNavigate();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        window.open(
          `https://www.google.com.br/maps/search/postos+de+vacina%C3%A7%C3%A3o/@${latitude},${longitude}15,14.5z?entry=ttu&g_ep=EgoyMDI0MTIwNC4wIKXMDSoASAFQAw%3D%3D`,
          "_blank"
        );

        navigate("/");
      });
    }
  });
  return <></>;
}
