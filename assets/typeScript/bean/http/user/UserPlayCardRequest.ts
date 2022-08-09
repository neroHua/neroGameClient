export default class UserPlayCardRequest {

  /**
   * 客户端需要根据牌型把本字段格式化并排序降低服务器计算压力
   *
   * 比如
   *  顺子：7, 6, 5, 4, 3
   *  对子：5，5, 4, 4, 3, 3
   *  三带一: 3, 3, 3, 2
   *  三带对: 3, 3, 3, 2, 2
   *  飞机带单: 4, 4, 4, 3, 3, 3, 2, 1
   *  飞机带对: 4, 4, 4, 3, 3, 3, 2, 2, 1, 1
   *  王炸：大王, 小王
   *
   */
  private cardEnumerationList : Array<string>;

  private  playCardTypeEnumeration : string;

  constructor(cardEnumerationList : Array<string>, playCardTypeEnumeration : string) {
    this.cardEnumerationList = cardEnumerationList;
    this.playCardTypeEnumeration = playCardTypeEnumeration;
  }

}
