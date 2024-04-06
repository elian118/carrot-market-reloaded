import { fetchData, getFetchData } from '@/app/extras/[[...potato]]/services';
import Image from 'next/image';
import heaveImg from '@/public/images/too-big-size-nature.jpg';

const Extras = async ({ params }: { params: { potato: string } }) => {
  await getFetchData(); // 단순 로그 테스트용
  // const hackedData = await getHackedData(); // 해킹 테스트용

  return (
    <div className="flex flex-col gap-3 py-10">
      <h1 className="text-6xl font-metalica">Extras!</h1>
      <h1 className="text-6xl font-rubik">Extras!</h1>
      <h2 className="font-roboto">So much more to learn!</h2>
      <h2 className="font-nanumgothic">나눔고딕 폰트 샘플</h2>
      <h2 className="font-notosanskr">노토산스코리아(Noto Sans Kr) 폰트 샘플</h2>
      <h2 className="font-notoserifkr">노토세리프코리아(Noto Serif Kr) 폰트 샘플</h2>
      <hr />
      {params.potato}
      <hr />
      <form action={fetchData}>
        <button>revalidate</button>
      </form>
      <hr />
      <h1 className="text-6xl font-rubik">Too Big Image!</h1>
      <div className="flex flex-col gap-2">
        <Image
          className="rounded-xl"
          src={heaveImg}
          alt="heavy image"
          placeholder="blur"
        />
      </div>
      <hr />
      {/*<HackedComponent data={hackedData} />  // 해킹 테스트 클라이언트 컴포넌트*/}
    </div>
  );
};

export default Extras;
