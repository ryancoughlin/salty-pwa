import moment from 'moment';

const shortTimeFormat = time => moment(time).format('h:mma');
export default shortTimeFormat;
