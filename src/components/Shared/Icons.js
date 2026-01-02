import PropTypes from 'prop-types';

import AdultsWhite from '@/assets/icon-adults--white.svg?react';
import Adults from '@/assets/icon-adults.svg?react';
import ReportError from '@/assets/icon-alert.svg?react';
import AllWhite from '@/assets/icon-all--white.svg?react';
import All from '@/assets/icon-all.svg?react';
import ArrowBack from '@/assets/icon-back.svg?react';
import BanWhite from '@/assets/icon-ban--white.svg?react';
import BanRed from '@/assets/icon-ban-red.svg?react';
import Ban from '@/assets/icon-ban.svg?react';
import Booking from '@/assets/icon-booking.svg?react';
import Chart from '@/assets/icon-chart.svg?react';
import CheckWhite from '@/assets/icon-check--white.svg?react';
import CheckGreen from '@/assets/icon-check-green.svg?react';
import Check from '@/assets/icon-check.svg?react';
import IconCircle from '@/assets/icon-circle.svg?react';
import ClinicViolet from '@/assets/icon-clinic--violet.svg?react';
import Close from '@/assets/icon-close.svg?react';
import Copy from '@/assets/icon-copy.svg?react';
import DentistWhite from '@/assets/icon-dentist--white.svg?react';
import Dentist from '@/assets/icon-dentist.svg?react';
import Edit from '@/assets/icon-edit.svg?react';
import Email from '@/assets/icon-email.svg?react';
import Euro from '@/assets/icon-euro.svg?react';
import FamilyDrWhite from '@/assets/icon-family-dr--white.svg?react';
import Family from '@/assets/icon-family-dr.svg?react';
import Facebook from '@/assets/icon-fb.svg?react';
import FilterWhite from '@/assets/icon-filter--white.svg?react';
import Filter from '@/assets/icon-filter.svg?react';
import FullScreen from '@/assets/icon-full-screen.svg?react';
import GitHub from '@/assets/icon-github.svg?react';
import GpFloatingBlue from '@/assets/icon-gp-floating--blue.svg?react';
import Group from '@/assets/icon-group.svg?react';
import GynoWhite from '@/assets/icon-gynecologist--white.svg?react';
import Gyno from '@/assets/icon-gynecologist.svg?react';
import IdCard from '@/assets/icon-id-card.svg?react';
import KidsWhite from '@/assets/icon-kids--white.svg?react';
import Kids from '@/assets/icon-kids.svg?react';
import LinkBig from '@/assets/icon-link--big.svg?react';
import Link from '@/assets/icon-link.svg?react';
import ListViewWhite from '@/assets/icon-list-view--white.svg?react';
import ListView from '@/assets/icon-list-view.svg?react';
import MapMarker from '@/assets/icon-map-marker.svg?react';
import MapViewWhite from '@/assets/icon-map-view--white.svg?react';
import MapView from '@/assets/icon-map-view.svg?react';
import More from '@/assets/icon-more.svg?react';
import PhoneBig from '@/assets/icon-phone--big.svg?react';
import NoPhoneBig from '@/assets/icon-phone-none--big.svg?react';
import Phone from '@/assets/icon-phone.svg?react';
import Print from '@/assets/icon-print.svg?react';
import SearchWhite from '@/assets/icon-search--white.svg?react';
import Search from '@/assets/icon-search.svg?react';
import Share from '@/assets/icon-share.svg?react';
import StudentsWhite from '@/assets/icon-students--white.svg?react';
import Students from '@/assets/icon-students.svg?react';
import Twitter from '@/assets/icon-tw-new-rounded.svg?react';
import VerticalDots from '@/assets/vertical-dots.svg?react';
import Logo from '@/assets/zdravniki-sledilnik-logo.svg?react';

export {
  Block as BlockIcon,
  CheckCircleOutline as CheckCircleOutlineIcon,
  Check as CheckIcon,
  Close as CloseIcon,
  ContactPage as ContactPageIcon,
  EmojiPeople as EmojiPeopleIcon,
  ExpandMore as ExpandMoreIcon,
  FacebookOutlined as FacebookIcon,
  Groups as GroupsIcon,
  Link as LinkIcon,
  Menu as MenuIcon,
  Pause as PauseIcon,
  PhoneEnabled as PhoneEnabledIcon,
  PlayArrow as PlayArrowIcon,
  Room as RoomIcon,
  Search as SearchIcon,
  TrendingDown as TrendingDownIcon,
  TrendingFlat as TrendingFlatIcon,
  TrendingUp as TrendingUpIcon,
} from '@mui/icons-material';

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
  LinkBig,
  Logo,
  MapMarker,
  Phone,
  PhoneBig,
  NoPhoneBig,
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
  More,
  Booking,
  Edit,
  Email,
  ClinicViolet,
  GpFloatingBlue,
  GitHub,
  Euro,
  FullScreen,
  Print,
  VerticalDots,
  Chart,
};

export const Icon = function Icon({ name, ...props }) {
  const Component = name in icons ? icons[name] : null;
  return Component ? <Component {...props} /> : null;
};

export const ICON_KEYS = Object.keys(icons);

Icon.propTypes = {
  name: PropTypes.oneOf(ICON_KEYS).isRequired,
};

export default Icon;
