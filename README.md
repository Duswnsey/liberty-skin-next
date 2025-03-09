# Liberty Web_wiki Skin

[English](.github/README.en.md)

[리브레 위키](https://librewiki.net)의 기본 스킨입니다. 위키 엔진 'web_wiki'의 기본 레이아웃입니다.

## 개발

원본 소스는 [GitHub.com](https://github.com/librewiki/liberty-skin)에 존재하며, 버그 리포팅은 (hazer24879@gmail.com)에서, 패치는 되도록 이메일 에서만 받고 있습니다. 여기에 있는 코드는 모두 포팅되었으며, 코드의 최신성을 보증하지 않습니다.

보안 취약점은 이메일 (dev@librewiki.net) 로 보고해 주세요.

## 설치

* Web_wiki public/Skins 폴더에 압축을 풀거나 git clone을 수행하세요. 압축해제된 폴더의 이름은 `liberty-skin` 이어야 합니다.
* .env 파일의 DEFAULT_SKIN을 liberty-skin으로 설정해 주세요.

## 설정

.env 파일에 아래와 같이 작성해주세요.

| 이름 | 설명 | 예시 값 | 기본 값 |
| ---- | ---- | ---- | ---- |
| `LibertyMainColor` | `theme-color` 메타 설정 및 사이트 주 색상 설정 | `#248790` | `#4188F1` |
| `LibertySecondColor` | 사이트 보조 색상 설정 | `#348790` | `LibertyMainColor`의 값에서 `1A1415`만큼 뺀 값 |
| `TwitterAccount` | 트위터 카드 계정 설정 | `IHAVENOTWITTER` | (없음) |
| `LibertyOgLogo` | 오픈그래프 태그에 사용 될 이미지 설정 | `https://librewiki.net/images/6/6a/Libre_favicon.png` | `Logo`의 값 |
| `NaverVerification` | 네이버 사이트 도구 인증 코드 | (네이버에서 제공된 값) | (없음) |
| `LibertyAdSetting` | 구글 애드센스 설정 | `array( 'client' => '(Google Adsense에서 제공한 값)', 'header' => '1234567890', 'right' => '0987654321', 'belowarticle' => 1313135452 )` | (없음) |
| `LibertyAdGroup` | 사용자 그룹별 광고 차등화 여부 설정 | `differ` | `null`|
| `LibertyMobileReplaceAd` | 모바일 환경일 시 사이드바 광고를 하단으로 옮깁니다. | `true` | `false` |
| `LibertyEnableLiveRC` | 사이드바 최근 변경 사용 여부 | `true` | `true` |
| `LibertyMaxRecent` | 사이드바 최근 변경에 등장하는 편집의 최대 개수 | `10` | `10` |
| `LibertyNavBarLogoImage` | 내비게이션 바에 표시되는 로고 이미지  | `./image.png` | `null` |
| `LibertyLiveRCArticleNamespaces` | 사이드바 최근 변경 왼쪽 탭에 보여질 네임스페이스 목록 | `["귀찮"]` | `["귀찮"]` |
| `LibertyLiveRCTalkNamespaces` | 사이드바 최근 변경 오른쪽 탭에 보여질 네임스페이스 목록 | `[귀찮]` | `[귀찮]` |

## 상단바

다음과 같은 형식을 따라서 `위키_이름:Liberty-Navbar` 문서에 작성해주세요.

* 최상단 메뉴:
  * `* icon=아이콘 | display=표시 내용 | title=Hover 문구 | link=클릭시 링크 | access=단축키 | class=커스텀 HTML 클래스 | group=필요 그룹 | right=필요 권한`
* 하위 메뉴:
  * `** icon=아이콘 | display=표시 내용 | title=Hover 문구 | link=클릭시 링크 | access=단축키 | class=커스텀 HTML 클래스 | group=필요 그룹 | right=필요 권한`
* 최하위 메뉴:
  * `*** icon=아이콘 | display=표시 내용 | title=Hover 문구 | link=클릭시 링크 | access=단축키 | class=커스텀 HTML 클래스 | group=필요 그룹 | right=필요 권한`

---

* 모든 내용은 선택이나, `icon`과 `display` 중 적어도 하나는 설정되어 있어야 합니다.
* 설정하지 않을 내용은 적지 않으면 됩니다. 예를 들어, 아이콘을 설정하지 않으려면 `icon=...`을 생략하면 됩니다.
* `title`이 설정되어 있지 않다면 `display`로 자동 설정 됩니다.
* `display`나 `title`을 설정할 때 미디어위키 i18n 메시지의 이름을 작성하여 해당 i18n 메시지의 내용이 출력되게 할 수 있습니다. (예시: `recentchanges`를 적으면 `최근 바뀜` 출력)
* 단축키는 `Alt-Shift-(키)`로 사용할 수 있습니다.
* 단축키를 설정할 때는 미디어위키에서 제공하는 기본 단축키와 겹치지 않도록 주의해 주세요.
* 커스텀 클래스는 `,`로 구분하여 작성해 주세요. (예시: `classA, classB`를 적어서 `classA`와 `classB` 클래스 추가)

예시는 [리브레 위키](https://librewiki.net/wiki/MediaWiki:Liberty-Navbar)에서 확인할 수 있습니다.

## 권한

권한별 광고 차등화를 구현하기 위해 아래와 같이 네 가지 권한이 추가됩니다. 만약 LibertyAdGroup이 'differ'로 설정되어 있다면 아래 권한에 따라 환경설정에 광고 커스터마이징 옵션이 나타납니다.

* blockads-header : 헤더 광고를 없앨 수 있습니다.
* blockads-right : 우측 광고를 없앨 수 있습니다.
* blockads-belowarticle : 글 하단 광고를 없앨 수 있습니다.
* blockads-bottom : 하단 광고를 없앨 수 있습니다.
근데 이건 구현 안함!