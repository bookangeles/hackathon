module.exports = function(app) {
  var Client = app.models.Client;
  var Book = app.models.Book;
  var Tag = app.models.Tag;

  Client.create([
    { displayName: 'User One', email: 'user@one.com', password: 'sesame' },
    { displayName: 'User Zwei', email: 'user@two.com', password: 'sesame' },
    { displayName: 'User Tři', email: 'user@three.com', password: 'sesame' },
    { displayName: 'User Четыре', email: 'user@four.com', password: 'sesame' }
  ], function (err, res) {
    if (err) throw new Erro('mockups insertion fail')
    console.log(`Mockup: ${res.length} mock users created`)
  })

  Tag.create([
    { caption: 'rocketscience', owner: 1, color: 'green' },
    { caption: 'software', owner: 1, color: 'blue' },
    { caption: 'romace', owner: 1, color: 'grey' },
    { caption: 'short', owner: 2, color: 'red' }
  ], function (err, res) {
    if (err) throw new Erro('mockups insertion fail')
    console.log(`Mockup: ${res.length} mock tags created`)
  })

  Book.create([
    // user 1
    {
      owner: 1,
      fileName: 'diploma.pdf',
      fileFormat: 'pdf',
      fileUrl: 'http://google.com/',
      "title": "Diploma",
      "author": "me",
      "tags": [ 1 ] //rocketscience
    },
    {
      "owner": 1,
      "fileName": "Impact Mapping",
      "fileFormat": "pdf",
      "fileUrl": 'http://google.com/',
      "title": "Impact Mapping: Making a big impact with software products and projets",
      "author": "Gijko Adzic",
      "tags": [ 1, 2 ], //rocketscience software
      "note": "proto card"
    },
    {
      owner: 1,
      fileName: 'Honigtot.mobi',
      fileFormat: 'mobi',
      fileUrl: 'http://google.com/',
      "title": "Honigtot: Roman (Honigtot-Saga 1)",
      "author": "Hanni Munzer",
      "note": "Wie weit geht eine Mutter, um ihre Kinder zu retten? Wie weit geht eine Tochter, um ihren Vater zu rächen? Wie kann eine tiefe, alles verzehrende Liebe die Generationen überdauern und alte Wunden heilen? Als sich die junge Felicity auf die Suche nach ihrer Mutter macht, stößt...",
      "tags": [ 3 ] //romance
    },
    {
      "owner": 1,
      "fileName": "liebeaufreisen.pdf",
      "fileFormat": "pdf",
      "fileUrl": 'http://google.com/',
      "title": "Liebe auf Reisen",
      "author": "Gijko Adzic",
      "note": "by Martina Gerck"
    },
    {
      owner: 1,
      fileName: 'cf.mobi',
      fileFormat: 'mobi',
      fileUrl: 'http://google.com/',
      "title": "Colour Fairies - Go Go's Flying Lesson (English Edition)",
      "author": "Gail Skroback Hennessey"
    },
    {
      owner: 1,
      fileName: 'cf.mobi',
      fileFormat: 'mobi',
      fileUrl: 'http://google.com/',
      "title": "Old Fritz and the New Era",
      "author": "L. Mühlbach"
    },
    // user 2
    {
      owner: 2,
      fileName: 'wbba.mobi',
      fileFormat: 'mobi',
      fileUrl: 'http://google.com/',
      title: "When Breath Becomes Air",
      author: "Paul Kalanithi",
      tags: [ 4 ]
    },
    {
      owner: 2,
      fileName: ' Oliver_Sacks_Gratitude.mobi',
      fileFormat: 'mobi',
      fileUrl: 'http://google.com/',
      "title": "Gratitude",
      "author": " Oliver Sacks"
    },
    {
      owner: 2,
      fileName: 'mynameis.pdf',
      fileFormat: 'pdf',
      fileUrl: 'http://google.com/',
      "title": "My Name Is Lucy Barton: A Novel",
      "author": "Elizabeth Strout"
    },
    // user 3
    {
      owner: 3,
      fileName: 'The_Swans_of_Fifth_Avenue.mobi',
      fileFormat: 'mobi',
      fileUrl: 'http://google.com/',
      title: "The Swans of Fifth Avenue: A Novel",
      author: "Melanie Benjamin"
    }
  ], function (err, res) {
    if (err) throw new Erro('mockups insertion fail')
    console.log(`Mockup: ${res.length} mock books created`)
  })
};
