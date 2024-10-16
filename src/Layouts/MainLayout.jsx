import { BottomBar } from "../components"
import Toast from "../components/Home/Toast"
import TopBar from "../components/Navigation/TopBar"
import { useEffect, useState } from "react"

const MainLayout = ({ children }) => {

  return (
    <>
      <main className="mb-[120px]">
        {children}
      </main>
      <BottomBar />
    </>
  )
}

export default MainLayout
