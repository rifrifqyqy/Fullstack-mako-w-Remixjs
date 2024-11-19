// app/components/LoadingModal.tsx

export default function LoadingModal({ title }: { title: string }) {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-50">
      <div className="rounded-2xl bg-white px-16 py-8 shadow-lg">
        <div className="flex flex-col items-center justify-center gap-8 text-center">
          <img
            src="/gif/breadbutter.gif"
            title="loading"
            className="h-32"
            alt="loading"
          ></img>
          <p className="text-lg text-gray-700">{title}</p>
        </div>
      </div>
    </div>
  );
}
