import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'

interface ConfirmationDialogProps {
	isOpen: boolean
	onConfirm: () => void
	onCancel: () => void
}

export const ConfirmationDialog = ({
	isOpen,
	onConfirm,
	onCancel
}: ConfirmationDialogProps) => {
	const { t } = useTranslation('filter')
	const dialogRef = useRef<HTMLDivElement>(null)
	const confirmButtonRef = useRef<HTMLButtonElement>(null)

	useEffect(() => {
		if (isOpen && confirmButtonRef.current) {
			confirmButtonRef.current.focus()
		}
	}, [isOpen])

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape' && isOpen) {
				onCancel()
			}
		}

		document.addEventListener('keydown', handleKeyDown)
		return () => document.removeEventListener('keydown', handleKeyDown)
	}, [isOpen, onCancel])

	if (!isOpen) {
		return null
	}

	return (
		<div
			className="fixed inset-0 z-[60] flex items-center justify-center animate-in fade-in duration-300"
			role="dialog"
			aria-modal="true"
			aria-labelledby="confirmation-title"
		>
			<div
				className="absolute inset-0 bg-black/30 backdrop-blur-sm"
				onClick={onCancel}
				aria-hidden="true"
			/>
			<div
				ref={dialogRef}
				className="relative bg-white rounded-[16px] shadow-[0px_2px_12px_0px_rgba(0,0,0,0.14)] max-w-[1280px] w-full mx-4 p-[32px] flex flex-col items-center gap-[120px] animate-in zoom-in-95 duration-300"
			>
				{/* Title with close button */}
				<div className="relative w-full flex items-center justify-center gap-[80px]">
					<h2
						id="confirmation-title"
						className="text-[40px] font-medium text-[#31393C] leading-[100%] text-center"
						style={{ fontFamily: 'Inter' }}
					>
						{t('confirmationTitle')}
					</h2>
					<button
						type="button"
						onClick={onCancel}
						className="absolute left-[1192px] top-[12px] w-6 h-6 overflow-hidden flex items-center justify-center hover:opacity-70 transition-opacity focus:outline-none"
						aria-label={t('close')}
					>
						<svg
							width="20"
							height="20"
							viewBox="0 0 20 20"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M19.557 0.458161C19.4167 0.317531 19.25 0.20596 19.0665 0.129836C18.8829 0.0537112 18.6862 0.0145271 18.4875 0.0145271C18.2889 0.0145271 18.0921 0.0537112 17.9086 0.129836C17.7251 0.20596 17.5584 0.317531 17.4181 0.458161L10 7.86105L2.58194 0.442991C2.4415 0.302545 2.27476 0.191138 2.09126 0.115129C1.90776 0.0391207 1.71109 1.47983e-09 1.51247 0C1.31385 -1.47983e-09 1.11717 0.0391207 0.93367 0.115129C0.750169 0.191138 0.583436 0.302545 0.442991 0.442991C0.302545 0.583436 0.191138 0.750169 0.115129 0.93367C0.0391207 1.11717 -1.47983e-09 1.31385 0 1.51247C1.47983e-09 1.71109 0.0391207 1.90776 0.115129 2.09126C0.191138 2.27476 0.302545 2.4415 0.442991 2.58194L7.86105 10L0.442991 17.4181C0.302545 17.5585 0.191138 17.7252 0.115129 17.9087C0.0391207 18.0922 0 18.2889 0 18.4875C0 18.6862 0.0391207 18.8828 0.115129 19.0663C0.191138 19.2498 0.302545 19.4166 0.442991 19.557C0.583436 19.6975 0.750169 19.8089 0.93367 19.8849C1.11717 19.9609 1.31385 20 1.51247 20C1.71109 20 1.90776 19.9609 2.09126 19.8849C2.27476 19.8089 2.4415 19.6975 2.58194 19.557L10 12.1389L17.4181 19.557C17.5585 19.6975 17.7252 19.8089 17.9087 19.8849C18.0922 19.9609 18.2889 20 18.4875 20C18.6862 20 18.8828 19.9609 19.0663 19.8849C19.2498 19.8089 19.4166 19.6975 19.557 19.557C19.6975 19.4166 19.8089 19.2498 19.8849 19.0663C19.9609 18.8828 20 18.6862 20 18.4875C20 18.2889 19.9609 18.0922 19.8849 17.9087C19.8089 17.7252 19.6975 17.5585 19.557 17.4181L12.1389 10L19.557 2.58194C20.1335 2.00549 20.1335 1.03462 19.557 0.458161Z"
								fill="#31393C"
							/>
						</svg>
					</button>
				</div>

				{/* Buttons */}
				<div className="flex gap-[32px] items-start justify-center">
					<button
						type="button"
						onClick={onCancel}
						className="w-[280px] px-[49px] py-[26px] text-[#474747] bg-white border-2 border-[#B4B4B4] rounded-[16px] text-base font-semibold leading-[100%] hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 transition-colors flex items-center justify-center"
						style={{ fontFamily: 'Inter' }}
					>
						{t('confirmNo')}
					</button>
					<button
						ref={confirmButtonRef}
						type="button"
						onClick={onConfirm}
						className="w-[280px] px-[70px] py-[26px] text-white bg-[#FF5F00] rounded-[16px] text-base font-semibold leading-[100%] hover:bg-[#E65500] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5F00] focus-visible:ring-offset-2 transition-colors flex items-center justify-center"
						style={{ fontFamily: 'Inter' }}
					>
						{t('confirmYes')}
					</button>
				</div>
			</div>
		</div>
	)
}
