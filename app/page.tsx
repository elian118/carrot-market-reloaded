export default function Home() {
  return (
    <main className="bg-gray-100 h-screen flex items-center justify-center p-5 dark:bg-gray-700">
      <div className="bg-white shadow-lg p-5 rounded-3xl w-full max-w-screen-sm dark:bg-gray-600">
        <div className="flex justify-between items-center mb-4">
          <div className="flex flex-col">
            <span className="text-gray-600 font-semibold dark:text-gray-300">
              In transit
            </span>
            <span className="text-4xl font-semibold -mb-1 dark:text-white">Coolblue</span>
          </div>
          <div className="size-12 bg-orange-500 rounded-full flex flex-col items-center justify-center">
            <p className="text-sm font-medium text-white leading-3">Cool</p>
            <p className="text-sm font-medium text-white leading-3">blue</p>
          </div>
        </div>
        <div className="my-2 flex gap-2 items-center">
          <span className="px-2.5 py-1.5 bg-green-400 text-white uppercase font-medium rounded-full transition hover:bg-green-500 hover:scale-110">
            Today
          </span>
          <span className="text-xl font-medium dark:text-gray-100">9:30-10:30u</span>
        </div>
        <div className="relative">
          <div className="bg-gray-200 w-full h-2 rounded-full absolute" />
          <div className="bg-green-400 w-2/3 h-2 rounded-full absolute" />
        </div>
        <div className="flex justify-between items-center mt-5 text-gray-600 dark:text-gray-300">
          <span>Expected</span>
          <span>Sorting center</span>
          <span>In transit</span>
          <span className="text-gray-400 dark:text-gray-500">Delivered</span>
        </div>
      </div>
    </main>
  );
}
