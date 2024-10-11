import { BackBtn, Bell } from "../../Icons";
import { useNavigate } from "react-router-dom";

const TopBar = ({ backBtn, title, bell }) => {
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate(-1); 
    };

    return (
        <div className='h-menu flex items-center justify-between relative'>
            {backBtn && (
                <button
                    className='text-primary absolute block left-0 top-1/2 -translate-y-1/2'
                    onClick={handleBackClick} 
                >
                    <BackBtn />
                </button>
            )}

            {title && <h1 className='text-2xl font-titles font-thin flex-1 text-center'>{title}</h1>}

            {bell && <div className="absolute right-0 top-1/2 -translate-y-1/2 block"><Bell /></div>}
        </div>
    );
}

export default TopBar;
