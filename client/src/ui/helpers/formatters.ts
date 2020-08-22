import moment from 'moment'

export const formatDateToLocalTimezone = (mongoDate: string) => {
  var date = moment(mongoDate).format('YYYY-MM-DD HH:mm:ss')
  var stillUtc = moment.utc(date).toDate()
  return moment(stillUtc).local().format('YYYY-MM-DD HH:mm')
}

export const formatTweetTime = (mongoDate: string) => {
  //const timestamp = parseInt(moment(new Date(mongoDate)).format('x'))
  //const timeFromNow = moment.duration(moment().diff(timestamp))
  //   if (timeFromNow.asHours() > 24) {
  //     return moment(new Date(mongoDate)).format('DD MMMM YYYY')
  //   }
  return moment(new Date(mongoDate)).fromNow()
}
