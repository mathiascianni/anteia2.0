import { TopBar } from "../components/Navigation"
import { Badges, FavoriteGames, ProfileHeader, Stats } from "../components/Profile"
import { useUser } from "../context/User/UserContext"
import { getUserById } from "../credentials"
import { useEffect, useState } from "react";
import { SpinnerLoader } from "../components/General";

const MyProfile = () => {
	const [data, setData] = useState({});
	const [loading, setLoading] = useState(true); 

	useEffect(() => {
		const fetchData = async () => {
			const userId = localStorage.getItem('userId');
			if (!userId) {
				console.error('No se encontró el ID del usuario en localStorage.');
				setLoading(false); 
				return;
			}
			const userData = await getUserById(userId);
			setData(userData || {});
			setLoading(false);
		};
		fetchData();
	}, []);

	if (loading) { 
		return <SpinnerLoader />;
	}

	console.log(data)
	return (
		<div>
			<div className='px-4'>
				<TopBar backBtn bell />
			</div>
			<ProfileHeader user={data} />
			{/* esto cuando recargo no funciona o cuando entro no funciona */}
			<div className='px-4 my-4'>
				<Stats user={data} />
				<Badges user={data} />
				<FavoriteGames user={data} />
			</div>
		</div>
	)
}

export default MyProfile