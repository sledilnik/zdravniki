import { useRef, useEffect, useState } from 'react';
import { t } from 'i18next';
import { Loader } from 'components/Shared';
import { Collapsable } from 'components/Shared/Collapsable';
import * as Styled from './styles/Markdown';

const Faq = function Faq() {
  const lng = localStorage.getItem('i18nextLng') || 'sl';
  const faqRef = useRef();
  const [response, setResponse] = useState();

  useEffect(() => {
    document.body.style.overflow = 'auto';
  });

  // fetch data
  useEffect(() => {
    fetch(`https://backend.sledilnik.org/api/v1/faq/3/?lang=${lng}`)
      .then(r => r.json())
      .then(json => {
        setResponse(json);
      });
  }, [lng]);

  useEffect(() => {
    if (faqRef.current) {
      // append 'data-definition' attribute with glossary definition to each element with attribute 'data-term'
      faqRef.current.querySelectorAll('span[data-term]').forEach(el => {
        // eslint-disable-next-line no-restricted-syntax
        for (const term of response.glossary) {
          if (term.slug === el.getAttribute('data-term')) {
            // TODO: is it possible to render term.definition as Markdown text?
            el.setAttribute('data-definition', term.definition.replace(/<[^>]*>?/gm, ''));
            el.setAttribute('tabindex', 0);
          }
        }
      });
      // append attribute target="_blank" to all external links
      if (faqRef.current) {
        faqRef.current.querySelectorAll('a').forEach(el => {
          if (/^(https?:)?\/\//.test(el.getAttribute('href'))) {
            el.setAttribute('target', '_blank');
          }
        });
      }
    }
  }, [faqRef, response]);

  if (!response) {
    return <Loader.Center />;
  }

  return (
    <Styled.CustomContainer>
      <Styled.StaticPageWrapper ref={faqRef}>
        <h1>{t('faq.title')}</h1>
        <p>{t('faq.description')}</p>
        <br />
        {response.faq.map((faq, index) => {
          const collapsableKey = `collapsable-faq-${index}`;
          return (
            <Collapsable
              key={collapsableKey}
              id={faq.slug}
              question={faq.question}
              answer={faq.answer}
            />
          );
        })}
        <h2>{t('faq.glossary')}</h2>
        {response.glossary.map((glossary, index) => {
          const collapsableKey = `collapsable-glossary-${index}`;
          return (
            <Collapsable
              key={collapsableKey}
              id={glossary.slug}
              question={glossary.term}
              answer={glossary.definition}
            />
          );
        })}
      </Styled.StaticPageWrapper>
    </Styled.CustomContainer>
  );
};

export default Faq;
