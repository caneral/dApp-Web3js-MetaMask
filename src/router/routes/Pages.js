import Home from "../../pages/Home";
import Profile from "../../pages/Profile";
import TokenBuy from "../../pages/TokenBuy";

const PagesRoutes = [
    {
        path:'/',
        element: <Home/>
    },
    {
        path:':id',
        element: <TokenBuy/>
    },
    {
        path:'profile',
        element: <Profile/>
    }
]

export default PagesRoutes