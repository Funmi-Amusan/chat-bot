'use client'

import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { useState } from 'react';
import DeleteModal from './DeleteModal';
import Link from 'next/link';
import { deleteConversation } from '@/lib/actions/ConversationActions';
import { useParams, useRouter } from 'next/navigation';

const ConversationItem = ({ title, id, isActive }: { title: string, id: string, isActive: boolean }) => { 
  const {id:currentConversationId} = useParams();
  const router = useRouter()
   const [openModal, setOpen] = useState(false);
   const [isDeleting, setIsDeleting] = useState(false);
   const handleCloseModal = () => setOpen(false);


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
        loading={false}
        isDeleting={isDeleting}
      />
    </>
  )
}

export default ConversationItem