import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <div className="">
      <div className="max-w-[1200px] w-[75%] mx-auto flex justify-center mb-10">
        <Link href={"/"}>
          <Image
            src={"/pokemon2.svg"}
            width={250}
            height={100}
            alt="Pokedex Logo"
          />
        </Link>
      </div>
    </div>
  );
};

export default Header;
