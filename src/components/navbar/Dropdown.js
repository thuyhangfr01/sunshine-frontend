import React, { useState } from 'react';
import './Dropdown.scss';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faUser, faListCheck, faArrowRightFromBracket  } from '@fortawesome/free-solid-svg-icons'

function Dropdown() {
  const [dropdown, setDropdown] = useState(false);


  return (
    <>
      <ul className={dropdown ? 'info-submenu clicked' : 'info-submenu'} onClick={() => setDropdown(!dropdown)}>
            <li>
              <FontAwesomeIcon icon={faUser} />
              <Link className="submenu-item" to="/infoUser"
              onClick={() => setDropdown(false)}>Thông tin cá nhân</Link>
            </li>
            <li>
              <FontAwesomeIcon icon={faListCheck} />
              <Link className="submenu-item" to="/beneDteails"
              onClick={() => setDropdown(false)}>Chi tiết ủng hộ</Link>
            </li>
            <li>
              <FontAwesomeIcon icon={faListCheck} />
              <Link className="submenu-item" to="/recipDetails"
              onClick={() => setDropdown(false)}>Chi tiết quyên góp</Link>
            </li>
            <li>
              <FontAwesomeIcon icon={faArrowRightFromBracket} />
              <Link className="submenu-item" to="/logout"
              onClick={() => setDropdown(false)}>Đăng xuất</Link>
            </li>
      </ul>
    </>
  );
}

export default Dropdown;