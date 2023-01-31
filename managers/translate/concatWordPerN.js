module.exports = function concatWordPerN(w = {}, n = 50) {
  const result = [];
  const values = Object.values(w);

  for (let i = 0; i < Math.ceil(values.length / n); i++) {
    result[i] = values.slice(i * n, i * n + n).join(".\n");
  }

  return result;
};
