import { BottomBar } from "../components"

const MainLayout = ({children}) => {
  return (
    <>
        {children}
        <BottomBar />
    </>
  )
}

export default MainLayout