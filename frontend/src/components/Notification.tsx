import { useEffect } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';

export type NotificationProps = {
  show: boolean;
  message: string;
  variant?: 'success' | 'danger' | 'info' | 'warning';
  onClose: () => void;
};

const Notification = ({ show, message, variant = 'danger', onClose }: NotificationProps) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onClose, 4000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  return (
    <ToastContainer position="top-center" className="p-3" style={{ zIndex: 9999 }}>
      <Toast bg={variant} show={show} onClose={onClose} delay={4000} autohide>
        <Toast.Body className="text-white">{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default Notification;
