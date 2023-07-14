import { useState } from "react"

const TodoForm = ({onFormSubmit}) => {
    
    const [task , setTask] = useState()

    const onSubmit = (e) => {
        e.preventDefault()
        onFormSubmit(task)
    }
    
    return(
        <form onSubmit={onSubmit}>
            <input
             type="text" 
             placeholder="task..."
             onChange={e => setTask(e.target.value)}
             />
            
            <button>submit</button>
        </form>
    )
}

export default TodoForm