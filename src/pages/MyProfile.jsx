import { TopBar } from "../components/Navigation"
import { Badges, FavoriteGames, ProfileHeader, Stats } from "../components/Profile"
import { getDataDB, getUserById, searchBadgeForName } from "../credentials"
import { useEffect, useState } from "react";
import { SpinnerLoader } from "../components/General";
import { Link } from "react-router-dom";

const MyProfile = () => {
	const [data, setData] = useState({});
	const [loading, setLoading] = useState(true);
	const [badges, setBadges] = useState([])

	useEffect(() => {
		const fetchData = async () => {
			const userId = localStorage.getItem('userId');
			if (!userId) {
				console.error('No se encontró el ID del usuario en localStorage.');
				setLoading(false);
				return;
			}
			const userData = await getUserById(userId);
			const badgesData = await getDataDB('badges');
			setBadges(badgesData)
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
			<ProfileHeader user={data} edit />
			{data.role === 'admin' &&
				<div className="px-4 pt-4">
					<Link to={'/admin'}>
						<button
							type="submit"
							className="text-white bg-primary py-5 rounded-lg w-full"
						>
							Administrador
						</button>
					</Link>
				</div>
			}
			<div className='px-4 my-4'>
				<Stats user={data} />
				<Badges user={data} badges={badges} />
				<FavoriteGames user={data} />
			</div>
		</div>
	)
}

export default MyProfile