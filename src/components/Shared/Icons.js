import PropTypes from 'prop-types';

import { ReactComponent as AllWhite } from 'assets/icon-all--white.svg';
import { ReactComponent as All } from 'assets/icon-all.svg';
import { ReactComponent as BanWhite } from 'assets/icon-ban--white.svg';
import { ReactComponent as BanRed } from 'assets/icon-ban-red.svg';
import { ReactComponent as Ban } from 'assets/icon-ban.svg';
import { ReactComponent as CheckWhite } from 'assets/icon-check--white.svg';
import { ReactComponent as CheckGreen } from 'assets/icon-check-green.svg';
import { ReactComponent as Check } from 'assets/icon-check.svg';
import { ReactComponent as DentistWhite } from 'assets/icon-dentist--white.svg';
import { ReactComponent as Dentist } from 'assets/icon-dentist.svg';
import { ReactComponent as FamilyDrWhite } from 'assets/icon-family-dr--white.svg';
import { ReactComponent as Family } from 'assets/icon-family-dr.svg';
import { ReactComponent as Group } from 'assets/icon-group.svg';
import { ReactComponent as GynoWhite } from 'assets/icon-gynecologist--white.svg';
import { ReactComponent as Gyno } from 'assets/icon-gynecologist.svg';
import { ReactComponent as IdCard } from 'assets/icon-id-card.svg';
import { ReactComponent as MapMarker } from 'assets/icon-map-marker.svg';
import { ReactComponent as SearchWhite } from 'assets/icon-search--white.svg';
import { ReactComponent as Search } from 'assets/icon-search.svg';
import { ReactComponent as Logo } from 'assets/zdravniki-sledilnik-logo.svg';
import { ReactComponent as Facebook } from 'assets/icon-fb.svg';
import { ReactComponent as Share } from 'assets/icon-share.svg';
import { ReactComponent as Twitter } from 'assets/icon-tw.svg';
import { ReactComponent as IconCircle } from 'assets/icon-circle.svg';
import { ReactComponent as AdultsWhite } from 'assets/icon-adults--white.svg';
import { ReactComponent as Adults } from 'assets/icon-adults.svg';
import { ReactComponent as KidsWhite } from 'assets/icon-kids--white.svg';
import { ReactComponent as Kids } from 'assets/icon-kids.svg';
import { ReactComponent as StudentsWhite } from 'assets/icon-students--white.svg';
import { ReactComponent as Students } from 'assets/icon-students.svg';
import { ReactComponent as ArrowBack } from 'assets/icon-back.svg';
import { ReactComponent as Close } from 'assets/icon-close.svg';
import { ReactComponent as Link } from 'assets/icon-link.svg';
import { ReactComponent as PhoneBig } from 'assets/icon-phone--big.svg';
import { ReactComponent as Phone } from 'assets/icon-phone.svg';
import { ReactComponent as Copy } from 'assets/icon-copy.svg';
import { ReactComponent as ReportError } from 'assets/icon-error.svg';
import { ReactComponent as Filter } from 'assets/icon-filter.svg';
import { ReactComponent as FilterWhite } from 'assets/icon-filter--white.svg';
import { ReactComponent as MapView } from 'assets/icon-map-view.svg';
import { ReactComponent as MapViewWhite } from 'assets/icon-map-view--white.svg';
import { ReactComponent as ListView } from 'assets/icon-list-view.svg';
import { ReactComponent as ListViewWhite } from 'assets/icon-list-view--white.svg';

export { default as MenuIcon } from '@mui/icons-material/Menu';
export { default as RoomIcon } from '@mui/icons-material/Room';
export { default as SearchIcon } from '@mui/icons-material/Search';
export { default as EmojiPeopleIcon } from '@mui/icons-material/EmojiPeople';
export { default as BlockIcon } from '@mui/icons-material/Block';
export { default as CheckCircleOutlineIcon } from '@mui/icons-material/CheckCircleOutline';
export { default as GroupsIcon } from '@mui/icons-material/Groups';
export { default as ContactPageIcon } from '@mui/icons-material/ContactPage';
export { default as CheckIcon } from '@mui/icons-material/Check';
export { default as FacebookIcon } from '@mui/icons-material/FacebookOutlined';
export { default as CloseIcon } from '@mui/icons-material/Close';
export { default as LinkIcon } from '@mui/icons-material/Link';
export { default as PhoneEnabledIcon } from '@mui/icons-material/PhoneEnabled';
export { default as ExpandMoreIcon } from '@mui/icons-material/ExpandMore';

const icons = {
  Adults,
  AdultsWhite,
  All,
  AllWhite,
  ArrowBack,
  Ban,
  BanRed,
  BanWhite,
  Check,
  CheckGreen,
  CheckWhite,
  Close,
  Copy,
  Dentist,
  DentistWhite,
  Facebook,
  Family,
  FamilyDrWhite,
  Gyno,
  GynoWhite,
  Group,
  IconCircle,
  IdCard,
  Kids,
  KidsWhite,
  Link,
  Logo,
  MapMarker,
  Phone,
  PhoneBig,
  Search,
  SearchWhite,
  Share,
  Students,
  StudentsWhite,
  Twitter,
  ReportError,
  Filter,
  FilterWhite,
  MapView,
  MapViewWhite,
  ListView,
  ListViewWhite,
};

export const Icon = function Icon({ name, ...props }) {
  const Component = name in icons ? icons[name] : null;
  return Component ? <Component {...props} /> : null;
};

const ICON_KEYS = Object.keys(icons);

Icon.propTypes = {
  name: PropTypes.oneOf(ICON_KEYS).isRequired,
};

export default Icon;
