import ToggleAccepts from './ToggleAccepts';
import ToggleDoctorType from './ToggleDoctorType';
import Search from './Search';

import * as Styled from './styles';

const Filters = function Filters() {
  return (
    <Styled.Grid>
      <ToggleDoctorType />
      <ToggleAccepts />
      <Search />
    </Styled.Grid>
  );
};

export default Filters;
