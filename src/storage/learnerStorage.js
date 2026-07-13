const STORAGE_KEY = "cybervast_learner";

export const saveLearnerName = (name) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(name));
};

export const getLearnerName = () => {
  return JSON.parse(localStorage.getItem(STORAGE_KEY));
};

export const removeLearnerName = () => {
  localStorage.removeItem(STORAGE_KEY);
};