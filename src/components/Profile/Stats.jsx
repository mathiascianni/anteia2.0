import { Thumb, Heart, Badge } from "../../Icons"
const Stats = ({ user }) => {
    const iconSize = "20"
    
    return (
        <>
            <div>
                <ul>
                    <li className="flex items-center gap-1"><Heart width={iconSize} height={iconSize} path={"fill-primary"} />Cantidad de matchs: <span className='text-primary font-bold'>{user.matchs || 0}</span></li>
                    <li className="flex items-center gap-1"><Thumb width={iconSize} height={iconSize} path={"fill-primary"} />Cantidad de recomendaciones: <span className='text-primary font-bold'>{user.recommendations || 0}</span></li>
                    <li className="flex items-center gap-1"><Badge width={iconSize} height={iconSize} path={"fill-primary"} />Cantidad de insignias: <span className='text-primary font-bold'>{user.badges?.length || 0}</span></li>
                </ul>
            </div>
        </>
    )
}

export default Stats