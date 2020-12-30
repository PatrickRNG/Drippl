const { CronJob } = require('cron');
const { notificationMessages } = require('./constants');

const startNotification = (time, notification, hardcore) => {
  return new CronJob(
    time,
    () => {
      const notificationMessage =
        notificationMessages[
          Math.floor(Math.random() * notificationMessages.length)
        ];
      // eslint-disable-next-line no-param-reassign
      notification.body = notificationMessage;
      notification.show();
    },
    null,
    false
  );
};

module.exports = {
  startNotification,
};
