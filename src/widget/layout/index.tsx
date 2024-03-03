import {ReactNode} from 'react'
import s from './style.module.scss'
import {Link, useLocation} from "react-router-dom";

interface ILayout {
  children: ReactNode
}

const Layout = ({children}: ILayout) => {
  const location = useLocation();

  const navigationLinks = [
    {path: "/", name: "Main"},
    {path: "/characters", name: "Characters"},
    {path: "/locations", name: "Locations"},
  ];

  const renderNavigationLinks = () => {
    return navigationLinks.map(link => {
      const isActive = location.pathname === link.path;
      if (!isActive) {
        return (
          <li key={link.name} className={s.navigationItem}>
            <Link to={link.path}>{link.name}</Link>
          </li>
        );
      }
      return null; // Если активен, возвращаем null
    });
  };

  return (
    <div className={`${s.page} mx-auto`}>
      <h1 className={s.title}><span className={s.span}>{`{`}</span> Rick and Morty<sup>Wiki</sup> <span
        className={s.span}>{`}`}</span></h1>
      <nav className={s.navigation}>
        <ul className={s.navigationList}>
          {renderNavigationLinks()}
        </ul>
      </nav>
      {children}
    </div>
  )
};

export default Layout;