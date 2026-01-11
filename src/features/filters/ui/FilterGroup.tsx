import { FilterChoose } from '@/shared/api/types/Filter'

import { FilterOption } from './FilterOption'

interface FilterGroupProps {
	filter: FilterChoose
	selectedOptions: string[]
	onOptionToggle: (filterId: string, optionId: string) => void
}

const getGridClass = (columns?: 1 | 2 | 3) => {
	switch (columns) {
		case 1:
			return 'flex flex-col gap-4'
		case 2:
			return 'grid grid-cols-2 gap-x-6 gap-y-4'
		default:
			return 'grid grid-cols-3 gap-x-6 gap-y-4'
	}
}

export const FilterGroup = ({
	filter,
	selectedOptions,
	onOptionToggle
}: FilterGroupProps) => {
	const handleOptionToggle = (optionId: string) => {
		onOptionToggle(filter.id, optionId)
	}

	return (
		<div className="pt-8 pb-6">
			<h3
				className="text-[24px] font-medium text-[#31393C] leading-[100%] mb-6"
				style={{ fontFamily: 'Inter' }}
			>
				{filter.name}
			</h3>

			<div className={getGridClass(filter.columns)}>
				{filter.options.map(option => (
					<FilterOption
						key={option.id}
						option={option}
						isSelected={selectedOptions.includes(option.id)}
						onToggle={handleOptionToggle}
					/>
				))}
			</div>
		</div>
	)
}
