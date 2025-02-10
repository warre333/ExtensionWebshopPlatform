"use client"

export const WebshopRender = ({ content } : { content: HTMLElement }) => {
    return (
        <body dangerouslySetInnerHTML={{ __html: content }} />
    )
}
