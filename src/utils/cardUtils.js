export const makeCardFromRequest = (cardId, { body }) => {
  const newCard = (({ title, content, shareable, link }) => ({ title, content, shareable, link }))(
    body,
  );
  newCard.cardId = cardId;
  return newCard;
};
