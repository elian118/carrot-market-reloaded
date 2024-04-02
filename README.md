# Carrot Market Reloaded

## # 프로젝트 개요
___
- node: v20.11.1
- 디자인 패턴
  - 앱라우트 페이지 MVVM 패턴 정의
    - `constants.ts`: 상수 모음 [M] 
    - `types.ts`: 모델 모음 [M]
    - `repositories.ts`: DB 소통 쿼리 계층 [M]
      - `services.ts` 또는 `actions.ts`에서 호출
      - 클라이언트 컴포넌트는 훅에서 직접 `repositories.ts` 함수를 호출할 수도 있다.
    - `page.ts`: 화면 [V]. (단, `route.ts`가 있다면 단순 경유 페이지에 불과하므로 해당 파일이 없다.)
    - `components`: `page.ts` 구성요소를 여러 컴포넌트로 분리한 경우, 자식 컴포넌트가 위치 [V]
    - `styles`: CSS 모듈 스타일 모음 폴더 [V]
    - `schemas.ts`: Zod 등 유효성 검사 스키마 및 타입 위치 [V]
    - `actions.ts`: 사용자 요청에 맞는 서비스를 호출해 화면에 응답하는 계층 [VM]
    - `services.ts`: `actions.ts`에서 호출되는 로직 계층. 로직 없으면 `repositories.ts`로 건너 뜀 [VM+]
      - 서버 컴포넌트 전용 함수 위치 - `'use server'` 적용
    - `hooks.ts`
      - 클라이언트 컴포넌트 전용 함수 위치 - `'use client'` 적용
    - `services.ts`
      - 서비스 로직을 제외한 기타 연산 모음
      - 의미 상, 모든 계층에서 공통으로 사용할 성격의 함수들이 위치
      - 대부분의 공통 유틸은 `libs` 폴더 아래 존재
  - 함수가 너무 많아지면, 파일명과 동일 폴더를 생성하고 그 하위에 여러 파일로 구분해 함수를 분류 저장한다.
    - Ex. `services / commandServices.ts, queryServices.ts`
  - CQRS 패턴은 굳이 무리해서 적용하지 않는다.
- 출시 서비스가 아니므로, `Prisma`, `Debezium`, `Kafka` 조합의 데이터베이스 비동기 복제 설정은 생략한다. 

## #3. Tailwind css
___

1. tailwind css 반응형 수정자의 경우, 기본 가장 작은 사이즈부터 스타일을 적용하도록 설계돼 있다.

    ```html
    <main className='bg-gray-100 sm:bg-red-100' />;
      {children}
    </main>
   ```

   위 코드에서 main 은 배경색이 회색100에서 가로 640px이 되는 순간 빨강100으로 변경된 이후부터 계속 빨강 100이 유지된다.
   md, lg, xl과 같은 더 큰 사이즈가 적용됐을 때 추가 테일윈드 유틸리티 클래스 수정자가 여기서는 존재하지 않기 때문이다.


2. 그라디안트 효과 주기
   <br/>
    ```
    bg-gradient-to-tr from-cyan-500 via-yellow-400 to-purple-400
    ```
    

3. peer
    <br/><br/>
    if input className includes peer,<br/>
    other brother elements includes className like 'peer-invalid:block' will activate style.
    <br/><br/>
    형제의 peer 가 지정된 폼 요소 속성 변경을 감지해
    <br/>peer- 접두어를 같은 형제에 사용함으로써
    조건부 스타일을 활성화하는 수정자<br/>
    같은 형제 요소끼리만 적용 가능 - peer 영역을 벗어나면 peer-[className] 효과가 발동하지 않는다.


4. `*:[className]`
    ```
    :outline-none
    ```
    
    자식 요소 전부 공통 스타일을 적용하고자 할 때 부모 요소에서 걸 수 있는 수정자<br/>
    자식만 될 뿐, 손자 이상 깊은 스타일의 상속은 불가하다.<br/><br/>

5. `has-[.className | #idName | :modifier | ...]:`
    
    ```
    has-[.peer]:bg-green-100
    has-[#logInBtn]:bg-green-100
    has-[:invalid]:bg-red-100
    ```
    
    자식 요소들 중 특정 식별자 또는 테일윈드 수정자 등을 포함하는 요소가 하나라도 있다면 지정한 스타일을 적용한다.
   <br/>
    손자 이상 깊은 요소까지 감별하는 듯하다.
   <br/><br/>
    이러한 동적 스타일 적용은 최근 업데이트 된 강력한 CSS 고유 기능으로 제공되며 가상 클래스 기반으로 작동한다.
   <br/><br/>
6. 배열 스타일
   <br/><br/>
   6-1. `odd:[className] even:[className]`<br/><br/>

   ```odd:bg-gray-100 even:bg-cyan-100```<br/><br/>
   
   map 배열 메서드로 처리한 배열 컴포넌트 부모에서 적용 가능

   odd - 홀수, even - 짝수<br/><br/>

    6.2 `first:[className], last:[className]`
    
    ```
    first:border-t-0
    last:border-b-0
    ```
            
    배열 요소 중 맨 처음(first) 또는 마지막(last)에만 지정 스타일 적용
    
    6.3 `empty:[className]`
   <br/><br/>
    ```empty:w-24 empty:h-5 empty:rounded-full empty:animate-pulse empty:bg-gray-300```
   <br/><br/>
    자식으로 배치되어야 할 배열 정보가 빈 문자열 처럼 비어 있다고 판명된 경우, 지정된 스타일 적용<br/><br/>

7. group - group-[className]:
   <br/><br/>
    부모 - ```group```
  
    자식 - ```group-hover:text-red-500 group-focus-within:block hidden```
   <br/><br/>
    이 관계는 group 클래스가 속한 부모와 그 자식 요소들에 적용된다.
    * group-focus-within:block - 해당 요소가 안쪽으로 포커싱 돼 있을 때 요소를 보여준다는 의미


8. JIT 컴파일러 활용하기
   <br/><br/>
    테일윈드는 부트스트랩처럼 단순히 무겁고 거대한 유틸리티 클래스 모음집이 아니며,

    수정 즉시 CSS 리컴파일링을 수행하는 JIT 컴파일러다.
   <br/><br/>
    다양한 수정자들을 조합해 천차만별의 CSS 코드를 생성하는 것도 테일윈드가 컴퍼일러인 까닭이다.

    당연히 JIT 컴파일러로서 테일윈드는 아주 가벼워 설치 부담도 적다.
   <br/><br/>
    컴파일러인 점을 감안할 때, 테일윈드는 반복적으로 사용할 특정 스타일 속성을

    아래와 같이 설정 파일 안에 추가 지정해서 기존 유틸리티 클래스처럼 사용하는 것도 가능하다.
    
    ```javascript
    // tailwind.config.ts
    contents: {
        ...
    },
    theme: {
        extend: {
            margin: {
                tomato: '120px',
            },
            borderRadius: {
                'sexy-name': '11.11px',
            },
        },
    },
    plugins: [],
    ```
    
    이렇게 추가된 클래스는 tailwind intellisense 에서도 자동 감지된다.
    
    ```html
       <button className="text-white px-3 py-2 rounded-sexy-name bg-[#543cb8]">
         Submit
       </button>
    ```
    ```css
        // rounded-sexy-name 에 마우스 올려뒀을 때 컴파일된 css 정보
        .rounded-sexy-name {
            border-radius: 11.11px;
        }
    ```

9. 디렉티브
   ```css
   // global.css
   @tailwind base; // 테일윈드가 지정한 기본 스타일이 적용된 CSS
   @tailwind components;
   @tailwind utilities; // 테일윈드 유틸리티 클래스 모음집(placeholder). 테일윈드 인텔리센스는 여기서 개발자가 입력한 클래스들을 찾아내고, 테일윈드 또한 이를 기반으로 스타일을 찾아 CSS 를 컴파일링한다.

    위 순서대로 돼 있는건, 아래 코드가 윗 코드를 재정의(오버라이드)하거나
    코드를 추가하는 방식으로 작동하기 때문
    
    디렉티브는 아래와 같이 각각 레이어를 추가해 css 를 오버라이드할 수도 있다.
    
    @layer base {
        a {
            @apply text-blue-500 // 모든 a 태그 요소에 파랑500 색상 적용
        }
    }
    
    // 아래와 같이 유틸리티 클래스를 재정의하는 것도 가능하다.
    // 물론, tailwind.config.ts 에서 extends 를 사용하는 것과 결과가 같다.
    @layer utilities {
        .text-bigger-hello {
            @apply text-3xl font-semibold
        }
    }
    
    // 아래는 컴포넌트 계층을 직접 재정의한 경우
    // 유틸리티 클래스 조합을 다시 한 번 추상화해 btn 클래스로 재정의한 것
    @layer components {
        .btn {
            @apply w-full bg-black h-10 text-white rounded-sexy-name mt-tomato;
        }
    }
    ```

