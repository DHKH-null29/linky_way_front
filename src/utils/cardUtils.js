export const makeCardFromRequest = (cardId, { body }) => {
  const newCard = (({ title, content, isPublic, link }) => ({
    title,
    content,
    isPublic,
    link,
  }))(body);
  newCard.tags = body.tagIdSet.map(id => (id = { tagId: id }));
  newCard.cardId = cardId;
  return newCard;
};
