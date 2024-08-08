import { useUser } from "../context/User/UserContext"
const MyProfile = () => {
  const user = useUser()

  return (
    <div>
      {user.displayName}
    </div>
  )
}

export default MyProfile