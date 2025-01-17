/** @import * as Types from "./types" */

import { useMediaQuery } from '@mui/system';
import { useEffect, useRef, useState } from 'react';

import { t } from 'i18next';

import * as Icons from 'components/Shared/Icons';
import Modal from '../Modal';

import { SECTIONS, sectionTranslationKeys } from '../../data/sections';
import { createCardDataProxy } from '../../utils/create-card-data-proxy';
import styles from './Sidebar.module.css';

/**
 * Renders sidebar groups with section titles and chart links.
 *
 * @param {Function} [closeHandler] - The function to call when a sidebar link is clicked. Can be undefined.
 * @param {Types.Section[]} sections - The sections to render in the sidebar.
 * @returns {JSX.Element[]} An array of JSX elements representing the sidebar groups.
 */
const renderSidebarGroups = (closeHandler, sections) =>
  sections.map(section => (
    <div key={section.sectionTitle} className={styles.SidebarGroup}>
      <div className={styles.SidebarGroupTitle}>{section.sectionTitle}</div>
      {section.cards.map(card => {
        const title = t(card.titleTranslationKey);
        const chartProxy = createCardDataProxy({ ...card, title });

        return (
          <a
            key={chartProxy.id}
            href={`#${chartProxy.id}`}
            onClick={closeHandler}
            className={styles.SidebarLink}
          >
            {chartProxy.title}
          </a>
        );
      })}
    </div>
  ));

const Sidebar = function Sidebar() {
  const [modalOpen, setModalOpen] = useState(false);
  const mediaQuery = useMediaQuery('(min-width: 900px)');
  const navRef = useRef(null);

  const shouldModalBeClosed = mediaQuery && modalOpen;
  useEffect(() => {
    if (shouldModalBeClosed) {
      setModalOpen(false);
    }
    return () => setModalOpen(false); // Ensure modal is closed when component unmounts
  }, [shouldModalBeClosed]);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const sections = SECTIONS.map(section => ({
    ...section,
    sectionTitle: t(sectionTranslationKeys[section.sectionTitle]),
  }));

  return (
    <aside className={styles.Sidebar} name="sidebar">
      {mediaQuery ? (
        <div className={styles.SidebarDesktop}>
          <div className={styles.SidebarTitle}>{t('analytics.sidebar.title')}</div>
          <nav
            ref={navRef}
            className={styles.SidebarGroupsWrapper}
            aria-label="Chart Navbar Desktop"
          >
            {renderSidebarGroups(undefined, sections)}
          </nav>
        </div>
      ) : (
        <div className={styles.SidebarMobile}>
          <button
            type="button"
            onClick={openModal}
            aria-label="show links to charts"
            aria-expanded={modalOpen}
          >
            <Icons.Icon name="Chart" />
          </button>
          <Modal
            className={styles.SidebarModal}
            modalOpen={modalOpen}
            onCancel={closeModal}
            aria-labelledby="go-to-graph"
          >
            <div id="go-to-graph" className={styles.SidebarTitle}>
              {t('analytics.sidebar.title')}
            </div>
            <nav
              ref={navRef}
              className={styles.SidebarGroupsWrapper}
              aria-label="Chart Navbar Mobile"
            >
              {renderSidebarGroups(closeModal, sections)}
            </nav>
          </Modal>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
