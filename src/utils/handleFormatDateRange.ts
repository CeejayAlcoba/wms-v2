export default function handleFormatDateRange(
  startStr?: string | null,
  endStr?: string | null
): string {
  if (!startStr && !endStr) return ""; // no date at all

  const start = startStr ? new Date(startStr) : null;
  const end = endStr ? new Date(endStr) : null;

  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
  };

  // If only start exists
  if (start && !end) {
    return start.toLocaleDateString("en-US", { ...options, year: "numeric" });
  }

  // If only end exists
  if (!start && end) {
    return end.toLocaleDateString("en-US", { ...options, year: "numeric" });
  }

  if (start && end) {
    const sameMonth =
      start.getMonth() === end.getMonth() &&
      start.getFullYear() === end.getFullYear();

    const sameYear = start.getFullYear() === end.getFullYear();

    if (sameMonth) {
      // Example: Sep 1–30, 2025
      return `${start.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })}–${end.getDate()}, ${start.getFullYear()}`;
    } else if (sameYear) {
      // Example: Jun 1 – Jul 1, 2025
      return `${start.toLocaleDateString(
        "en-US",
        options
      )} – ${end.toLocaleDateString("en-US", options)}, ${start.getFullYear()}`;
    } else {
      // Example: Dec 25, 2024 – Jan 5, 2025
      return `${start.toLocaleDateString(
        "en-US",
        options
      )}, ${start.getFullYear()} – ${end.toLocaleDateString(
        "en-US",
        options
      )}, ${end.getFullYear()}`;
    }
  }

  return "";
}
