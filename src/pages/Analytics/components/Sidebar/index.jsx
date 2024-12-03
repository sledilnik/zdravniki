import { useState } from 'react';

import * as Icons from 'components/Shared/Icons';
import Modal from '../Modal';

import styles from './Sidebar.module.css';
import { SECTIONS } from '../../data/sections';
import { createChartDataProxy } from '../../data/create-chart-data-proxy';

const Sidebar = function Sidebar() {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  return (
    <aside className={styles.Sidebar} name="sidebar">
      <div className={styles.SidebarMobile}>
        <button type="button" onClick={openModal} aria-label="show links to charts">
          <Icons.Icon name="Chart" />
        </button>
        <Modal
          className={styles.SidebarModal}
          modalOpen={modalOpen}
          onCancel={closeModal}
          aria-labelledby="go-to-graph"
        >
          <h2 id="go-to-graph" className={styles.SidebarTitle}>
            Pojdi na graf
          </h2>
          <nav className={styles.SidebarGroupsWrapper} aria-label="Chart Navbar Mobile">
            {SECTIONS.map(section => (
              <div key={section.sectionTitle} className={styles.SidebarGroup}>
                <h3 className={styles.SidebarGroupTitle}>{section.sectionTitle}</h3>
                {section.charts.map(chart => {
                  const chartProxy = createChartDataProxy(chart);
                  return (
                    <a
                      key={chartProxy.id}
                      href={`#${chartProxy.id}`}
                      onClick={closeModal}
                      className={styles.SidebarLink}
                    >
                      {chartProxy.options.title.text}
                    </a>
                  );
                })}
              </div>
            ))}
          </nav>
        </Modal>
      </div>
      <div className={styles.SidebarDesktop}>
        <h2 className={styles.SidebarTitle}>Grafi</h2>
        <nav className={styles.SidebarGroupsWrapper} aria-label="Chart Navbar Desktop">
          {SECTIONS.map(section => (
            <div
              key={section.sectionTitle}
              className={styles.SidebarGroup}
              aria-label={section.sectionTitle}
            >
              <h3 className={styles.SidebarGroupTitle}>{section.sectionTitle}</h3>
              {section.charts.map(chart => {
                const chartProxy = createChartDataProxy(chart);
                return (
                  <a
                    key={chartProxy.id}
                    href={`#${chartProxy.id}`}
                    onClick={closeModal}
                    className={styles.SidebarLink}
                  >
                    {chartProxy.options.title.text}
                  </a>
                );
              })}
            </div>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
