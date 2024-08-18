function parseDateString(dateString: string): Date {
  const [day, month, year] = dateString.split('-').map(Number);
  return new Date(year, month - 1, day); // month is 0-indexed in JavaScript Date
}

export { parseDateString };
