import { fetchData, getData } from '@/app/extras/[[...potato]]/services';

const Extras = async ({ params }: { params: { potato: string } }) => {
  await getData(); // 단순 로그 테스트용

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
    </div>
  );
};

export default Extras;
