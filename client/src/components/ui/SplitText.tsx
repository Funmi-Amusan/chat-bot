"use client"

import { animate, stagger } from "motion"
import { useEffect, useRef } from "react"
import { splitText } from "motion-plus"

export default function SplitText({ text }: { text: string }) {
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        document.fonts.ready.then(() => {
            if (!containerRef.current) return
            containerRef.current.style.visibility = "visible"

            const { words } = splitText(containerRef.current)
            animate(
                words,
                { opacity: [0, 1], y: [10, 0] },
                {
                    type: "spring",
                    duration: 2,
                    bounce: 0,
                    delay: stagger(0.05),
                }
            )
        })
    }, [])

    return (
        <div 
            className=" markdown-rendered" 
            ref={containerRef} 
            dangerouslySetInnerHTML={{ __html: text }}
            style={{ visibility: "hidden" }}
        />
    )
}