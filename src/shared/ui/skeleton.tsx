type SkeletonProps = {
  width?: string | number;
  height?: string | number;
  shape?: "circle" | "square";
};

const Skeleton = ({
  width = "100%",
  height = "100%",
  shape = "square",
}: SkeletonProps) => {
  return (
    <div
      className={`bg-gray-200 animate-pulse ${
        shape === "circle" ? "rounded-full" : "rounded-lg"
      }`}
      style={{ width, height }}
    />
  );
};

export default Skeleton;
