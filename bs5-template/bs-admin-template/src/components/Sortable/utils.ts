import { Point } from './Point';

/**
 * This function check if a given point is inside of the items rect.
 * If it's not inside any rect, it will return the index of the closest rect
 */
export const findItemIndexAtPosition = (
  { x, y }: Point,
  itemsRect: DOMRect[],
  { fallbackToClosest = false } = {}
): number => {
  let smallestDistance = 10000;
  let smallestDistanceIndex = -1;
  for (let index = 0; index < itemsRect.length; index += 1) {
    const rect = itemsRect[index];
    // if it's inside the rect, we return the current index directly
    if (x >= rect.left && x < rect.right && y >= rect.top && y < rect.bottom) {
      return index;
    }
    if (fallbackToClosest) {
      // otherwise we compute the distance and update the smallest distance index if needed
      const itemCenterX = (rect.left + rect.right) / 2;
      const itemCenterY = (rect.top + rect.bottom) / 2;

      const distance = Math.sqrt(
        Math.pow(x - itemCenterX, 2) + Math.pow(y - itemCenterY, 2)
      ); // ** 2 operator is not supported on IE11
      if (distance < smallestDistance) {
        smallestDistance = distance;
        smallestDistanceIndex = index;
      }
    }
  }
  return smallestDistanceIndex;
};

export function arrayMoveMutable(
  array: any[],
  fromIndex: number,
  toIndex: number
) {
  const startIndex = fromIndex < 0 ? array.length + fromIndex : fromIndex;

  if (startIndex >= 0 && startIndex < array.length) {
    const endIndex = toIndex < 0 ? array.length + toIndex : toIndex;

    const [item] = array.splice(fromIndex, 1);
    array.splice(endIndex, 0, item);
  }
}

export function arrayMoveImmutable(
  array: any[],
  fromIndex: number,
  toIndex: number
) {
  const newArray = [...array];
  arrayMoveMutable(newArray, fromIndex, toIndex);
  return newArray;
}
