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
    if (!isActive) {
      setOpen(true)
    }
    // show toast explaining 
  }

  const handleDeleteConversation = async () => {
    setIsDeleting(true);
    const res = await deleteConversation(id)
    const isCurrentConversation = id === currentConversationId;
    if (res.success && isCurrentConversation) {
router.push('/chat/new')
    }
  
  }

  return (
    <>
    <Link href={`/chat/${id}`} className={` rounded-lg flex items-center justify-between ${isActive ? 'bg-neutral-300' : ''}`} >
      <div className=' cursor-pointer flex-grow font-normal truncate whitespace-nowrap py-1'>
        <p>{title}</p>
      </div>
      <button onClick={()=> openDeleteModal()} className=' h-full opacity-0 hover:opacity-100 transition-opacity duration-150 ease-in flex items-center cursor-pointer'>
        <IoMdTrash size={20} />
      </button>
    </Link>

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