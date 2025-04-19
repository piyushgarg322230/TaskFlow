import { useState, useEffect } from 'react';
import './Profile.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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

const Profile = () => {
    const [isEditingBio, setIsEditingBio] = useState(false);
    const [bioContent, setBioContent] = useState(
        'Digital Artist | Tech Enthusiast | Nature Lover 🌿\nCreating meaningful experiences through design and code.'
    );
    const [showToast, setShowToast] = useState(false);

    const toggleBioEdit = () => {
        setIsEditingBio(!isEditingBio);
    };

    const handleBioChange = (e) => {
        setBioContent(e.target.textContent);
    };

    const saveBio = () => {
        setIsEditingBio(false);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };


    const handleLogout = () => {
        alert('Logged out successfully!');
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

    return (
        <div className="facebook-profile">
            <div className="cover-container">
                <div className="cover-photo"></div>
            </div>

            <div className="profile-info">
                <div className="profile-header">
                    <h1 className="profile-name">Sarah Johnson</h1>
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
                                    onClick={toggleBioEdit}
                                >
                                    <FontAwesomeIcon icon={faPencilAlt} />
                                </button>
                                <div
                                    className="bio-text"
                                    contentEditable={isEditingBio}
                                    onInput={handleBioChange}
                                    suppressContentEditableWarning={true}
                                >
                                    {bioContent}
                                </div>
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
                                piyusharya@gmail.com
                            </div>
                        </div>

                        <div className="info-card">
                            <div className="info-icon">
                                <FontAwesomeIcon icon={faLock} />
                            </div>
                            <div className="info-title">Password</div>
                            <div className="info-content">
                                hellopiyush
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
