import ToggleAccepts from './ToggleAccepts';
import ToggleDoctorType from './ToggleDoctorType';
import Search from './Search';

import * as Styled from './styles';

const Filters = function Filters() {
  return (
    <Styled.Grid>
      <Styled.Toggles>
        <ToggleDoctorType />
        <ToggleAccepts />
      </Styled.Toggles>
      <Search />
    </Styled.Grid>
  );
};

export default Filters;
