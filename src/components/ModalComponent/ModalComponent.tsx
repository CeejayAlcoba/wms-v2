import { Modal, type ModalProps } from "antd";

export type ModalComponentProps = {} & ModalProps;

export default function ModalComponent(props: ModalComponentProps) {
  const initialProps: ModalComponentProps = {
    maskClosable: false,
  };
  return (
    <Modal
      {...initialProps}
      {...props}
      okButtonProps={{ ...props.okButtonProps, htmlType: "submit" }}
    >
      {props.children}
    </Modal>
  );
}
