const User = ({ width = "32", height = "32", svg, path }) => {
    return (
        <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={svg}>
            <path fillRule="evenodd" clipRule="evenodd" d="M17 7C17 9.76142 14.7614 12 12 12C9.23858 12 7 9.76142 7 7C7 4.23858 9.23858 2 12 2C14.7614 2 17 4.23858 17 7ZM15.5 7C15.5 8.933 13.933 10.5 12 10.5C10.067 10.5 8.5 8.933 8.5 7C8.5 5.067 10.067 3.5 12 3.5C13.933 3.5 15.5 5.067 15.5 7Z" fill="#F5F5F5" className={path} />
            <path fillRule="evenodd" clipRule="evenodd" d="M20 17.5C20 19.9853 16.4183 22 12 22C7.58172 22 4 19.9853 4 17.5C4 15.0147 7.58172 13 12 13C16.4183 13 20 15.0147 20 17.5ZM18.5 17.5C18.5 17.96 18.1527 18.6821 16.9215 19.3746C15.7373 20.0407 14.0003 20.5 12 20.5C9.99969 20.5 8.26273 20.0407 7.07854 19.3746C5.84733 18.6821 5.5 17.96 5.5 17.5C5.5 17.04 5.84733 16.3179 7.07854 15.6254C8.26273 14.9593 9.99969 14.5 12 14.5C14.0003 14.5 15.7373 14.9593 16.9215 15.6254C18.1527 16.3179 18.5 17.04 18.5 17.5Z" fill="#F5F5F5" className={path} />
        </svg>

    )
}

export default User