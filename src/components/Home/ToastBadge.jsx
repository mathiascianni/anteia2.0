import React from 'react';

const ToastBadge = ({ badge }) => {
    return (
        <div className="absolute left-1/2 top-2 transform -translate-x-1/2 w-full shadow p-4 max-w-[90%] z-50 text-gray-500 bg-white rounded-lg mt-2">
            <div className="flex">
                <div className='mx-auto p-3 w-12 h-12 bg-[url("/media/extras/badge_complete.png")]'>
                    <img className='mx-auto' src={badge.icon} alt={badge.title} />
                </div>
                <div className="ms-3 text-sm font-normal">
                    <span className="mb-1 text-sm font-semibold text-primary">"{badge.title}"</span>
                    <div className="mb-2 text-xs font-normal text-black">Felicidades Conseguiste un logro</div>
                </div>
                <div className="ms-auto -mt-1">
                    <span className="text-xs text-gray-400">22:00</span>
                </div>
            </div>
        </div>
    );
}

export default ToastBadge;
