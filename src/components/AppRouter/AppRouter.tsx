import { useContext } from 'react';
import {Navigate, Route, Routes} from 'react-router-dom'
import { ContextApp } from '../../index';
import { authRoutes, publicRoutes } from './routes';
import { SHOP_ROUTE } from './consts';

const AppRouter = () => {
    const { userStore } = useContext(ContextApp)
    return (
        <Routes>
            { /*user.isAuth &&*/ authRoutes.map(({ path, Component }) =>
                <Route key={path} path={path} element={<Component></Component>} />
            )}
            {publicRoutes.map(({ path, Component }) =>
                <Route key={path} path={path} element={<Component></Component>} />

            )}
            <Route path="*" element={<Navigate to={SHOP_ROUTE} />}/>
        </Routes>
    )
}

export default AppRouter;
