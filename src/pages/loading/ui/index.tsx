import Skeleton from "../../../shared/ui/skeleton";

const Loading = () => {
  return (
    <>
      <header className="border-b border-black/20 fixed top-0 left-0 right-0 bg-white">
        <div className="max-w-5xl mx-auto flex justify-between items-center h-12.5 px-4 lg:px-0">
          <Skeleton width={230} height={32} />
          <Skeleton width={50} height={32} />
        </div>
      </header>
      <div className="mt-32.5 max-w-5xl mx-auto px-4 flex flex-col gap-10 lg:px-0 lg:flex-row">
        <main className="lg:max-w-175 w-full">
          <div className="flex flex-col items-center gap-10">
            <section className="flex flex-col items-center gap-10">
              <div className="flex items-center">
                <Skeleton shape="circle" width={200} height={200} />
              </div>
              <div className="flex flex-col items-center gap-1">
                <Skeleton width={50} height={28} />
                <Skeleton width={240} height={24} />
              </div>
            </section>
            <section className="w-full max-w-full">
              <Skeleton height={144} />
            </section>
          </div>
        </main>
        <aside className="flex-1">
          <Skeleton width={284} height={187} />
        </aside>
      </div>
    </>
  );
};

export default Loading;
