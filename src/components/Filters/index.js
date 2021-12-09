import { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import ToggleAccepts from './ToggleAccepts';
import ToggleDoctorType from './ToggleDoctorType';
import ToggleMapCards from './ToggleMapCards';
import Search from './Search';

import * as Styled from './styles';

const Filters = function Filters({ useShow }) {
  const [expanded, setExpanded] = useState(false);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));

  useEffect(() => {
    if (matches) setExpanded(true);
    if (!matches) setExpanded(false);
  }, [matches]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Styled.Card>
      <Styled.Collapse in={expanded} timeout="auto" unmountOnExit>
        <Styled.Grid>
          <Styled.Toggles>
            <ToggleDoctorType />
            <ToggleAccepts />
          </Styled.Toggles>
          {matches && <Search />}
        </Styled.Grid>
      </Styled.Collapse>
      {!matches && <Styled.CardActions onClick={handleExpandClick}>Filter</Styled.CardActions>}
      {!matches && <Search />}
      {/* you can create MobileSearch component  with only mobile style or tweak current Search */}
      {!matches && <ToggleMapCards useShow={useShow} />}
    </Styled.Card>
  );
};

export default Filters;
