const sizes = {
  sm: 'w-5 h-5 border-2',
  md: 'w-8 h-8 border-2',
  lg: 'w-12 h-12 border-[3px]',
};

const LoadingSpinner = ({ size = 'md', fullScreen = false, label = 'Loading...' }) => {
  const spinner = (
    <div className="flex flex-col items-center justify-center gap-3">
      <div
        className={`${sizes[size]} rounded-full border-primary/20 border-t-primary animate-spin`}
        role="status"
        aria-label={label}
      />
      {fullScreen && <p className="text-textMuted text-sm">{label}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">{spinner}</div>
    );
  }

  return spinner;
};

export default LoadingSpinner;
