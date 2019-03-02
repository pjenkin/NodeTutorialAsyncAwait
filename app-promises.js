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

const grades = [
  {
    id: 1,
    schoolId: 101,
    grade: 86,
  },
  {
    id: 2,
    schoolId: 999,
    grade: 100,
  },
  {
    id: 3,
    schoolId: 101,
    grade: 80,
  }
];

/// search for a specific user by id
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

const getGrades = (schoolId) => {
  return new Promise((resolve, reject) =>
  {
    resolve(grades.filter((grade) => grade.schoolId === schoolId))
  });
};

// calculate for to return string '[name] has a [x]% average in the class'
const getStatus = (userId) =>
{
  let user;     // just declare (undefined for now) with scope over any following promise/then
  //  get the user (in promise), and then when ready (in promise) use the gotten user object's schoolId property to getGrades, then do calculations on same
  return getUser(userId)
  // .then((user) =>
  .then((tempUser) =>
  {
    user = tempUser;      // assign user value to in-scope enclosing variable
// console.log('user: ', user)
    return getGrades(user.schoolId);
  }).then((grades) =>
  {
    let average = 0;
// console.log('got here');
// console.log('grades: ', grades);

    if (grades.length > 0)
    {
      average = grades.map((grade) => grade.grade).reduce((a, b) => a + b) / grades.length;
      // array.reduce d'reduce array to a single value,
      // executing a function on array members in turn left-to-right
      // (e.g. for summing array contents (eg 1 field/property), before division by length for to average)
// console.log('average: ', average);
      return `${user.name} has a ${average}% in the class (non-async/await)`;
    }
  });
};

/// using async/await, calculate for to return string '[name] has a [x]% average in the class'
const getStatusAlt = async (userId) =>
{
  const user = await getUser(userId);
  // async/await will enable writing code in synchronous-like form, without then &c callbacks
  const grades = await getGrades(user.schoolId);
  let average = 0;
  average = grades.map((grade) => grade.grade).reduce((a, b) => a + b) / grades.length;
  return `${user.name} has a ${average}% in the class (async/await)`;

  console.log('user & grades: ', user, grades);
  return 'Mike';
};

/*  -----------------------------------------------------
//-----------------Exposition----------------------------
-------------------------------------------------------*/

getUser(2).then((user) =>
{
  console.log(user);
}).catch((error) => {console.log(error)});


getGrades(999).then((grades) =>
{
  console.log(grades);
}).catch((error) => {console.log(error)});

getStatus(1).then((status) =>
{
  console.log(status);
}).catch((error) => {console.log(error)});

getStatusAlt(1).then((status) =>
{
  console.log(status);
}).catch((error) => {console.log(error)});
