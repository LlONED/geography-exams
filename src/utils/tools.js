export function randBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function isSearchIncludes(values = [], search = "") {
  search = search.toLowerCase();

  return search === "" ? true : values.join(" ").toLowerCase().includes(search);
}
