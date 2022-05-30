import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { languages } from 'i18n';

const Languages = function Languages() {
  const navigate = useNavigate();
  const location = useLocation();
  const { language, changeLanguage } = useTranslation();

  const handleChangeLocale = e => {
    e.preventDefault();
    const lang = e.target.value;
    changeLanguage(lang);
    navigate(`/${lang}/${location.pathname.substring(4)}`);
  };

  return (
    <select onChange={handleChangeLocale} value={language} style={{ marginRight: '24px' }}>
      {languages.map(({ name, code }) => (
        <option key={code} value={code}>
          {name}
        </option>
      ))}
    </select>
  );
};

export default Languages;
