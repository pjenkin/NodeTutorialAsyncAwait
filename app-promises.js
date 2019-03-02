// imitation of db
const users = [
  {
    id: 1,
    name: 'Mike',
    schoolId: 101
  },
  {
    id: 2,
    name: 'Andrew',
    schoolId: 999
  }
];

const grades = [];

const getUser = (id) =>
{
  return new Promise((resolve, reject) =>
  {
    const user = users.find((user) => user.id === id);

    if (user)
    {
      resolve(user);
    }
    else
    {
      reject(`Unable to find user with id of ${id}.`);
    }

    // const user = users.find((user) =>
    // {
    //   return user.id === id;
    // });
  });
};

getUser(2).then((user)=>
{
  console.log(user);
}).catch((error) => {console.log(error)});
