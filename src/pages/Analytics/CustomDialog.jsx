import PropTypes from 'prop-types';

// Modal as a separate component
import { useEffect, useRef } from 'react';

import styles from './CustomDialog.module.css';

function Modal({ openModal, closeModal, children, ariaLabelledBy }) {
  const ref = useRef();

  useEffect(() => {
    if (openModal) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [openModal]);

  return (
    <dialog
      ref={ref}
      onCancel={closeModal}
      aria-labelledby={ariaLabelledBy}
      className={styles.CustomDialog}
    >
      <div className={styles.Content}>{children}</div>
      <button type="button" onClick={closeModal} className={styles.CloseButton}>
        Close
      </button>
    </dialog>
  );
}

Modal.propTypes = {
  openModal: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  ariaLabelledBy: PropTypes.string.isRequired,
};

export default Modal;
