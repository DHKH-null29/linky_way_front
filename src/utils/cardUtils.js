export const makeCardFromRequest = (cardId, { body }) => {
  const newCard = (({ title, content, isPublic, link, createdAt, modifiedAt, deletedAt }) => ({
    title,
    content,
    isPublic,
    link,
    createdAt,
    modifiedAt,
    deletedAt,
  }))(body);
  newCard.tags = body.tagIdSet.map(id => (id = { tagId: id }));
  newCard.cardId = cardId;
  return newCard;
};
