"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";

const HomePage = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      text: "Go to takeout.google.com",
      image: "/images/step1.png",
      link: "https://takeout.google.com",
    },
    {
      text: "Deselect all and select only Google Pay, then click Next",
      image: "/images/step2.png",
    },
    { text: "Click Create Export", image: "/images/step3.png" },
    {
      text: "The export will be sent to you via email",
      image: "/images/step4.png",
    },
    { text: "Download the zip file", image: "/images/step5.png" },
    {
      text: "Go to Takeout/Google Pay/My Activity to find My Activity.html and upload it in the next page",
      image: "/images/step6.png",
    },
  ];

  const handleNextClick = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      router.push("/transactions");
    }
  };

  const handleBackClick = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-br from-green-200 via-blue-100 to-blue-300 text-gray-800">
      {/* <h1 className="text-4xl font-extrabold mb-6 text-center text-blue-800 drop-shadow-md transition duration-500 animate-pulse">
        PayTrace
      </h1> */}

      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-lg transform">
        <h2 className="text-3xl font-semibold mb-6 text-center text-blue-700">
          Before we start, export your GPay data
        </h2>

        {/* Step Tracker */}
        <div className="flex items-center mb-8 w-full">
          {steps.map((_, index) => (
            <div key={index} className="flex items-center w-full">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${
                  index <= currentStep ? "bg-blue-500" : "bg-gray-300"
                }`}
              >
                <span className="text-sm text-white font-bold">
                  {index + 1}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`flex-1 h-1 transition-colors duration-300 ${
                    index < currentStep ? "bg-blue-500" : "bg-gray-300"
                  }`}
                ></div>
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="space-y-4 text-center transition-opacity duration-500 ease-in-out">
          <p className="text-lg mb-6 text-gray-700">
            {steps[currentStep].link ? (
              <span>
                {steps[currentStep].text}{" "}
                <a
                  href={steps[currentStep].link}
                  className="text-blue-600 underline transition-all duration-200 hover:text-blue-800"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  here
                </a>
              </span>
            ) : (
              steps[currentStep].text
            )}
          </p>
          <Image
            src={steps[currentStep].image}
            alt={`Step ${currentStep + 1}`}
            width={300}
            height={200}
            className="rounded-lg shadow-md transform transition-opacity duration-500 ease-in-out opacity-0 w-full justify-center"
            onLoadingComplete={(img) => (img.style.opacity = "1")}
          />
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <button
            onClick={handleBackClick}
            disabled={currentStep === 0}
            className={`px-5 py-2 rounded-lg font-semibold transition-colors duration-300 ${
              currentStep === 0
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            Back
          </button>
          <button
            onClick={handleNextClick}
            className="px-5 py-2 rounded-lg font-semibold bg-blue-500 text-white transition-transform duration-300 hover:bg-blue-600 transform hover:scale-105"
          >
            {currentStep < steps.length - 1
              ? "Next"
              : "Finish"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
