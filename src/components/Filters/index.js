import { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import ToggleAccepts from './ToggleAccepts';
import ToggleDoctorType from './ToggleDoctorType';
import Search from './Search';

import * as Styled from './styles';

const Filters = function Filters() {
  const [expanded, setExpanded] = useState(true);
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
    </Styled.Card>
  );
};

export default Filters;
