const { CronJob } = require('cron');
const {
  notificationMessages,
  hardcoreNotificationMessages,
} = require('./constants');

const startNotification = (time, notification, hardcore) => {
  return new CronJob(
    time,
    () => {
      const messageList = hardcore
        ? hardcoreNotificationMessages
        : notificationMessages;
      const notificationMessage =
        messageList[Math.floor(Math.random() * messageList.length)];
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
