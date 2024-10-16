const Badges = ({ user, badges }) => {
    return (
        <>
            <div className='my-4'>
                <h2 className='font-bold text-lg mb-2 '>Insignias de {user.displayName}</h2>
            </div>
            <div className='grid grid-cols-3 gap-2'>
                {badges.map((badge) => (
                    <div key={badge.id} >
                        <div className={`mx-auto p-3 w-12 h-12 ${user.badges && Object.keys(user.badges).some(badgeId => {
                            return badgeId === badge.id;
                        }) ? 'bg-[url("/media/extras/badge_complete.png")]' : 'bg-[url("/media/extras/badge_incomplete.png")]'}`}>
                            <img className='mx-auto' src={badge.icon} alt={badge.title} />
                        </div>
                        <div className='text-center text-sm my-2'>{badge.title}</div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Badges
