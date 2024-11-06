import { ref, watch } from 'vue';

export const useLocalStorage = (key: string, initialValue: any) => {
  const storedValue = localStorage.getItem(key);
  const value = ref(storedValue ? JSON.parse(storedValue) : initialValue);

  watch(value, (newValue) => {
    if (newValue === null) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, JSON.stringify(newValue));
    }
  });

  const loadValue = () => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initialValue;
  };

  const removeValue = () => {
    localStorage.removeItem(key);
    value.value = initialValue;
  };

  return {
    value,
    loadValue,
    removeValue,
  };
};
