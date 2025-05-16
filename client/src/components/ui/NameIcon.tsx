import React from 'react';
import { useAppSelector } from '@/utils/hooks';

const NameIcon = React.memo(() => {
    const { user } = useAppSelector((state) => state.conversationReducer);

    const firstLetter = user?.name?.split(' ')[0] || 'A';

    return (
        <p className='bg-violet-200 dark:bg-neutral-900 dark:text-violet-200 text-violet-800 font-bold text-base h-6 w-6 items-center justify-center text-center rounded-full inline-flex whitespace-nowrap'>
            {firstLetter}
        </p>
    );
}, (prevProps, nextProps) => {
    return true; 
});

NameIcon.displayName = 'NameIcon';

export default NameIcon;