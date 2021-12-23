import { t } from 'i18next';

export const AcceptsText = {
  NE: t('rejects'),
  DA: t('accepts'),
};

export const AcceptsBool = {
  NE: false,
  DA: true,
};

export const Activities = {
  'SPLOŠNA DEJ.-OTROŠKI IN ŠOLSKI DISPANZER': 'OTROŠKI IN ŠOLSKI DISPANZER',
  'SPLOŠNA DEJAVNOST - SPLOŠNA AMBULANTA': 'SPLOŠNA AMBULANTA',
  'ZOBOZDR. DEJAVNOST-ZDRAVLJENJE ODRASLIH': 'ZDRAVLJENJE ODRASLIH',
  'ZOBOZDR. DEJAVNOST-ZDRAVLJENJE MLADINE': 'ZDRAVLJENJE MLADINE',
  'SPLOŠNA DEJAVNOST - DISPANZER ZA ŽENSKE': 'DISPANZER ZA ŽENSKE',
};

export const Provider = {
  ZD: 'ZDRAVSTVENI DOM',
};

export const DoctorTypes = {
  doctors: 'Splošni',
  ped: 'Pediatri',
  gyno: 'Ginekologi',
  dentists: 'Zobozdravniki',
};

export const PER_PAGE = 20;
export const INSTITUTION_KEY = 'id_inst';
export const TYPES = ['gp', 'ped', 'gyn', 'den', 'den-y', 'den-s'];
