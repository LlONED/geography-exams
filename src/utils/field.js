export function fieldConvertLocalization(field) {
  return `country${field[0].toUpperCase() + field.slice(1)}`;
}
