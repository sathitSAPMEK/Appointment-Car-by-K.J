import { format, add } from 'date-fns'

const dateFormat = (type, formatDate) => {
  switch (type) {
    case 'dateFormat':
      return format(Date.now(), formatDate)
    case 'add':
      return format(Date.now(), formatDate)
    case 'del':
      return format(Date.now(), formatDate)
    default:
      return 'None Type Please Check Again'
  }
}

export default dateFormat
