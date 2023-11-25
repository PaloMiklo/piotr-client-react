import { faMagnifyingGlassMinus, faMagnifyingGlassPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ReactElement, useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useHttpGetBlob } from '../../../common/hook/http-get';
import { TProductModalProps } from './Product-Modal.config';
import './Product-Modal.scss';

const ModalDialog = ({ doShow, activatedProduct }: TProductModalProps): ReactElement => {
    const [isShow, setIsShow] = useState<boolean>(false);
    const [product, setProduct] = useState<boolean | null>(null);
    const [zoomLevel, setZoomLevel] = useState<number>(100);

    const { response: imageSrc, error: imageError, loading: imageLoading } = useHttpGetBlob(`/api/product/${activatedProduct.id}/image`);

    const initModal = (): void => setIsShow(!isShow);

    useEffect((): void => {
        if (doShow) {
            initModal();
            setProduct(product);
        }
    }, [doShow, activatedProduct]);

    const handleZoomIn = (): boolean | void => zoomLevel < 200 && setZoomLevel(zoomLevel + 10);
    const handleZoomOut = (): boolean | void => zoomLevel > 50 && setZoomLevel(zoomLevel - 10);

    return (
        <>
            <Modal show={isShow} className="modal-fullscreen-wrapper" dialogClassName="modal-fullscreen">
                <Modal.Header>
                    <Modal.Title>{activatedProduct?.name}</Modal.Title>
                    <button className='btn x-mark' onClick={initModal}><FontAwesomeIcon icon={faXmark} /></button>
                </Modal.Header>
                <div className="zoom-controls">
                    <button className='btn' onClick={handleZoomOut}><FontAwesomeIcon icon={faMagnifyingGlassMinus} /></button>
                    <button className='btn' onClick={handleZoomIn}><FontAwesomeIcon icon={faMagnifyingGlassPlus} /></button>
                </div>
                <Modal.Body className='d-flex flex-column align-items-center pt-0'>
                    {imageSrc && (
                        <img
                            className="product-img"
                            src={imageSrc}
                            alt="Product"
                            style={{ width: `${zoomLevel}%` }}
                            loading="lazy"
                        />
                    )
                    }
                </Modal.Body>
                <Modal.Footer></Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalDialog;
