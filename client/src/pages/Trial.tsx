import { Modal } from "../components/common/Modal";
import { useState } from "react";

const Trial = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = "hidden"; // Disable scrolling
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "auto"; // Enable scrolling
  };
  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <button
          onClick={openModal}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Open Modal
        </button>

        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <h2 className="text-xl font-bold mb-4">Modal Title</h2>
          <p className="text-gray-700">
            This is the modal content. Add anything you want here!
          </p>
        </Modal>
      </div>
    </>
  );
};

export default Trial;
