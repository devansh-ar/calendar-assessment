export const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export const DAY_LABELS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
export const DAY_LABELS_SHORT = ["M", "T", "W", "T", "F", "S", "S"];

export function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

export function getFirstDayOfMonth(year, month) {
  const day = new Date(year, month, 1).getDay();
  return day === 0 ? 6 : day - 1;
}

export function formatDate(year, month, day) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

export function parseDate(dateStr) {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(y, m - 1, d);
}

export function isDateBetween(dateStr, startStr, endStr) {
  if (!startStr || !endStr) return false;
  return dateStr >= startStr && dateStr <= endStr;
}

export function isDateBefore(dateStr, refStr) {
  return dateStr < refStr;
}

export function daysBetween(startStr, endStr) {
  const start = parseDate(startStr);
  const end = parseDate(endStr);
  return Math.round((end - start) / (1000 * 60 * 60 * 24)) + 1;
}

export function buildCalendarGrid(year, month) {
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const prevMonthDays = getDaysInMonth(year, month === 0 ? 11 : month - 1);

  const today = new Date();
  const todayStr = formatDate(today.getFullYear(), today.getMonth(), today.getDate());

  const days = [];

  for (let i = firstDay - 1; i >= 0; i--) {
    const d = prevMonthDays - i;
    const m = month === 0 ? 11 : month - 1;
    const y = month === 0 ? year - 1 : year;
    days.push({
      day: d, month: m, year: y,
      isCurrentMonth: false, isToday: false,
      dateStr: formatDate(y, m, d),
    });
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = formatDate(year, month, d);
    days.push({
      day: d, month, year,
      isCurrentMonth: true, isToday: dateStr === todayStr,
      dateStr,
    });
  }

  const remaining = 42 - days.length;
  for (let d = 1; d <= remaining; d++) {
    const m = month === 11 ? 0 : month + 1;
    const y = month === 11 ? year + 1 : year;
    days.push({
      day: d, month: m, year: y,
      isCurrentMonth: false, isToday: false,
      dateStr: formatDate(y, m, d),
    });
  }

  return days;
}
