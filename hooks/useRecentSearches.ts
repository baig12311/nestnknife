import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'recent_searches';
const MAX_RECENT = 8;

export function useRecentSearches() {
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);

  // Load on mount
  useEffect(() => {
    (async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) {
          setRecentSearches(JSON.parse(stored));
        }
      } catch (error) {
        console.error('LOAD RECENT SEARCHES ERROR:', error);
      } finally {
        setLoaded(true);
      }
    })();
  }, []);

  // Add a new search term
  const addRecentSearch = useCallback(async (term: string) => {
    const trimmed = term.trim();
    if (!trimmed) return;

    setRecentSearches((prev) => {
      // Remove duplicate (case-insensitive), then put newest on top
      const filtered = prev.filter(
        (item) => item.toLowerCase() !== trimmed.toLowerCase()
      );

      const updated = [trimmed, ...filtered].slice(0, MAX_RECENT);

      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated)).catch((error) =>
        console.error('SAVE RECENT SEARCH ERROR:', error)
      );

      return updated;
    });
  }, []);

  // Remove single term
  const removeRecentSearch = useCallback(async (term: string) => {
    setRecentSearches((prev) => {
      const updated = prev.filter((item) => item !== term);

      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated)).catch((error) =>
        console.error('REMOVE RECENT SEARCH ERROR:', error)
      );

      return updated;
    });
  }, []);

  // Clear all
  const clearRecentSearches = useCallback(async () => {
    setRecentSearches([]);
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('CLEAR RECENT SEARCHES ERROR:', error);
    }
  }, []);

  return {
    recentSearches,
    loaded,
    addRecentSearch,
    removeRecentSearch,
    clearRecentSearches,
  };
}