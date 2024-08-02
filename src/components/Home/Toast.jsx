import React from 'react';

const Toast = () => {
    return (

        <div class="w-full shadow p-4 absolute max-w-[90%] z-50 top-2 right-1/2 translate-x-1/2  text-gray-500 bg-white rounded-lg" role="alert">
            <div class="flex">
                <img class="w-8 h-8 rounded-full" src="ruta que no tegno idea como seria" alt="Adrian" />
                <div class="ms-3 text-sm font-normal">
                    <span class="mb-1 text-sm font-semibold text-primary">Adrian</span>
                    <div class="mb-2 text-xs font-normal text-black">Que haces pa sale ese valorant</div>
                </div>
                <div class="ms-auto -mt-1">
                    <span class="text-xs text-gray-400 ">2:33pm</span>
                </div>
            </div>
        </div>

    );
}

export default Toast;
