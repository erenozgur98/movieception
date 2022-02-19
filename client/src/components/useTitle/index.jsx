import { useEffect, useState } from 'react'

const useTitle = (title) => {
    const [documentTitle, setDocumentTitle] = useState(title);

    useEffect(() => {
        document.title = documentTitle
    }, [title])

    return [documentTitle, setDocumentTitle]
}

export { useTitle }