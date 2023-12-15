import React, {useState} from 'react'
import { QuestionBox } from './QuestionBox'
import { useGetOnlineExamQuery } from '../app/services/onlineExamApi'

export const OnlineExam = () => {
    const [page, setPage] = useState(1)
    const [name, setName] = useState('')
    const [family, setFamily] = useState('')
    const [flag, setflag] = useState(false)
    const {data: onlineExam, isLoading, isError, error} = useGetOnlineExamQuery(page);
    const [correct, setCorrect] = useState(0);
    const [wrong, setWrong] = useState(0);
    const [empty, setEmpty] = useState(0);
    const [flafScore, setFlagScore] = useState(false)
    const [totlaScore, setTotalScore] = useState(0)
    

    const handleExam = () => {
        if(name !== "" & family !== ""){
            setflag(true)
        }
        else{
            alert("لطفا نام و نام خانوادگی خود را وارد کنید")
        }
    }

    if(isLoading) {
        return<div>Loading...</div>        
    }
    if(isError){
        return<div>Error : {error.status}</div>
    }


    
    

  return (
    <>
         <div className={flag ? 'noneDisplay' : 'infoBox'}>
            <h2>برای شروع آزمون لطفا نام و نام خانوادگی خود را وارد کرده سپس دکمه شروع آزمون را کلیک نمایید .</h2>
            <input type='text' name='name' value={name} onChange={(e)=>setName(e.target.value)} placeholder='نام'/>
            <input type='text' name='family' value={family} onChange={(e)=>setFamily(e.target.value)} placeholder='نام خانوادگی'/><br/>
            <button onClick={handleExam}>شروع آزمون</button>
        </div>
        

        
            <div className={flag ? 'onlineExamMainBox' : 'noneDisplay'}>
                <div className={flafScore ? 'noneDisplay' : 'onlineExamTopMenu'}>
                    <p>آزمون آنلاین : دوره HTML و CSS - مدت آزمون : 60 دقیقه - تعداد سوالات : 25   </p>
                    <p>نام و نام خانوادگی شرکت کننده : {name} {family}</p>
                </div>

                <div className={flafScore ? 'onlineExamTopMenu' : 'noneDisplay'}>
                    <p style={{position:'relative'}}>نتیجه آزمون : {totlaScore > 70 ? <p style={{color:'green', position:'absolute', right:'70px', top:'-14px'}}>قبول</p> : <p style={{color:'red', position:'absolute', right:'70px', top:'-14px'}}>مردود</p>}</p>
                    <p>نام و نام خانوادگی شرکت کننده : {name} {family}</p>
                </div>

                <div>
                    {
                        onlineExam.map(item => (
                            <QuestionBox item={item} page={page} setPage={setPage} setCorrect={setCorrect} correct={correct} setWrong={setWrong} wrong={wrong} setEmpty={setEmpty} empty={empty} flafScore={flafScore} setFlagScore={setFlagScore} totlaScore={totlaScore} setTotalScore={setTotalScore}/>
                        ))
                    }
                </div>
            </div>
        
    </>
  )
}
