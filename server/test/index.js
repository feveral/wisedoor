before( async () => {
  //await require('../database/InitialDatabase')()
  //console.log(await require('../database/database').query('select * from EQUIPMENT;'))
})

after(async () => {
  //await require('../database/InitialDatabase')()
  require('../database/database').end()
})