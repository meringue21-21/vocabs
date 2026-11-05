# 단끼리 — 내 주소로 올리기 (GitHub Pages) + 폰·컴퓨터 동기화 (Firebase)

## A. GitHub Pages로 올리기 (5분)
1. github.com 로그인 → 오른쪽 위 `+` → **New repository**
   - 이름: `danyeo` (아무거나) / **Public** / Create repository
2. 만들어진 저장소 화면에서 **uploading an existing file** 클릭
3. 이 폴더의 파일 5개(`index.html`, `manifest.webmanifest`, `sw.js`, `icon-192.png`, `icon-512.png`)를 끌어다 놓고 **Commit changes**
   (폴더째가 아니라 파일 5개를 저장소 맨 위에 올려야 해요)
4. 저장소 **Settings → Pages** → Source: `Deploy from a branch` → Branch: `main` / `/ (root)` → Save
5. 1~2분 뒤 `https://내아이디.github.io/danyeo/` 주소가 열려요. 이 주소가 앱 주소예요.
6. 폰에서 그 주소를 열고 **홈 화면에 추가** (아이폰: Safari 공유 버튼 → 홈 화면에 추가 / 안드로이드: Chrome 메뉴 → 홈 화면에 추가 또는 앱 설치)

## B. Firebase 만들기 (동기화용, 무료 Spark 요금제)
1. console.firebase.google.com → 구글 로그인 → **프로젝트 추가** (이름 아무거나, 애널리틱스는 꺼도 돼요)
2. **빌드 → Authentication → 시작하기 → 로그인 방법 → 이메일/비밀번호 → 사용 설정 → 저장**
3. **빌드 → Firestore Database → 데이터베이스 만들기** → 위치 `asia-northeast3 (서울)` → **프로덕션 모드**로 시작
4. Firestore의 **규칙** 탭에 아래를 통째로 붙여넣고 **게시**
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{uid} {
      allow read, write: if request.auth != null && request.auth.uid == uid;
    }
  }
}
```
5. 프로젝트 개요 옆 톱니바퀴 → **프로젝트 설정 → 일반 → 내 앱 → `</>` (웹)** → 앱 등록 → 나오는 `firebaseConfig = { ... }` 부분을 복사

## C. 앱에 연결하기
1. 앱 → **설정 → 기기 동기화** 칸에 복사한 `firebaseConfig`를 붙여넣고 **설정 저장**
2. 이메일/비밀번호(6자 이상)를 넣고 **처음이면 가입** → 이후엔 **로그인**
3. 폰에서도 같은 주소를 열고 같은 설정을 붙여넣은 뒤 같은 이메일로 **로그인**
   - 설정(firebaseConfig)은 기기마다 한 번씩 붙여넣어야 해요. 폰은 메모장/메신저로 복사해서 옮기면 편해요.
4. 학습하면 몇 초 뒤 자동으로 올라가고, 다른 기기에서는 화면을 열 때 이어져요.

## 참고
- 로그인이나 Firebase 설정을 안 해도 앱은 그대로 쓸 수 있어요(이 기기에만 저장).
- apiKey는 비밀번호가 아니에요. 데이터는 4번 규칙 덕분에 로그인한 본인만 읽고 쓸 수 있어요.
- 앱을 고쳐서 다시 올리면 `index.html`만 새 것으로 덮어쓰면 돼요. 한 번 새로고침하면 반영돼요.
