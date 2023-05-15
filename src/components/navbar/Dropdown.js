import React, { useState, useEffect, useCallback } from "react";
import EventBus from "../../common/EventBus";
import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../slices/auth";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faListCheck, faArrowRightFromBracket  } from '@fortawesome/free-solid-svg-icons'
import './Dropdown.scss';


function Dropdown() {
  const [showBenefactorBoard, setShowBenefactorBoard] = useState(false);
  // const [showRecipientBoard, setShowRecipientBoard] = useState(false);
  // const [showAdminBoard, setShowAdminBoard] = useState(false);

  const [dropdown, setDropdown] = useState(false);
  const {user: currentUser} = useSelector((state) => (state.auth));
  const dispatch = useDispatch();

  const logOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  useEffect(() => {
    if (currentUser) {
      setShowBenefactorBoard(currentUser.roles.includes("ROLE_BENEFACTOR"));
      // setShowRecipientBoard(currentUser.roles.includes("ROLE_RECIPIENT"));
    } else {
      setShowBenefactorBoard(false);
      // setShowRecipientBoard(false);
    }

    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, [currentUser, logOut]);

  return (
    <>
      <ul className={dropdown ? 'info-submenu clicked' : 'info-submenu'} onClick={() => setDropdown(!dropdown)}>
            <li>
              <FontAwesomeIcon icon={faUser} />
              <Link className="submenu-item" to="/infoUser"
              onClick={() => setDropdown(false)}>Thông tin cá nhân</Link>
            </li>
            {showBenefactorBoard && (
              <li>
                <FontAwesomeIcon icon={faListCheck} />
                <Link className="submenu-item" to="/beneDteails"
                onClick={() => setDropdown(false)}>Chi tiết ủng hộ</Link>
              </li>
            )}
            {/* {showRecipientBoard && (
              <li>
                <FontAwesomeIcon icon={faListCheck} />
                <Link className="submenu-item" to="/recipDetails"
                onClick={() => setDropdown(false)}>Chi tiết quyên góp</Link>
              </li>
            )} */}
            {currentUser ? (
              <li>
                <FontAwesomeIcon icon={faArrowRightFromBracket} />
                <Link className="submenu-item" to="/home"
                // onClick={() => setDropdown(false)}
                onClick={logOut}>Đăng xuất</Link>
              </li>
            ) : <></>}
      </ul>
    </>
  );
}

export default Dropdown;