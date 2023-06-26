export function batchArray<T>(arr: T[], batchNo: number): T[][] {
    const result: T[][] = [];
    for (let i = 0; i < arr.length; i += batchNo) {
      result.push(arr.slice(i, i + batchNo));
    }
    return result;
  }
  