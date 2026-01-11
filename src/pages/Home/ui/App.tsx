import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { FilterModal, useFilterStore } from '@/features/filters'

export const App = () => {
	const { t } = useTranslation('filter')
	const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)
	const { filters } = useFilterStore()

	const handleOpenFilters = () => {
		setIsFilterModalOpen(true)
	}

	const handleCloseFilters = () => {
		setIsFilterModalOpen(false)
	}

	return (
		<section className="min-h-dvh bg-gradient-to-br from-slate-50 to-slate-100 p-8">
			<div className="max-w-4xl mx-auto">
				<header className="text-center mb-12">
					<h1 className="text-4xl font-bold text-slate-800 mb-4">
						{t('appTitle')}
					</h1>
					<p className="text-slate-600">{t('appSubtitle')}</p>
				</header>

				<div className="bg-white rounded-2xl shadow-lg p-8">
					<div className="flex flex-col items-center gap-6">
						<button
							type="button"
							onClick={handleOpenFilters}
							className="inline-flex items-center gap-2 px-8 py-4 bg-[#FF5F00] text-white rounded-2xl font-semibold text-lg hover:bg-[#E65500] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5F00] focus-visible:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
							aria-haspopup="dialog"
						>
							<svg
								className="w-5 h-5"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								strokeWidth={2}
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
								/>
							</svg>
							{t('openFilters')}
						</button>
					</div>
				</div>

				{/* Debug: Display selected filter data */}
				<div className="bg-white rounded-2xl shadow-lg p-8 mt-8">
					<h2 className="text-xl font-semibold text-slate-800 mb-4">
						{t('debugTitle')}
					</h2>
					<div className="bg-slate-900 rounded-xl p-6 overflow-x-auto">
						<pre className="text-sm text-emerald-400 font-mono whitespace-pre-wrap break-words">
							{JSON.stringify(filters, null, 2) || t('noFiltersSelected')}
						</pre>
					</div>
				</div>
			</div>

			<FilterModal
				isOpen={isFilterModalOpen}
				onClose={handleCloseFilters}
			/>
		</section>
	)
}
