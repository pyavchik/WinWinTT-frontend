import { create } from 'zustand'

import { FilterType } from '@/shared/api/types/Filter'
import { SearchRequestFilter } from '@/shared/api/types/SearchRequest/SearchRequestFilter'

interface FilterState {
	filters: SearchRequestFilter
	setFilters: (filters: SearchRequestFilter) => void
	clearAllFilters: () => void
}

export const useFilterStore = create<FilterState>(set => ({
	filters: [],
	setFilters: filters => set({ filters }),
	clearAllFilters: () => set({ filters: [] })
}))

export const transformToSearchRequestFilter = (
	selectedOptions: Record<string, string[]>
): SearchRequestFilter => {
	return Object.entries(selectedOptions)
		.filter(([, optionIds]) => optionIds.length > 0)
		.map(([filterId, optionIds]) => ({
			id: filterId,
			type: FilterType.OPTION,
			optionsIds: optionIds
		}))
}

export const transformFromSearchRequestFilter = (
	filters: SearchRequestFilter
): Record<string, string[]> => {
	const result: Record<string, string[]> = {}
	filters.forEach(filter => {
		result[filter.id] = filter.optionsIds
	})
	return result
}
