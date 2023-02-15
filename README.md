# Docker 설치 방법
## Mac OS 
- 인터넷에 Docker Desktop 설치 치고 다운받으면 끝

## Window OS
- 윈도우는 Mac과 달리 좀 복잡함. 그렇기 때문에 약간의 인내심이 필요

- https://goddaehee.tistory.com/251
- 위의 경로에 나와있는 절차대로 시행하면 된다.

## 주의점
- Docker Desktop 자체에 PC에 부하가 많이 되는 작업이므로, 안쓸때는 바로 꺼야한다.
- db상의 오류가 난다면 data파일자체를 삭제하고 다시 해보는것을 추천한다.(db관련을 해도 data에 반영이 되지 않으니 한번삭제한 후 다시 돌리면 적용된 data파일이 생성된다.)

# local Test
- 현재 Local 에서 소스 코드가 바뀌게 되면 바로 update image는 구현 못함 곧 할 예정

## 프로젝트 올리기
1. 터미널을 킨다.
2. 컴퓨터 절대 경로를 /HomePage_V2 로 맞춘다.
3. Docker가 켜져 있는지 확인 한다.
4. project를 start하고 싶다면, 터미널에 아래와 같이 입력하면 된다.

```bash
sh start-project.sh
# 또는
./start-project.sh
```
- 위 명령어 둘다 먹지 않는다면, start-project.sh에 있는 명령어 복사 붙여넣기 해서 사용하면 된다.

Ex)
```bash
docker-compose up -d 
```

## 프로젝트 끄기
1. 위와 동일
2. 위와 동일
3. 위와 동일
4. project를 stop하고 싶다면, 터미널에 아래와 같이 입력하면 된다.
```bash
sh stop-project.sh
# 또는
./stop-project.sh
```
- 위 명령어 둘다 먹지 않는다면, stop-project.sh에 있는 명령어 복사 붙여넣기 해서 사용하면 된다.
    - 당연하겠지만, **순서대로 해야한다.**

## 프로젝트 업데이트 할 때(추후 변경 예정, 지금 기준)

1. 위와 동일
2. 위와 동일
3. 위와 동일
4. project를 update하고 싶다면, 터미널에 아래와 같이 입력하면 된다.
```bash
sh update-project.sh
# 또는
./update-project.sh
```
- 위 명령어 둘다 먹지 않는다면, update-project.sh에 있는 명령어 복사 붙여넣기 해서 사용하면 된다.
    - 당연하겠지만, **순서대로 해야한다.**
