import * as API from '../API'
import React, { useEffect, useState } from 'react'

function CardDetails({listId}) {
  
  let [card,setCard] = useState({
       cards : [],
       hasError : false,
       cardName : ""
  })

  useEffect(() => {
    API.getCard(listId)
    .then(card => {
        setCard({
            cards:card
        });
    }).catch((err) => console.log(err))
  })
  
  return (
    <div>
      {
        card.cards.map((card) => {

        })
      }
    </div>
  )
}

export default CardDetails
