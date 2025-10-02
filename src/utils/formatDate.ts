export const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  const now = new Date();

  // Remove time for comparison
  const dateDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const nowDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const diffTime = nowDay.getTime() - dateDay.getTime();
  const diffDays = diffTime / (1000 * 60 * 60 * 24);

  let dayLabel = "";
  if (diffDays === 0) {
    dayLabel = "Today";
  } else if (diffDays === 1) {
    dayLabel = "Yesterday";
  } else {
    dayLabel = date.toLocaleDateString();
  }

  const time = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return `${dayLabel} ${time}`;
};
