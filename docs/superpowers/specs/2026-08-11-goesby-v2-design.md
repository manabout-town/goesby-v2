# GOESBY V2 — 호텔 웨딩 포트폴리오 + 앨범북 툴

**날짜**: 2026-08-11
**브랜드**: 고즈바이 (GOESBY)
**스택**: Next.js 16 App Router + Supabase + Vercel
**레퍼런스**: leekyungho-photograph.com (클린 화이트 미니멀)

---

## 1. 목적

호텔 예식 전문 본식스냅 작가의 포트폴리오 사이트.
두 가지 역할:

1. **포트폴리오** — 예비 신부가 호텔별 촬영 결과물을 탐색하고 문의
2. **앨범북 툴** — 촬영 완료된 신부가 접근코드로 진입, 사진을 선택해 앨범 레이아웃 미리보기

---

## 2. 사이트 구조

```
/                         홈 (히어로 + 호텔 그리드)
/venues/[slug]            개별 호텔 갤러리
/album                    앨범 접근코드 입력
/album/[code]             앨범 워크스페이스
```

### 호텔 베뉴 (6개)

| slug           | 영문            | 한글           |
|----------------|-----------------|----------------|
| ananti         | ANANTI          | 아난티         |
| lotte-busan    | LOTTE BUSAN     | 부산롯데호텔   |
| paradise       | PARADISE        | 파라다이스호텔 |
| westin-chosun  | WESTIN CHOSUN   | 웨스틴조선     |
| signiel        | SIGNIEL         | 시그니엘       |
| grand-moment   | GRAND MOMENT    | 그랜드모먼트   |

### 네비게이션

상단 고정, 중앙 로고 + 좌우 대칭.
- 좌: VENUES (드롭다운으로 호텔 목록)
- 우: ALBUM / CONTACT
- 모바일: 햄버거
- 푸터: 카카오톡 채널 + 인스타 @goseby_official + 저작권

### 연락처

- 카카오톡 채널: pf.kakao.com/[채널ID] (사용자 입력 대기)
- 인스타그램: @goseby_official

---

## 3. 디자인 시스템

### 컬러

| 토큰        | 값        | 용도                     |
|-------------|-----------|--------------------------|
| --ground    | #FAFAFA   | 배경                     |
| --text      | #1A1A1A   | 본문 텍스트              |
| --text-sub  | #717171   | 보조 텍스트              |
| --border    | #E8E8E8   | 구분선/보더              |

