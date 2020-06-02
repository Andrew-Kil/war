import React, { useState } from "react";

import {
  createDeck,
  shuffleDeck,
  splitDeck,
  drawCard,
  compareCards,
} from "../../utils/deck";

const Game = () => {
  const [gameStatus, setGameStatus] = useState({
    cardsDealt: false,
    isGameInProgress: false,
  });
  const [playerOneCards, setPlayerOneCards] = useState({
    deck: [],
    discardPile: [],
  });
  const [playerTwoCards, setPlayerTwoCards] = useState({
    deck: [],
    discardPile: [],
  });

  let newDeck = null;

  const dealDeck = () => {
    newDeck = splitDeck(shuffleDeck(createDeck()));
    console.log(newDeck);
    setGameStatus({ ...gameStatus, cardsDealt: true });
    setPlayerOneCards({
      ...playerOneCards,
      deck: newDeck[0],
    });
    setPlayerTwoCards({
      ...playerTwoCards,
      deck: newDeck[1],
    });
  };

  const handleDrawCard = (playerOneCards, playerTwoCards) => {
    setPlayerOneCards({
      ...playerOneCards,
      deck: drawCard(playerOneCards.deck),
    });
    setPlayerTwoCards({
      ...playerTwoCards,
      deck: drawCard(playerTwoCards.deck),
    });
    setGameStatus({ ...gameStatus, isGameInProgress: true });
  };

  const checkDeckAndDiscardPile = (playerCards, setPlayerCards) => {
    if (isEmpty(playerCards.deck)) {
      if (isEmpty(playerCards.discardPile)) {
        // game over
        setGameStatus({ ...gameStatus, isGameInProgress: false });
        console.log("GAME OVER");
      } else {
        // shuffle discard and move to deck
        setPlayerCards({
          ...playerCards,
          deck: shuffleDeck(playerCards.discardPile),
          discardPile: null,
        });
      }
    }
  };

  const handleTurn = () => {
    handleDrawCard(playerOneCards, playerTwoCards);

    console.log("playerOne card: ", playerOneCards.deck[0].rank);
    console.log("playerTwo card: ", playerTwoCards.deck[0].rank);

    if (
      compareCards(playerOneCards.deck[0], playerTwoCards.deck[0]) ===
      "PLAYER_ONE"
    ) {
      console.log("PLAYER ONE WINS ROUND");
      // remove current card from playerTwo
      // add both cards to playerTwo discard pile
      setPlayerTwoCards({
        ...playerTwoCards,
        deck: [...playerTwoCards.deck.slice(1)],
      });
      setPlayerOneCards({
        ...playerOneCards,
        deck: [...playerOneCards.deck.slice(1)],
        discardPile: [
          ...playerOneCards.discardPile,
          playerOneCards.deck[0],
          playerTwoCards.deck[0],
        ],
      });
    } else if (
      compareCards(playerOneCards.deck[0], playerTwoCards.deck[0]) ===
      "PLAYER_TWO"
    ) {
      console.log("PLAYER TWO WINS ROUND");
      // remove current card from playerTwo
      // add both cards to playerTwo discard pile
      setPlayerOneCards({
        ...playerOneCards,
        deck: [...playerOneCards.deck.slice(1)],
      });
      setPlayerTwoCards({
        ...playerTwoCards,
        deck: [...playerTwoCards.deck.slice(1)],
        discardPile: [
          ...playerTwoCards.discardPile,
          playerTwoCards.deck[0],
          playerOneCards.deck[0],
        ],
      });
    } else {
      // WAR
    }

    checkDeckAndDiscardPile(playerOneCards, setPlayerOneCards);
    checkDeckAndDiscardPile(playerTwoCards, setPlayerTwoCards);
  };

  const isEmpty = (cards) => (cards.length === 0 ? true : false);

  console.log(playerOneCards);
  console.log(playerTwoCards);

  return (
    <>
      <h1>Game</h1>

      {gameStatus.cardsDealt ? (
        <button onClick={() => handleTurn()}>Draw</button>
      ) : (
        <button onClick={() => dealDeck()}>Deal</button>
      )}

      {!!(playerOneCards.deck.length + playerOneCards.discardPile.length) && (
        <>
          <h3>Player One</h3>
          <div>
            Current Card: {playerOneCards.deck[0].rank} of{" "}
            {playerOneCards.deck[0].suit}
          </div>
          <div>
            Number of Cards:{" "}
            {playerOneCards.deck.length + playerOneCards.discardPile.length}
          </div>
        </>
      )}

      {!!(playerTwoCards.deck.length + playerTwoCards.discardPile.length) && (
        <>
          <h3>Player Two</h3>
          <div>
            Current Card: {playerTwoCards.deck[0].rank} of{" "}
            {playerTwoCards.deck[0].suit}
          </div>
          <div>
            Number of Cards:{" "}
            {playerTwoCards.deck.length + playerTwoCards.discardPile.length}
          </div>
        </>
      )}
    </>
  );
};

export default Game;
