const Star = ({ width = "24", height = "24", svg, path }) => {
    return (
        <svg width={width} height={height} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={svg}>
            <path d="M8 0L10.2101 4.9581L15.6085 5.52786L11.576 9.1619L12.7023 14.4721L8 11.76L3.29772 14.4721L4.42403 9.1619L0.391548 5.52786L5.78993 4.9581L8 0Z" fill="url(#paint0_linear_724_417)" className={path} />
            <defs>
                <linearGradient id="paint0_linear_724_417" x1="8" y1="0" x2="8" y2="16" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#FFBD15" />
                </linearGradient>
            </defs>
        </svg>

    )
}

export default Star