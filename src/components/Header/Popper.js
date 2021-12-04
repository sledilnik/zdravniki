import * as Styled from './styles';

const Popper = function Popper(props) {
  return (
    <Styled.Popper
      modifiers={[
        {
          phase: 'main',
          name: 'offset',
          options: {
            offset: [-47, 0],
          },
        },
      ]}
      {...props}
    />
  );
};

export default Popper;
