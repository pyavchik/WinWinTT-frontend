import { I18nextProvider } from 'react-i18next'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen } from '@testing-library/react'
import i18n from 'i18next'
import { describe, expect, it, vi } from 'vitest'

// Import to ensure i18n is configured
import '@/shared/i18n'

import { FilterModal } from './FilterModal'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: false,
			gcTime: 0
		}
	}
})

const renderWithProviders = (component: React.ReactElement) => {
	return render(
		<QueryClientProvider client={queryClient}>
			<I18nextProvider i18n={i18n}>{component}</I18nextProvider>
		</QueryClientProvider>
	)
}

describe('FilterModal', () => {
	const mockOnClose = vi.fn()

	it('renders without crashing when closed', () => {
		renderWithProviders(
			<FilterModal
				isOpen={false}
				onClose={mockOnClose}
			/>
		)
		expect(document.body).toBeDefined()
	})

	it('does not show modal content when closed', () => {
		renderWithProviders(
			<FilterModal
				isOpen={false}
				onClose={mockOnClose}
			/>
		)
		const modal = screen.queryByRole('dialog')
		expect(modal).not.toBeInTheDocument()
	})
})
