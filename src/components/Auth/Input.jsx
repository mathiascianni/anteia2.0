import React from 'react';

const Input = ({title = "", type = ""}) => {
    return (
       
            <div class="relative w-full min-w-[200px] h-10">
                <input
                    type = {type}
                    class="peer w-full h-full border-t-transparent border-l-transparent border-r-transparent bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 border-b-gray-300 border focus:border-2  text-sm px-3 py-2.5  focus:border-b-blue-700"
                    placeholder=" " /><label
                    class="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[0.9rem] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md  before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md  after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-400 peer-focus:text-blue-700 ">
                        {title}
                </label>
            </div>
       
    );
}

export default Input;
