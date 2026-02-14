import Image from "next/image";
import React from "react";

const Logo = () => {
  return (
    <div className="flex items-center gap-3">
      <Image
        src="/images/logo/Icon-removebg.png"
        alt="Adal Medicine Logo"
        width={50}
        height={50}
        className="rounded-full"
      />
      <span className="text-2xl font-semibold text-[#2B7A78]">
        ADAL MEDICINE
      </span>
    </div>
  );
};

export default Logo;
