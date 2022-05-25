import { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

const ShowModal = (showModal) => {
    const [show, setShow] = useState(false);
    const [cancel, setCancel] = useState(false);

    useEffect(() => {
        showModal && setShow(true);
    }, [showModal])
    console.log(showModal, 'showModal');

    const handleClose = action => {
        if (action) {
            console.log('sure');
            setCancel(true);
            setShow(false);
        }
        else {
            console.log("notsure");
            setCancel(false);
            setShow(false);
        }
    };
    <div>

        <Modal show={show} onHide={() => handleClose(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => handleClose(false)}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => handleClose(true)}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    </div>
    return cancel;
};

export default ShowModal;