export const makeCardFromRequest = (cardId, { body }) => {
  const newCard = (({ title, content, shareable, link }) => ({
    title,
    content,
    shareable,
    link,
  }))(body);
  newCard.tags = body.tagIdSet.map(id => (id = { tagId: id }));
  newCard.cardId = cardId;
  return newCard;
};
