const CardLoading = () => {
  return (
    <div className="border p-4 w-40 sm:w-48 md:w-56 rounded-lg animate-pulse bg-white">
      <div className="h-24 md:h-32 w-full bg-blue-50 rounded"></div>
      <div className="mt-2 h-5 w-16 bg-blue-50 rounded"></div>
      <div className="mt-1 h-4 w-3/4 bg-blue-50 rounded"></div>
      <div className="mt-1 h-4 w-1/2 bg-blue-50 rounded"></div>

      <div className="flex items-center justify-between gap-3 mt-2">
        <div className="h-6 w-16 bg-blue-50 rounded"></div>
        <div className="h-6 w-12 bg-blue-50 rounded"></div>
      </div>
    </div>
  );
};

export default CardLoading;
