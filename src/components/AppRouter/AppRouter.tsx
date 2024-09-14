import {Navigate, Route, Routes} from 'react-router-dom'
import {authRoutes, publicRoutes} from './routes';
import {SHOP_ROUTE} from './consts';

const AppRouter = () => {
    return (
        <Routes>
            { /*user.isAuth &&*/ authRoutes.map(({path, Component, children}) =>
                <Route key={path} path={path} element={<Component/>}>
                    {children && children.map(({path, Component}) =>
                        <Route key={path}
                            path={path}
                            element={<Component/>}
                        />
                    )}
                </Route>
            )}
            {publicRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component/>}/>
            )}
            <Route path="*" element={<Navigate to={SHOP_ROUTE}/>}/>
        </Routes>
    )
}

export default AppRouter;
