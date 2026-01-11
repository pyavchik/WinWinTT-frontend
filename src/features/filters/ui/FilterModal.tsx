import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import {
	transformFromSearchRequestFilter,
	transformToSearchRequestFilter,
	useFilterData,
	useFilterStore
} from '../model'
import { ConfirmationDialog } from './ConfirmationDialog'
import { FilterGroup } from './FilterGroup'

interface FilterModalProps {
	isOpen: boolean
	onClose: () => void
}

export const FilterModal = ({ isOpen, onClose }: FilterModalProps) => {
	const { t } = useTranslation('filter')
	const { data, isLoading, error } = useFilterData()
	const { filters, setFilters } = useFilterStore()

	const [localSelections, setLocalSelections] = useState<
		Record<string, string[]>
	>({})
	const [showConfirmation, setShowConfirmation] = useState(false)

	// Initialize local selections from store when modal opens
	useEffect(() => {
		if (isOpen) {
			setLocalSelections(transformFromSearchRequestFilter(filters))
		}
	}, [isOpen, filters])

	// Handle escape key to close modal
	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape' && isOpen && !showConfirmation) {
				onClose()
			}
		}

		document.addEventListener('keydown', handleKeyDown)
		return () => document.removeEventListener('keydown', handleKeyDown)
	}, [isOpen, showConfirmation, onClose])

	// Prevent body scroll when modal is open
	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden'
		} else {
			document.body.style.overflow = ''
		}
		return () => {
			document.body.style.overflow = ''
		}
	}, [isOpen])

	const handleOptionToggle = useCallback(
		(filterId: string, optionId: string) => {
			setLocalSelections(prev => {
				const currentOptions = prev[filterId] || []
				const isSelected = currentOptions.includes(optionId)

				if (isSelected) {
					return {
						...prev,
						[filterId]: currentOptions.filter(id => id !== optionId)
					}
				} else {
					return {
						...prev,
						[filterId]: [...currentOptions, optionId]
					}
				}
			})
		},
		[]
	)

	const handleApplyClick = () => {
		setShowConfirmation(true)
	}

	const handleConfirm = () => {
		setFilters(transformToSearchRequestFilter(localSelections))
		setShowConfirmation(false)
		onClose()
	}

	const handleCancelConfirmation = () => {
		// Revert local selections back to the saved state
		setLocalSelections(transformFromSearchRequestFilter(filters))
		setShowConfirmation(false)
	}

	const handleClearAll = () => {
		setLocalSelections({})
	}

	if (!isOpen) {
		return null
	}

	return (
		<>
			<div
				className="fixed inset-0 z-50 flex items-center justify-center animate-in fade-in duration-300"
				role="dialog"
				aria-modal="true"
				aria-labelledby="filter-modal-title"
			>
				{/* Backdrop */}
				<div
					className="absolute inset-0 pointer-events-none"
					aria-hidden="true"
				>
					<div className="absolute inset-0 bg-[#d9d9d9]" />
					<div className="absolute inset-0 bg-[rgba(0,0,0,0.2)]" />
				</div>
				<div
					className="absolute inset-0"
					onClick={onClose}
					aria-hidden="true"
				/>

				{/* Modal Content */}
				<div className="relative bg-white rounded-[16px] overflow-hidden w-full max-w-[1280px] max-h-[calc(100vh-80px)] flex flex-col animate-in zoom-in-95 duration-300">
					{/* Scrollable Content */}
					<div className="overflow-y-auto scrollbar-hide">
						{/* Header */}
						<div className="relative flex items-center justify-center pt-[40px] pb-[25px] px-[31px]">
							<h1
								id="filter-modal-title"
								className="text-[40px] font-medium text-[#31393C] leading-[100%]"
								style={{ fontFamily: 'Inter' }}
							>
								{t('title')}
							</h1>
							<button
								type="button"
								onClick={onClose}
								className="absolute right-[31px] top-[52px] w-6 h-6 overflow-hidden flex items-center justify-center hover:opacity-70 transition-opacity focus:outline-none"
								aria-label={t('close')}
							>
								<svg
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M21.557 2.45816C21.4167 2.31753 21.25 2.20596 21.0665 2.12984C20.8829 2.05371 20.6862 2.01453 20.4875 2.01453C20.2889 2.01453 20.0921 2.05371 19.9086 2.12984C19.7251 2.20596 19.5584 2.31753 19.4181 2.45816L12 9.86105L4.58194 2.44299C4.4415 2.30255 4.27476 2.19114 4.09126 2.11513C3.90776 2.03912 3.71109 2 3.51247 2C3.31385 2 3.11717 2.03912 2.93367 2.11513C2.75017 2.19114 2.58344 2.30255 2.44299 2.44299C2.30255 2.58344 2.19114 2.75017 2.11513 2.93367C2.03912 3.11717 2 3.31385 2 3.51247C2 3.71109 2.03912 3.90776 2.11513 4.09126C2.19114 4.27476 2.30255 4.4415 2.44299 4.58194L9.86105 12L2.44299 19.4181C2.30255 19.5585 2.19114 19.7252 2.11513 19.9087C2.03912 20.0922 2 20.2889 2 20.4875C2 20.6862 2.03912 20.8828 2.11513 21.0663C2.19114 21.2498 2.30255 21.4166 2.44299 21.557C2.58344 21.6975 2.75017 21.8089 2.93367 21.8849C3.11717 21.9609 3.31385 22 3.51247 22C3.71109 22 3.90776 21.9609 4.09126 21.8849C4.27476 21.8089 4.4415 21.6975 4.58194 21.557L12 14.1389L19.4181 21.557C19.5585 21.6975 19.7252 21.8089 19.9087 21.8849C20.0922 21.9609 20.2889 22 20.4875 22C20.6862 22 20.8828 21.9609 21.0663 21.8849C21.2498 21.8089 21.4166 21.6975 21.557 21.557C21.6975 21.4166 21.8089 21.2498 21.8849 21.0663C21.9609 20.8828 22 20.6862 22 20.4875C22 20.2889 21.9609 20.0922 21.8849 19.9087C21.8089 19.7252 21.6975 19.5585 21.557 19.4181L14.1389 12L21.557 4.58194C22.1335 4.00549 22.1335 3.03462 21.557 2.45816Z"
										fill="#31393C"
									/>
								</svg>
							</button>
						</div>
						{/* Divider */}
						<div className="mx-[34px] h-0 border-t-2 border-[#B4B4B4]" />

						{/* Content */}
						<div className="pl-[34px] pr-[34px] py-2">
							{isLoading && (
								<div className="flex items-center justify-center py-12">
									<div className="animate-spin w-8 h-8 border-4 border-gray-200 border-t-gray-600 rounded-full" />
								</div>
							)}

							{error && (
								<div className="text-center py-12 text-red-600">
									{t('error')}
								</div>
							)}

							{data?.filterItems && (
								<div>
									{data.filterItems.map((filter, index) => (
										<div key={filter.id}>
											<FilterGroup
												filter={filter}
												selectedOptions={localSelections[filter.id] || []}
												onOptionToggle={handleOptionToggle}
											/>
											{index < data.filterItems.length - 1 && (
												<div className="h-0 border-t-2 border-[#B4B4B4]" />
											)}
										</div>
									))}
								</div>
							)}
						</div>

						{/* Footer Divider */}
						<div className="mx-[34px] h-0 border-t-2 border-[#B4B4B4]" />
						{/* Footer */}
						<div className="relative flex items-center justify-center px-[34px] py-8 bg-white">
							<button
								type="button"
								onClick={handleApplyClick}
								className="w-[184px] h-[64px] px-[70px] py-[26px] text-white bg-[#FF5F00] rounded-[16px] text-base font-semibold hover:bg-[#E65500] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5F00] focus-visible:ring-offset-2 transition-colors flex items-center justify-center leading-[100%]"
								style={{ fontFamily: 'Inter' }}
							>
								{t('apply')}
							</button>
							<button
								type="button"
								onClick={handleClearAll}
								className="absolute right-[34px] text-[#078691] text-base font-medium underline hover:opacity-70 focus:outline-none transition-opacity leading-[100%]"
								style={{ fontFamily: 'Inter' }}
							>
								{t('clearAllParameters')}
							</button>
						</div>
					</div>
				</div>
			</div>

			<ConfirmationDialog
				isOpen={showConfirmation}
				onConfirm={handleConfirm}
				onCancel={handleCancelConfirmation}
			/>
		</>
	)
}
