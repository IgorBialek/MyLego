import { useRecoilValue } from 'recoil';

import { modalChildAtom } from '../../atoms/layout/ModalChild';
import Finalize from '../addItem/Finalize';
import Card from './Card/Card';
import Error from './Error';
import css from './Modal.module.css';

const Modal = () => {
  const modalChild = useRecoilValue(modalChildAtom);

  const caseRender = () => {
    switch (modalChild.id) {
      case "ERROR":
        return (
          <Error
            title={modalChild.title!}
            text={modalChild.text!}
            handler={modalChild.handler!}
          />
        );
      case "FINALIZE":
        return <Finalize />;
      default:
        return <h1>Shit happend</h1>;
    }
  };

  return (
    <div className={`${css.modalContainer} center`}>
      <Card customClass={css.cardMargin}>{caseRender()}</Card>
    </div>
  );
};

export default Modal;
