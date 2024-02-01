import logo from './logo.svg';
import './App.css';
import React, { useReducer } from 'react';
import Transection from './component/Transection';
import FormComponent from './component/FormComponent';
import { useEffect,useState } from 'react';
import DataContext from './data/DataContext';
import ReportComponent from './component/ResportComponent';
import { element } from 'prop-types';
import { BrowserRouter as Router,Route,Link,Routes} from 'react-router-dom';

const Title =()=>{
  const design = {color:'red',textAlign:'center',fontSize:'1.5rem'}
  return(
    <>
      <h1 style={design}>แอพบัญชีรายรับ-รายจ่าย</h1>
    </>
    
  )
}
  
const Description=()=>{
  return(
    <p>บันทึกข้อมูลบัญชีในแต่ละวัน</p>
  )
}



function App() {
  const initdata = [
  ]
  const initState = [
    {id:1,title:"ค่า",amount:-2000},
    {id:1,title:"ค่า",amount:200},
    {id:1,title:"ค่า",amount:-1100},
    {id:1,title:"ค่า",amount:500}
  ]

  const [items,setItems] = useState(initdata)

  const [reportIncome,setReportIncome] = useState(0)
  const [reportExpense,setReportExpense] = useState(0)
  
  function onAddNewItem(newItem){
    setItems((prevItem)=>{
      return[newItem,...prevItem]
    })
    //console.log("ข้อมูล Form = ",newItem)
  }
  useEffect(()=>{
    const amounts = items.map(items=>items.amount)
    console.log(amounts)
    const income = amounts.filter(element=>element>0).reduce((total,element)=>total+=element,0).toFixed(2)
    const expense = ((amounts.filter(element=>element<0).reduce((total,element)=>total+=element,0))*-1).toFixed(2)
    console.log("รายรับ ",income)
    console.log("รายจ่าย ",expense)
    setReportIncome(income)
    setReportExpense(expense)
  },[items,reportIncome,reportExpense])

  return (
    <DataContext.Provider value={
      {
        income: reportIncome,
        expense: reportExpense
      }
    }>
      <div className='container'>
        <article> 
          <Title/>
          <Router>
          <div>
            <ul className='horzontal-menu'>
              <li>
                <Link to='/'>ข้อมูลบัญชี</Link>
              </li>
              <li>
              <Link to='/insert'>บันทึกข้อมูล</Link>
              </li>
            </ul>
            <Routes>
              <Route path='/' element={<ReportComponent />}></Route>
              <Route path='/insert' element={
                <>
                  <FormComponent onAddItem = {onAddNewItem}/>
                  <Transection item = {items}/>
                </>
              } />

            </Routes>
          </div>
          </Router>
        </article>
      </div>
    </DataContext.Provider>
  );
}

export default App;

 //reducer state

/* const [showReport,setShowReport] = useState(false)
 const reducer = (state,action)=>{
   switch(action.type){
     case "SHOW":
       return setShowReport(true);
     case "HIDE":
       return setShowReport(false);
   }
 }
 const [result,dispatch] = useReducer(reducer,showReport)
<h1>{result}</h1>
      <button onClick={()=>dispatch({type:"SHOW"})}>แสดง</button>
      <button onClick={()=>dispatch({type:"HIDE"})}>ซ่อน</button>
*/