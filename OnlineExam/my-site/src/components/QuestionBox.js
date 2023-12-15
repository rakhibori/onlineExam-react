import React, { useState } from 'react'
import { useUpdateOnlineExamMutation } from '../app/services/onlineExamApi'
import { useGetOnlineExamQuery } from '../app/services/onlineExamApi'

export const QuestionBox = ({item, page, setPage, correct, setCorrect, wrong, setWrong, flafScore, setFlagScore, totalScore, setTotalScore}) => {
  const {data: onlineExam} = useGetOnlineExamQuery();
  const [updateOnlineExam] = useUpdateOnlineExamMutation()
  
  
  const handleAnswer = (event) => {
    var answer = ""
    if(event.target.id === "choice1"){
      answer = item.choice1
    }
    if(event.target.id === "choice2"){
      answer = item.choice2
    }
    if(event.target.id === "choice3"){
      answer = item.choice3
    }
    if(event.target.id === "choice4"){
      answer = item.choice4
    }
    updateOnlineExam({id: item.id, question: item.question, choice1: item.choice1, choice2: item.choice2, choice3: item.choice3, choice4: item.choice4, rightAnswer: item.rightAnswer, score: item.score, userAnswer: answer})
    if(item.rightAnswer === answer){
      setCorrect(prev=>prev +1)
    }else if(item.rightAnswer !== answer){
      setWrong(prev=>prev +1)
    }

    setTotalScore(correct * 4)
  }

  

  
    
  
  return (
    
    <>
        <div className={flafScore ? 'noneDisplay' : 'normalStayle'}>
            <div key={item.id} className='questionMainBox'>
                <div className='scoreAndQuestionBox'>
                    <p>{item.id} - {item.question}</p>
                    <p>{item.score} نمره</p>
                </div>
                الف) <label for='choice1'>{item.choice1}</label><input onClick={(event)=>handleAnswer(event)} name={`radio${item.id}`} id='choice1' value='choise1' type='radio'/><br/>
                ب) <label for='choice2'>{item.choice2}</label><input onClick={(event)=>handleAnswer(event)} name={`radio${item.id}`} id='choice2' value='choice2' type='radio'/><br/>
                ج) <label for='choice3'>{item.choice3}</label><input onClick={(event)=>handleAnswer(event)} name={`radio${item.id}`} id='choice3' value='choice3' type='radio'/><br/>
                د) <label for='choice4'>{item.choice4}</label><input onClick={(event)=>handleAnswer(event)} name={`radio${item.id}`} id='choice4' value='choice4' type='radio'/>
            </div>

            <div className='btnBox'>
                <button disabled={page <= 1} onClick={()=>setPage(prev=>prev -1)}>قبلی</button>
                <button disabled={page > 24} onClick={()=>setPage(prev=>prev +1)}>بعدی</button>
            </div>
            <div className='buttonBox' onClick={()=>setFlagScore(true)}>
                    <button>پایان آزمون</button>
            </div>

        </div>

        <div className={flafScore ? 'table' : 'noneDisplay'}>
          
           <div className='thBox'>
              <div className='div'>پاسخ درست</div>
              <div className='div2'>پاسخ نادرست</div>
              <div className='div'>بدون پاسخ</div>
           </div>
           <div className='tdBox'>
              <div className='correct'>{correct}</div>
              <div className='wrong'>{wrong}</div>
              <div className='empty'>{25 - (correct + wrong)}</div>
           </div>
           <div className='totalScore'>
              <div className={correct * 4 > 70 ? 'greenColor' : 'redColor'}>نمره شما : {correct * 4}</div>
           </div>

        </div>
    </>
  )
}
