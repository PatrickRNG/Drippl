const { CronJob } = require('cron');
const notifier = require('node-notifier');

const createNotification = (time, notification) => {
  return new CronJob(
    time,
    () => {
      notifier.notify(notification);
    },
    null,
    false
  );
};

module.exports = {
  createNotification,
};
