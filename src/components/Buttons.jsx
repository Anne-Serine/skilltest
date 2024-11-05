import { Link } from "lucide-react";

function Button({ icon, text, id, onClick, type="primary", isActive, url }) {
  const primary = "bg-app-primary hover:bg-app-header py-1 px-2 text-white rounded-sm min-w-[5rem]";
  const secondary = "bg-gray-50 border hover:border-app-warn hover:text-app-warn border-black p-1 min-w-[5rem] rounded-sm";
  const tertiaryBase = "border w-full p-1 flex flex-col gap-1 items-center justify-center text-sm sm:w-[3rem]"
  const tertiary = isActive ? "bg-gray-200" : "bg-gray-50 hover:bg-gray-300";

  const style =
    type === "primary"
      ? primary
      : type === "secondary"
      ? secondary
      : type === "tertiary"
      ? `${tertiaryBase} ${tertiary}`
      : primary

  return url ? (
    <Link to={url} className={style}>
      {icon}
      {text}
    </Link>
  ) : (
    <button
      value={id}
      className={style}
      id={id}
      onClick={(e) => onClick(e.target.value)}
    >
      {icon}
      {text}
    </button>
  );
}

export default Button;
