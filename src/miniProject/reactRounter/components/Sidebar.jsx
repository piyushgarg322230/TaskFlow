// src/components/Sidebar.jsx
import { FaTasks, FaHome, FaCalendarAlt, FaCheckCircle, FaExclamationTriangle, FaProjectDiagram, FaTag, FaUser, FaBriefcase, FaPlus, FaBars, FaTimes } from 'react-icons/fa';

const Sidebar = ({ activeView, setActiveView, taskCounts, isSidebarOpen, setIsSidebarOpen }) => {
    const menuItems = [
        { view: 'today', icon: <FaHome />, label: 'Today', count: taskCounts.today },
        { view: 'upcoming', icon: <FaCalendarAlt />, label: 'Upcoming', count: taskCounts.upcoming },
        { view: 'completed', icon: <FaCheckCircle />, label: 'Completed', count: taskCounts.completed },
        { view: 'overdue', icon: <FaExclamationTriangle />, label: 'Overdue', count: taskCounts.overdue }
    ];

    return (
        <>
            <div className={`sidebar ${isSidebarOpen ? 'active' : ''}`}>
                <div className="logo">
                    <FaTasks />
                    <span>TaskFlow</span>
                </div>








                <div className='menu-scroll'>
                    {menuItems.map(item => (
                        <div
                            key={item.view}
                            className={`menu-item ${activeView === item.view ? 'active' : ''}`}
                            onClick={() => {
                                setActiveView(item.view);
                                setIsSidebarOpen(false);
                            }}
                        >
                            {item.icon}
                            <span>{item.label}</span>
                            {item.count > 0 && <span className="task-count">{item.count}</span>}
                        </div>
                    ))}

                    <div className="divider">-</div>

                    <div className="menu-item">
                        <FaProjectDiagram />
                        <span>Projects</span>
                    </div>
                    <div className="menu-item">
                        <FaTag />
                        <span>Tags</span>
                    </div>

                    <div className="divider">-</div>

                    <h4 style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '12px' }}>LISTS</h4>
                    <div className="menu-item">
                        <FaUser />
                        <span>Personal</span>
                    </div>
                    <div className="menu-item">
                        <FaBriefcase />
                        <span>Work</span>
                    </div>
                    <div className="menu-item">
                        <FaPlus />
                        <span>New List</span>
                    </div>
                </div>

                <div className="divider"></div>

                <button className="profile-trigger">
                    <img
                        src="https://picsum.photos/1200/400"
                        alt="Profile"
                        className="profile-avatar"
                    />
                    <span>MyProfile</span>

                </button>
            </div>


            {/* Mobile menu toggle */}
            <div className="menu-toggle" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                {isSidebarOpen ? <FaTimes /> : <FaBars />}
            </div>

            {/* Overlay for mobile */}
            {isSidebarOpen && (
                <div className="overlay" onClick={() => setIsSidebarOpen(false)}></div>
            )}
        </>
    );
};

export default Sidebar;

