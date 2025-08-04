import { Modal, type ModalProps } from "antd";

export type ModalComponentProps = {} & ModalProps;

export default function ModalComponent(props: ModalComponentProps) {
  const initialProps: ModalComponentProps = {
    maskClosable: false,
  };
  return (
    <Modal {...initialProps} {...props}>
      {props.children}
    </Modal>
  );
}
