export function LoadingComponent() {
  const text = 'Loading...';

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 rounded-full border-2 border-yellow-300 border-t-yellow-500 animate-spin" />
      </div>

      <p className="mt-4 flex text-sm text-black font-normal">
        {text.split('').map((char, index) => (
          <span
            key={index}
            className="inline-block animate-bounce"
            style={{
              animationDelay: `${index * 0.12}s`,
              animationDuration: '1.2s',
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </p>
    </div>
  );
}
