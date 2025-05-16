const API_KEY = import.meta.env.VITE_CAGE_API_KEY;

export const geocodeLocation = async (location) => {
  const res = await fetch(`https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(location)}&apiKey=${API_KEY}`);
  const data = await res.json();
  if (data.features.length > 0) {
    const { lat, lon } = data.features[0].properties;
    return { lat, lng: lon };
  } else {
    throw new Error("Location not found");
  }
};
