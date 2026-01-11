import { FilterBase, FilterChooseOption, FilterType } from '.'

export interface FilterChoose extends FilterBase {
	type: FilterType.OPTION
	allowAll?: boolean
	options: FilterChooseOption[]
	columns?: 1 | 2 | 3
}
