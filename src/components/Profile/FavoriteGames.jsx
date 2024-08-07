const FavoriteGames = ({ user }) => {
    return (
        <>
            <div className='my-4'>
                <h2 className='font-bold text-lg mb-2'>Juegos favoritos de {user.displayName}</h2>
            </div>
            <div className='grid grid-cols-4 gap-1'>
                {user.games.map((game) => (
                    <div key={game.title}>
                        <div className={`mx-auto rounded-full flex items-center justify-center p-3 w-12 h-12 bg-primary`}>
                            <img src={game.icon} alt={game.title} />
                        </div>
                        <div className='text-center my-2'>{game.title}</div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default FavoriteGames