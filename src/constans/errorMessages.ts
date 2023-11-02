export enum MessageEnum {
  clientNotFound = 'clientNotFound',
  cardNotFound = 'cardNotFound',
  createUserValidation = 'createUserValidation',
  updateUserValidation = 'updateUserValidation',
  updateAvatarUserValidation = 'updateAvatarUserValidation',
  createCardValidation = 'createCardValidation',
  deleteCardValidation = 'deleteCardValidation',
  likeCardValidation = 'likeCardValidation'
}

const errorMessages: Record<MessageEnum, string> = {
  [MessageEnum.clientNotFound]: 'Пользователь по указанному _id не найден',
  [MessageEnum.cardNotFound]: 'Карточка с указанным _id не найдена',
  [MessageEnum.createUserValidation]: 'Переданы некорректные данные при создании пользователя',
  [MessageEnum.updateUserValidation]: 'Переданы некорректные данные при обновлении профиля',
  [MessageEnum.updateAvatarUserValidation]: 'Переданы некорректные данные при обновлении аватара',
  [MessageEnum.createCardValidation]: 'Переданы некорректные данные при создании карточки',
  [MessageEnum.deleteCardValidation]: 'Карточка с указанным _id не найдена',
  [MessageEnum.likeCardValidation]: 'Передан несуществующий _id карточки',
};

export default errorMessages;
