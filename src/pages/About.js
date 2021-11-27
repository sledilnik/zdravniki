import { useEffect, useState } from 'react';
import enAbout from 'content/en/about.md';
import slAbout from 'content/sl/about.md';
import * as Styled from './styles/Markdown';

export default function About() {
  const [postMarkdown, setPostMarkdown] = useState('');

  const lng = localStorage.getItem('i18nextLng') || 'sl';

  useEffect(() => {
    document.body.style.overflow = 'auto';
  });

  useEffect(() => {
    let theTextFile = slAbout;
    if (lng === 'en') {
      theTextFile = enAbout;
    }

    fetch(theTextFile)
      .then(response => response.text())
      .then(text => {
        setPostMarkdown(text);
      });
  }, [lng]);

  return (
    <Styled.CustomContainer>
      <Styled.StaticPageWrapper>
        <span>
          <Styled.Markdown>{postMarkdown}</Styled.Markdown>
        </span>
      </Styled.StaticPageWrapper>
    </Styled.CustomContainer>
  );
}
