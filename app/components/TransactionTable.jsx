"use client";
import { useState, useEffect } from "react";
import { parse } from "date-fns";

const TransactionTable = () => {
  const [monthlyData, setMonthlyData] = useState({});
  const [totalSummary, setTotalSummary] = useState({ Paid: 0, Received: 0 });
  const [threshold, setThreshold] = useState(499);
  const [error, setError] = useState(null);
  const [fileContent, setFileContent] = useState(null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file && file.type === "text/html") {
      const content = await file.text();
      setFileContent(content);
    } else {
      setError("Please upload a valid .html file.");
    }
  };

  const processFileContent = (content) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, "text/html");

    const newMonthlyData = {};
    let newTotalSummary = { Paid: 0, Received: 0 };

    const extractAmountAndDate = (text) => {
      const amountMatch = text.match(/₹?([\d,]+\.\d{2})/);
      const dateMatch = text.match(/([A-Za-z]{3}) \d{1,2}, (\d{4})/);
      const amount = amountMatch
        ? parseFloat(amountMatch[1].replace(/,/g, ""))
        : 0;
      const monthYear = dateMatch ? `${dateMatch[1]} ${dateMatch[2]}` : null;
      return { amount, monthYear };
    };

    const entries = Array.from(doc.body.querySelectorAll("*"))
      .filter(
        (el) =>
          /(Sent|Paid|Received)/.test(el.textContent) &&
          !el.textContent.startsWith("Google")
      )
      .map((el) => el.textContent);

    entries.forEach((entry) => {
      const { amount, monthYear } = extractAmountAndDate(entry);
      if (!monthYear) return;

      const isPaid = /Sent|Paid/.test(entry);
      const type = isPaid ? "Paid" : "Received";
      const range = amount > threshold ? ">threshold" : "<=threshold";

      if (!newMonthlyData[monthYear]) {
        newMonthlyData[monthYear] = {
          Paid: { ">threshold": 0, "<=threshold": 0 },
          Received: { ">threshold": 0, "<=threshold": 0 },
        };
      }

      newMonthlyData[monthYear][type][range] += amount;
      newTotalSummary[type] += amount;
    });

    setMonthlyData(newMonthlyData);
    setTotalSummary(newTotalSummary);
    setError(null);
  };

  useEffect(() => {
    if (fileContent) {
      processFileContent(fileContent);
    }
  }, [fileContent, threshold]);

  return (
    <div className="p-4 sm:p-6 max-w-full md:max-w-4xl mx-auto my-5 rounded-xl shadow-md transition-all duration-500 hover:shadow-lg">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-blue-700 text-center bg-clip-text bg-gradient-to-r from-blue-500 to-green-500">
        Transaction Summary
      </h1>

      <input
        type="file"
        accept=".html"
        onChange={handleFileChange}
        className="block w-full text-xs md:text-sm text-gray-700 border border-gray-300 rounded-lg cursor-pointer mb-3 p-2 md:p-3 file:cursor-pointer file:mr-2 md:file:mr-4 file:py-1 md:file:py-2 file:px-2 md:file:px-4 file:rounded-full file:border-0 file:text-xs md:file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-all"
      />

      <div className="flex items-center mb-4 md:mb-6 space-x-2 md:space-x-4">
        <label className="text-xs md:text-sm font-medium text-blue-700">
          Set Threshold:
        </label>
        <input
          type="range"
          value={threshold}
          min="0"
          max="10000"
          step="100"
          onChange={(e) => setThreshold(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          style={{
            background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${
              (threshold / 10000) * 100
            }%, #e5e7eb ${(threshold / 10000) * 100}%, #e5e7eb 100%)`,
          }}
        />
        <span className="text-xs md:text-sm font-semibold text-blue-700">
          ₹{threshold}
        </span>
      </div>

      {error && (
        <p className="text-xs md:text-sm text-red-600 font-semibold">{error}</p>
      )}

      <div className="overflow-x-auto rounded-md">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg transition-all duration-500 transform hover:shadow-xl text-xs sm:text-sm md:text-base">
          <thead className="bg-gradient-to-r from-blue-500 to-green-500 text-white block">
            <tr className="flex">
              <th className="px-2 sm:px-4 py-2 font-semibold w-1/5">Month</th>
              <th className="px-2 sm:px-4 py-2 font-semibold w-1/5">
                Paid (&gt;₹{threshold})
              </th>
              <th className="px-2 sm:px-4 py-2 font-semibold w-1/5">
                Paid (&lt;=₹{threshold})
              </th>
              <th className="px-2 sm:px-4 py-2 font-semibold w-1/5">
                Received (&gt;₹{threshold})
              </th>
              <th className="px-2 sm:px-4 py-2 font-semibold w-1/5">
                Received (&lt;=₹{threshold})
              </th>
            </tr>
          </thead>

          <tbody className="overflow-y-auto max-h-[45vh] block">
            {Object.entries(monthlyData).map(([monthYear, totals], index) => (
              <tr
                key={monthYear}
                className={`flex text-center text-gray-700 hover:bg-gray-100 transition duration-300 ${
                  index % 2 === 0 ? "odd:bg-gray-100" : "even:bg-white"
                }`}
              >
                <td className="px-2 sm:px-4 py-2 w-1/5">{monthYear}</td>
                <td className="px-2 sm:px-4 py-2 w-1/5">
                  ₹{totals.Paid[">threshold"].toFixed(2)}
                </td>
                <td className="px-2 sm:px-4 py-2 w-1/5">
                  ₹{totals.Paid["<=threshold"].toFixed(2)}
                </td>
                <td className="px-2 sm:px-4 py-2 w-1/5">
                  ₹{totals.Received[">threshold"].toFixed(2)}
                </td>
                <td className="px-2 sm:px-4 py-2 w-1/5">
                  ₹{totals.Received["<=threshold"].toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>

          <tfoot className="bg-gray-200 block">
            <tr className="flex font-semibold text-center text-gray-700">
              <td className="px-2 sm:px-4 py-2 w-1/5">Overall Totals</td>
              <td className="px-2 sm:px-4 py-2 w-1/5">
                ₹{totalSummary.Paid.toFixed(2)}
              </td>
              <td className="px-2 sm:px-4 py-2 w-1/5"></td>
              <td className="px-2 sm:px-4 py-2 w-1/5">
                ₹{totalSummary.Received.toFixed(2)}
              </td>
              <td className="px-2 sm:px-4 py-2 w-1/5"></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default TransactionTable;
