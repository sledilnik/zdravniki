import PropTypes from 'prop-types';

import { Typography } from '@mui/material';
import * as Icons from 'components/Shared/Icons';

import * as Styled from '../styles';
import * as Links from './Links';

const PageInfoPhones = function PhoneInfoPhone({ phones }) {
  const phoneLinks = phones.map((phone, index, arr) => {
    const phoneNum = phone?.trim();
    return (
      <Links.ConditionalLink
        key={`phone-num${phoneNum}`}
        to={phone && `tel:${phoneNum}`}
        self
        variant="body1"
      >
        {phone}
        <Typography component="span" variant="body1">
          {index !== arr.length - 1 && ', '}
        </Typography>
      </Links.ConditionalLink>
    );
  });

  return (
    <Styled.PageInfo.LinkWrapper direction="row" alignItems="center" spacing={1}>
      <Typography component="div" variant="body1">
        <Icons.Icon name="PhoneBig" />
      </Typography>
      {phoneLinks}
    </Styled.PageInfo.LinkWrapper>
  );
};

PageInfoPhones.defaultProps = {
  phones: [],
};

PageInfoPhones.propTypes = {
  phones: PropTypes.arrayOf(PropTypes.string),
};

export default PageInfoPhones;
