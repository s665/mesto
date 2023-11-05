export enum MessageEnum {
  clientNotFound = 'clientNotFound',
  cardNotFound = 'cardNotFound',
  createUserValidation = 'createUserValidation',
  updateUserValidation = 'updateUserValidation',
  updateAvatarUserValidation = 'updateAvatarUserValidation',
  createCardValidation = 'createCardValidation',
  deleteCardValidation = 'deleteCardValidation',
  likeCardValidation = 'likeCardValidation',
  duplicateUser = 'duplicateUser',
  invalidUserData = 'invalidUserData',
  invalidEmail = 'invalidEmail',
  invalidUrl = 'invalidUrl',
  authError = 'authError'
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
  [MessageEnum.duplicateUser]: 'Пользователь с таким email уже существует',
  [MessageEnum.invalidEmail]: 'Ввели некорректный email',
  [MessageEnum.invalidUrl]: 'Ввели некорректный URL адрес',
  [MessageEnum.invalidUserData]: 'Неправильные почта или пароль',
  [MessageEnum.authError]: 'Необходима авторизация',
};

export default errorMessages;
