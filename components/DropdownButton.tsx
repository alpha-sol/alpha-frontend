import Image from 'next/image';

interface Props {
  onPress: () => void;
  value: string;
  className?: string;
  // TODO
  values?: string[];
}

const DropdownButton = ({ onPress, value, className }: Props) => {
  return (
    <button
      className={`bg-gray text-white flex flex-row py-2 px-4 rounded ${className}`}
      onClick={onPress}
    >
      {value}
      <div className="w-2" />
      <Image
        src="/assets/icons/chevron-down.svg"
        width={24}
        height={24}
        alt="Sort dropdown icon"
      />
    </button>
  );
};

export { DropdownButton };
