# Carrot Market Reloaded

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
    
    플러그인 적용 시 미리 npm 설치 후 서버를 재식작해야 함에 주의!


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
     따라서, 인풋의 number 타입 입력 값은 정확한 검사를 위해 coerce를 거쳐야 한다.
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
    [프리즈마](https://www.prisma.io/)는 대중적인 노드 기반 ORM 중 하나다.<br/>
    프리즈마 설치 전에 기본적인 DB 개발 환경은 갖춰두도록 하자. 설치 명령은 아래와 같다.
    ```shell
    yarn add prisma
    ```
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
    
    순서대로 하려면 먼저 .env 파일을 확인하고 데이터베이스 정보를 입력해준다.<br/>
    데이터베이스 정보(DATABASE_URL)는 개발자가 선택한 데이터베이스 유형마다 다른 패턴을 가지므로<br/>
    프리즈마 공식 사이트에서 정확히 확인하고 기재해야 한다.<br/><br/>
   
    * 초기 .env 파일을 보면, 데이터베이스별 프리즈마 연동법을 설명한 [상세 페이지](https://pris.ly/d/connection-strings)가 기재돼 있으니 확인
    * 데이터베이스 정보는 노출해서는 안 되는 개인정보이므로, .gitignore 파일에 `.env` 추가 필수
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
    `schema.prisma` 파일에 입력된 스키마 모델을 토대로 새로운 데이터베이스를 만들어주는 명령이다 
    ```shell
    npx prisma migrate dev
    ```
    그러면 아래와 같은 질문이 뜨는데, 아래와 같이 모델과 관련성 있는 이름을 짓고 엔터를 누른다.
    ```shell
    ? Enter a name for the new migration: add_user
    ```
    이후 prisma 폴더 아래 migrations 폴더가 새로 생성된 걸 확인할 수 있다.<br/>
    이 시점에서 데이터베이스가 새로 생성된 것도 확인 가능한데,<br/>
    약간의 시간차가 발생할 수 있으니, 새로고침을 계속 눌러준다.<br/><br/>
    또, 이때 프리즈마에서 아래 위치에<br/>
    방금 만든 스키마를 위한 JS 파일과 타입까지 새로 생성했다는 사실도 확인할 수 있다.<br/><br/>
    
    - `node_modules/prisma/client`,<br/>
    - `node_modules/@prisma/@client`<br/><br/>
    이 코드들 또한 개발에 활용 가능하므로 다음과 같이 import 해서 쓰면 된다.<br/>
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