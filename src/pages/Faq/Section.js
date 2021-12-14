import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import Tooltip from '@mui/material/Tooltip';
import * as Styled from '../styles/Markdown';

const Section = ({ data = [] }) => {
  const { t } = useTranslation();
  const [copyTooltip, setCopyTooltip] = useState(t('copy'));

  // scroll element to when link with hash is passed
  const scroll = useCallback(node => {
    if (node !== null && node.id === window.location.hash.substr(1)) {
      node.setAttribute('open', true);
      window.scrollTo({
        top: node.getBoundingClientRect().top,
        behavior: 'smooth',
      });
    }
  }, []);

  // copy url of the definition
  const handleClick = e => {
    const element = e.currentTarget;
    let text = `${window.location.href}#${element.nextSibling.id}`;
    if (window.location.hash !== '') {
      text = `${window.location.href.split('#')[0]}#${element.nextSibling.id}`;
    }
    navigator.clipboard.writeText(text);
    element.className = 'icon check';
    setCopyTooltip(t('copied'));
    setTimeout(() => {
      element.className = 'icon copy';
      setCopyTooltip(t('copy'));
    }, 2000);
  };

  return data.map((sectionElement, index) => {
    const collapsableKey = `collapsable-faq-${index}`;

    const summaryText = sectionElement.question ?? sectionElement.term;
    const markdown = sectionElement.answer ?? sectionElement.definition;

    return (
      <Styled.Collapsable className="collapsable" key={collapsableKey}>
        <Tooltip title={<div>{copyTooltip}</div>} placement="top">
          <Styled.IconWrapper className="icon copy" onClick={handleClick} alt={t('copy')} />
        </Tooltip>
        <Styled.Details id={sectionElement.slug} ref={scroll}>
          <Styled.Summary>{summaryText}</Styled.Summary>
          <Styled.Markdown key={`${sectionElement.slug}-md`}>{markdown}</Styled.Markdown>
        </Styled.Details>
      </Styled.Collapsable>
    );
  });
};

Section.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
};

export default Section;
