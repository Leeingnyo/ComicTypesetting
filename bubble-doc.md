[상위 문서로](./README.md)

웹 뷰어를 위한 말풍선 하나의 json 구조는 다음과 같다.

예시로 그냥 설명한다.

```javascript
{
  "type":"serifu", /* 말풍선 타입. 타입으론  대사랑 효과음이 있는데, 지금 viewer엔 필요 없다. */
  "speaker":["chihiro"], /* 대사를 하는 사람. 말풍선 타입이 대사일 때 있어야 함. 지금은 무시 가능 */
  "style": {
      /* 해당 말풍선에 적용될 CSS property와 value.
        모두 string이며, key가 property name이고, value가 property value다.
      */
    "top":"19.6%",
    "left":"85.8%",
    "height":"43.2%",
    "width":"10.9%", /* 말풍선의 위치 정보 토대로 */
    "z-index":"2147483647", /* 말풍선 순서 */
    "background-color":"rgb(223, 251, 213)", /* 말풍선 색깔 */
    "border":"none", /* default */
    "text-align":"center", /* 말풍선의 텍스트 정렬*/
    "padding":"0",
    "border-radius":"1em 0 0 1em" /* 말풍선 모양. 세부에서 해결해야할 듯 */
  },
  "text":"자 여러분 좋은 얼굴로~♪" /* 말풍선 텍스트. */
}
```
