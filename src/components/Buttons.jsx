function Button({ icon, text, type, id, onClick }) {
  const primary = "bg-app-primary py-1 px-2 text-white";

  return (
    <button
      value={id}
      onClick={(e) => onClick(e.target.value)}
      className={primary}
      id={id}
    >
      {icon}
      {text}
    </button>
  );
}

export default Button;
