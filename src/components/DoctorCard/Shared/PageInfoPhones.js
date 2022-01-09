import PropTypes from 'prop-types';

import { Typography } from '@mui/material';
import * as Icons from 'components/Shared/Icons';

import * as Styled from '../styles';
import * as Links from './Links';

const PageInfoPhones = function PhoneInfoPhone({ phones, isWebsite }) {
  const phoneLinks = phones.map((phone, index, arr) => {
    const href = isWebsite ? phone.href : `tel:${phone?.trim()}`;
    const text = isWebsite ? phone.host : phone;
    return (
      <Links.ConditionalLink
        key={`phone-num${href}`}
        to={phone && href}
        self={isWebsite ? undefined : true}
        variant="body1"
      >
        {text}
        <Typography component="span" variant="body1">
          {index !== arr.length - 1 && ', '}
        </Typography>
      </Links.ConditionalLink>
    );
  });

  const iconName = isWebsite ? 'LinkBig' : 'PhoneBig';

  return (
    <Styled.PageInfo.LinkWrapper direction="row" alignItems="center" spacing={1}>
      <Typography component="div" variant="body1">
        <Icons.Icon name={iconName} />
      </Typography>
      {phoneLinks}
    </Styled.PageInfo.LinkWrapper>
  );
};

PageInfoPhones.defaultProps = {
  phones: [],
  isWebsite: undefined,
};

PageInfoPhones.propTypes = {
  phones: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(URL)])),
  isWebsite: PropTypes.bool,
};

export default PageInfoPhones;
