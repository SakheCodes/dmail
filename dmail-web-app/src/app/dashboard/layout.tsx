import { api } from "@/lib/api";
import NavButtonGroup from "../components/NavButtonGroup";
import NewEmailWrapper from "../components/NewEmail/NewEmailWrapper";
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-full w-full flex">
      <div className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">dMail</h1>
          <nav>
            <NavButtonGroup />
          </nav>
        </div>
      </div>
      {children}
      <NewEmailWrapper className="absolute bg-blue-600 right-4 bottom-4" />
    </div>
  );
}
