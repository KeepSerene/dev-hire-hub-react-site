function Card({ children, bgColor = "bg-gray-100" }) {
  return (
    <div className={`${bgColor} rounded-lg p-6 shadow-md`}>{children}</div>
  );
}

export default Card;
