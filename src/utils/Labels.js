import { FaAngleLeft, FaCar, FaHandHolding, FaRadiation, FaTv, FaWifi } from "react-icons/fa";

export const Labels = [
    {
        title: 'WiFi',
        flex: 1,
        id: 1,
        icon: <FaWifi className="perk-icon" />
    },
    {
        title: 'Radio',
        flex: 1,
        id: 2,
        icon: <FaRadiation className="perk-icon" />
    },
    {
        title: 'Tv',
        flex: 1,
        id: 3,
        icon: <FaTv className="perk-icon" />
    },
    {
        title: 'Free Barking',
        flex: 1,
        id: 4,
        icon: <FaCar className="perk-icon" />
    },
    {
        title: 'Pets',
        flex: 1,
        id: 5,
        icon: <FaHandHolding className="perk-icon" />
    },
    {
        title: 'Entrance',
        id: 6,
        flex: 1,
        icon: <FaAngleLeft className="perk-icon" />
    }
]