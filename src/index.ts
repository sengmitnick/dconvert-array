type ColspanFn<T> = (sourceItem: T) => number;

/**
 *
 * Convert 1d array to 2d array
 * @param sourceArray 1d array
 * @param num The number of elements in each sub-array
 * @param colspanFn Set the occupancy of the sub-item, the default returns 1
 * @returns
 */
function oneArray2twoArray<T>(
  sourceArray: T[],
  num: number,
  colspanFn?: ColspanFn<T>,
): T[][] {
  let colspan: number;
  const source: T[] = [...sourceArray];
  const _colspanFn: ColspanFn<T> = item => {
    let colspan = colspanFn?.(item) || 1;
    if (isNaN(colspan)) colspan = 1;
    return colspan;
  };

  // ========================== fill in the missing blank ==========================
  let k: number;
  let sourceBlank = 0;
  let blankArray: T[] = [];
  const len = sourceArray.length;
  for (let i = 0; i < len; ) {
    sourceBlank = 0;
    for (k = 0; k < num; k++) {
      if (!sourceArray[i + k]) break;
      colspan = _colspanFn(sourceArray[i + k]);
      if (colspan > num) colspan = num;
      if (sourceBlank + colspan > num) break;
      sourceBlank += colspan;
    }
    if (sourceBlank < num) {
      blankArray = Array.from(
        { length: num - sourceBlank },
        () => ({ __placeholder: true } as any),
      );
      source.splice(i + k, 0, ...blankArray);
    }
    i += k;
  }

  // ========================== format the source array ==========================
  let sourceArrayCount = 0;
  let originalArray: Record<number, T> = {};
  for (let i = 0, j = 0; i < source.length; i++) {
    colspan = _colspanFn(source[i]);
    originalArray[j] = source[i];
    sourceArrayCount += colspan;
    j += colspan;
  }

  let twoArray = new Array(Math.ceil(sourceArrayCount / num)) as T[][];
  for (let i = 0; i < twoArray.length; i++) {
    twoArray[i] = new Array() as T[];
    for (let j = 0; j < num; j++) {
      twoArray[i][j] = undefined as any;
    }
  }
  for (let i = 0; i < sourceArrayCount; i++) {
    const original = originalArray[i];
    if (original) {
      twoArray[parseInt((i / num).toString())][i % num] = original;
    }
  }

  // ========================== delete placeholder item ==========================
  twoArray = twoArray.map(item => {
    return item.filter(value => {
      if (value == null) return false;
      if ((value as any).__placeholder) return false;
      return true;
    }) as T[];
  });
  return twoArray;
}

export default oneArray2twoArray;