순백(#FFF)·순검정(#000) 사용 금지. 액센트 컬러 없음 — 사진이 유일한 색.

### 타이포그래피

| 역할       | 서체                        | 무게     | 크기      |
|------------|-----------------------------|----------|-----------|
| 로고       | Bodoni Moda                 | 500      | —         |
| 네비/라벨  | Inter 또는 Pretendard       | 400      | 11-12px   |
| 한글 본문  | Pretendard                  | 300-400  | 14-15px   |

라벨은 uppercase, letter-spacing 0.1em.

### 레이아웃

- 최대 너비: 1200px
- 호텔 인덱스 그리드: 2열
- 갤러리 상세: 2~3열 메이슨리
- 사진 간 gap: 4-8px
- 섹션 간격: 80-120px
- border-radius: 0 (전면)

### 모션

- 스크롤 시 사진 fade-in (IntersectionObserver)
- `prefers-reduced-motion` 존중
- 그 외 장식 모션 없음

---

## 4. 포트폴리오

### 홈 (`/`)

- 히어로: 풀폭 대표 사진 1장 (또는 자동 슬라이드쇼)
- 호텔 그리드 (2열): 각 카드 = 대표 사진 + 호텔명(영문) + 한글 부제
- 호버: scale 1.02
- 클릭 → `/venues/[slug]`

### 호텔 상세 (`/venues/[slug]`)

- 상단: 호텔명 (영문 대문자) + 한글명
- 본문: 2~3열 메이슨리 사진 wall
- 하단: 다음 호텔로 이동 링크 (순환)
- 정적 생성 (`generateStaticParams`)

### 데이터 (`lib/venues.ts`)

```ts
type Venue = {
  slug: string
  name: string
  nameKo: string
  cover: string
  photos: string[]
}
```

사진 파일: `/public/photos/[slug]/001.jpg, 002.jpg, ...`
초기에는 placeholder 이미지로 구조만 잡고, 실 사진은 사용자가 교체.

---

## 5. 앨범북 레이아웃 툴

### 접근 흐름

1. `/album` → 접근코드 input (깔끔한 단일 필드)
2. Supabase `album_sessions` 테이블에서 코드 검증
3. 성공 → `/album/[code]` 리다이렉트

### 워크스페이스 레이아웃

좌우 분할 (데스크톱):
- **좌측 패널 (사진 소스)**
  - "작가 갤러리" 탭: 작가가 미리 올린 사진 썸네일
  - "내 사진 업로드" 탭: 드래그앤드롭 업로드 영역
  - 선택된 사진에 체크 표시
- **우측 패널 (앨범 미리보기)**
  - 앨범 타입 토글: 메인(94p) / 서브(84p)
  - 책 펼침 형태 (좌·우 2-page spread)
  - 페이지 네비게이션 (이전/다음 + 썸네일 스트립)
  - 선택된 사진이 템플릿에 자동 배치

모바일: 상하 스택 (소스 위, 미리보기 아래) 또는 탭 전환.

### 앨범 페이지 템플릿

| 템플릿     | 사진 수 | 레이아웃                          |
|------------|---------|-----------------------------------|
| full       | 1       | 풀페이지 단일 사진                |
| split      | 2       | 좌우 50/50 분할                   |
| one-two    | 3       | 1대(상) + 2소(하) 또는 역순       |
| grid       | 4       | 2×2 균등 그리드                   |

### 자동 배치 알고리즘

입력: 선택된 사진 N장, 앨범 페이지 수 P (94 또는 84)
1. 사용 가능 페이지 = P (표지/뒷면 제외하면 실제 ~90 or ~80)
2. 사진 수 < 페이지 수 → full 템플릿 위주 + 일부 빈 페이지
3. 사진 수 > 페이지 수 → split/grid 템플릿으로 밀도 조절
4. 배치 순서: 사진 업로드/선택 순서 유지

### DB 스키마

```sql
-- 앨범 세션 (작가가 생성)
create table album_sessions (
  id uuid primary key default gen_random_uuid(),
  code text unique not null,
  bride_name text not null,
  album_type text not null check (album_type in ('main', 'sub')),
  created_at timestamptz default now()
);

-- 앨범 사진
create table album_photos (
  id uuid primary key default gen_random_uuid(),
  session_id uuid references album_sessions(id) on delete cascade,
  url text not null,
  source text not null check (source in ('gallery', 'upload')),
  page_number int,
  order_in_page int,
  created_at timestamptz default now()
);
```

### 스토리지

Supabase Storage 버킷:
- `album-gallery`: 작가가 올리는 신부별 사진 (폴더: `/{session_id}/`)
- `album-uploads`: 신부가 직접 올리는 사진 (폴더: `/{session_id}/`)

### 작가 관리

초기에는 Supabase Dashboard에서 직접:
- `album_sessions`에 행 추가 (코드 + 신부명 + 앨범타입)
- Storage에 갤러리 사진 업로드

추후 필요 시 `/admin` 관리자 페이지 추가.

---

## 6. 기술 결정

| 항목          | 선택                                    |
|---------------|----------------------------------------|
| 프레임워크    | Next.js 16 App Router                  |
| 스타일링      | Tailwind CSS 4                         |
| DB/Auth/Storage | Supabase                             |
| 배포          | Vercel                                 |
| 이미지 최적화 | next/image                             |
| 폰트          | next/font (Bodoni Moda, Inter/Pretendard) |
| 상태관리      | React state (zustand 불필요)           |

런타임 의존성 최소화. UI 라이브러리 없음.

---

## 7. 범위 외 (빌드하지 않음)

- 가격 표시
- 예약/캘린더
- 작가 실명/전화번호
- 사진 캡션/텍스트 오버레이
- PDF 내보내기 (미리보기만)
- 결제
- 다크모드 (사진 사이트 = 라이트 고정)
