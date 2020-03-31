const radius = 6371000;
const toRadians = (degrees) => (degrees * Math.PI) / 180;
const toDegrees = (radians) => (radians * 180) / Math.PI;

export default {
  methods: {
    destinationFix(latitude, longitude, distance, heading) {
      const delta = distance / radius;
      const theta = toRadians(heading);
      const phi = toRadians(latitude);
      const lambda = toRadians(longitude);

      const newLat = Math.asin(
        Math.sin(phi) * Math.cos(delta)
        + Math.cos(phi) * Math.sin(delta) * Math.cos(theta),
      );

      const newLng = lambda + Math.atan2(
        Math.sin(theta) * Math.sin(delta) * Math.cos(phi),
        Math.cos(delta) - Math.sin(phi) * Math.sin(newLat),
      );

      const lat = toDegrees(newLat);
      const lng = toDegrees(newLng);
      return [lng, lat];
    },
  },
};
