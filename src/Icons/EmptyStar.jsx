const EmptyStar = ({ width = "24", height = "24", svg, path }) => {
    return (
        <svg width={width} height={height} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={svg}>
            <path d="M8 1.2281L9.75339 5.16166L9.8708 5.42507L10.1576 5.45533L14.4405 5.90737L11.2412 8.79048L11.027 8.98354L11.0869 9.26565L11.9804 13.4786L8.24981 11.3269L8 11.1828L7.75019 11.3269L4.01958 13.4786L4.91315 9.26565L4.97298 8.98354L4.75875 8.79048L1.55954 5.90737L5.84241 5.45533L6.1292 5.42507L6.24661 5.16166L8 1.2281Z" stroke="url(#paint0_linear_724_415)" className={path} />
            <defs>
                <linearGradient id="paint0_linear_724_415" x1="8" y1="0" x2="8" y2="16" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#FFBD15" />
                </linearGradient>
            </defs>
        </svg>

    )
}

export default EmptyStar