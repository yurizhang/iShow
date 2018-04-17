/// <reference types="react" />
import * as React from 'react';
import './style/index.css';
declare class SubMenu extends React.Component<any, any> {
    static contextTypes: {
        antMenuTheme: any;
    };
    private subMenu;
    onKeyDown: (e: React.MouseEvent<HTMLElement>) => void;
    saveSubMenu: (subMenu: any) => void;
    render(): JSX.Element;
}
export default SubMenu;
