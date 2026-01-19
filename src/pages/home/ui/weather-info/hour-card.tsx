const HourCard = () => {
  return (
    <div className="flex flex-col items-center border border-black/20 rounded-lg px-3 py-2">
      <em className="not-italic font-semibold text-sm">12시</em>
      <img src="/01d.svg" alt="맑음" className="size-12" />
      <strong>-20°</strong>
    </div>
  );
};

export default HourCard;
