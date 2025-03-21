'use client'

import { DeleteAConversationAction, fetchAConversationAction, fetchAllConversationsAction } from '@/store/conversation/action';
import { useAppDispatch, useAppSelector } from '@/utils/hooks';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { useState } from 'react';
import DeleteModal from './DeleteModal';

const ConversationItem = ({ title, id }: { title: string, id: string }) => {
   const dispatch = useAppDispatch();
   const { conversationData, loading } = useAppSelector((state) => state.conversationReducer);
   const [openModal, setOpen] = useState(false);
   const [isDeleting, setIsDeleting] = useState(false);
   const handleCloseModal = () => setOpen(false);

   const isCurrentConversation = conversationData?.id === id;

   const userId = "6d25380c-3ae8-4023-af50-2dfce1fb8fa4"

   const getAConversation = async () => {
      await dispatch(fetchAConversationAction(id));
    };

  const getOneConversation = () => {
    if (!isCurrentConversation) {
    getAConversation()
    }
  }

  const openDeleteModal = () => {
    if (!isCurrentConversation) {
      setOpen(true)
    }
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
    <div className={` px-4 w-full rounded-2xl h-14 flex gap-3 items-center justify-between ${isCurrentConversation ? 'bg-[#D0C7DE]' : 'bg-[#E8DEF8]'}`} >
      <div onClick={()=>getOneConversation()} className=' cursor-pointer flex-grow font-normal whitespace-nowrap py-4'>
        <p>{title}</p>
      </div>
      <div onClick={()=> openDeleteModal()} className=' h-full px-4 flex items-center cursor-pointer'>
        <DeleteOutlinedIcon />
      </div>
    </div>

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