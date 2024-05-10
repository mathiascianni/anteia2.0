const Bell = ({ width = "24", height = "24", svg, path }) => {
    return (
        <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={svg}>
            <path fillRule="evenodd" clipRule="evenodd" d="M10.5285 3.20887C7.38696 3.98312 5.05714 6.81977 5.05714 10.2003V11.5C5.05714 13.2651 4.50762 15.4763 3.97661 17.2009C3.55924 18.5563 4.54832 20 5.96661 20H10C10 20.2626 10.0517 20.5227 10.1522 20.7654C10.2527 21.008 10.4001 21.2285 10.5858 21.4142C10.7715 21.5999 10.992 21.7472 11.2346 21.8478C11.4773 21.9483 11.7374 22 12 22C12.2626 22 12.5227 21.9483 12.7654 21.8478C13.008 21.7472 13.2285 21.5999 13.4142 21.4142C13.5999 21.2285 13.7472 21.008 13.8478 20.7654C13.9483 20.5227 14 20.2626 14 20H18.3094C19.6499 20 20.6234 18.7039 20.3171 17.3989C19.9042 15.6401 19.4571 13.3161 19.4571 11.5V10.2003C19.4571 6.6285 16.8562 3.66387 13.445 3.09753C13.4288 3.03932 13.409 2.98203 13.3858 2.92597C13.3104 2.74399 13.1999 2.57863 13.0607 2.43934C12.9214 2.30005 12.756 2.18956 12.574 2.11418C12.392 2.0388 12.197 2 12 2C11.803 2 11.608 2.0388 11.426 2.11418C11.244 2.18956 11.0786 2.30005 10.9393 2.43934C10.8001 2.57863 10.6896 2.74399 10.6142 2.92597C10.5763 3.01744 10.5476 3.11221 10.5285 3.20887ZM6.55714 10.2003V11.5C6.55714 13.5041 5.94747 15.8973 5.41019 17.6423C5.34693 17.8477 5.38664 18.0699 5.51085 18.2468C5.63143 18.4185 5.7946 18.5 5.96661 18.5H18.3094C18.6282 18.5 18.9548 18.1594 18.8568 17.7417C18.4406 15.9687 17.9571 13.5012 17.9571 11.5V10.2003C17.9571 7.05222 15.4051 4.5 12.2571 4.5C9.10921 4.5 6.55714 7.05222 6.55714 10.2003Z" fill="#2B2A2F" className={path} />
        </svg>

    )
}

export default Bell