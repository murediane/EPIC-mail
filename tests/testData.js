const fakeMessages = {
  id: 1,
  createdOn: '10/12/2018',
  subject: 'Greetings',
  message: 'hello my friend',
  parentMessageId: 1,
  status: 'sent'
};

const fakeMessages2 = {
  subject: 'Greetings',
  newMessage: 'hello my friend',
  parentId: 1,
  status: 'sent'
};
const fakeMessages3 = {
  subject: 'Greetings',
  newMessage: 'hello my friend',
  status: 'sent'
};

const fakeUsers = {
  email: 'murediana@gmail.com',
  firstName: 'Gloria',
  lastName: 'atete',
  password: 'diane123'
};
const fakeUsers2 = {
  email: 'murediana@gmail.com',
  firstName: 'Gloria',
  password: 'diane123'
};
const fakeLogin = {
  email: 'murediana@gmail.com',
  password: 'diane123'
};
const fakeLogin2 = {
  email: 'murediana@gmail.com',
  password: 'diane123',
  firstName: 'Gloria'
};
export {
  fakeMessages,
  fakeMessages2,
  fakeUsers,
  fakeLogin,
  fakeMessages3,
  fakeUsers2,
  fakeLogin2
};
