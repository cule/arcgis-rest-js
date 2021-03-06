/* Copyright (c) 2019 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */

export function chunk<T>(array: T[], size: number) {
  if (array.length === 0) {
    return [];
  }

  const chunks = [];

  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }

  return chunks;
}
