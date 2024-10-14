import { useState } from 'react';

import * as Icons from 'components/Shared/Icons';
import Modal from '../Modal';

import styles from './Sidebar.module.css';

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
      <Modal openModal={modalOpen} closeModal={closeModal} ariaLabelledBy="go-to-graph">
        <h2 id="go-to-graph">Pojdi na graf</h2>
        <div>
          <a href="#column-chart" onClick={closeModal} className="link">
            Column chart
          </a>
          <a href="#line-chart" onClick={closeModal} className="link">
            Line chart
          </a>
          <a href="#drilldown-chart" onClick={closeModal} className="link">
            Drilldown chart
          </a>
        </div>
      </Modal>
    </aside>
  );
};

export default Sidebar;
