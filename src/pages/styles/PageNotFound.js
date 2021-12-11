import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';

export const CustomContainer = styled('main')(() => ({
  margin: '24px auto 0 auto',
  maxWidth: '730px',
  '@media only screen and (min-width: 768px)': {
    margin: '48px auto 65px auto',
  },
}));

export const PageNotFound = styled('div')(() => ({
  maxWidth: 'calc(100% - 24px)',
  width: '376px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  margin: '0 auto 96px auto',
  padding: '0',
}));

export const Image = styled('img')(() => ({
  display: 'block',
  width: '100%',
  margin: '24px auto 0',
}));

export const BackToHomeBtn = styled(Link)(() => ({
  display: 'block',
  background: '#212529',
  fontWeight: 700,
  color: '#fff',
  textDecoration: 'none',
  borderRadius: '100px',
  padding: '10px 40px',
}));

// Below is scss from sledilnik for reference
// .page-not-found {
//     max-width: 730px;
//     width: 90%;
//     background: #fff;
//     box-shadow: $element-box-shadow;
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     text-align: center;
//     margin: 0 auto 96px auto;
//     padding: 32px;

//     h1 {
//       font-size: 28px;
//       margin: 0 auto;
//       margin-bottom: 24px;
//     }

//     img {
//       display: block;
//       width: 90%;
//       max-width: 400px;
//       margin: -70px auto 0 auto;

//       @media only screen and (max-width: 400px) {
//         margin: -40px auto 0 auto;
//       }
//     }

//     p {
//       font-style: italic;
//       font-size: 16px;
//       color: rgba(0, 0, 0, 0.8);
//     }

//     .links {
//       margin: 0 auto;

//       .link {
//         display: inline-block;
//         color: #000;
//         font-size: 14px;
//         line-height: 16px;
//         font-weight: bold;
//         border-radius: 6px;
//         padding: 11px 12px;
//         border: solid 1px rgba(0, 0, 0, 0.13);
//         cursor: pointer;

//         &:hover {
//           text-decoration: none;
//         }
//       }

//       .link-home {
//         background: $yellow;
//         margin-left: 24px;
//         border: none;
//       }
//     }
//   }
