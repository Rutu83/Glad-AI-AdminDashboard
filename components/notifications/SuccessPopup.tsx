
'use client'

import React from 'react'

interface SuccessPopupProps {
    isOpen: boolean
    onClose: () => void
    title?: string
    message?: string
}

export default function SuccessPopup({
    isOpen,
    onClose,
    title = "Success!",
    message = "Operation completed successfully."
}: SuccessPopupProps) {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
            <div className="bg-card-dark border border-border-dark rounded-2xl p-8 max-w-sm w-full flex flex-col items-center text-center shadow-2xl transform transition-all animate-scaleIn">

                {/* Animated Checkmark Circle */}
                <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mb-6 relative">
                    <div className="absolute inset-0 rounded-full border border-green-500/30 animate-ping-slow"></div>
                    <svg
                        className="w-10 h-10 text-green-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                            className="animate-drawCheck"
                        />
                    </svg>
                </div>

                <h3 className="text-white text-xl font-bold mb-2">{title}</h3>
                <p className="text-text-secondary text-sm mb-8">{message}</p>

                <button
                    onClick={onClose}
                    className="w-full py-3 bg-primary hover:bg-primary-hover text-white font-semibold rounded-xl transition-all active:scale-95"
                >
                    Continue
                </button>
            </div>

            <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        @keyframes drawCheck {
          from { stroke-dasharray: 24; stroke-dashoffset: 24; }
          to { stroke-dasharray: 24; stroke-dashoffset: 0; }
        }
        .animate-fadeIn { animation: fadeIn 0.2s ease-out; }
        .animate-scaleIn { animation: scaleIn 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
        .animate-drawCheck { animation: drawCheck 0.6s ease-out forwards; }
        .animate-ping-slow { animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite; }
      `}</style>
        </div>
    )
}
