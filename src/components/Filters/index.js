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

  const up = (
    <Styled.Grid>
      <Styled.Toggles>
        <ToggleDoctorType />
        <ToggleAccepts />
      </Styled.Toggles>
      <Search />
    </Styled.Grid>
  );

  const down = (
    <Styled.Grid>
      <Styled.Card>
        <Styled.Collapse in={expanded} timeout="auto" unmountOnExit>
          <ToggleDoctorType />
          <ToggleAccepts />
        </Styled.Collapse>
        <Styled.CardActions onClick={handleExpandClick}>Filter</Styled.CardActions>
        {/* you can create MobileSearch component  with only mobile style or tweak current Search */}
      </Styled.Card>
      <Search />
      <ToggleMapCards useShow={useShow} />
    </Styled.Grid>
  );

  return matches ? up : down;
};

export default Filters;
