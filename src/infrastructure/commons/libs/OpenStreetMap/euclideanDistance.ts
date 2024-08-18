// generate a function that takes two coordinates in string, then call the calcEuclideanDistance function to calculate the distance between the two coordinates.
// The function should return the distance in meters.
// The coordinates are in the format of "latitude, longitude".
function euclideanDistance(coord1: string, coord2: string): number {
  const [lat1, lon1] = convertCoordinatesStrToLatLon(coord1);
  const [lat2, lon2] = convertCoordinatesStrToLatLon(coord2);

  return calcEuclideanDistance(lat1, lon1, lat2, lon2);
}

function calcEuclideanDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const earthRadius = 6371000; // Radius of the Earth in meters

  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = earthRadius * c;
  return distance;
}

function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

function convertCoordinatesStrToLatLon(coord: string): number[] {
  return coord.split(',').map((coord) => parseFloat(coord));
}

export { euclideanDistance, convertCoordinatesStrToLatLon };
