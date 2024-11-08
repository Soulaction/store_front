import {Navigate, Route, Routes} from 'react-router-dom'
import {authRoutes, publicRoutes} from './routes';
import {SHOP_ROUTE} from './consts';
import {useAppSelector} from "../../feature/hooks/hooks";
import {User} from "../../model/User";

const AppRouter = () => {

    const user: User = useAppSelector(state => state.userInfo.user);
    console.log(authRoutes);
    return (
        <>
            {user
                && <Routes>
                    {authRoutes.filter(route => !route.roles || route.roles.includes(user.role))
                        .map(({path, Component, children}) =>
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
            }
        </>
    )
}

export default AppRouter;
