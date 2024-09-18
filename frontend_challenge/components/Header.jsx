import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <div className="py-5">
      <div className="max-w-[1200px] w-[95%] mx-auto flex justify-center">
        <Link href={"/"}>
          <Image
            src={"/logo.svg"}
            width={300}
            height={150}
            alt="Pokedex Logo"
          />
        </Link>
      </div>
    </div>
  );
};

export default Header;
