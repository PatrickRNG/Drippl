const { CronJob } = require('cron');

const startNotification = (time, notification) => {
  return new CronJob(time, () => notification.show(), null, false);
};

module.exports = {
  startNotification,
};
