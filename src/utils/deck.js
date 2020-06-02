const SUITS = ["D", "C", "H", "S"];

const RANKS = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
  "A",
];

export const createDeck = () =>
  RANKS.reduce(
    (acc, rank) => [
      ...acc,
      ...SUITS.map((suit) => ({ rank, suit, faceUp: false })),
    ],
    []
  );

export const shuffleDeck = (deck) => {
  for (let i = deck.length; i; i--) {
    let j = Math.floor(Math.random() * i);
    [deck[i - 1], deck[j]] = [deck[j], deck[i - 1]];
  }
  return deck;
};

export const splitDeck = (deck) => [
  [...deck.slice(0, 26)],
  [...deck.slice(26, 52)],
];

export const drawCard = (deck) => deck.slice(1);

export const compareCards = (playerOneCard, playerTwoCard) => {
  if (RANKS.indexOf(playerOneCard.rank) > RANKS.indexOf(playerTwoCard.rank)) {
    return "PLAYER_ONE";
  } else if (
    RANKS.indexOf(playerOneCard.rank) < RANKS.indexOf(playerTwoCard.rank)
  ) {
    return "PLAYER_TWO";
  } else {
    return "WAR";
  }
};
