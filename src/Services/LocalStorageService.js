export default class LocalStorageService {

  static getFromLocalStorage(item) {
    return JSON.parse(localStorage.getItem(item)) || [];
  };

  static setLocalStorage(item, data){
    return localStorage.setItem(item, JSON.stringify(data))
  }
  static removeItemFromLocalStorage(item){
    localStorage.removeItem(item);
  }
}
