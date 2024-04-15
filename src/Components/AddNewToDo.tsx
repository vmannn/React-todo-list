import React from 'react'
import SendIcon from '@mui/icons-material/Send'
import CloseIcon from '@mui/icons-material/Close'

type propTypes = {
    open: boolean
    onClose: () => void
    children: React.ReactNode
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void
}

const AddNewToDo: React.FC<propTypes> = ({
    open,
    onClose,
    children,
    handleSubmit,
}) => {
    if (!open) return null

    return (
        <div className="overlay">
            <div className="add-new-todo">
                <form onSubmit={handleSubmit}>
                    <button
                        type="button"
                        className="cancel-add-todo"
                        onClick={onClose}
                    >
                        <CloseIcon style={{ color: 'white' }} />
                    </button>

                    {children}

                    <button type="submit">
                        Create
                        <SendIcon style={{ color: 'white' }} />
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AddNewToDo
