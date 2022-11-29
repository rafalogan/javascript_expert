import NotificationContext from "./util/notificationContext.js";

export default class HeeroEntity extends NotificationContext {
  constructor({ name, age }) {
    super();

    this.name = name;
    this.age = age;
  }

  isValid() {
    if (this.age < 20) this.addNotification('age must be higher then 20!');
    if (this.name?.length < 4) this.addNotification('Name length most be higher then 4!');

    return !this.hasNotifications();
  }
}
