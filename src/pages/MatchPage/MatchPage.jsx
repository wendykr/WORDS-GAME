import React from 'react';
import './MatchPage.scss';
import { Pair } from '../../components/Pair/Pair';
import { wordData } from '../../constants/words';


export const MatchPage = () => {
  return (
    <main className="match">
      <div className="match__body">
        <Pair key={wordData[0].id} czWord={wordData[0].czWord} word={wordData[0].word} />
      {/* {
        wordData.map(({ czWord, word, id }) => (
          <Pair key={id} czWord={czWord} word={word} />
        ))
      } */}
      </div>
    </main>
  )
}