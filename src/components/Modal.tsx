import { useContext } from 'react';
import Modal from '@mui/material/Modal';
import { UserContext } from '@/context/MainContext'

export default function BasicModal() {
    const { openModal, handleCloseModal } = useContext(UserContext)
    return (
        <div>
            <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className="outline-none border-none"
            >
                <div className="w-80 h-52 p-5 absolute top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4 bg-white rounded border border-solid border-gray-400">
                    <h3 id="modal-modal-title" className="mb-4 text-xl font-medium text-[var(--dark-blue)]">Message</h3>
                    <p id="modal-modal-description" className="text-base text-zinc-500">
                        Profile updated successfully. Changes might take a while to fully take effect. You&apos;ve been signed out
                    </p>
                </div>
            </Modal>
        </div>
    );
}