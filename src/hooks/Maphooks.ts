import React, { useEffect, useMemo, useState } from "react";

const Maphooks = () => {
  const [error, setError] = useState("");
  const [currentCoords, setCurrentCoords] = useState({
    lat: 28.6448,
    lng: 77.216721,
  });

  const [circleTime, setCircleTime] = useState(true);

  const CircleTimeout = () => {
    setTimeout(() => {
      setCircleTime(false)
    }, 10000)
    setCircleTime(true)
  }

  const errorHandler = () => {
    if (navigator.permissions) {
      navigator.permissions.query({ name: "geolocation" }).then((res) => {
        if (res.state === "denied") {
          setError(
            "Enable location for permissions for this website in your browser settings."
          );
        }
      });
    } else {
      setError("Unable to access your location");
    }
  };

  const getPosition = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCurrentCoords({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      }, errorHandler);
    } else {
      console.log("sorry, geolocation is not supported by this browser");
    }
  };

  // Radius 

  const EARTH_RADIUS_IN_KM = 6371; // Earth's radius in kilometers

// Function to calculate the distance between two points using haversine formula
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const toRadians = (angle: number) => (angle * Math.PI) / 180;

  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = EARTH_RADIUS_IN_KM * c;
  return distance;
}

const mapCenter = useMemo(() => currentCoords, [currentCoords]);

  useEffect(() => {
    getPosition();
    CircleTimeout();
  }, []);

  return { currentCoords, error, circleTime, calculateDistance, mapCenter };
};
export default Maphooks;
