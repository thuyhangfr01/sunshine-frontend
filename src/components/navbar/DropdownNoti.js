import React, { useState} from "react";
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser} from '@fortawesome/free-solid-svg-icons'
import './DropdownNoti.scss';


function DropdownNoti() {
  const [dropdownNoti, setDropdownNoti] = useState(false);

  return (
    <>
      <ul className={dropdownNoti ? 'noti-submenu clicked' : 'noti-submenu'} onClick={() => setDropdownNoti(!dropdownNoti)}>
            <li>
              <FontAwesomeIcon icon={faUser} />
              <Link className="submenu-item" to="/infoUser"
              onClick={() => setDropdownNoti(false)}>Noti 1</Link>
            </li>
            <li>
              <FontAwesomeIcon icon={faUser} />
              <Link className="submenu-item" to="/infoUser"
              onClick={() => setDropdownNoti(false)}>Noti 2</Link>
            </li>
      </ul>
    </>
  );
}

export default DropdownNoti;