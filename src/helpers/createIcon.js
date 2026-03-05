
export const createIcon = (url) => {
  // eslint-disable-next-line no-undef
  return new L.Icon({
    iconUrl: url,
    iconAnchor: [0, 30],
  });
};