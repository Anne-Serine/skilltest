function Button({ icon, text, id, onClick }) {
  const primary = "bg-app-primary py-1 px-2 text-white";

  return (
    <button
      value={id}
      className={primary}
      id={id}
      onClick={(e) => onClick(e.target.value)}
    >
      {icon}
      {text}
    </button>
  );
}

export default Button;
