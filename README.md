# 2023. 03. 20 (월) 작업내용

## 1. server 로부터 axios 로 받은 이미지 state 로 저장

axios 로 useEffect 함수내에서 이미지를 가져올 때는 async/await 처리를 해 줘야 한다. 그렇지 않으면 then 구문으로 state에 데이터를 저장 할 수 없다.

## 2. 받은 데이터 useLayoutEffect 함수로 렌더링 처리

처음에는 useEffect 내부에서 이미지를 렌더링 처리 했더니 원하는 타이밍에 렌더링이 되지 않아서 애를 먹었다. 그렇다고 받은 데이터를 ref 에 렌더링 한 후 ref 를 useEffect 의 리렌더링 조건에 넣으니 무한 리로딩 문제가 발생한다.

따라서 useLayoutEffect 함수에 리렌더링 조건에 ref 변수를 넣고 리렌더링 처리를 하니 문제가 해결되었다. 

useLayoutEffect는 정확하게 어떨 때 쓰는 함수 일까? 확인해봐야 할것 같다.

