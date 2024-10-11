const Badges = ({ user }) => {
    return (
        <>
            <div className='my-4'>
                <h2 className='font-bold text-lg mb-2 '>Insignias de {user.displayName}</h2>
            </div>
            {
                user.badges && user.badges.length > 0 ?
                    <div className='grid grid-cols-4 gap-1'>
                        {user.badges.map((badge) => (
                            <div key={badge.id} >
                                <div className={`mx-auto p-3 w-12 h-12 bg-[url("/media/extras/badge_bg.png")]`}>
                                    <img className='mx-auto' src={badge.icon} alt={badge.title} />
                                </div>
                                <div className='text-center my-2'>{badge.title}</div>
                            </div>
                        ))}
                    </div>
                    :
                    <p>Este usuario no tiene insignias</p>
            }
        </>
    )
}

export default Badges