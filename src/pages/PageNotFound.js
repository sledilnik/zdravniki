import { t } from 'i18next';
import { Link } from 'react-router-dom';
import * as Styled from './styles/PageNotFound';
import image from '../assets/caution-tape.png';

export default function PageNotFound() {
  return (
    <Styled.CustomContainer id="main-content">
      <Styled.PageNotFound>
        <h1>{ t("pageNotFound.notFound") }</h1>
        <p>{ t("pageNotFound.somethingWentWrong") }</p>
          <Styled.Image src={image} alt={ t('pageNotFound.imageDescription') } />
        <div>
            <Link to="/" style={{cursor: 'pointer'}}>{ t("header.home") }</Link>
        </div>
      </Styled.PageNotFound>
    </Styled.CustomContainer>
  );
}
