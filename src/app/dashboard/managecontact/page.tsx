"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";
import { Download, FileText, Calendar, Filter } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// Force dynamic rendering
export const dynamic = "force-dynamic";

interface Lead {
  id: string;
  name: string;
  phone: string;
  address: string; // ADDED: Fix for missing address
  country: string;
  interestedProgram: string;
  status: string;
  createdAt: string;
}

const ManageContact = () => {
  noStore();
  const { user, loading: authLoading, isAdmin } = useAuth();
  const router = useRouter();

  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all"); // 'all', 'today', 'week', 'month', 'year'
 
  console.log(leads)

  // Fetch Data
  useEffect(() => {
    if (user && isAdmin) {
      fetchLeads();
    }
  }, [user, isAdmin]);

  const fetchLeads = async () => {
    try {
      const res = await axios.get("/api/leads");
      console.log("Leads data:", res.data); // Debug to verify structure
      setLeads(res.data);
    } catch (error) {
      console.error("Error fetching leads:", error);
    } finally {
      setLoading(false);
    }
  };

  // Filter Logic
  const getFilteredLeads = () => {
    if (filter === "all") return leads;

    const now = new Date();
    const todayStart = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
    );
    const weekStart = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() - now.getDay(),
    );
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const yearStart = new Date(now.getFullYear(), 0, 1);

    return leads.filter((lead) => {
      const leadDate = new Date(lead.createdAt);
      if (filter === "today") return leadDate >= todayStart;
      if (filter === "week") return leadDate >= weekStart;
      if (filter === "month") return leadDate >= monthStart;
      if (filter === "year") return leadDate >= yearStart;
      return true;
    });
  };

  const filteredLeads = getFilteredLeads();

  // PDF Download Logic
  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    // Define PDF Table Columns - ADDED "Address"
    const tableColumn = [
      "Name",
      "Phone",
      "Address",
      "Program",
      "Status",
      "Date",
    ];
    const tableRows: any[] = [];

    // Format data for PDF - ADDED "Address"
    filteredLeads.forEach((lead) => {
      const leadData = [
        lead.name,
        lead.phone,
        lead.address, // ADDED ADDRESS
        lead.interestedProgram,
        lead.status,
        new Date(lead.createdAt).toLocaleDateString(),
      ];
      tableRows.push(leadData);
    });

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
      theme: "grid",
      headStyles: { fillColor: [212, 175, 55] },
      styles: { fontSize: 10 },
    });

    doc.save(`contact_leads_${filter}.pdf`);
  };

  // Redirect if not admin
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-2 border-blue-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-serif font-bold text-gray-900">
              Manage Contacts
            </h1>
            <p className="text-gray-500 mt-1">
              View and manage student inquiries.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Download Button */}
            <button
              onClick={handleDownloadPDF}
              className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg shadow transition-all"
            >
              <Download className="w-4 h-4" />
              Download PDF
            </button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="bg-white p-2 rounded-xl shadow-sm border border-gray-200 mb-6 flex flex-wrap gap-2">
          <FilterButton
            label="All"
            active={filter === "all"}
            onClick={() => setFilter("all")}
          />
          <FilterButton
            label="Today"
            active={filter === "today"}
            onClick={() => setFilter("today")}
          />
          <FilterButton
            label="This Week"
            active={filter === "week"}
            onClick={() => setFilter("week")}
          />
          <FilterButton
            label="This Month"
            active={filter === "month"}
            onClick={() => setFilter("month")}
          />
          <FilterButton
            label="This Year"
            active={filter === "year"}
            onClick={() => setFilter("year")}
          />
        </div>

        {/* Table Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {loading ? (
            <div className="py-12 flex justify-center">
              <div className="animate-spin h-8 w-8 border-2 border-gray-900 border-t-transparent rounded-full" />
            </div>
          ) : filteredLeads.length === 0 ? (
            <div className="py-16 text-center text-gray-500">
              <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>No inquiries found for selected period.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200 text-xs font-semibold uppercase tracking-wider text-gray-500">
                    <th className="px-6 py-4">Name</th>
                    <th className="px-6 py-4">Phone</th>
                    <th className="px-6 py-4">Address</th> {/* ADDED HEADER */}
                    <th className="px-6 py-4">Program</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredLeads.map((lead) => (
                    <tr
                      key={lead.id}
                      className="hover:bg-gray-50/50 transition-colors"
                    >
                      <td className="px-6 py-4 font-medium text-gray-900">
                        {lead.name}
                      </td>
                      <td className="px-6 py-4 text-gray-600">{lead.phone}</td>
                      <td className="px-6 py-4 text-gray-600">
                        {lead.address}
                      </td>{" "}
                      {/* ADDED CELL */}
                      {/* <td className="px-6 py-4 text-gray-600">
                        {lead.country}
                      </td> */}
                      <td className="px-6 py-4 text-gray-600">
                        {lead.interestedProgram}
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                          {lead.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-500 text-sm">
                        {new Date(lead.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Simple Filter Button Sub-Component
const FilterButton = ({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
      active
        ? "bg-blue-600 text-white shadow-md"
        : "bg-transparent text-gray-600 hover:bg-gray-100"
    }`}
  >
    {label}
  </button>
);

export default ManageContact;
