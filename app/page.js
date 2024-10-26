"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

const HomePage = () => {
  const router = useRouter();

  const handleStartClick = () => {
    router.push("/instructions"); // Navigate to instructions page
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen p-4 bg-gradient-to-br from-gray-100 to-blue-50">
      {/* Right Section - Image */}
      <div className="hidden md:flex md:w-1/2 justify-center">
        <Image
          src="/payment.png"
          alt="Payment Illustration"
          width={500}
          height={500}
          className="rounded-xl shadow-lg"
          priority
        />
      </div>

      {/* Left Section */}
      <div className="flex flex-col items-center md:items-start text-center md:text-left md:w-1/2 p-6">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-500 mb-6 animate-pulse">
          Welcome to PayTrace
        </h1>
        <p className="text-lg text-gray-700 mb-8">
          Track you payments in just a few clicks
        </p>
        <button
          onClick={handleStartClick}
          className="px-6 py-3 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default HomePage;
