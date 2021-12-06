import { useCallback } from 'react';
import { t } from 'i18next';
import MarkdownBase from 'markdown-to-jsx';
import { styled } from '@mui/material/styles';
import { Tooltip } from '@mui/material';
import iconCheck from 'assets/check.svg';
import iconCopy from 'assets/icon-copy.svg';
import iconExpand from 'assets/expand-dd.svg';
import iconClose from 'assets/close-dd.svg';

export const Collapsable = function Collapsable({ id, question, answer }) {
  // scroll element to when link with hash is passed
  const scroll = useCallback(node => {
    if (node !== null && node.id === window.location.hash.substr(1)) {
      // eslint-disable-next-line no-param-reassign
      node.open = true;
      window.scrollTo({
        top: node.getBoundingClientRect().top,
        behavior: 'smooth',
      });
    }
  }, []);

  // copy url of the definition
  const handleCopy = e => {
    const element = e.currentTarget;
    let text = `${window.location.href}#${element.nextSibling.id}`;
    if (window.location.hash !== '') {
      text = `${window.location.href.split('#')[0]}#${element.nextSibling.id}`;
    }
    navigator.clipboard.writeText(text);
    element.className = 'icon check';
    // TODO: Fix commented out lines below. Set the title to tooltip, not to icon
    // element.title = t('copied');
    setTimeout(() => {
      element.className = 'icon copy';
      // element.title = t('copy');
    }, 2000);
  };

  return (
    <Wrapper>
      <Tooltip title={<div>{t('copy')}</div>} placement="top">
        <IconWrapper className="icon copy" alt={t('copy')} onClick={handleCopy} />
      </Tooltip>
      <Details id={id} ref={scroll}>
        <Summary>{question}</Summary>
        <MarkdownBase className="answer">{answer}</MarkdownBase>
      </Details>
    </Wrapper>
  );
};

const Wrapper = styled('div')(() => ({
  position: 'relative',
  fontSize: 'inherit',
  '.icon': {
    width: '28px',
    cursor: 'pointer',
    padding: '5px',
    position: 'absolute',
    top: '-3px',
    right: '30px',
    zIndex: 10,
    '&.copy': {
      content: `url(${iconCopy})`,
    },
    '&.check': {
      content: `url(${iconCheck})`,
    },
  },
}));

const Details = styled('details')(() => ({
  fontSize: 'inherit',
  marginBottom: '24px',
  '> *:not(summary)': {
    position: 'relative',
    display: 'none',
    width: '90%',
  },
  '> .answer': {
    marginTop: '2px',
    paddingTop: '12px',
  },
  '&[open]': {
    '> *:not(summary)': {
      display: 'block',
      animation: 'show-dd 0.5s ease-out',
    },
    'summary::after': {
      content: `url(${iconClose})`,
    },
  },
  '@keyframes show-dd': {
    from: {
      transform: 'translateY(-8px)',
      opacity: 0.1,
    },
    to: {
      transform: 'translateY(0px)',
      opacity: 1,
    },
  },
}));

const Summary = styled('summary')(({ theme }) => ({
  cursor: 'pointer',
  userSelect: 'none',
  fontSize: 'inherit',
  fontWeight: 'bold',
  fontStretch: 'normal',
  fontStyle: 'normal',
  lineHeight: 1.71,
  color: theme.MD.summaryColor,
  position: 'relative',
  paddingRight: '18%',
  [theme.breakpoints.up('md')]: {
    paddingRight: '10%',
  },
  '::marker': {
    display: 'none',
    content: '""',
  },
  '::after': {
    content: `url(${iconExpand})`,
    display: 'block',
    position: 'absolute',
    right: 0,
    top: 0,
  },
  '$:focus': {
    outline: 'none',
  },
}));

const IconWrapper = styled('span')(() => ({
  width: '28px',
  cursor: 'pointer',
  padding: '5px',
  position: 'absolute',
  top: '-3px',
  right: '30px',
  zIndex: 10,
}));
