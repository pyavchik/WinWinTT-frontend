import { useQuery } from '@tanstack/react-query'

import { FilterItem } from '@/shared/api/types/Filter'
import filterData from '@/shared/temp/filterData.json'

interface FilterDataResponse {
	filterItems: FilterItem[]
}

const fetchFilterData = async (): Promise<FilterDataResponse> => {
	// Simulate API call delay
	await new Promise(resolve => setTimeout(resolve, 100))
	return filterData as FilterDataResponse
}

export const useFilterData = () => {
	return useQuery({
		queryKey: ['filterData'],
		queryFn: fetchFilterData,
		staleTime: Infinity
	})
}
