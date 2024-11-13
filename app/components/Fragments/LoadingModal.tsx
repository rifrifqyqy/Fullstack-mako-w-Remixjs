// app/components/LoadingModal.tsx

export default function LoadingModal() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="rounded-2xl bg-white p-6 shadow-lg">
        <div className="text-center">
          <iframe
            src="https://lottie.host/embed/acf744ff-2337-49b9-b6cd-59232a6e69ef/41Awo0aEoT.lottie"
            title="loading"
          ></iframe>
          <p className="text-lg text-gray-700">Sedang menyimpan data...</p>
        </div>
      </div>
    </div>
  );
}
