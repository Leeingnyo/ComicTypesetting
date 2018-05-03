# 식질 자동화 프로그램

을 만들고 싶은 프로젝트.

## 상상

```
./comic-typesetting image.png --from ja --to ko -O out.json
```

위를 입력하면 프로그램이

* 만화 이미지로부터
* 말풍선 감지하고 (말풍선 위치, 말풍선 크기, 말풍선 색깔, 말풍선 모양(?))
* 말풍선 내부의 글자 뽑아내고 (일본어 OCR 사용)
* 뽑아낸 글자 번역 API로 번역해서 ex) 일본어 -> 한국어
* 말풍선과 번역된 내용을 정해진 json으로 txt 파일에 저장한다.

```
./ct2wvct out.json # 작명은 무시
```

* 위에서 만든 json 형식의 파일을 web viewer page에서 쓰일 수 있도록 변환한다 (말풍선 정보 등이 CSS로 표현되게).

[말풍선 정보 CSS 문서](./bubble-doc.md)

웹에서 쓰이게 변환하는데 빠진 정보(말풍선 색깔)나 위치 조정 등 세부 사항 조정(말풍선 위치, 텍스트 수정)을 위한 웹 에디터를 만든다.

* 말풍선 위치, 크기, 회전 조정 가능
* 말풍선 텍스트 수정 (미리보기 하면서)
* 말풍선 텍스트 꾸미기 효과 (text-border 등) 제공
* 말풍선 gradient 배경색 지원

만든 것을 viewer로 본다.

## 필요한 단계

* 말풍선을 감지하자
* 글자를 감지하자
* 적당한 OCR을 찾아서 API를 날리자
* 받아온 글자를 번역 API로 날리자
* 저장할 형식을 정한다
* 번역에 쓰일 형식을 정한다
* 세부사항 수정할 에디터를 만든다
* 뷰어를 만든다

2018.05.04
