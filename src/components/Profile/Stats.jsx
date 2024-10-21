import { useState, useEffect } from 'react';
import { Thumb, Heart, Badge } from "../../Icons";

const Stats = ({ user }) => {
    const iconSize = "20";
    const [badgeCount, setBadgeCount] = useState(0);
    const [matchCount, setMatchCount] = useState(0);
    const [recommendationCount, setRecommendationCount] = useState(0);

    useEffect(() => {
      
        if (user && user.badges) {
            const badges = Array.isArray(user.badges)
                ? user.badges.length
                : Object.keys(user.badges).length;
            setBadgeCount(badges);
        }

        if (user && user.matchs) {
            setMatchCount(user.matchs.length);
        }

        if (user && user.recommendations) {
            setRecommendationCount(user.recommendations.length);
        }
    }, [user]);

    return (
        <div>
            <ul>
                <li className="flex items-center gap-1">
                    <Heart width={iconSize} height={iconSize} path={"fill-primary"} />
                    Cantidad de matchs: <span className='text-primary font-bold'>{matchCount}</span>
                </li>
                <li className="flex items-center gap-1">
                    <Thumb width={iconSize} height={iconSize} path={"fill-primary"} />
                    Cantidad de recomendaciones: <span className='text-primary font-bold'>{recommendationCount}</span>
                </li>
                <li className="flex items-center gap-1">
                    <Badge width={iconSize} height={iconSize} path={"fill-primary"} />
                    Cantidad de insignias: <span className='text-primary font-bold'>{badgeCount}</span>
                </li>
            </ul>
        </div>
    );
};

export default Stats;
