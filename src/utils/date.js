export function formatDateString(dateString) {
  const date = new Date(dateString);

  if (isNaN(date)) {
    throw new Error("Invalid date string");
  }

  return date.toISOString().split("T")[0];
}
