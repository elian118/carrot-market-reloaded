import { useCallback, useEffect, useState } from 'react';
// 아래 커스덤 훅은 useEffect 에서 비동기 함수를 호출하려 할 때 사용
export const useAsync = <T>(
  asyncCallBack: () => Promise<T>,
  deps: any[] = [],
): [Error | null, () => void] => {
  const [error, setError] = useState<Error | null>(null);
  useEffect(() => {
    asyncCallBack().catch((e) => setError(e));
  }, deps);
  const resetError = useCallback(() => setError(() => null), []);
  return [error, resetError];
};

/*
    뷰 컴포넌트에서 사용법
     - 아래 예제는 deps 생략, asyncCallBack 인자만 전달
     - error 존재 시, 다른 함수에서 경고창을 띄우든 어떠한 형태로든 호출해 error 사용 가능

    const [infos, setInfos] = useState<Name[]>([]);
    const [error, resetError] = useAsync(async () => {
        setInfos([]);
        resetError(); // Error 객체 초기화
        // await Promise.reject(new Error('알 수 없는 오류가 발생했습니다.')); // 오류 테스트 하려면 주석 풀기
        const infos = await getInfo(); // getInfo() => Promise 객체 호출
        setInfos(infos);
    )
*/
