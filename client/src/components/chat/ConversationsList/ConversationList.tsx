'use client'

import { useEffect, useState } from 'react'
import AddConversation from './AddConversation'
import ConversationItem from './ConversationItem'
import { fetchAllConversationsAction } from '@/store/conversation/action'
import { useAppDispatch, useAppSelector } from '@/utils/hooks'
import { z } from 'zod'

const UserIdSchema = z.string().uuid("Invalid user ID format")

const ConversationSchema = z.object({
  id: z.string().uuid("Invalid conversation ID"),
  title: z.string().optional(),
})

const ConversationsSchema = z.array(ConversationSchema)

type ValidUserId = z.infer<typeof UserIdSchema>
type ValidConversation = z.infer<typeof ConversationSchema>

const ConversationList = () => {
  const dispatch = useAppDispatch()
  const { conversations } = useAppSelector((state) => state.conversationReducer)
  const [validationError, setValidationError] = useState<string | null>(null)
  const [validatedConversations, setValidatedConversations] = useState<ValidConversation[]>([])
  
  const userId = "6d25380c-3ae8-4023-af50-2dfce1fb8fa4"
  
  const getConversations = async () => {
    try {
      const validUserId: ValidUserId = UserIdSchema.parse(userId)
      
      await dispatch(fetchAllConversationsAction({userId: validUserId, forceRefresh: false}))
    } catch (error) {
      if (error instanceof z.ZodError) {
        setValidationError("Invalid user ID format")
        console.error("User ID validation error:", error.errors)
      } else {
        setValidationError("Failed to fetch conversations")
        console.error("Error fetching conversations:", error)
      }
    }
  }
  
  useEffect(() => {
    if (conversations) {
      try {
        const validated = ConversationsSchema.parse(conversations)
        setValidatedConversations(validated)
        setValidationError(null)
      } catch (error) {
        if (error instanceof z.ZodError) {
          setValidationError("Invalid conversation data format")
          console.error("Conversations validation error:", error.errors)
        }
      }
    }
  }, [conversations])

  useEffect(() => {
    getConversations()
  }, [userId])

  return (
    <div className='h-full w-full flex flex-col gap-5 text-[#1D1B20] pb-6 '>
      <AddConversation />
<div className=' overflow-y-auto scrollbar-hide flex-1 flex flex-col gap-2'>
      {validatedConversations?.length > 0 ? (
        validatedConversations.map((conversation) => (
          <ConversationItem 
            key={conversation.id} 
            title={conversation?.title || "Untitled Conversation"} 
            id={conversation?.id} 
          />
        ))
      ) : (
        <div className="text-center text-gray-500 mt-4">
          {!validationError && "No conversations found"}
        </div>
      )}
</div>
    </div>
  )
}

export default ConversationList