import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import enAbout from 'content/en/about.md';
import slAbout from 'content/sl/about.md';
import * as SEO from 'components/SEO';
import * as Styled from './styles/Markdown';

const MD = {
  en: enAbout,
  sl: slAbout,
};

const About = function About() {
  const { t } = useTranslation();
  const [postMarkdown, setPostMarkdown] = useState('');
  const lng = localStorage.getItem('i18nextLng') || 'sl';

  useEffect(() => {
    document.body.style.overflow = 'auto';
    return () => {
      document.body.style = null;
    };
  }, []);

  useEffect(() => {
    const theTextFile = MD?.[lng] ?? slAbout;

    fetch(theTextFile)
      .then(response => response.text())
      .then(text => {
        setPostMarkdown(text);
      });
  }, [lng]);

  return (
    <>
      <SEO.Dynamic title={t('SEO.title.about')} />
      <Styled.CustomContainer id="main-content">
        <Styled.StaticPageWrapper>
          <span>
            <Styled.Markdown>{postMarkdown}</Styled.Markdown>
          </span>
        </Styled.StaticPageWrapper>
      </Styled.CustomContainer>
    </>
  );
};

export default About;
