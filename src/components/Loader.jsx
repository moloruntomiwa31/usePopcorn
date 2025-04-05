export default function Loader() {
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <div className="flex flex-col items-center justify-center h-full">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white"></div>
        <p className="text-lg text-white">Loading...</p>
      </div>
    </div>
  );
}
