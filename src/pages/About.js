import Markdown from 'markdown-to-jsx';
import React, { useEffect, useState } from 'react';
import enAbout from '../content/en/about.md';
import slAbout from '../content/sl/about.md';
import './style.scss';

export default function About() {
  const [postMarkdown, setPostMarkdown] = useState('');

  const lng = localStorage.getItem("i18nextLng") || "sl";

  useEffect(() => {
    let theTextFile = slAbout;
    if (lng === 'en') {
      theTextFile = enAbout;
    }

    fetch(theTextFile)
      .then((response) => response.text())
      .then((text) => {
        setPostMarkdown(text);
      });
  }, [lng]);

  return (
    <div className="custom-container">
      <div className="static-page-wrapper">
        <span>
          <Markdown>
            {postMarkdown}
          </Markdown>
        </span>
      </div>
    </div>
  )
}