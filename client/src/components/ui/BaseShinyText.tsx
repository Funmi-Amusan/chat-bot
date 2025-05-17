type BaseShinyTextProps = {
    text: string;
    speed?: number;
    className?: string;
  };

const ShinyText = ({ text, speed = 5, className = '' }: BaseShinyTextProps) => {
    const animationDuration = `${speed}s`;
  
    return (
      <div
        className={`text-[#808080a4] dark:text-[#b5b5b5a4] bg-clip-text inline-block animate-shine ${className}`}
        style={{
          backgroundImage: 'linear-gradient(120deg, rgba(255, 255, 255, 0) 40%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0) 60%)',
          backgroundSize: '200% 100%',
          WebkitBackgroundClip: 'text',
          animationDuration: animationDuration,
        }}
      >
        {text}
      </div>
    );
  };
  
  export default ShinyText;
