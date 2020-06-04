interface CalculateCircleRadiusProps {
  width: number;
  height: number;
  indicatorX: number;
  indicatorY: number;
}

export const calculateRectangleCircleRadius = ({
  width,
  height,
  indicatorX = 0,
  indicatorY = 0,
}: CalculateCircleRadiusProps) => {
  const a = width - indicatorX;
  const b = (height - indicatorY) * 2;
  return Math.sqrt(a * a + b * b) / 2;
};
