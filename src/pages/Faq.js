import { useRef } from 'react';
import { useCallback, useEffect, useState } from 'react';
import * as Styled from './styles/Markdown';
import { t } from 'i18next';

export default function Faq() {
  const lng = localStorage.getItem('i18nextLng') || 'sl';
  const faqRef = useRef();
  const [response, setResponse] = useState();

  // scroll element to when link with hash is passed
  const scroll = useCallback(node => {
    if (node !== null && node.id === window.location.hash.substr(1)) {
      node.open = true;
      window.scrollTo({
        top: node.getBoundingClientRect().top,
        behavior: 'smooth',
      });
    }
  }, []);

  // copy url of the definition
  const handleCopy = e => {
    const element = e.target;
    const dummy = document.createElement('input');
    let text = window.location.href + '#' + element.nextSibling.id;
    if (window.location.hash !== '') {
      text = window.location.href.split('#')[0] + '#' + element.nextSibling.id;
    }
    document.body.appendChild(dummy);
    dummy.value = text;
    dummy.select();
    document.execCommand('copy');
    document.body.removeChild(dummy);
    element.className = 'icon check';
    element.title = t('copied');
    setTimeout(() => {
      element.className = 'icon copy';
      element.title = t('copy');
    }, 2000);
  };

  useEffect(() => {
    document.body.style.overflow = 'auto';
  });

  // fetch data
  useEffect(() => {
    fetch(`https://backend.sledilnik.org/api/v1/faq/3/?lang=${lng}`)
      .then(response => response.json())
      .then(json => {
        setResponse(json);
      });
  }, [lng]);

  // append attribute 'title' with glossary definition to each element with attribute 'data-term'
  useEffect(() => {
    if (faqRef.current) {
      faqRef.current.querySelectorAll('span[data-term]').forEach(el => {
        for (let term of response.glossary) {
          if (term.slug === el.getAttribute('data-term')) {
            el.setAttribute('title', term.definition.replace(/<[^>]*>?/gm, ''));
            el.setAttribute('tabindex', 0);
          }
        }
      });
    }
  }, [faqRef, response]);

  if (response == null) {
    return t('loading');
  }

  return (
    <Styled.CustomContainer className="custom-container">
      <Styled.StaticPageWrapper className="static-page-wrapper" ref={faqRef}>
        <h1>{t('faq.title')}</h1>
        <p>{t('faq.description')}</p>
        <br></br>
        {response.faq.map((faq, key) => {
          return (
            <Styled.Collapsable className="collapsable" key={key}>
              <Styled.Icon name="Copy" onClick={handleCopy} title={t('copy')} alt={t('copy')} />
              <Styled.Details id={faq.slug} ref={scroll}>
                <Styled.Summary>{faq.question}</Styled.Summary>
                <Styled.Markdown key={key}>{faq.answer}</Styled.Markdown>
              </Styled.Details>
            </Styled.Collapsable>
          );
        })}
        <h2>{t('faq.glossary')}</h2>
        {response.glossary.map((glossary, key) => {
          return (
            <Styled.Collapsable className="collapsable" key={key}>
              <Styled.Icon name="Copy" onClick={handleCopy} title={t('copy')} alt={t('copy')} />
              <Styled.Details id={glossary.slug} ref={scroll}>
                <Styled.Summary>{glossary.term}</Styled.Summary>
                <Styled.Markdown key={key}>{glossary.definition}</Styled.Markdown>
              </Styled.Details>
            </Styled.Collapsable>
          );
        })}
      </Styled.StaticPageWrapper>
    </Styled.CustomContainer>
  );
}
