'use client'

import { DeleteAConversationAction, fetchAllConversationsAction } from '@/store/conversation/action';
import { useAppDispatch, useAppSelector } from '@/utils/hooks';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { useState } from 'react';
import DeleteModal from './DeleteModal';
import Link from 'next/link';

const ConversationItem = ({ title, id, isActive }: { title: string, id: string, isActive: boolean }) => { 
   const dispatch = useAppDispatch();
   const { loading, user: userId } = useAppSelector((state) => state.conversationReducer);
   const [openModal, setOpen] = useState(false);
   const [isDeleting, setIsDeleting] = useState(false);
   const handleCloseModal = () => setOpen(false);

   if(!userId) return null;

  const openDeleteModal = () => {
    if (!isActive) {
      setOpen(true)
    }
    // show toast explaining 
  }

  const handleDeleteConversation = async () => {
    setIsDeleting(true);
    const res = await dispatch(DeleteAConversationAction(id));
    if (res) {
      await dispatch(fetchAllConversationsAction({userId, forceRefresh: false}));
      setIsDeleting(false);
      handleCloseModal()
    }
  }

  return (
    <>
    <Link href={`/chat/${id}`} className={` px-4 w-full rounded-2xl h-14 flex gap-3 items-center justify-between ${isActive ? 'bg-[#D0C7DE]' : 'bg-[#E8DEF8]'}`} >
      <div className=' cursor-pointer flex-grow font-normal whitespace-nowrap py-4'>
        <p>{title}</p>
      </div>
      <button onClick={()=> openDeleteModal()} className=' h-full px-4 flex items-center cursor-pointer'>
        <DeleteOutlinedIcon />
      </button>
    </Link>

    <DeleteModal
        isOpen={openModal}
        onClose={handleCloseModal}
        onDelete={handleDeleteConversation}
        title={title}
        loading={loading}
        isDeleting={isDeleting}
      />
    </>
  )
}

export default ConversationItem