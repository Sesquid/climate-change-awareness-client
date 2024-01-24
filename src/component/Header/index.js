import React from 'react'
import style from "./style.module.css";
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom';
const Header = () => {
  return (
    <div className={`container ${style.header}`}>
      <div className={`col-2 ${style.header_content}`}>
        <Link className='btn btn-warning' to='/overview'>Overview</Link>
        <Link className='btn btn-warning' to='/detail'>Detail</Link>
      </div>
    </div>
  )
}

export default Header;