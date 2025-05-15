'use client'

import { IoMdTrash } from "react-icons/io";
import { useState } from 'react';
import DeleteModal from './DeleteModal';
import Link from 'next/link';
import { deleteConversation } from '@/lib/actions/ConversationActions';
import { useParams, useRouter } from 'next/navigation';

const ConversationItem = ({ title, id }: { title: string, id: string }) => { 
  const {id:currentConversationId} = useParams();
  const router = useRouter()
   const [openModal, setOpen] = useState(false);
   const [isDeleting, setIsDeleting] = useState(false);
   const handleCloseModal = () => setOpen(false);

   const isActive = currentConversationId === id;


  const openDeleteModal = () => {
      setOpen(true)
  }

  const handleDeleteConversation = async () => {
    setIsDeleting(true);
    const res = await deleteConversation(id)
    setIsDeleting(false)
    const isCurrentConversation = id === currentConversationId;
    if (res.success && isCurrentConversation) {
router.push('/chat/new')
    }
  
  }

  return (
    <>
    <div  className={` rounded-lg px-2 flex items-center justify-between ${isActive ? 'bg-neutral-300' : ''} hover:bg-neutral-300 transition-all duration-150`}>
    <Link href={`/chat/${id}`} className=" flex-grow" >
      <div className=' cursor-pointer flex-grow font-normal truncate whitespace-nowrap py-1'>
        <p>{title}</p>
      </div>
    </Link>
      <button onClick={()=> openDeleteModal()} className=' h-full opacity-0 hover:opacity-100 transition-opacity duration-150 ease-in flex items-center cursor-pointer'>
        <IoMdTrash size={20} />
      </button>

    </div>

    <DeleteModal
        isOpen={openModal}
        onClose={handleCloseModal}
        onDelete={handleDeleteConversation}
        title={title}
        loading={false}
        isDeleting={isDeleting}
      />
    </>
  )
}

export default ConversationItem