10. 플러그인

    테일윈드 플러그인은 9항에서 언급한 레이어 코드를 종합해

    특수한 목적에 따라 CSS 코드로 완성해 제공하고 있는 npm 패키지들을 지칭한다.
    <br/><br/>
    테일윈드 플러그인은 tailwind.config.ts 에 plugins 배열 안에 모듈을 추가하면

    간단하게 프로젝트에 해당 플러그인을 추가 및 적용(오버라이드)할 수 있다.
    <br/><br/>
    예를 들어, [daisyUI](https://daisyui.com)는 @layer components 를 오버라이드한 플러그인을 제공하며

    여기서 다양한 종류의 UI 스타일들을 특정 클래스명을 입력하는 것만으로 간단하게 스타일링할 수 있다.
    <br/><br/>
    테일윈드에서 기본 제공하는

    [4종의 공식 플러그인](https://tailwindcss.com/docs/plugins)도 아주 쓸 만하다.
    ```javascript
    plugins: [
        require('@tailwindcss/typography'),
        require('@tailwindcss/forms'),
        require('@tailwindcss/aspect-ratio'),
        require('@tailwindcss/container-queries'),
    ]
    ```
    
    플러그인 적용 시 미리 npm 설치 후 서버를 재시작해야 함에 주의!


## #4. Authentication UI
___

1. 하이드레이션 경고
    ```shell
    Error: Text content does not match server-rendered HTML.
    Warning: Text content did not match. Server: "Dark" Client: "Light"
    See more info here: https://nextjs.org/docs/messages/react-hydration-error
    ```
    넥스트에서 뜨는 이 경고는 서버에서 랜더링한 결과와 클라이언트에서 랜더링한 결과가 다를 때 발생한다.<br/>
    주로, 클라이언트 컴포넌트에서 발생하는데,<br/>
    아래와 같이 서버사이드 랜더링 결과를 클라이언트와 생애주기를 동기화해 해결 가능하다.
    ```javascript
    'use client';
    import { useTheme } from 'next-themes';
    import { useEffect, useState } from 'react';
    
    export function ThemeToggle() {
      const { systemTheme, theme, setTheme } = useTheme();
      const currentTheme = theme === 'system' ? systemTheme : theme;
      const [isMounted, setIsMounted] = useState(false);
        
      useEffect(() => {
        setIsMounted(true);
      }, []);
        
      return (
        isMounted && (
          <div className="absolute top-0 right-0 z-10">
            <div className="flex gap-2 *:p-2">
              <button
                className="bg-teal-500 dark:bg-gray-100 dark:text-gray-900 rounded-md"
                onClick={() => setTheme(currentTheme === 'dark' ? 'light' : 'dark')}
              >
                {currentTheme === 'dark' ? 'Light' : 'Dark'}
              </button>
            </div>
          </div>
        )
      );
    }
    ```
2. 서버에서 제공한 HTML 확장 속성 경고

    ```
    Warning: Extra attributes from the server: class,style,data-inboxsdk-session-id
     at html
    ...
    ```

    개발자 도구 요소탭에서 html 요소 안에<br/>`data-inboxsdk-session-id` 확장 속성이 발생했기 때문<br/><br/>

    클라이언트 사이드에서는 이 속성을 잠재적 위험요소로 판단해 콘솔에서 오류로 처리한 듯하다.<br/>
    난수가 입력되는 형태라, 페이지 새로고침마다 값 변경됨 확인
    ```html
    <html 
      lang="en" 
      class="dark" 
      style="color-scheme: dark;" 
      data-inboxsdk-session-id="17110608313164-0.2014529195148978" // 확장 속성
   >
     ...       
    </html>
    ```
    딱히 치명적 오류가 발생하거나 해결책 또한 없어 보인다. 경고니 무시하자.<br/><br/>
3. 전역 컴포넌트 스타일 적용<br/><br/>
    UI 컴포넌트를 일일이 다 만들어 각각 스타일을 지정해 사용하는 방법도 있지만,<br/> 
    프로젝트 전역에서 사용할 스타일이라면, global.css를 직접 건드는 방식도 괜찮다.<br/><br/>
    아래는 primary-btn 클래스 스타일을 컴포넌트 계층에 추가한 것이다.<br/>
    컴포넌트 레이어 계층에서 오버라이드된 클래스는, 테일윈드 인텔리센스에서 감지할 수 없다.
    ```javascript
    // global.css
    @layer components {
        .primary-btn {
            @apply w-full bg-orange-500 text-white font-medium rounded-md text-center hover:bg-orange-400 transition-colors;
        }
    }
    ```
4. 무료 아이콘<br/>
    - [heroicons](https://heroicons.com/)<br/>
        테일윈드 팀에서 만든 무료 아이콘 모듈로, 테일윈드 클래스 오버라이드가 가능하다.<br/>
        설치는 아래와 같이 해주면 된다.
        ```
        yarn add @heroicons/react
        ```
    - [SVGrepo](https://www.svgrepo.com/)<br/>
        SVG 파일을 공유하는 저장소 사이트<br/>
        리액트 안에서 편리하게 쓰려면, [SVGR](https://react-svgr.com/)과 같은 라이브러리의 도움이 필요하다.
        
   
5. [SVGR](https://react-svgr.com/) - SVG 파일 to 리액트 컴포넌트 라이브러리<br/><br/>
    SVGR은 'Transform SVGs into React components' 의 줄임말이다.<br/><br/>
    이런 라이브러리가 있기 전에는 SVG 파일을 리액트에서 쓰려면<br/> 
    리액트 컴포넌트로 SVG 코드를 랩핑한 별도 아이콘 컴포넌트를 만들어 끌어다 써야 했다.<br/>
    SVGR은 이 과정을 개발자 대신 해준다.<br/><br/>
    설치 및 사용은 공식 사이트 getting Started 코너에서 next.js 안내를 확인해 그대로 따라하면 된다.


## #6. Validation
___

1. [Zod](https://zod.dev/) - 간편 유효성 검사 모듈<br/><br/>

    form 요소와 함께 사용할 때 유효성 검사 도구로 많이 사용됨<br/><br/>

    - 폼 스키마 생성

    ```javascript
    'use server';
    ...
   
    const formSchema = z
      .object({
         username: z
            .string({
               invalid_type_error: `이름은 ${INVALID.STRING}`,
               required_error: `이름을 ${INVALID.INPUT}`,
            })
            .min(3, INVALID.TOO_SHORT)
            .max(10, INVALID.TOO_LONG)
            .toLowerCase()
            .trim()
            // 그 외 유효성 검사 규칙과 메시지 추가 - refine, regex
            .regex(hasSlang(), '이름에 비속어가 포함돼 있습니다.')
            .transform((username) => `🔥 ${username} 🔥`),
         email: z.string().email(INVALID.EMAIL).trim().toLowerCase(),
         password: z
           .string()
           .min(10, INVALID.TOO_SHORT)
           .trim()
           .regex(
              pwRegex,
              '비밀번호는 대﹒소문자, 하나 이상의 숫자, 특수문자를 포함해야 합니다.',
           ),
         confirm_password: z.string().min(10, INVALID.TOO_SHORT).trim(),
      })
      // 객체 전체에 한 번에 적용하는 유효성 검사 => fieldErrors가 아닌, formErrors 로 오류 메시지 전달
      .refine(({ password, confirm_password }) => isValidPw({ password, confirm_password }), {
         // 단, 기존 fieldErrors 중 하나에 메시지를 표시하도록 하려면
         // 두번째 인자를 string 대신 아래와 같이 객체정보로 변경
         message: '입력된 비밀번호가 서로 다릅니다.',
         path: ['confirm_password'],
      });
    ```
   - 폼 스키마 파싱 - 유효성 검사 수행
    ```javascript
    'use server';
    ...
   
    export const createAccount = (prevState: any, formData: FormData) => {
      const data = {
        username: formData.get('username'),
        email: formData.get('email'),
        password: formData.get('password'),
        confirm_password: formData.get('confirm_password'),
      };
      
      // formSchema.parse(data) 적용 시 try-catch 필수
      const result = formSchema.safeParse(data);
    
      if (!result.success) {
        return result.error.flatten();
      } else {
        console.log(result.data);
      }
    };
    ```
   - 폼 상태 참조 - 컴포넌트 계층
    ```javascript
    'use client';
    ...
   
    import { useFormState } from 'react-dom';
    import { createAccount } from '@/app/create-account/actions';
    ...
   
    const [state, dispatch] = useFormState(createAccount, null);
    ...
    ```
   - coerce - 숫자타입 입력값 검사<br/><br/>
     인풋은 입력 값을 무엇으로 받든 모두 string으로 전달<br/>
     따라서, 인풋의 number 타입 입력 값은 정확한 검사를 위해 coerce를 거쳐야 한다.<br/><br/>
   ```javascript
    'use server';

    import { z } from 'zod';
    
    const tokenSchema = z.coerce.number().min(100000).max(999999);
    
    export const smsLogin = async (prevState: any, formData: FormData) => {
        console.log(typeof tokenSchema.parse(formData.get('token'))); // number
    };
   ```
   
2. [validator](https://www.npmjs.com/package/validator) - 패턴 유효성 검사 모듈<br/><br/>
    validator는 전화번호, 신용카드 번호 등 인풋의 문자열 입력값의 정규식 패턴을 간편 검사하는 모듈이다.<br/>
    타입스크립트 지원이 안 되는 모듈이므로, [@types/validator](https://www.npmjs.com/package/@types/validator) 도 함께 설치한다.
    ```javascript
    'use server';

    import { z } from 'zod';
    import validator from 'validator';
    
    const phoneSchema = z.string().trim().refine(validator.isMobilePhone);
    ...
    ```

## #7. Prisma
___

1. 개념<br/>
    [프리즈마](https://www.prisma.io/)는 대중적인 타입스크립트 지원 ORM 중 하나다.<br/>
    프리즈마 설치 전에 기본적인 DB 개발 환경은 갖춰두도록 하자. 설치 명령은 아래와 같다.
    ```shell
    yarn add prisma
    ```
2. 사용법<br/><br/>

    설치 후 프로젝트에 프리즈마 적용을 위해 아래 명령을 실행한다.<br/>
    그러면, 루트에 prisma 폴더와 함께 그 아래 `schema.prisma` 파일이 새로 생성된다.<br/>
    덤으로 데이터베이스 스키마 정보 연동을 위한 환경변수 설정에 필요한 `.env` 파일도 알아서 생성해준다.<br/>
    ```shell
    npx prisma init
    ```
    이후 뜨는 설명대로 차근차근 하면 된다.
    ```shell
    ✔ Your Prisma schema was created at prisma/schema.prisma
    You can now open it in your favorite editor.

    warn You already have a .gitignore file. Don't forget to add `.env` in it to not commit any private information.

    Next steps:
    1. Set the DATABASE_URL in the .env file to point to your existing database. If your database has no tables yet, read https://pris.ly/d/getting-started
    2. Set the provider of the datasource block in schema.prisma to match your database: postgresql, mysql, sqlite, sqlserver, mongodb or cockroachdb.
    3. Run prisma db pull to turn your database schema into a Prisma schema.
    4. Run prisma generate to generate the Prisma Client. You can then start querying your database.

    More information in our documentation:
    https://pris.ly/d/getting-started
    ```
    
    순서대로 하려면 먼저 `.env` 파일을 확인하고 데이터베이스 정보를 입력해준다.<br/>
    데이터베이스 정보(DATABASE_URL)는 개발자가 선택한 데이터베이스 유형마다 다른 패턴을 가지므로<br/>
    프리즈마 공식 사이트에서 정확히 확인하고 기재해야 한다.<br/><br/>
   
    * 초기 `.env` 파일을 보면, 데이터베이스별 프리즈마 연동법을 설명한 [상세 페이지](https://pris.ly/d/connection-strings)가 기재돼 있으니 확인
    * 데이터베이스 정보는 노출해서는 안 되는 개인정보이므로, .gitignore 파일에 `.env` 추가 필수<br/><br/>
    ```dotenv
    # Environment variables declared in this file are automatically made available to Prisma.
    # See the documentation for more detail: https://pris.ly/d/prisma-schema#accessing-environment-variables-from-the-schema
    
    # Prisma supports the native connection string format for PostgreSQL, MySQL, SQLite, SQL Server, MongoDB and CockroachDB.
    # See the documentation for all the connection string options: https://pris.ly/d/connection-strings
    
    DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public" // 변경
    ```
    `schema.prisma` 파일에서 선택한 데이터베이스를 제공자(provider)로 변경
    ```javascript
    generator client {
        provider = "prisma-client-js"
    }
    
    datasource db {
        provider = "postgresql" // 변경
        url      = env("DATABASE_URL")
    }
    ```
    데이터베이스가 연결이 돼 있는 상태라면 터미널에서 아래 명령을 입력한다.<br/><br/>
    `.env` 파일에 환경변수로 입력된 DATABASE_URL과<br/>
    `schema.prisma` 파일에 입력된 스키마 모델을 토대로<br/>
    새로운 데이터베이스를 만들어주는 명령이다 
    * 이 명령은 스키마를 변경했을 때마다 재실행해줘야 한다.<br/><br/>
    ```shell
    npx prisma migrate dev
    ```
    그러면 아래와 같은 질문이 뜨는데, 깃 커밋 메시지와 같은 개념이다.<br/>
    아래와 같이 모델과 관련성 있는 이름을 짓고 엔터를 누른다.<br/>
    띄어쓰기가 허용되지 않으므로, 필요한 경우 '_'를 넣어 케밥케이스로 작성한다.
    ```shell
    ? Enter a name for the new migration: add_user
    ```
    위 일련의 행위는 아래 명령으로 한 번에 처리할 수도 있다.
    ```shell
    npx prisma migrate dev --name ["모델 변경 설명(제목)"]
    ```
    이후 prisma 폴더 아래 migrations 폴더가 새로 생성되고<br/>
    그 하위에 `날짜_모델변경설명(제목)`형식의 폴더와 CREATE 문이 입력된<br/>
    `migration.sql` 파일이 추가된 걸 확인할 수 있다.<br/><br/>
    
    이 시점에서 데이터베이스가 새로 생성된 것도 확인 가능한데,<br/>
    약간의 시간차가 발생할 수 있으니, 새로고침을 계속 눌러준다.<br/><br/>
    또, 이때 프리즈마에서 아래 위치에<br/>
    방금 만든 스키마를 위한 JS 파일과 타입까지 새로 생성했다는 사실도 확인할 수 있다.<br/><br/>
    
    - `node_modules/prisma/client`,<br/>
    - `node_modules/@prisma/@client`<br/><br/>
    이 코드들 또한 개발에 활용 가능하므로 다음과 같이 import 해서 쓰면 된다.<br/><br/>
    - 등록
    ```javascript
    import { PrismaClient } from '@prisma/client';
   
    const db = new PrismaClient();
   
    const test = async () => {
      const user = await db.user.create({
        data: {
          username: 'test', // @unique 속성이라, 두 번째 실행부터 정상적으로 오류 발생
        },
      });
    }
    console.log(user);
   
    test();
    ```
    ```sql
    INSERT INTO user (username) VALUES ('test');
    ```
    - 조회 - JOIN
    ```javascript
    export const getProduct = async (id: number) => 
      db.product.findUnique({
        where: { id },
        include: {
         user: {
           select: {
             username: true,
             avatar: true,
           },
         },
      },
    });
    ```
    ```sql
    SELECT
      product.id,
      product.name,
      product.description,
      product.price,
      product.image,
      product.created_at,
      product.updated_at,
      user.username,
      user.avatar
    FROM product
    INNER JOIN user ON product.user_id = user.id
    WHERE product.id = ?;
    ```
    - 조회 - 페이지네이션: `skip`, `take` 키 사용
    ```javascript
    export const getMoreProducts = async (page: number) => {
      return db.product.findMany({
          select: {
          title: true,
          price: true,
          created_at: true,
          photo: true,
          description: true,
          id: true,
        },
        skip: page,
        take: CONTENT_PER_PAGE,
        orderBy: {
          created_at: 'desc',
        },
      });
    };
    ```
    - 삭제
    ```javascript
    await db.product.delete({
      where: { id: id },
    });
    ```
    ```sql
    DELETE FROM product WHERE id = ?;
    ```
    디비버와 같은 데이터베이스 관리 프로그램을 쓴다면 상관 없지만<br/>
    프리즈마에서 제공하는 무료 데이터베이스 프로그램 '프리즈마 스튜디오'를 사용하고 싶다면<br/> 
    터미널에서 아래 명령을 실행한다.<br/><br/>
    '프리즈마 스튜디오'는 ORM 특성 상 SQL을 입력해 결과를 알아보는 기능은 없다.<br/>
    스키마를 변경한 경우, 실행중인 프리즈마 스튜디오 종료 후 재실행해야<br/>
    새 스키마가 반영된 데이터베이스를 확인할 수 있다.
    ```shell
    npx prisma studio
    ```
3. 로그 보기
    ```javascript
    import { PrismaClient } from '@prisma/client';

    const db = new PrismaClient({
      log: [
        {
          emit: 'event',
          level: 'query',
        },
        {
          emit: 'stdout',
          level: 'error',
        },
        {
          emit: 'stdout',
          level: 'info',
        },
        {
          emit: 'stdout',
          level: 'warn',
        },
      ],
    });
    
    export default db;
    ```
    로그 형식을 지정하는 함수는 종단에서 실행될 수 없으므로, `libs/hooks.ts` 유틸로 분리
    ```javascript
    export const setQueryLog = (roll: string, caller: string, result?: object | null) => {
      db.$on('query', (e) => {
        // SQL 키워드 자동 개행 및 색상 부여
        const query = e.query
          .toString()
          .replace(
            /(SELECT|UPDATE|DELETE|FROM|JOIN ON|WHERE|GROUP BY|HAVING|ORDER BY|LIMIT|OFFSET)\b/g,
            '\n\x1b[35m$1\x1b[0m',
          )
          .replace(/(DESC|ASC)\b/g, '\x1b[35m$1\x1b[0m')
          .replace(/,/g, '\n')
          .replaceAll('`', '');

        console.log(chalk.black(chalk.bgCyan(` ❖ caller: ${caller} `)));
        console.log(chalk.black(chalk.bgCyan(` ❖ roll: ${roll} `)));
        console.log(`${chalk.cyan('Query: ')}${query}`);
        console.log(`${chalk.blue('Params: ')}${e.params}`);
        console.log(
          `${chalk.yellow('Duration: ')}${e.duration}ms ${e.duration >= 2 ? chalk.red('Too Lazy') : chalk.green('Good')}`,
        );
        result && console.log(`${chalk.cyan('Result:')}`);
        result && console.log(result);
        console.log(chalk.black(chalk.bgCyan(` ❖ DONE! ❖ `)));
      });
    };
    ```
    서버 콘솔 - 예시(상품목록 더 보기)
    ```shell
     ❖ caller: getPosts 
     ❖ roll: 동네생활 포스트 목록 조회
    Query:
    SELECT carrot_market_reloaded.User.id
     carrot_market_reloaded.User.username
     carrot_market_reloaded.User.email
     carrot_market_reloaded.User.password
     carrot_market_reloaded.User.phone
     carrot_market_reloaded.User.github_id
     carrot_market_reloaded.User.avatar
     carrot_market_reloaded.User.created_at
     carrot_market_reloaded.User.updated_at
    FROM carrot_market_reloaded.User
    WHERE (carrot_market_reloaded.User.id = ? AND 1=1)
    LIMIT ?
    OFFSET ?
    Params: [5,1,0]
    Duration: 0ms Good
    Result:
    [
      {
        id: 1,
        title: '누가 나의 GPU를 찾나요?',
        description: '물건이 아주 실합니다!!!',
        views: 0,
        created_at: 2024-04-02T01:25:43.594Z,
        _count: { comments: 0, likes: 1 }
      }
    ]
     ❖ DONE! ❖
    ```


## #8. Authentication
___
1. 비밀번호 암호화<br/><br/>
    
    여기서는 [bcrypt](https://www.npmjs.com/package/bcrypt)를 사용한다.<br/>
    타입스크립트 지원을 위해 [@types/bcrypt](https://www.npmjs.com/package/@types/bcrypt)도 함께 설치

    ```shell
    yarn add bcrypt
    ```
    ```shell
    yarn add -D @types/bcrypt
    ```
    그러나, 설치 후 실제 bcrypt 관련 코드 실행 시<br/>
    웹팩에서 특정 모듈을 처리할 수 없다는 오류가 발생할 수 있다.<br/><br/>
    의존성을 추가할 때 종종 발생하는 흔한 peer dependency 오류다.<br/>
    이럴 때는 `node_modules`, `yarn.lock`, `package.lock.json`을 삭제하고<br/>
    `yarn install`을 다시 실행해 재설치해야 한다.<br/><br/>

2. 로그인 정보 저장<br/><br/>

    사용자 정보는 세션, 로컬, 쿠키 등 클라이언트 사이드에 저장해둠으로서 로그인 상태를 유지한다.<br/>
    단, 쉽게 사용자정보를 알 수 없도록 JWT을 대신 보내는 식으로 암호화해야 하는데,<br/>
    여기서는 이걸 대신해주는 모듈로 [iron-session](https://www.npmjs.com/package/iron-session)을 사용한다.
    ```shell
    yarn add iron-session
    ```
   [iron-session](https://www.npmjs.com/package/iron-session)은 자바스크립트 전용 보안, 비상태, 쿠키 기반의 세션 라이브러리로서,<br/>
    이를 통해 암호화된 쿠키로 저장된 세션 데이터는 서버 사이드에서 디코딩된다.<br/>
    디코딩에는 쿠키 저장에 사용된 암호를 다시 사용하므로, 주로 `.env` 파일에 지정된 서버 환경변수를 사용한다.
    <br/><br/>

    아래는 `iron-session`으로 사용자 정보`({ id: #조회된번호 })`를 가져와 암호화해서<br/>
    쿠키에 `delicious-carrot` 이름으로 값을 저장하는 과정이다.<br/><br/>
    * 환경변수 `COOKIE_PASSWORD`는 50자 이상의 긴 문자열 권장 - 구글에서 '암호 생성기' 검색해 만들기

    ```javascript
    import { getIronSession } from 'iron-session';
    import { cookies } from 'next/headers';
    ...
    
    const cookie = await getIronSession(cookies(), {
      cookieName: 'delicious-carrot',
      password: process.env.COOKIE_PASSWORD!, // 서버 환경변수를 암호로 사용
    });
    
    // @ts-ignore
    cookie.id = user.id;
    await cookie.save();
    ```
   
3. 미들웨어<br/><br/>

    넥스트 [미들웨어](https://nextjs.org/docs/app/building-your-application/routing/middleware)는 사용자 요청과 서버 응답 사이 중개자를 담당한다.<br/>
    간단히, 넥스트 프로젝트 루트에 `middleware.ts` 파일을 아래와 같이 생성하면 미들웨어가 적용된다.<br/><br/>

    미들웨어 함수는 반드시 `middleware`라는 이름으로 만들거나 `export default` 되어야 하며,<br/>
    굳이 `export default` 하지 않으면, `config` 객체를 `export`해 부가 옵션을 추가할 수도 있다.  
    ```javascript
    import { NextRequest } from 'next/server';

    export const middleware = (req: NextRequest) => {
      console.log(req.nextUrl.pathname);
      console.log('안녕하세요. 저는 미들웨어입니다.');
    };
   
    export const config = {
      // 미들웨어 설정 추가
    }
    ```
    이후 페이지를 새로고침하면 아래와 같이,<br/>
    거의 모든 요청에 미들웨어가 개입하고 있음을 알 수 있다.
    ```shell
    /
    안녕하세요. 저는 미들웨어입니다.
    /_next/static/css/app/layout.css
    안녕하세요. 저는 미들웨어입니다.
    /_next/static/chunks/webpack.js
    안녕하세요. 저는 미들웨어입니다.
    /_next/static/chunks/main-app.js
    안녕하세요. 저는 미들웨어입니다.
    /_next/static/chunks/app-pages-internals.js
    안녕하세요. 저는 미들웨어입니다.
    /_next/static/chunks/app/page.js
    안녕하세요. 저는 미들웨어입니다.
    /_next/static/chunks/app/layout.js
    안녕하세요. 저는 미들웨어입니다.
    ```
    물론, 미들웨어를 활용하면 각 요청에 대한 응답방식까지 다양하게 변형할 수 있다.
    ```javascript
    export const middleware = async (req: NextRequest) => {
      const session = await getSession();
      const pathname = req.nextUrl.pathname;
    
      if (pathname == '/') {
        const res = NextResponse.next();
        res.cookies.set('middleware-cookie', '안녕');
        return res;
      }
      if (pathname === '/profile') {
       // 1. 페이지 리다이렉트 방식
       return NextResponse.redirect(new URL('/', req.url));
       // 2. 오류 메시지 응답 방식
       // return Response.json({
       //   error: '허용되지 않는 진입방식입니다. 로그인 해주세요.',
       // });
       }
    };
    ```
    아래는 `middleware` 함수에서 분기를 타지 않고, `config`을 통해 미들웨어 적용 분기를 지정한 방식이다. 
    ```javascript
    import { NextRequest } from 'next/server';
    
    export const middleware = async (req: NextRequest) => {
      console.log('안녕');
    };
    
    export const config = {
      // api, _next/static, _next/image, favicon.ico 등을 제외한 모든 요청에 미들웨어 적용(정규식)  
      matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
    };
    ```
    같은 맥락에서, 미들웨어가 모든 요청에 개입하는 점을 활용하면<br/> 
    라우팅 도중 사용자 정보를 확인하고<br/>
    미인가 사용자의 허용되지 않은 페이지 진입을 간단하게 일괄 차단할 수 있다.<br/><br/>
    단, 넥스트 미들웨어는 종단에서 실행되는 `Edge runtime`이다.<br/>
   `Edge runtime`은 빠른 실행을 위해 경량화 버전의 Node.JS만 사용된다.<br/><br/>
    따라서, 미들웨어에서는 프리즈마와 같은 무거운 모듈을 불러와 사용자 정보를 확인하는 등의 작업을 할 수 없다.<br/>
    미들웨어에서 프리즈마 함수 실행 시 코드 상의 오류는 없더라도 결국 서버 오류가 발생하는 이유다<br/><br/>
    프리즈마를 굳이 종단에서 작동시키려면 프리즈마 가속기나 드라이버 어뎁터를 사용하는 설정을 통해 가능하긴 하지만,<br/>
    종단에서의 프리즈마 코드 직접 실행은 권장되지 않는다.<br/><br/>
    이 프로젝트의 미들웨어는 `iron-session`을 통해 가져온 쿠키에 id 값이 존재하는지 여부로만 판단하며,<br/>
    실제 해당 id와 매칭되는 사용자 존재여부는 직접 판단하지 않는다.<br/><br/>
    
    * 자세한 미들웨어 설정법은 [Next.JS 미들웨어 설정 메뉴얼](https://nextjs.org/docs/app/building-your-application/routing/middleware) 참고

## #9. Social Authentication
___
1. Github 인증 로그인<br/><br/>

    깃허브는 OAuth 서비스를 통해 사용자가 자신의 깃허브 계정을 사용해<br/>
    다른 웹사이트나 애플리케이션에 로그인하거나 정보를 안전하게 공유할 수 있도록 지원한다.<br/><br/>

    설정방법은 깃허브 공식 문서를 확인하면 된다.<br/>
    OAuth를 사용하려면 우선, OAuth 앱을 만들어야 한다.<br/><br/>
    [➝ OAuth 앱 만들기](https://docs.github.com/ko/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app)<br/>
    [➝ 신규 OAuth 앱 등록 페이지 바로가기](https://github.com/settings/applications/new)<br/><br/>

   OAuth 앱 등록을 완료하면 아래 안내대로 애플리케이션에 적용하면 된다.<br/><br/>
   
    [➝ OAuth 앱을 사용해 인증하기](https://docs.github.com/ko/apps/oauth-apps/building-oauth-apps/authenticating-to-the-rest-api-with-an-oauth-app)<br/><br/>

2. SMS 문자 인증<br/><br/>

    이 프로젝트는 [트윌리오](https://www.twilio.com/en-us)로 문자 인증을 진행한다.<br/>
    트윌리오 문자인증 적용방법은 [인증(Verify)](https://www.twilio.com/docs/verify) 공식문서에서 확인 가능하며,<br/><br/>
    의존성은 아래와 같이 설치한다.
    ```shell
    yarn add twilio
    ```
    또, 트윌리오의 문자인증 기능을 사용하려면 그것과 별개로 [문자전송(Messaging)](https://console.twilio.com/us1/develop/sms/overview) 서비스를 추가 사용해야 한다.<br/>
    * 문자전송 링크는 트윌리오 계정 로그인 후 접근 가능<br/><br/>
    
    인증번호를 발송하는 기능이 있어야 그렇게 발송된 문자의 인증번호를 읽고 문자인증까지 할 수 있기 때문이다.<br/>
    결국 트윌리오 인증에는 [인증(Verify)](https://www.twilio.com/docs/verify)과 [문자전송(Messaging)](https://console.twilio.com/us1/develop/sms/overview) 두 서비스가 모두 필요하다.<br/><br/>

    트윌리오 메시징에는 SMS 문자 발송에 필요한 가상의 전화번호가 필요하며 트윌리오에서 구매 가능하다.<br/>
    단, 이 가상번호는 월 통신 이용료가 발생한다.<br/>
    * 트윌리오 평가판에서는 무료 캐시 $15.5가 지원되므로 얼마간은 부담 없이 쓸 수 있다.<br/><br/>
    
    가상번호는 콘솔에서 Phone Numbers > Manage > Buy a number 에서 구매할 수 있다.<br/>
    구매 시 해당 번호로 문자 전송이 가능한지 여부를 꼭 확인하고 사야 한다.<br/><br/>

    하지만, 문자전송 개요 페이지에서 이미 `Try SMS` 버튼을 눌렀다면, 이미 구매를 완료했을 것이다.<br/><br/>

    발급된 가상번호를 확인하려면 콘솔 초기 화면으로 이동하면 된다.<br/>
    여기서, Account SID, Auth Token, 전용 트윌리오 가상번호를 확인할 수 있다.<br/>
    이 정보는 트윌리오 서비스 이용 시 꼭 필요하므로, `.evn` 파일에 환경변수로 저장해 두고 사용한다.

    ```javascript
    // 트윌리오로 토큰 보내기
    const client = twilio(
      process.env.TWILIO_ACCOUNT_SIC,
      process.env.TWILIO_AUTH_TOKEN,
    );
   
    await client.messages.create({
      body: `인증번호: ${token}`,
      from: process.env.TWILIO_PHONE_NUMBER!,
      // to: phoneValid.data // 실제 서비스에서 활성화 - 트윌리오 계정 업그레이드 선행 필요
      to: process.env.MY_PHONE_NUMBER!,
    });
    ```

    평가판은 오직 하나의 가상번호만 사용 가능하고,<br/>
    인증번호 수신도 오직 트윌리오 가입자 본인의 전화번호만 사용 가능하다.<br/>
    따라서, 개발 완료 후 서비스 출시 이후에는 트윌리오 계정을 업그레이드 해야 한다.<br/><br/>

    현재 트윌리오는 지금도 멀쩡히 2FA 인증에 사용되는 전화번호를 수신자 정보인<br/>
    `MY_PHONE_NUMBER`로 입력해도 알 수 없는 이유로 트윌리오 측에서<br/>
    `unverified` 번호로 간주해 테스트가 불가한 상태다.<br/><br/>

    정상적인 인증된 개인 전화번호 입력에도<br/>
    아래 경고가 뜨면 **차라리 다른 서비스 이용을 권한다.**<br/>
    전화번호를 초기화하고 다시 변경해도 차도가 없는 걸 보면<br/>
    아무래도, 트윌리오 문자전송 서비스의 전화번호를 처리하는 정규식에 문제가 있는 듯하다.

    ```shell
    Error: The number [내전화번호] is unverified. 
    Trial accounts cannot send messages to unverified numbers; 
    verify [내전화번호] at twilio.com/user/account/phone-numbers/verified, 
      or purchase a Twilio number to send messages to unverified numbers
   
    // +8210... -> +82010... 처리되고 있음 확인
    ```

3. 문자인증 관련 데이터베이스 사용<br/><br/>

    인증에 사용되는 토큰은 관계형 데이터베이스에 서버측 상태로 잠시 저장하고 용무가 끝나면 지우는 형식이다.<br/>
    여기서는 프리즈마를 사용해 데이터를 조작하므로 아래와 같이 처리한다.
    
    ```javascript
    // 이전 토큰 삭제
    await db.sMSToken.deleteMany({
      where: {
        user: { phone: phoneValid.data },
      },
    });
   
    // 트윌리오에서 인증토큰을 생성해 가져온다.
    // 인증토큰은 사용자의 전화기로 수신한 SMS 문자에 적힌 인증번호와 같다.
    const token = await getToken();
    await db.sMSToken.create({
      data: {
        token,
        user: {
          /* SMSToken 테이블은 User 테이블과 JOIN 관계 - 데이터 생성 시 연결된 사용자 정보가 꼭 필요하다.
             connectOrCreate: 연결할 사용자 정보가 있으면 연결, 없으면 신규 사용자 정보 생성
   
            * 참고: 서비스 정책 상 사용자 정보가 확실히 존재할 수밖에 없는 상황이라면 
                  connectOrCreate 대신 create를 써도 충분하다 */
          connectOrCreate: {
            where: { phone: phoneValid.data },
            // 기존 사용자 중 인증에 사용된 전화번호가 없다면 신규 사용자로 추가
            create: {
              username: crypto.randomBytes(10).toString('hex'),
              phone: phoneValid.data,
            },
          },
        },
      },
    });
    ```
## # 10. Products
___
1. 외부 이미지 허용

    넥스트는 설정에서 허용되지 않은 외부 이미지는 `<Image />` 컴포넌트에서 처리할 수 없다.<br/>
   `<Image />`는 브라우저와 사진 크기에 따라 알맞게 자동 최적화해주는 넥스트 내부 컴포넌트다.<br/><br/>

    단순히, 외부 이미지를 `<Image />`에서 보여지게게 하려면<br/>
    next.config.js 파일을 아래와 같이 설정한다.<br/>
    ```javascript
    const nextConfig = {
      images: {
        domains: ['avatars.githubusercontent.com'],
      },
      ...
    ```
    그러나, 이미지 최적화까지 고려한다면 아래와 같이 설정해줘야 한다.
    ```javascript
    const nextConfig = {
      images: {
        remotePatterns: [
          {
            hostname: 'avatars.githubusercontent.com',
          }
        ]
      },
      ...
    ```
    위 설정 없이 외부 이미지를 `src` 속성에 넣을 경우, 오류가 발생한다.<br/>
    최적화에는 리소스 소모가 불가피하므로, 무분별한 허용을 막자는 취지로 보인다.<br/><br/>
    [참고자료 - 넥스트 이미지 최적화](https://nextjs.org/docs/app/building-your-application/optimizing/images)<br/><br/>
2. 무한 스크롤 원리<br/><br/>
    
    상품목록에 적용된 무한 스크롤은 `useEffect`에서 `IntersectionObserver` 인터페이스를 통해 구현됐다.<br/>
    ```javascript
    const trigger = useRef<HTMLSpanElement>(null);
   
    useEffect(() => {
      const observer = new IntersectionObserver(
        (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
          console.log(entries);
        },
      );
      trigger.current && observer.observe(trigger.current);
      // 클린업
      return () => {
        observer.disconnect(); // 옵저버 제거
      };
    }, [page]);
   
    return (
      <div className="mb-20 p-5 flex flex-col gap-5 overflow-y-auto">
        {products.length > 0 ? (
         products.map((product) => <ProductList key={product.id} {...product} />)
        ) : (
          <NoProduct />
        )}
        {isLastPage ? (
         <span className="mx-auto py-4 text-lg">모든 상품을 불러왔습니다.</span>
        ) : (
          <span ref={trigger} className='...'>
            {isLoading ? '로딩 중' : '더 불러오기'}
          </span>
        )}
      </div>
    );
    ```
    `IntersectionObserver`는 관찰자(옵저버)로서 아래와 같이 인터페이스가 정의돼 있고<br/>
    `observer(대상)` 메소드로 대상을 관찰한다.
    
    ```javascript
    declare var IntersectionObserver: {
      prototype: IntersectionObserver;
      new(callback: IntersectionObserverCallback, options?: IntersectionObserverInit): IntersectionObserver;
    };
    ```
    `IntersectionObserverCallback`은 아래와 같다.
    ```javascript
    interface IntersectionObserverCallback {
      (entries: IntersectionObserverEntry[], observer: IntersectionObserver): void;
    }
    ```
    위 코드에서 콘솔 내용은 아래와 같이 정보가 확인되는데,
    ```javascript
    [IntersectionObserverEntry]
    0: IntersectionObserverEntry
      boundingClientRect: DOMRectReadOnly {x: 553.484375, y: 2911, width: 88.03125, height: 36, top: 2911, …}
      intersectionRatio: 0
      intersectionRect: DOMRectReadOnly {x: 0, y: 0, width: 0, height: 0, top: 0, …}
      isIntersecting: false
      isVisible: false
      rootBounds: DOMRectReadOnly {x: 0, y: 0, width: 1195, height: 913, top: 0, …}
      target: span.mt-[300vh].mb=86.text-sm.font-semibold.bg-orange-500.w-fit.mx-auto.px-3.py-2.rounded-md.hover:opacity-90.active:scale-95
      time: 86788.80000000075
      [[Prototype]]: IntersectionObserverEntry
      length: 1
    [[Prototype]]: Array(0)
    ```
    휠을 아래로 내려 추적대상인 `<span ref={trigger} {...props} />`이 화면에 보이게 되면<br/>
    아래와 같이 `isIntersecting` 정보가 `false` ➝ `true`로 갱신됐음을 알 수 있다.
    ```javascript
    [IntersectionObserverEntry]
    0: IntersectionObserverEntry
      boundingClientRect: 
      DOMRectReadOnly {x: 553.484375, y: 902.5, width: 88.03125, height: 36, top: 902.5, …}
      intersectionRatio: 0.2916666567325592
      intersectionRect: DOMRectReadOnly {x: 553.484375, y: 902.5, width: 88.03125, height: 10.5, top: 902.5, …}
      isIntersecting: true // 변경
      isVisible: false
      rootBounds: DOMRectReadOnly {x: 0, y: 0, width: 1195, height: 913, top: 0, …}
      target: span.mt-[300vh].mb=86.text-sm.font-semibold.bg-orange-500.w-fit.mx-auto.px-3.py-2.rounded-md.hover:opacity-90.active:scale-95
      time: 4164.5
      [[Prototype]]: IntersectionObserverEntry
      length: 1
    [[Prototype]]: Array(0) 
    ```
   
3. 리액트 훅 폼<br/><br/>

    [리액트 훅 폼](https://react-hook-form.com/)은 `form` 유효성 검사를 더 능률적으로 사용하도록 도와주는 모듈이다.<br/><br/>

    예를 들어, `react-dom`의 `usrFormState` 훅보다 더 간단하게 유효성 검사 코드를 작성할 수 있고<br/>
    인풋 입력값을 실시간 감지해 오류 메시지로 바로 보여주는 기능 등이 있다.<br/><br/>

    사용하려면 아래 두 모듈을 설치한다. 프로덕션 모드에서도 작동해야 하므로, 모두 일반 의존성으로 설치한다.<br/><br/>
    ```shell
    yarn add react-hook-form
    ```
    ```shell
    yarn add @hookform/resolvers
    ```
    `@hookform/resolvers`는 리액트 훅 폼과 함께 사용하는 유효성 검사 모둘이며,<br/>
    `zod` 등의 유효성 검사 모듈을 리액트 훅 폼에서 사용할 수 있도록 도와준다.<br/><br/>
    아래는 `zod` + `react-hook-form` + `@hookform/resolver` 사용 예시
    ```javascript
    // schenas.ts
    import { z } from 'zod';
    import { INVALID } from '@/libs/constants';
    
    export const productScheme = z.object({
    photo: z.string({ required_error: '사진이 필요합니다.' }),
    title: z
      .string({ required_error: '제목이 필요합니다.' })
      .min(10, INVALID.TOO_SHORT)
      .max(50, INVALID.TOO_LONG),
    description: z
      .string({ required_error: '자세한 설명이 필요합니다.' })
      .min(10, INVALID.TOO_SHORT)
      .max(300, INVALID.TOO_LONG),
    price: z.coerce
      .number({ required_error: '가격이 필요합니다.' })
      .min(100, '최소 100원 이상이어야 합니다.'),
    });
    
    export type ProductType = z.infer<typeof productScheme>;
    ```
    ```javascript
    // hooks.ts
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<ProductType>({ resolver: zodResolver(productScheme) });
    ```
    ```javascript
    // page.ts
    const { register } = useAddProduct();
   
    <form
        className="flex flex-col gap-5"
        action={onValid}
        onSubmit={(e) => onSubmitData(e)}
      >
      <Input
        type="text"
        placeholder="제목"
        errors={[errors.title?.message ?? '']}
        required
        {...register('title')}
      />
      ...
    </form>
    ```
    리액트 훅 폼은 `input` 요소에만 직접 적용되므로,<br/>
   `input`을 랩핑한 커스덤 인풋 컴포넌트에 리액트 훅 폼을 적용하려면<br/>
    반드시 부모를 `forwardRef`로 감싸 자식 인풋에 `ref` 속성을 넘겨줘야 한다.<br/><br/>

    ```javascript
    import { ForwardedRef, forwardRef, InputHTMLAttributes } from 'react';

    type InputProps = {
      name: string; // 필수속성화
      errors?: string[];
    };
    
    const _Input = (
      { name, errors = [], ...rest }: InputProps & InputHTMLAttributes<HTMLInputElement>,
      ref: ForwardedRef<HTMLInputElement>, // 추가
    ) => {
      return (
        <div className="flex flex-col gap-2">
          <input
            ref={ref}
            name={name}
            className="bg-transparent rounded-md w-full h-10 outline-none ring-1 focus:ring-4 transition ring-neutral-200 focus:ring-orange-500 border-none placeholder:text-neutral-400 disabled:bg-slate-300 dark:disabled:bg-slate-600 disabled:cursor-not-allowed"
            {...rest}
          />
          {errors?.map((err, idx) => (
            <span key={idx} className="text-red-500 font-medium">
              {err}
            </span>
          ))}
        </div>
      );
    };
    
    export default forwardRef(_Input);
    ```
## # 12. Modal
___
1. 경로 가로채기(Intercepting Routes)<br/><br/>

    넥스트는 [경로 가로채기](https://nextjs.org/docs/app/building-your-application/routing/intercepting-routes)라는 재미있는 기능을 제공한다.<br/><br/>

    간단히 말해, 사용자가 특정 페이지로 진입하려는 순간,<br/>
    넥스트가 그 라우팅을 중간에서 가로채 다른 라우트에 있는 페이지를 먼저 보여주는 기능이다.<br/>
    - 인스타그램은 넥스트의 [병렬 라우트](https://nextjs.org/docs/app/building-your-application/routing/parallel-routes)와 [경로 가로채기](https://nextjs.org/docs/app/building-your-application/routing/intercepting-routes)로 MPA 기반의 모달 UI를 구현했다.<br/><br/>

    간단히, 폴더 이름 앞에 `([가로챌 엡라우트 상대경로])`를 삽입하면 이 기능을 사용할 수 있다.<br/>
    - 가로챌 엡라우트 상대경로`(..)` 지정법은 [넥스트 경로 가로채기 안내](https://nextjs.org/docs/app/building-your-application/routing/intercepting-routes) 확인<br/><br/>

    가로챌 상대경로 이하 폴더 구조(라우트 경로)가 같으면<br/>
    넥스트는 브라우저에서 해당 페이지로 진입했을 때 가로챈 쪽의 인터셉트 페이지를 먼저 보여주고<br/>
    이 인터셉트 페이지에서 새로고침했을 때 마침내 실제 경로의 페이지가 보여지게 된다.<br/><br/>
    
    ![intercepting_route.png](public%2Fimages%2Fintercepting_route.png)<br/><br/>

2. 병렬 경로(Parallel Routes)<br/><br/>

    이 기능은 레이아웃 함께 반복될 페이지를 삽입하고 특정 조건에서 해당 페이지를 불러내고자 할 때 유용하다.
    - [넥스트 병렬 라우트 상세 페이지](https://nextjs.org/docs/app/building-your-application/routing/parallel-routes)<br/><br/>

    병렬 경로를 적용하려면 `layout.tsx`가 위치한 같은 경로에<br/>
   `@potato`처럼 `@`가 붙은 폴더를 생성하고 그 안에 `page.tsx` 컴포넌트를 추가한다.<br/>
    그리고 아래처럼 `layout.tsx`에서 가져다 쓰면 된다.<br/><br/>

    ```javascript
    export default async function RootLayout({
      children,
      potato,
    }: Readonly<{
      children: React.ReactNode;
      potato: React.ReactNode;
    }>) {
    return (
        <html lang="en">
          <body>
            {potato} // 레이아웃 적용
            {children}
          </body>
        </html>
      );
    }
    ```

    단, 넥스트는 파일기반 라우팅으로 작동하므로,<br/>
    전항의 사진처럼 현재 사용자가 보는 페이지 `url`과 일치하는 곳에 위치한<br/>
    `page.tsx`를 발견할 수 있을 때에만 오류 없이 작동한다.<br/><br/>

    따라서, 하위 경로로 접속하면 `layout.tsx`에서 병렬 라우트 컴포넌트를 찾을 수 없어<br/>
    `해당 페이지를 찾을 수 없다(404)`는 오류가 발생한다.<br/><br/>

    해결법은 병렬 라우팅 위치에 `page.tsx`와 별개로 `default.tsx`도 생성해 정의하는 것이다.<br/>
    이렇게 하면, 하위 라우트로 접속 시 `layout.tsx`가 찾을 수 없는 `page.tsx` 대신 `default.tsx`를 불러온다.<br/><br/>

    `default.tsx`는 404 오류 방지를 위해 쓰는 것으로, 보통 아래처럼 만든다.<br/><br/>
    ```javascript
    const Default = () => {
      return null;
    };
    
    export default Default;
    ```
    만약, 경로 가로채기 도중 데이터 패칭으로 인해 로딩 화면이 겹쳐 보일 수도 있는데,<br/>
    이 경우, 같은 방법으로 `loading.tsx`까지 병렬 경로에 만들면 된다.<br/><br/>
    ```javascript
    const Loading = () => {
      return null;
    };
    
    export default Loading;
    ```


## # 13. Caching Strategy
___
1. 불완전 캐시<br/><br/>

    넥스트에서 제공하는 [불완전캐시(unstable_cache)](https://nextjs.org/docs/app/api-reference/functions/unstable_cache)는 불필요한 중복 API 호출이나,<br/>
    성능최적화를 위해 무거운 연산을 미리 메모라이즈할 때 사용된다.<br/>
    서버 컴포넌트에서 사용되는 서버사이드 useMemo() 훅 버전이라 보면 된다.<br/><br/>

    불완전캐시로 불필요한 연산과 API 호출을 방지할 수 있지만,<br/>
    서버를 재시작하지 않는 한, 실제 데이터 변경이 있음에도 초기 메모라이즈된 값만 가져오게 되므로,<br/>
    데이터패칭 필요 시점에 반드시 캐시를 수동 갱신해야 혼란이 없다.<br/><br/>

    이에, 넥스트 캐시는 다양한 캐시 갱신 옵션*을 제공하고 있다.<br/><br/>

    * 정확히 말해, 캐시는 `.next` 폴더 안에 저장된 정적 `html` 코드 상태를 의미하고,<br/>
        캐시 갱신이란, 이 캐시 데이터 중 일부를 데이터패칭(변경)하는 방법을 설정하는 것이다.<br/><br/>
   
    1. revalidate 옵션 설정<br/>
       아래 코드에서는 `unstable_cache()` 세 번째 인자에<br/>
       '콜백 최초 실행 후 60초 후 콜백 재실행' 시<br/>
       캐시를 콜백의 새 반환값으로 갱신한다는 옵션이 붙어 있다.<br/>
   
        ```javascript
        import { unstable_cache as nextCache } from 'next/cache';
        // 넥스트 캐시 사용 - unstable_cache(콜백, [전역 키], 갱신주기 옵션)
        const getCachedProducts = nextCache(getInitialProducts, ['home-products'], {
            revalidate: 60,
        });
    
        export const metadata = {
          title: '홈',
        };
        
        const Products = async () => {
          const initialProducts: InitialProducts = await getCachedProducts();
          ...
        ```

        이 방식은 잦은 캐시 변경 시 불완전 캐시 목적을 퇴색시키므로,<br/>
        적절한 갱신주기 설정으로 균형을 맞춰야 한다.<br/><br/>
   
    2. revalidatePath('경로')<br/><br/>
   
        아래는 사용자가 폼 액션으로 `revalidatePath()` 메서드를 사용해 캐시를 갱신하는 방법이다.<br/>
        이 명령은 특정 페이지의 모든 캐시 갱신을 즉시 실행한다.
        ```javascript
        import { revalidatePath, unstable_cache as nextCache } from 'next/cache';
        
        const getCachedProducts = nextCache(getInitialProducts, ['home-products']);
        
        const Products = async () => {
          const initialProducts: InitialProducts = await getCachedProducts();
        
          const revalidate = async () => {
            'use server';
            revalidatePath('/home');
          };
        
          return (
            <div className="p-5 flex flex-col gap-5">
              <form action={revalidate}>
                  <button>Revalidate</button>
              </form>
              <ProductListWrapper initialProducts={initialProducts} />
              ...
            </div>
          );
        };
        ```
        그러나 `revalidatePath('경로')`는 캐시 갱신을 허용만 할 뿐,<br/>
        실제 화면에 보여줄 내용까지 갱신하지 않는다.<br/>
        즉, 페이지 새로고침까지 해야 실제 변경된 캐시값을 확인할 수 있다.<br/><br/>
   
        작동방식을 볼 때, 경로 가로채기 직후 새로고침을 통해 진입 가능한 페이지에 잘 어울린다.<br/><br/>
   
    3. revalidateTag('태그')<br/><br/>
    
        `revalidateTag('태그')`는 여러 캐시를 참조하고 있을 때 특정 캐시만 갱신하려 할 때 유용하다.
    
        ```javascript
        ...
        import { revalidateTag, unstable_cache as nextCache } from 'next/cache';
        
        const getCachedProduct = nextCache(getProduct, ['products-detail'], {
          tags: ['detail', 'info'], // 캐시 식별자 태그 설정
        });
        
        const getCachedProductTitle = nextCache(getProductTitle, ['products-title'], {
          tags: ['title', 'info'], // 캐시 식별자 태그 설정
        });
        
        export const generateMetadata = async ({ params }: { params: { id: string } }) => {
          const product = await getCachedProductTitle(Number(params.id));
          return {
            title: product?.title,
          };
        };
        
        const ProductDetail = async ({ params }: { params: { id: string } }) => {
          const id = Number(params.id);
        
          const product = await getCachedProduct(id);
          if (!product) return notFound();
        
          const revalidate = async () => {
            'use server';
            // revalidateTag('title'); // title 태그 캐시들만 갱신하고자 할 때
            revalidateTag('info'); // info 태그 캐시들만 갱신하고자 할때
          };
        
          return (
            ...
              <div className="p-5">
                <h1 className="text-2xl font-semibold">{product.title}</h1>
                <p>{product.description}</p>
              </div>
              <form action={revalidate}>
                {isOwner && (
                  <Button type="submit" method="delete">
                    상품명 갱신
                  </Button>
                )}
              </form>
            );
            ...
        };
        ```
    4. fetch cache<br/><br/>
        
        `fetch()`는 넥스트 캐시와 연동 가능한 자동캐싱 기능이 있다.<br/>
        아래는 `fetch()` 함수를 사용해 넥스트 캐시를 설정한 방식이다.<br/>
   
        ```javascript
        const getProduct = () => {
          fetch('https://api.com', {
            next: {
              // revalidate: 60,
              tags: ['hello', 'info']
            }    
          })
        }
        ```
        이렇게 해두면, `revalidateTag('태그')`를 통한 캐시 갱신이 가능하며,<br/>
        앞서 설명한 그 외 캐시 갱신법 또한 모두 적용 가능하다.<br/><br/>
   
        일반적인 DB 업데이트 직후 페이지 데이터패칭도<br/>
        `fetch()`에 `revalidate: 0`을 적용한 것으로,<br/>
        넥스트 캐시를 응용한 흔한 데이터패칭 방법 중 하나다.<br/><br/>

2. 경로 세그먼트 구성<br/><br/>

    [경로 세그먼트 구성(Route Segment Config
   )](https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config)을 사용하면<br/>
    `page`, `layout`, `route handler` 동작을 다양하게 구성할 수 있다.<br/><br/>
    ![route_segment_config.png](public%2Fimages%2Froute_segment_config.png)<br/><br/>

    예를 들어, 아래 코드를 전역으로 `page.tsx`에 넣어 `dynamic` 상수를 변경하면<br/>
    해당 페이지는 새로고침때마다 불완전 캐시 설정 여부와 상관 없이<br/>
    무조건 캐시를 강제 갱신해 동적페이지처럼 작동시킨다.<br/><br/>

    ```javascript
    export const dynamic = 'force-dynamic'; // 기본값: 'auto'
    ```
    기본 캐시 갱신 방식도 아래처럼 변경 가능하다.<br/>
    이렇게 하면, 특정 캐시만 변경해야 할 특별한 경우가 아니면<br/>
    앞에서 설명한 굳이 `1. 불완전 캐시`를 적용할 필요가 없다.<br/><br/>

    ```javascript
    export const revalidate = 30; // 기본값: 'false'
    ```
   
3. 동적 파라미터

    `yarn build` 명령을 사용하면, 넥스트가 각 페이지를 어떤 유형으로 빌드하는지 확인할 수 있다.<br/>
    ![yarn_build.png](public%2Fimages%2Fyarn_build.png)<br/><br/>

    맨 아래 3줄만 보면, 이런 뜻이다.<br/><br/>
    - ○  (정적)   정적페이지로 사전 렌더됨
    - ●  (SSG)   `getStaticProps`를 사용해 정적 `HTML`로 사전 렌더됨
    - λ  (동적)   `Node.js`를 사용해 서버에서 렌더됨<br/><br/>

    이 중에서 `SSG`는 지정한 정적 파라미터가 실제 있다고 가정하고<br/>
    해당 파라미터에 대응하는 모든 페이지를 정적 페이지로 만든 것이다.<br/>
    ```shell
    ├ ● /products/[id]                       1.07 kB        97.2 kB
    ├ /products/1
    ├ /products/10
    ├ /products/11
    └ [+4 more paths]
    ```
    그리고 위 빌드는 `page.tsx`에 추가된 아래 정적 파라미터 생성 함수에 의해 실행됐다.
    ```javascript
    export const generateStaticParams = async () => {
      const products = await getProducts(); // DB 조회 => 상품 id 목록 반환
      return products.map((product) => ({ id: String(product.id) })); // ['1', '10', '11', ...]
    };
    ```
    이렇게 하면, 페이지 진입마다 일일이 DB에 접촉하고 그때마다 서버사이드 렌더링할 필요 없이<br/>
    .next 폴더 안에 미리 `yarn build` 명령으로 만들어진 정적페이지를 가져다 쓸 수 있게 된다.<br/><br/>

    미리 만들어진 정적 페이지를 바로 가져다 쓸 수 있다면,<br/>
    서버사이드 렌더링을 위해 사용자가 기다릴 필요도 없게 되고<br/>
    굳이 스켈레톤 디자인 같은 로딩화면을 보여줄 필요도 없게 된다는 뜻이다.<br/><br/>

    대신 이 방식은 HTML을 저장할 서버 공간이 그만큼 많이 필요하고<br/>
    주기적으로 기존 캐시를 갱신하는 코드가 같은 `page.tsx` 안에 있어야 한다.<br/><br/>

    어떻게 보면, `generateStaticParams()`는 DB에 새 데이터가 업로드될 때마다<br/>
    `yarn build`를 재실행해야 할 것 같은 느낌도 들 것이다.<br/><br/>

    그러나 `yarn start`를 통해 실제 프로덕션 모드로 애플리케이션을 실행하면<br/>
    새 데이터(id)로 진입했을 때 곧바로 서버에서 이에 대응하는 새 정적 페이지를 생성하는 걸 알 수 있다.<br/><br/>

    즉, 사전 랜더된 정적 페이지가 존재하면 그걸 보여주고<br/>
    없으면, 즉시 새로 정적 페이지를 만들어(렌더링) 보여줌과 동시에<br/>
    새 정적 페이지로 .next 폴더 아래 자동 추가 저장하고 있다는 의미다<br/><br/>

    이는 넥스트 페이지별 경로 세그멘트 구성이 아래와 같이 동적 파라미터를 기본 허용하고 있는데서 기인한다.<br/>

    ```javascript
    export const dynamicParams = true;
    ```

    만약, 위 코드를 `page.tsx`에 추가하고 `false`로 상수 값을 바꿀 경우,<br/>
    오직, 기존에 사전 렌더된 정적 페이지들만 넥스트에서 쓰게 되므로,<br/>
    신규 데이터에 대응하는 페이지로 진입할 때 404 에러가 뜨게 된다.<br/><br/>

## # 주의사항
___
1. 넥스트에서 함수는 "use server" 선언을 하지 않는 한 클라이언트 컴포넌트를 직접 통과할 수 없다.

    ```javascript
    import { delProduct } from '@/app/home/[id]/features';
    import db from '@/libs/db';

    ...
    const delProduct = async () => {
      'use server';
      await delProduct(product.id);
    };

    return (
      ...
        <form action={delProduct}>
          {isOwner && <Button type="submit" text="상품 삭제" method="delete" />}
        </form>
      ...
      );
    };

    export default ProductDetail;
    ```
    - 직접 접근 시 아래 오류가 뜬다.<br/><br/>

    ```shell
    Error: Functions cannot be passed directly to Client Components unless you explicitly expose it by marking it with "use server".
      <form action={function} children=...>
                   ^^^^^^^^^^
        at stringify (<anonymous>)
    ```
   
2. 환경변수<br/><br/>
    
    넥스트는 접두어로 `NEXT_PUBLIC_`를 붙이지 않으면 클라이언트 사이드에서 참조할 수 없다.<br/>
    아래는 넥스트 프로젝트에서 서버와 클라이언트 사이드 모두 참조 가능한 환경변수 네이밍 예시다.<br/><br/>
    ```dotenv
    NEXT_PUBLIC_CLOUDFLARE_ACCOUNT_ID="[환경변수 값]"
    NEXT_PUBLIC_CLOUDFLARE_ACCOUNT_HASH="[환경변수 값]"
    NEXT_PUBLIC_CLOUDFLARE_API_KEY="[환경변수 값]"
    NEXT_PUBLIC_CLOUDFLARE_IMAGE_DELIVERY_URL="[환경변수 값]"
    ```