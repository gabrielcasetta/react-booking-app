import React from 'react';
import { Modal as FlowbiteModal, Button } from 'flowbite-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  return (
    <FlowbiteModal show={isOpen} onClose={onClose}>
      <FlowbiteModal.Header>
      </FlowbiteModal.Header>
      <FlowbiteModal.Body>
        {children}
      </FlowbiteModal.Body>
    </FlowbiteModal>
  );
};

export default Modal;
