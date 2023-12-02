import { faMagnifyingGlassMinus, faMagnifyingGlassPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ReactElement, useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import LazyLoad from 'react-lazyload';
import { useSelector } from 'react-redux';
import { handleHttpError } from '../../../common/error';
import { useHttpGetBlob } from '../../../common/hook/http-get';
import { API, ENDPOINTS } from '../../../common/rest';
import { selectDoMock } from '../../../store/selector/config';
import { TProductModalProps } from './Product-Modal.config';
import './Product-Modal.scss';

const ModalDialog = ({ doShow, activatedProduct }: TProductModalProps): ReactElement => {
    const [isShow, setIsShow] = useState<boolean>(false);
    const [product, setProduct] = useState<boolean | null>(null);
    const [zoomLevel, setZoomLevel] = useState<number>(100);

    const doMock_rdx = useSelector(selectDoMock);

    const { response: imageSrc, error: imageError, loading: loadingImage } = useHttpGetBlob(ENDPOINTS[API.PRODUCT_IMAGE](activatedProduct.id), { doMock: doMock_rdx });
    (!loadingImage && imageError) && handleHttpError(imageError);

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
                    <LazyLoad once>
                        {doMock_rdx ?
                            (
                                <img
                                    className="product-img"
                                    src={`/images/product${activatedProduct.id}.jpg`}
                                    alt="Product"
                                    style={{ width: `${zoomLevel}%` }}
                                    loading="lazy"
                                />
                            ) : (
                                imageSrc && (
                                    <img
                                        className="product-img"
                                        src={imageSrc}
                                        alt="Product"
                                        style={{ width: `${zoomLevel}%` }}
                                        loading="lazy"
                                    />
                                )
                            )
                        }
                    </LazyLoad>
                </Modal.Body>
                <Modal.Footer></Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalDialog;
