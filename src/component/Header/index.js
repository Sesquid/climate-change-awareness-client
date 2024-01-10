import React from 'react'
import style from "./style.module.css";
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom';
const Header = () => {
  return (
    <div className={style.header}>
      <div className={`col-2 ${style.header_content}`}>
      <Link to='/overview'> Overview </Link>
      <Link to='/'> Detail </Link>
      </div>
    </div>
  )
}

export default Header;