import * as React from 'react';
import './Administration.css';
import {MenuItems} from "./components/MenuItems/MenuItems";
import {Outlet} from "react-router-dom";

export default function Administration() {

    return (
        <main className="main">
            <MenuItems/>
            <Outlet/>
        </main>
    );
}
