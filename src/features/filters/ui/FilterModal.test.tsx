import { I18nextProvider } from 'react-i18next'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import i18n from '@/shared/i18n'

import { FilterModal } from './FilterModal'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: false,
			cacheTime: 0
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
	it('renders without crashing', () => {
		renderWithProviders(<FilterModal />)
		expect(document.body).toBeDefined()
	})

	it('does not show modal by default', () => {
		renderWithProviders(<FilterModal />)
		const modal = screen.queryByRole('dialog')
		expect(modal).not.toBeInTheDocument()
	})
})
