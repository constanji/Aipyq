import { useMemo } from 'react';

import useLocalize from '~/hooks/useLocalize';
import { EMPTY_AGENT_CATEGORY } from '~/constants/agentCategories';
import { useGetAgentCategoriesQuery } from '~/data-provider/Agents/queries';

// This interface matches the structure used by the ControlCombobox component
export interface ProcessedAgentCategory {
  label: string; // Translated label
  value: string; // Category value
  className?: string;
  icon?: string;
}

/**
 * Custom hook that provides processed and translated agent categories
 *
 * @returns Object containing categories, emptyCategory, and loading state
 */
const useAgentCategories = () => {
  const localize = useLocalize();
  const { data: categoriesData = [], isLoading, error } = useGetAgentCategoriesQuery();

  const categories = useMemo((): ProcessedAgentCategory[] => {
    // Filter out 'all' and 'promoted' categories as they are for filtering, not for assignment
    const filteredCategories = categoriesData.filter(
      (cat) => cat.value !== 'all' && cat.value !== 'promoted',
    );

    // Map to ProcessedAgentCategory format
    return filteredCategories.map((category) => ({
      label: category.label || category.value,
      value: category.value,
      className: 'w-full',
    }));
  }, [categoriesData]);

  // If no categories from API, provide default categories
  const defaultCategories = useMemo((): ProcessedAgentCategory[] => {
    if (categories.length > 0) {
      return categories;
    }
    // Return default categories if API returns empty
    return [
      {
        label: localize('com_ui_agent_category_general'),
        value: 'general',
        className: 'w-full',
      },
    ];
  }, [categories, localize]);

  const emptyCategory = useMemo(
    (): ProcessedAgentCategory => ({
      label: localize(EMPTY_AGENT_CATEGORY.label),
      value: EMPTY_AGENT_CATEGORY.value,
      className: 'w-full',
    }),
    [localize],
  );

  return {
    categories: defaultCategories,
    emptyCategory,
    isLoading,
    error,
  };
};

export default useAgentCategories;

