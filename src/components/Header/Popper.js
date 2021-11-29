import * as Styled from './styles';
export default function Popper(props) {
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
}
