const fakeMessages = {
  id: 1,
  createdOn: '10/12/2018',
  subject: 'Greetings',
  message: 'hello my friend',
  parentMessageId: 1,
  receiver: 1,
  status: 'sent'
};

const fakeMessages2 = {
  subject: 'Greetings',
  message: 'hello my friend',
  parentMessageId: 1,
  receiver: 1,
  status: 'sent'
};
const fakeMessages3 = {
  subject: 'Greetings',
  Message: 'hello my friend',
  status: 'sent'
};

const fakeUsers = {
  email: 'murediana@gmail.com',
  firstName: 'Gloria',
  lastName: 'atete',
  password: 'Diane123',
  role: 'Groupadmin'
};
const fakeUsers2 = {
  email: 'murediana@gmail.com',
  firstName: 'Gloria',
  password: 'Diane123'
};
const fakeLogin = {
  email: 'murediana@gmail.com',
  password: 'Diane123'
};
const fakeLogin2 = {
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
