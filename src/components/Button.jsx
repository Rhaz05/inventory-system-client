const Button = ({
  eventHandler,
  name,
  children,
  isDisabled = false,
  style,
}) => {
  return (
    <button
      onClick={eventHandler}
      disabled={isDisabled}
      className={`capitalize border rounded p-2 hover:bg-teal-400 hover:text-white border-teal-400 text-teal-400
    disabled:text-gray-600/75 disabled:bg-slate-200/80 disabled:border-gray-600/45 ${style}`}
    >
      {name} {children}
    </button>
  );
};

export default Button;
