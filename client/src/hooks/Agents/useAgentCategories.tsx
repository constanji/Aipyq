import { useMemo } from 'react';

import useLocalize from '~/hooks/useLocalize';
import { EMPTY_AGENT_CATEGORY } from '~/constants/agentCategories';

// This interface matches the structure used by the ControlCombobox component
export interface ProcessedAgentCategory {
  label: string; // Translated label
  value: string; // Category value
  className?: string;
  icon?: string;
}

/**
 * Custom hook that provides processed and translated agent categories
 * Note: Marketplace functionality has been removed, this now returns empty categories
 *
 * @returns Object containing categories, emptyCategory, and loading state
 */
const useAgentCategories = () => {
  const localize = useLocalize();

  const categories = useMemo((): ProcessedAgentCategory[] => {
    // Return empty array since marketplace is removed
    return [];
  }, []);

  const emptyCategory = useMemo(
    (): ProcessedAgentCategory => ({
      label: localize(EMPTY_AGENT_CATEGORY.label),
      value: EMPTY_AGENT_CATEGORY.value,
      className: 'w-full',
    }),
    [localize],
  );

  return {
    categories,
    emptyCategory,
    isLoading: false,
    error: null,
  };
};

export default useAgentCategories;

