import { Link } from 'react-router-dom'
import { Star, EmptyStar } from '../../Icons'
import { AddRecomendation } from '../../credentials'
const ProfileHeader = ({ user, edit, like }) => {
    console.log(user)
    return (
        <>
            <div
                className={`border-b-2 text-white text-center pt-44 relative bg-cover bg-center bg-primary`}
                style={{
                    backgroundImage: `url(${user.banner})`
                }}
            >
                <div className="w-40 h-40 rounded-full absolute top-24 inset-0 mx-auto border-solid border-white border-8">
                    <img className='w-40 rounded-full'
                        src={user.photoURL || 'assets/user/avatar.png'}
                        alt="User Profile"
                    />
                    {edit && <Link to={'/profile/edit'} className='w-10 h-10 rounded-full bg-primary absolute right-0 -bottom-0 border-white border-2'>
                    </Link>}
                    {like && <div className='w-10 h-10 rounded-full bg-primary absolute right-0 -bottom-0 border-white border-2' onClick={() => AddRecomendation(user.id)}></div>}
                </div>
            </div>
            <div className="px-4 pt-20">
                <h1 className="text-3xl font-bold text-center">{user.displayName}</h1>
                <div className='flex w-full justify-center'>
                    {Array.from({ length: 5 }, (_, i) =>
                        i < user.stars ? <Star key={`star-${i}`} /> : <EmptyStar key={`star-${i}`} />
                    )}
                </div>
            </div>
        </>
    )
}

export default ProfileHeader