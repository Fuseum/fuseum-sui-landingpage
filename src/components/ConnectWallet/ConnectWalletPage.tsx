"use client";
import React, { useEffect, useState } from "react";
import { formatHexString } from "@/lib/constant";
import Image from "next/image";
import Link from "next/link";
import solana from "@assets/Background.png";
import X from "@assets/X.png";
import Telegram from "@assets/Telegram.png";
import Cap from "@assets/Capa_1.png";
import { useRouter } from "next/navigation";
import { walletService } from "@/store/service/wallet.service";
import { walletFormatAddress } from "@/lib/format";

type Props = {};
export default function ConnectWalletPage({}: Props) {
  const [phantomAddress, setPhantomAddress] = useState<string>("");

  const getProvider = () => {
    if ("phantom" in window) {
      const provider = window.phantom?.solana;

      if (provider?.isPhantom) {
        return provider;
      }
    }

    window.open("https://phantom.app/", "_blank");
  };

  const provider = getProvider(); // see "Detecting the Provider"

  const handleConnectPhantom = async () => {
    try {
      const resp = await provider.connect();
      //   console.log(resp.publicKey.toString());
      setPhantomAddress(
        walletFormatAddress({
          address: resp.publicKey.toString(),
          maxLength: 12,
        })
      );
      // 26qv4GCcx98RihuK3c4T6ozB3J7L6VwCuFVc7Ta2A3Uo

      sessionStorage.setItem("connectStatus", "true");
    } catch (err) {
      // { code: 4001, message: 'User rejected the request.' }
    }
  };

  useEffect(() => {
    if (sessionStorage.getItem("connectStatus") === "true")
      handleConnectPhantom();
  }, []);

  const handleClickWalletButton = () => {
    console.log("address: ", phantomAddress);
    if (phantomAddress !== "") {
      provider.disconnect();
      setPhantomAddress("");
      sessionStorage.setItem("connectStatus", "false");
    } else SignMsg();
  };

  const SignMsg = async () => {
    await handleConnectPhantom();
    const provider = getProvider(); // see "Detecting the Provider"
    const result = walletService.postAuthSign();

    result
      .then(async (res: any) => {
        const encodedMessage = new TextEncoder().encode(res.message);
        try {
          const signedMessage = await provider.signMessage(
            encodedMessage,
            "utf8"
          );
          console.log(signedMessage.signature);
          let authResult: any;

          if (signedMessage.signature) {
            let hex = Buffer.from(signedMessage.signature).toString("hex");
            console.log(hex);
            try {
              authResult = await walletService.postAuthLogin({
                signature: hex,
                public_address: provider.publicKey.toString(),
                nonce: res.nonce,
              });
            } catch (error) {}
          }

          console.log("auth res is: ", authResult);
          // send login info to extension
          chrome.runtime.sendMessage("kmhbimoakkffoommkmkjbclfgdpcphda", {
            action: "login",
            address: provider.publicKey.toString(),
            token: authResult?.access_token,
          });
        } catch (error) {
          console.log(error);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Image src={solana} fill sizes="100vw" alt="background" />
      <button
        onClick={handleClickWalletButton}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white hover:text-black w-max text-[20px] md:text-[32px] font-medium  rounded-full purple px-[36px] py-[20px] z-[10]"
      >
        {phantomAddress === "" ? "Connect Wallet" : phantomAddress}
      </button>
      <div className="absolute top-1/2 transform -translate-y-1/2 md:left-1/2 md:-translate-x-1/2 mix-blend-lighten z-[9]">
        <video autoPlay loop muted className="w-[676px] h-[380px]">
          <source src="/assets/gif.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="flex flex-col gap-4 md:gap-0 md:flex-row justify-between absolute left-[40px] right-[40px] bottom-[24px]">
        <div className="flex flex-row gap-2 items-center">
          <div className="solana py-[6px] px-2 rounded-[99px]">
            <h3 className="text-[12px] text-[#140E24] leading-[12px]">TECH</h3>
          </div>
          <h3 className="text-[#F4F4F4] text-[16px] font-medium leading-[16px] max-w-[426px]">
            Paylana - an innovative open-source browser extension developed by{" "}
            <span className="text-[16px] font-medium leading-[16px] text-[#9D3BFF]">
              Esol Labs
            </span>{" "}
            powered by{" "}
            <span className="text-[#36F181] text-[16px] font-medium leading-[16px]">
              Solana
            </span>{" "}
            pay.
          </h3>
          <div className="text-[#F4F4F4] mx-[24px] text-[#5A5659]">|</div>
          <div className="text-[#36F181] text-[16px] font-medium leading-[16px]]">
            Guideline
          </div>
        </div>
        <div className="flex flex-row gap-4 md:gap-8 items-center">
          <div className="flex flex-row gap-3 relative">
            <button>
              <Image src={X} width={16} height={16} objectFit="cover" alt="X" />
            </button>
            <button>
              <Image
                src={Telegram}
                width={16}
                height={16}
                objectFit="cover"
                alt="Telegram"
              />
            </button>
            <button>
              <Image
                src={Cap}
                width={16}
                height={16}
                objectFit="cover"
                alt="Cap"
              />
            </button>
          </div>
          <Link
            href=""
            className="text-[#36F181] font-medium leading-[16px] text-[16px]"
          >
            Term
          </Link>
          <Link
            href=""
            className="text-[#36F181] font-medium leading-[16px] text-[16px]"
          >
            Privacy
          </Link>
        </div>
      </div>
    </div>
  );
}
