import { useState } from "react";
import { HoverBorderGradientDemo } from "../button";

function Header({ setHints, hints }) {
  const handleRefresh = () => {
    window.location.reload();
  };
  const decrementHints = () => {
    if (hints === 0) {
      return;
    }
    if (hints < 3) {
      handleRefresh();
    }
    setHints(hints - 1);
  };

  return (
    <div className="2xl ml-2 flex justify-between rounded-md w-[95%] h-[4rem] items-center p-4 bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg">
      <div className="text-white">Hello user</div>
      <HoverBorderGradientDemo>
        {hints < 3 ? ( // Check if hints are equal to 2
          <button className="text-white cursor-pointer" onClick={handleRefresh}>
            🔄️
          </button>
        ) : (
          <button
            className="text-white cursor-pointer transition-opacity duration-500 hover:opacity-70"
            onClick={decrementHints}
          >
            <p className="animate-out fade-out transition-all"> {hints}</p>
          </button>
        )}
      </HoverBorderGradientDemo>
    </div>
  );
}

export default Header;
