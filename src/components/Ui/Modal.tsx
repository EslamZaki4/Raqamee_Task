import { Dialog, DialogPanel } from '@headlessui/react';
import { IoClose } from "react-icons/io5";

export default function PopUp({ isOpen, setIsOpen, children }: any) {
  function close() {
    setIsOpen(false);
  }

  return (
    <Dialog open={isOpen} as="div" className="fixed inset-0 z-[999] flex items-center justify-center focus:outline-none overflow-y-auto" onClose={close}>
      <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
      <div className="relative w-full lg:max-w-3xl max-h-[99%] mx-4 !bg-white rounded flex items-center justify-center overflow-y-auto">
        <DialogPanel className="relative w-full h-auto flex flex-col items-center justify-between px-5 p-2">
          <button className='absolute top-4 right-4 m-5'><IoClose size={20} color="black" onClick={close} className="cursor-pointer" /></button>
          
          <div className="mt-5 w-full h-full flex flex-col justify-between">
            {children}
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  )
}
