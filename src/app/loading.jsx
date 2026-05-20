import Image from "next/image";

const Loading = () => {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        {/* Spinner */}
        <div className="relative size-12">
          <div className="absolute inset-0 rounded-full border-4 border-muted" />
          <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-primary" />
        </div>
        {/* Brand */}
        <span className="flex items-center gap-1.5">
          <Image src="/logo.svg" alt="MediQueue logo" width={24} height={24} />
          <span className="flex items-center gap-0.5">
            <span className="text-lg font-heading text-foreground">Medi</span>
            <span className="text-lg font-sans font-bold text-primary">
              Queue
            </span>
          </span>
        </span>
      </div>
    </div>
  );
};

export default Loading;
