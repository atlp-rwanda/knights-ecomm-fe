import { Route, Routes } from "react-router-dom"
import WelcomePage from "../pages/welcomePage"


const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<WelcomePage />} />
        </Routes>
    )
}

export default Router