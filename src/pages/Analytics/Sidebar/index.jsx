import { useState } from 'react';

import * as Icons from 'components/Shared/Icons';
import Modal from '../Modal';

import styles from './Sidebar.module.css';
import { SECTIONS } from '../Data/sections';
import { createChartDataProxy } from '../Data/create-chart-data-proxy';

const Sidebar = function Sidebar() {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  return (
    <aside className={styles.Sidebar}>
      <button type="button" onClick={openModal} aria-label="show links to charts">
        <Icons.Icon name="Chart" />
      </button>
      <Modal modalOpen={modalOpen} onCancel={closeModal} aria-labelledby="go-to-graph">
        <h2 id="go-to-graph">Pojdi na graf</h2>
        <div>
          <div style={{ marginBottom: '0.5em' }}>
            <h3>Some section title</h3>
            <a href="#rich-info-click" onClick={closeModal} className="link">
              Neki po občinah
            </a>
          </div>
          {SECTIONS.map(section => (
            <div key={section.sectionTitle} style={{ marginBottom: '0.5em' }}>
              <h3>{section.sectionTitle}</h3>
              {section.charts.map(chart => {
                const chartProxy = createChartDataProxy(chart);
                return (
                  <a
                    key={chartProxy.id}
                    href={`#${chartProxy.id}`}
                    onClick={closeModal}
                    className="link"
                  >
                    {chartProxy.options.title.text}
                  </a>
                );
              })}
            </div>
          ))}
        </div>
      </Modal>
    </aside>
  );
};

export default Sidebar;
