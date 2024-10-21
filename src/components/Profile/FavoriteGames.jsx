import IconGame from "../../Icons/IconGame"

const FavoriteGames = ({ user, title }) => {
    return (
        <>
            <div className='my-4'>
                <h2 className='font-bold text-lg mb-2'>Juegos favoritos de {user.displayName}</h2>
            </div>
            {
                user.games && user.games.length > 0 ?
                    <div className='grid grid-cols-3 gap-1'>
                        {user.games.map((game, index) => (
                            <IconGame game={game} index={index}/>
                        ))}
                    </div>
                    :
                    <p>Este usuario no tiene juegos favoritos</p>
            }
        </>
    )
}

export default FavoriteGames