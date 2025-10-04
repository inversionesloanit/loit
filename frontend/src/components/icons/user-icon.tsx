import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const UserIcon: React.FC<React.SVGAttributes<{}>> = ({ ...rest }) => {
  return (
    <FontAwesomeIcon
      icon={faUser}
      width={22}
      height={22}
      className="cursor-pointer text-gray-300"
    />
  );
};

export default UserIcon;
