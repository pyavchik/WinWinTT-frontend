import { FilterChooseOption } from '@/shared/api/types/Filter'

interface FilterOptionProps {
	option: FilterChooseOption
	isSelected: boolean
	onToggle: (optionId: string) => void
}

export const FilterOption = ({
	option,
	isSelected,
	onToggle
}: FilterOptionProps) => {
	const handleChange = () => {
		onToggle(option.id)
	}

	return (
		<label
			className="flex items-center gap-1 cursor-pointer"
			htmlFor={`option-${option.id}`}
			style={{ fontFamily: 'Inter' }}
		>
			<div className="relative w-6 h-6 shrink-0 overflow-hidden flex items-center justify-center">
				<input
					type="checkbox"
					id={`option-${option.id}`}
					checked={isSelected}
					onChange={handleChange}
					className="sr-only"
				/>
				<svg
					width="20"
					height="20"
					viewBox="0 0 20 20"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					className="transition-colors"
				>
					<rect
						x="0.835"
						y="0.835"
						width="18.33"
						height="18.33"
						rx="2"
						ry="2"
						fill={isSelected ? '#31393C' : '#FFFFFF'}
						stroke="#31393C"
						strokeWidth="1.67"
					/>
					{isSelected && (
						<path
							d="M5 10L8.5 13.5L15 7"
							stroke="#FFFFFF"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					)}
				</svg>
			</div>
			<span
				className="text-[16px] text-[#31393C] font-normal leading-[100%]"
				style={{ fontFamily: 'Inter' }}
			>
				{option.name}
			</span>
		</label>
	)
}
