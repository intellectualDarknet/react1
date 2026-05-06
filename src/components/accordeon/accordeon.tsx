import { useState } from "react"
import data from './data'

export default function Accordeon() {

    const [selected, setSelected] = useState<number | null>(null)

    function handleSingleSelection(id: number) {
        if (selected === id) {
            setSelected(null)
        } else {
            setSelected(id)
        }
    }

    return (
        <div className='wrapper'>
            <div className='accordeon'>{
                data && data.length > 0 
                ? data.map((e) => (
                    <div onClick={()=>handleSingleSelection(e.id)} className='item'>
                        <h3>{e.question}</h3>
                        <span>+</span>
                        {selected === e.id && <div>{e.answer}</div>}
                    </div>
                ))
                : <div>No data found !</div>}</div>
        </div>
    )
}