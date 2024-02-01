import './FormComponent.css'
import { useEffect,useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

const FormComponent =(props)=>{
    //console.log("Renderformcomponent")
    const [title,setTitle] = useState('')
    const [amount,setAmount] = useState('')
    const [formValid,setFormValid] = useState(false)
    const inputTitle = (event)=>{
        setTitle(event.target.value)
        //console.log(event.target.value)
    }
    const inputAmount = (event)=>{
        setAmount(event.target.value)
        //console.log(event.target.value)
    }
    const saveItem = (event)=>{
        event.preventDefault()
        const itemDeta = {
            id:uuidv4(),
            title:title,
            amount:Number(amount)
        }
        props.onAddItem(itemDeta)
        setTitle('')
        setAmount('')
    }

    useEffect(()=>{
        const checkData = title.trim().length>0 && amount!=''
        setFormValid(checkData)
    },[title,amount])
    return(
        <div>
            <form onSubmit={saveItem}>
                <div className="form-control">
                    <div className='lable'>ชื่อรายการ</div>
                    <input type="text" placeholder="ระบุรายการของคุณ" onChange={inputTitle} value={title} />
                </div>
                <div className="form-control">
                    <lable>จำนวนเงิน</lable>
                    <input type="number" placeholder="ถ้าเป็นรายจ่ายให้เติม ลบ(-) ไว้หน้าตัวเลข "onChange={inputAmount} value={amount} />
                </div>
                <div>
                    <button tpye="submit" className="btn" disabled={!formValid}>เพิ่มข้อมูล</button>
                </div>
            </form>
        </div>
    )
}

export default FormComponent