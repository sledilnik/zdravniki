import { useRef, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as SEO from 'components/SEO';
import { Loader } from 'components/Shared';
import * as Styled from '../styles/Markdown';
import Section from './Section';

const Faq = function Faq() {
  const { t } = useTranslation();
  const lng = localStorage.getItem('i18nextLng') || 'sl';
  const faqRef = useRef();
  const [response, setResponse] = useState();

  useEffect(() => {
    document.body.style.overflow = 'auto';
    return () => {
      document.body.style = null;
    };
  });

  // fetch data
  useEffect(() => {
    fetch(`https://backend.sledilnik.org/api/v1/faq/3/?lang=${lng}`)
      .then(r => r.json())
      .then(json => {
        setResponse(json);
      });
  }, [lng]);

  // append attribute 'title' with glossary definition to each element with attribute 'data-term'
  useEffect(() => {
    if (faqRef.current) {
      faqRef.current.querySelectorAll('span[data-term]').forEach(el => {
        // eslint-disable-next-line no-restricted-syntax
        for (const term of response.glossary) {
          if (term.slug === el.getAttribute('data-term')) {
            el.setAttribute('title', term.definition.replace(/<[^>]*>?/gm, ''));
            el.setAttribute('tabindex', 0);
          }
        }
      });
      // append attribute target="blank" to all external links
      if (faqRef.current) {
        faqRef.current.querySelectorAll('a').forEach(el => {
          if (/^(https?:)?\/\//.test(el.getAttribute('href'))) {
            el.setAttribute('target', '_blank');
          }
        });
      }
    }
  }, [faqRef, response]);

  if (response == null) {
    return <Loader.Center />;
  }

  return (
    <>
      <SEO.Dynamic title={t('SEO.title.faq')} lang={lng} />
      <Styled.CustomContainer className="custom-container">
        <Styled.StaticPageWrapper className="static-page-wrapper" ref={faqRef}>
          <h1>{t('faq.title')}</h1>
          <p>{t('faq.description')}</p>
          <br />
          <Section data={response?.faq ?? []} />
          <h2>{t('faq.glossary')}</h2>
          <Section data={response?.glossary ?? []} />
        </Styled.StaticPageWrapper>
      </Styled.CustomContainer>
    </>
  );
};

export default Faq;
