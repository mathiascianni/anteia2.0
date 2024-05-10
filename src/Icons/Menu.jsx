const Menu = ({ width = "24", height = "24", svg, path }/*  */) => {
    return (
        <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={svg}>
            <path d="M2.25 5C2.25 4.58579 2.58579 4.25 3 4.25H21C21.4142 4.25 21.75 4.58579 21.75 5C21.75 5.41421 21.4142 5.75 21 5.75H3C2.58579 5.75 2.25 5.41421 2.25 5Z" fill="#2B2A2F" className={path} />
            <path d="M2.25 12C2.25 11.5858 2.58579 11.25 3 11.25H21C21.4142 11.25 21.75 11.5858 21.75 12C21.75 12.4142 21.4142 12.75 21 12.75H3C2.58579 12.75 2.25 12.4142 2.25 12Z" fill="#2B2A2F" className={path} />
            <path d="M3 18.25C2.58579 18.25 2.25 18.5858 2.25 19C2.25 19.4142 2.58579 19.75 3 19.75H21C21.4142 19.75 21.75 19.4142 21.75 19C21.75 18.5858 21.4142 18.25 21 18.25H3Z" fill="#2B2A2F" className={path} />
        </svg>

    )
}

export default Menu