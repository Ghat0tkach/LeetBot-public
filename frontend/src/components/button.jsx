import { HoverBorderGradient } from "./ui/hoverButton";

export function HoverBorderGradientDemo({ children }) {
  return (
    <div className="flex justify-center text-center">
      <HoverBorderGradient
        containerClassName="rounded-full"
        as="div"
        className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
      >
        {children}
      </HoverBorderGradient>
    </div>
  );
}
