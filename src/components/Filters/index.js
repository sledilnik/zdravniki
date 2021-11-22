import ToggleAccepts from './ToggleAccepts';
import ToggleDoctorType from './ToggleDoctorType';
import Search from './Search';

import * as Styled from './styles';

export default function Filters() {
  return (
    <Styled.Container maxWidth="false">
      <ToggleDoctorType />
      <ToggleAccepts />
      <Search />
    </Styled.Container>
  );
}
