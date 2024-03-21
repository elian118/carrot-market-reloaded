# Carrot Market Reloaded
___
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

___
## #4. Authentication UI
___

1. 하이드레이션 경고
    ```
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
2. 스타일 정보 없음 경고

    ```
    Warning: Extra attributes from the server: class,style,data-inboxsdk-session-id
     at html
    ...
    ```

    개발자 도구 요소에서 body 태그 style 정보가 없어 발생

   ```html
   <body style class='__className_aaf875 bg-gray-100 dark:bg-gray-800 max-w-screen-sm...'>
    ...       
   </body>
   ```
   딱히 해결책은 없어 보인다. 경고니 무시하자.