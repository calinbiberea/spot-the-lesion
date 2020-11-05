/**
 * Returns the path to the json file corresponding to the given fileNumber
 *
 * @param fileNumber Number of the file to retrieve
 */
const getJsonPath = (fileNumber: number): string =>
  `${process.env.PUBLIC_URL}/content/annotation/${fileNumber}.json`;

/**
 * Returns the path to the image file corresponding to the given fileNumber
 *
 * @param fileNumber Number of the file to retrieve
 */
const getImagePath = (fileNumber: number): string =>
  `${process.env.PUBLIC_URL}/content/images/${fileNumber}.png`;

/**
 * Given the coordinates of two rectangles, returns the ratio of their intersection
 * over their union.
 *
 * Used in determining the success of a given AI prediction.
 *
 * @param rectA Coordinates for the corners of the first rectangle
 * @param rectB Coordinates for the corners of the second rectangle
 *
 * @return Ratio of intersection area over union area
 */
const getIntersectionOverUnion = (rectA: number[], rectB: number[]): number => {
  const xA = Math.max(rectA[0], rectB[0]);
  const xB = Math.min(rectA[2], rectB[2]);
  const yA = Math.max(rectA[1], rectB[1]);
  const yB = Math.min(rectA[3], rectB[3]);

  const inter = Math.max(0, xB - xA + 1) * Math.max(0, yB - yA + 1);

  const areaA = (rectA[2] - rectA[0] + 1) * (rectA[3] - rectA[1] + 1);
  const areaB = (rectB[2] - rectB[0] + 1) * (rectB[3] - rectB[1] + 1);

  const union = areaA + areaB - inter;

  return inter / union;
};

export { getJsonPath, getIntersectionOverUnion, getImagePath };