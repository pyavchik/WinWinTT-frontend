import { FilterChoose } from '@/shared/api/types/Filter'

import { FilterOption } from './FilterOption'

interface FilterGroupProps {
	filter: FilterChoose
	selectedOptions: string[]
	onOptionToggle: (filterId: string, optionId: string) => void
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
		<div className="border-b border-gray-200 last:border-b-0 py-6">
			<div className="flex items-center gap-2 mb-4 px-2">
				<h3 className="text-base font-semibold text-gray-800">{filter.name}</h3>
				{filter.description && (
					<div className="group relative">
						<svg
							className="w-4 h-4 text-gray-400 cursor-help"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<circle
								cx="12"
								cy="12"
								r="10"
								strokeWidth="1.5"
							/>
							<path
								strokeLinecap="round"
								strokeWidth="1.5"
								d="M12 16v-4M12 8h.01"
							/>
						</svg>
						<div
							role="tooltip"
							className="absolute left-0 bottom-full mb-2 hidden group-hover:block w-48 p-2 bg-gray-800 text-white text-xs rounded-lg shadow-lg z-10"
						>
							{filter.description}
						</div>
					</div>
				)}
			</div>

			<div className="px-2 grid grid-cols-1 md:grid-cols-3 gap-1">
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
