const KEY = "pokemon_quiz_state";

export const saveState = (state) =>
  localStorage.setItem(KEY, JSON.stringify(state));

export const loadState = () => {
  const s = localStorage.getItem(KEY);
  return s ? JSON.parse(s) : null;
};

export const clearState = () => localStorage.removeItem(KEY);
