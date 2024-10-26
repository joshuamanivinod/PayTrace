import TransactionTable from "@/app/components/TransactionTable";

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-200 via-blue-100 to-blue-300 p-6">
      <div className="container mx-auto p-8 max-w-4xl bg-white rounded-xl shadow-2xl transition-all duration-500 hover:shadow-xl">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-green-500 animate-pulse text-center mb-8">
          PayTrace
        </h1>
        <TransactionTable />
      </div>
    </div>
  );
}
