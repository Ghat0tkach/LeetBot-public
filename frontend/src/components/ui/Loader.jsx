import React, { useState, useEffect } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function Loader() {
  const [widths, setWidths] = useState([0, 0, 0]); // Initial widths set to 0
  const desiredWidths = [300, 240, 170]; // Desired widths for each Skeleton element

  useEffect(() => {
    // Animate each Skeleton element's width from 0 to the desired width
    const animationInterval = setInterval(() => {
      setWidths((prevWidths) =>
        prevWidths.map((_, index) =>
          prevWidths[index] < desiredWidths[index]
            ? prevWidths[index] + 10 // Adjust the increment value as needed
            : desiredWidths[index]
        )
      );
    }, 100); // Adjust the interval duration as needed

    // Cleanup function to clear the interval on component unmount
    return () => clearInterval(animationInterval);
  }, []); // Run only once on component mount

  return (
    <SkeletonTheme baseColor="#202020" highlightColor="#444">
      <div className="loader-container">
        {widths.map((width, index) => (
          <Skeleton
            key={index}
            width={width}
            className="transition-all animate-in fade-in-10"
          />
        ))}
      </div>
    </SkeletonTheme>
  );
}

export default Loader;
