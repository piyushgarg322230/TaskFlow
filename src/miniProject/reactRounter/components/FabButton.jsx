// src/components/FabButton.jsx
import { FaPlus } from 'react-icons/fa';

const FabButton = ({ onClick }) => {
  return (
    <div className="fab" onClick={onClick}>
      <FaPlus style={{ color: 'white', fontSize: '1.2rem' }} />
    </div>
  );
};

export default FabButton;