import { useNavigate, useLocation } from "react-router-dom";
import { useState } from 'react';
import i18next, { languages } from 'i18n';

const Languages = () => {

  const lng = localStorage.getItem("i18nextLng") || "sl";
  const [language, setLanguage] = useState(lng);
  const navigate = useNavigate();
  const location = useLocation();

  const handleChangeLocale = (e) => {
    e.preventDefault();
    const lang = e.target.value;
    setLanguage(lang);
    i18next.changeLanguage(lang);
    localStorage.setItem('i18nextLng', lang);
    navigate(`/${lang}/${location.pathname.substring(4)}`);
  };

  return (
    <select onChange={handleChangeLocale} value={language} style={{marginRight: "24px"}}>
      {languages.map(({ name, code }) => (
        <option key={code} value={code}>
          {name}
        </option>
      ))}
    </select>
  );
};

export default Languages;
