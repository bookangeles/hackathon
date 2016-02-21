// module.exports = function(app) {
//   if (process.env.NODE_ENV === 'production') return;

//   var Client = app.models.Client
//     , Book = app.models.Book
//     , Tag = app.models.Tag
//     , colors = require('colors')
//     , mockUsers = [
//       { displayName: 'User One', email: 'user@one.com', password: 'sesame' },
//       { displayName: 'User Zwei', email: 'user@two.com', password: 'sesame' },
//       { displayName: 'User Tři', email: 'user@three.com', password: 'sesame' },
//       { displayName: 'User Четыре', email: 'user@four.com', password: 'sesame' }
//     ]


//   Client.create(mockUsers, function (err, res) {
//     if (err) console.log('failed to create mock users'.yellow.bgBlack)
//     createTags(res)
//   })

//   function createTags(users) {
//     Tag.create([
//       { caption: 'rocketscience', owner: users[0].id, color: 'green' },
//       { caption: 'software', owner: users[0].id, color: 'blue' },
//       { caption: 'romace', owner: users[0].id, color: 'grey' },
//       { caption: 'short', owner: users[1].id, color: 'red' }
//     ], function (err, res) {
//       if (err) return console.log(err)
//       createBooks(users, res)
//     })
//   }

//   function createBooks(users, tags) {
//       Book.create([
//         {
//           owner: users[0].id,
//           fileName: 'diploma.pdf',
//           fileFormat: 'pdf',
//           fileUrl: 'http://google.com/',
//           "title": "Diploma",
//           "author": "me",
//           "tags": [ tags[0].id ]
//         },
//         {
//           "owner": users[0].id,
//           "fileName": "Impact Mapping",
//           "fileFormat": "pdf",
//           "fileUrl": 'http://google.com/',
//           "title": "Impact Mapping: Making a big impact with software products and projets",
//           "author": "Gijko Adzic",
//           "tags": [ tags[0].id, tags[1].id ],
//           "note": "proto card"
//         },
//         {
//           owner: users[0].id,
//           fileName: 'Honigtot.mobi',
//           fileFormat: 'mobi',
//           fileUrl: 'http://google.com/',
//           "title": "Honigtot: Roman (Honigtot-Saga 1)",
//           "author": "Hanni Munzer",
//           "note": "Wie weit geht eine Mutter, um ihre Kinder zu retten? Wie weit geht eine Tochter, um ihren Vater zu rächen? Wie kann eine tiefe, alles verzehrende Liebe die Generationen überdauern und alte Wunden heilen? Als sich die junge Felicity auf die Suche nach ihrer Mutter macht, stößt...",
//           "tags": [ tags[2].id ] //romance
//         },
//         {
//           "owner": users[0].id,
//           "fileName": "liebeaufreisen.pdf",
//           "fileFormat": "pdf",
//           "fileUrl": 'http://google.com/',
//           "title": "Liebe auf Reisen",
//           "author": "Gijko Adzic",
//           "note": "by Martina Gerck"
//         },
//         {
//           owner: users[0].id,
//           fileName: 'cf.mobi',
//           fileFormat: 'mobi',
//           fileUrl: 'http://google.com/',
//           "title": "Colour Fairies - Go Go's Flying Lesson (English Edition)",
//           "author": "Gail Skroback Hennessey"
//         },
//         {
//           owner: users[0].id,
//           fileName: 'cf.mobi',
//           fileFormat: 'mobi',
//           fileUrl: 'http://google.com/',
//           "title": "Old Fritz and the New Era",
//           "author": "L. Mühlbach"
//         }
//         // // user 2
//         // {
//         //   owner: 2,
//         //   fileName: 'wbba.mobi',
//         //   fileFormat: 'mobi',
//         //   fileUrl: 'http://google.com/',
//         //   title: "When Breath Becomes Air",
//         //   author: "Paul Kalanithi",
//         //   tags: [ 4 ]
//         // },
//         // {
//         //   owner: 2,
//         //   fileName: ' Oliver_Sacks_Gratitude.mobi',
//         //   fileFormat: 'mobi',
//         //   fileUrl: 'http://google.com/',
//         //   "title": "Gratitude",
//         //   "author": " Oliver Sacks"
//         // },
//         // {
//         //   owner: 2,
//         //   fileName: 'mynameis.pdf',
//         //   fileFormat: 'pdf',
//         //   fileUrl: 'http://google.com/',
//         //   "title": "My Name Is Lucy Barton: A Novel",
//         //   "author": "Elizabeth Strout"
//         // },
//         // // user 3
//         // {
//         //   owner: 3,
//         //   fileName: 'The_Swans_of_Fifth_Avenue.mobi',
//         //   fileFormat: 'mobi',
//         //   fileUrl: 'http://google.com/',
//         //   title: "The Swans of Fifth Avenue: A Novel",
//         //   author: "Melanie Benjamin"
//         // }
//       ], function (err, res) {
//         if (err) console.log(err)
//         console.log(`Mockup: ${res.length} mock books created`.yellow.bgBlack)
//       })
//   }


// // require('request')(
// //   { method: 'POST', url: 'http://0.0.0.0:3000/api/clients/login', json: true, body: user },
// //   (err, res, body) => console.log(`Mockup: access_token for ${user.email} is ${body.id}`.yellow.bgBlack)
// // )
// }

// var colors = require('colors');
// [
//   { displayName: 'User One', email: 'user@one.com', password: 'sesame' },
//   { displayName: 'User Zwei', email: 'user@two.com', password: 'sesame' },
//   { displayName: 'User Tři', email: 'user@three.com', password: 'sesame' },
//   { displayName: 'User Четыре', email: 'user@four.com', password: 'sesame' }
// ].forEach(
//   function(user) {
//     require('request')(
//       { method: 'POST', url: 'http://0.0.0.0:3000/api/clients/login', json: true, body: user },
//       (err, res, body) => console.log(`Mockup: access_token for ${user.email} is ${body.id}`.yellow.bgBlack)
//     )
//   }
// )
