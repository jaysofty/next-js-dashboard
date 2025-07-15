// app/customers/page.tsx (Server Component – NO "use client")

import { Suspense } from "react";
import Pagination from "@/app/ui/invoices/pagination";
import { InvoicesTableSkeleton } from "@/app/ui/skeletons";
import Table from "@/app/ui/customers/table";

import { fetchFilteredCustomers, fetchInvoicesPages } from "@/app/lib/data";
import Notification from "./notification";

export default async function Customers(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const customers = await fetchFilteredCustomers(query);
  const totalPages = await fetchInvoicesPages(query);

  return (
    <div className="w-full">
      {/* <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Customers</h1>
      </div> */}

      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <div className=" bg-gray">
          <header className="bg-white flex justify-end items-center">
            <Notification />
          </header>
        </div>

        <Table customers={customers} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
