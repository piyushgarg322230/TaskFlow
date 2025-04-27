import { useState, useEffect } from 'react';
import './Profile.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';

import {
    faUserPlus,
    faCommentDots,
    faEllipsisH,
    faInfoCircle,
    faPencilAlt,
    faBriefcase,
    faMapMarkerAlt,
    faLock,
    faEnvelope,
    faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';
import { findUserByEmail, updateUserField ,handleLogoutFirebase} from '../authService'; // Adjust the import path as necessary

const Profile = ({ isOpen, onClose }) => {
    const navigate = useNavigate();

    const [userData, setUserData] = useState(null);
    const [userName, setUserName] = useState("Sarah Johnson");
    const [userEmail, setUserEmail] = useState("auto@gmail.com");
    const [userPassword, setUserPassword] = useState("-----");
    const [isEditingBio, setIsEditingBio] = useState(false);
    const [bioContent, setBioContent] = useState(
        'Digital Artist | Tech Enthusiast | Nature Lover 🌿\nCreating meaningful experiences through design and code.'
    );
    const [showToast, setShowToast] = useState(false);

    // const toggleBioEdit = () => {
    //     setIsEditingBio(!isEditingBio);
    // };

    const handleBioChange = (e) => {
        setBioContent(e.target.value);
    };
    const toggleEdit = () => {
        setIsEditingBio((prev) => !prev);
    };

    const saveBio = () => {
        updateUserField(userData.uid
            , { bioContent });
        setIsEditingBio(false);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };


    useEffect(() => {
        (async () => {
            const localUser = JSON.parse(localStorage.getItem("users"));
            if (localUser?.email) {
                const user = await findUserByEmail(localUser.email);
                if (user) {
                    setUserName(user.name);
                    setUserEmail(user.email);
                    setUserPassword(user.password);
                    setUserData(user);
                    setBioContent(user.bioContent || bioContent); // Set the bio content from user data or default
                }
            }
        })();

    }, []);

    const handleLogout = () => {
        // alert('Logged out successfully!');
        handleLogoutFirebase();
        navigate("/", { replace: true }); // or directUrl.Home
    };



    useEffect(() => {
        const autoResize = (element) => {
            element.style.height = 'auto';
            element.style.height = `${element.scrollHeight}px`;
        };

        const bioElement = document.querySelector('.bio-text');
        if (bioElement && isEditingBio) {
            autoResize(bioElement);
            bioElement.focus();
        }
    }, [isEditingBio]);
    if (!isOpen) return null;

    return (
        <div className="facebook-profile">
            <div className="cover-container">
                <div className="cover-photo"></div>
            </div>

            <div className="profile-info">
                <div className="profile-header">
                    <h1 className="profile-name">{userName}</h1>
                </div>

                <div className="about-section">
                    <div className="section-title">
                        <FontAwesomeIcon icon={faInfoCircle} />
                        About
                    </div>

                    <div className="info-grid">
                        <div className="bio-editor info-card">
                            <div className="bio-content">
                                <button
                                    className="edit-bio-button"
                                    onClick={toggleEdit}
                                >
                                    <FontAwesomeIcon icon={faPencilAlt} />
                                </button>
                                {/* <div
                                    className="bio-text"
                                    contentEditable={isEditingBio}
                                    onInput={handleBioChange}
                                    suppressContentEditableWarning={true}
                                >
                                    {bioContent}
                                </div> */}

                                {isEditingBio ? (
                                    <input
                                        type="text"
                                        value={bioContent}
                                        onChange={handleBioChange}
                                        placeholder="Type your bio..."
                                        className="bio-text w-full border border-gray-300 rounded px-4 py-2"
                                        autoFocus
                                    />
                                ) : (
                                    <div className="bio-text" onClick={toggleEdit}>
                                        {bioContent || 'Click to edit your bio...'}
                                    </div>
                                )}
                                {isEditingBio && (
                                    <button className={`save-button ${isEditingBio ? 'visible' : ''}`} onClick={saveBio}>
                                        Save Bio
                                    </button>
                                )}
                            </div>
                        </div>

                        <div className="info-card">
                            <div className="info-icon">
                                <FontAwesomeIcon icon={faEnvelope} />
                            </div>
                            <div className="info-title">Gmail</div>
                            <div className="info-content">
                                {userEmail}
                            </div>
                        </div>

                        <div className="info-card">
                            <div className="info-icon">
                                <FontAwesomeIcon icon={faLock} />
                            </div>
                            <div className="info-title">Password</div>
                            <div className="info-content">
                                {userPassword}
                            </div>
                        </div>

                        {/* <div className="info-card"> */}
                        <button
                            className="info-card dropdown-item"
                            onClick={handleLogout}
                        >
                            <FontAwesomeIcon icon={faSignOutAlt} />
                            Log Out
                        </button>
                        {/* </div> */}
                    </div>
                </div>
            </div>

            {showToast && (
                <div className="toast">
                    Bio updated successfully!
                </div>
            )}
        </div>
    );
};

export default Profile;
