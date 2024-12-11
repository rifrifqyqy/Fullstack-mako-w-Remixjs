// app/components/LoadingModal.tsx

export default function LoadingModal({ title }: { title: string }) {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-50">
      <div className="rounded-2xl bg-white px-12 py-4 shadow-lg md:px-16 md:py-8">
        <div className="flex flex-col items-center justify-center gap-8 text-center">
          <img
            src="/gif/breadbutter2.gif"
            title="loading"
            className="h-24 md:h-32"
            alt="loading"
          ></img>
          <p className="text-sm text-gray-700 md:text-lg">{title}</p>
        </div>
      </div>
    </div>
  );
}
