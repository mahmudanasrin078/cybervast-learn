const STORAGE_KEY = "cybervast_streak";

// ---------- Read ----------
export const getStreak = () => {
  return (
    JSON.parse(localStorage.getItem(STORAGE_KEY)) || {
      streak: 0,
      lastCompletedDate: null,
    }
  );
};

// ---------- Update ----------
export const updateStreak = () => {
  const today = new Date().toDateString();

  const data = getStreak();

  // Today Lesson Complete 
  if (data.lastCompletedDate === today) {
    return;
  }

  if (!data.lastCompletedDate) {
    data.streak = 1;
  } else {
    const last = new Date(data.lastCompletedDate);

    const diff =
      Math.floor(
        (new Date(today) - last) /
          (1000 * 60 * 60 * 24)
      );

    if (diff === 1) {
      data.streak++;
    } else {
      data.streak = 1;
    }
  }

  data.lastCompletedDate = today;

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(data)
  );
};

// ---------- Count ----------
export const getCurrentStreak = () => {
  return getStreak().streak;
};