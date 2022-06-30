import React from "react";
import { Modal, Button } from 'react-bootstrap'

function ConfirmModal({ open, handleClose, information, setInformation, removeForReal }) {
    return (
        <Modal
            show={open}
            onHide={() => {
                handleClose()
                setInformation({})
            }}
            centered
            className='confirm-modal'
        >
            <Modal.Header closeButton>
                <Modal.Title>Modal title</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                Are you sure to remove {information.title} from your {information.list} ?
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={() => { handleClose(); setInformation({}) }}>Close</Button>
                <Button variant="primary" onClick={removeForReal}>Remove</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ConfirmModal;
