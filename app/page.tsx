'use client';
import { useRef, useState } from 'react';

export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const toggleLoading = () => {
    setIsLoading(!isLoading);
    cardRef.current?.classList.toggle('*:animate-pulse');
  };

  return (
    <main className="bg-gray-100 sm:bg-red-100 md:bg-green-100 lg:bg-cyan-100 xl:bg-orange-100 2xl:bg-purple-100 h-screen flex items-center justify-center p-5 flex-col gap-4">
      <div
        ref={cardRef}
        className="bg-white shadow-lg p-5 rounded-3xl w-full max-w-screen-sm flex flex-col gap-3"
      >
        {['Elian', 'Me', 'You', 'Yourself', ''].map((person, idx) => (
          <div key={idx} className="flex items-center gap-5">
            <div className="size-10 bg-blue-400 rounded-full" />
            {isLoading ? (
              <>
                <div className="bg-gray-100 h-5 w-1/2 rounded-full" />
                <div className="bg-gray-100 h-5 w-1/3 rounded-full" />
              </>
            ) : (
              <>
                <span className="text-lg font-medium empty:w-24 empty:h-5 empty:rounded-full empty:animate-pulse empty:bg-gray-300">
                  {person}
                </span>
                <div className="size-6 bg-red-500 text-white flex items-center justify-center rounded-full relative">
                  <span className="z-10">{idx}</span>
                  <div className="size-6 bg-red-500 text-white flex items-center justify-center rounded-full absolute animate-ping " />
                </div>
                <div className="size-6 animate-bounce flex items-center justify-center rounded-full">
                  <span>🎉</span>
                </div>
                <div className="size-6 animate-spin text-white flex items-center justify-center rounded-full">
                  <span>⌛️</span>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
      <button
        className="bg-teal-500 text-white px-3 py-2 rounded-xl"
        onClick={toggleLoading}
      >
        {isLoading ? 'Loading' : 'has loaded'}
      </button>
    </main>
  );
}

/*
  1. tailwind css 반응형 수정자의 경우, 기본 가장 작은 사이즈부터 스타일을 적용하도록 설계돼 있다.

    <main className="bg-gray-100 sm:bg-red-100" />{children}</main

    위 코드에서 main 은 배경색이 회색100에서 가로 640px이 되는 순간 빨강100으로 변경된 이후부터 계속 빨강 100이 유지된다.
    md, lg, xl과 같은 더 큰 사이즈가 적용됐을 때 추가 테일윈드 유틸리티 클래스 수정자가 여기서는 존재하지 않기 때문이다.

  2. 그라디안트 효과 주기

    bg-gradient-to-tr from-cyan-500 via-yellow-400 to-purple-400

  3. peer

    if input className includes peer,
    other brother elements includes className like 'peer-invalid:block' will activate style.

    형제의 peer 가 지정된 폼 요소 속성 변경을 감지해 peer- 접두어를 같은 형제에 사용함으로써 조건부 스타일을 활성화하는 수정자
    같은 형제 요소끼리만 적용 가능 - peer 영역을 벗어나면 peer-[className] 효과가 발동하지 않는다.

  4. *:[className]

    *:outline-none

    자식 요소 전부 공통 스타일을 적용하고자 할 때 부모 요소에서 걸 수 있는 수정자
    자식만 될 뿐, 손자 이상 깊은 스타일의 상속은 불가하다.

  5. has-[.className | #idName | :modifier | ...]:

    has-[.peer]:bg-green-100
    has-[#logInBtn]:bg-green-100
    has-[:invalid]:bg-red-100

    자식 요소들 중 특정 식별자 또는 테일윈드 수정자 등을 포함하는 요소가 하나라도 있다면 지정한 스타일을 적용한다.
    손자 이상 깊은 요소까지 감별하는 듯하다.

    이러한 동적 스타일 적용은 최근 업데이트 된 강력한 CSS 고유 기능으로 제공되며 가상 클래스 기반으로 작동한다.

  6. 배열 스타일
    6-1. odd:[className] even:[className]

      odd:bg-gray-100 even:bg-cyan-100

      map 배열 메서드로 처리한 배열 컴포넌트 부모에서 적용 가능
      odd - 홀수, even - 짝수

    6.2 first:[className], last:[className]

      first:border-t-0
      last:border-b-0

      배열 요소 중 맨 처음(first) 또는 마지막(last)에만 지정 스타일 적용

    6.3 empty:[className]

      empty:w-24 empty:h-5 empty:rounded-full empty:animate-pulse empty:bg-gray-300

      자식으로 배치되어야 할 배열 정보가 빈 문자열 처럼 비어 있다고 판명된 경우, 지정된 스타일 적용

*/
