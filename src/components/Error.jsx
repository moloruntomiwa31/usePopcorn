export default function Error({message}) {
  return (
    <div>
      <p className="text-center text-red-500">{message}</p>
      <p className="text-center text-red-500">
        Please check your internet connection or try again later.
      </p>
    </div>
  );
}
