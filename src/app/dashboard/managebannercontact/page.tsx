"use client"
import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface Lead {
  id: string;
  name: string;
  phone: string;
  status: string;
  createdAt: string;
}

const ManageBannerContact = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);

  // Fetch data from API
  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const res = await fetch("/api/bannerlead");
        const data = await res.json();
        setLeads(data);
      } catch (error) {
        console.error("Failed to fetch leads", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeads();
  }, []);

  // --- Filtering Logic ---

  const filterLeads = (period: string): Lead[] => {
    const now = new Date();
    const todayStart = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
    );

    return leads.filter((lead) => {
      const leadDate = new Date(lead.createdAt);

      switch (period) {
        case "today":
          return leadDate >= todayStart;

        case "week":
          // Start of week (Sunday)
          const day = now.getDay();
          const diff = now.getDate() - day; // adjust when day is sunday
          const weekStart = new Date(now.setDate(diff));
          weekStart.setHours(0, 0, 0, 0);
          return leadDate >= weekStart;

        case "month":
          const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
          return leadDate >= monthStart;

        case "year":
          const yearStart = new Date(now.getFullYear(), 0, 1);
          return leadDate >= yearStart;

        case "all":
        default:
          return true;
      }
    });
  };

  // --- PDF Generation Logic ---

  const handleDownloadPDF = async (period: string) => {
    setDownloading(true);

    try {
      const filteredData = filterLeads(period);

      if (filteredData.length === 0) {
        alert(`No leads found for this period: ${period}`);
        setDownloading(false);
        return;
      }

      const doc = new jsPDF();

      // Title
      doc.setFontSize(18);
      doc.text(`Banner Leads Report - ${period.toUpperCase()}`, 14, 20);

      // Date generated
      doc.setFontSize(10);
      doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 28);

      // Prepare Table Data
      const tableColumn = ["Name", "Phone", "Status", "Date"];
      const tableRows: any[][] = [];

      filteredData.forEach((lead) => {
        const leadData = [
          lead.name,
          lead.phone,
          lead.status,
          new Date(lead.createdAt).toLocaleDateString(),
        ];
        tableRows.push(leadData);
      });

      // Generate Table
      autoTable(doc, {
        head: [tableColumn],
        body: tableRows,
        startY: 35,
        theme: "grid",
        headStyles: { fillColor: [66, 66, 66] }, // Dark gray header
      });

      doc.save(`banner-leads-${period}.pdf`);
    } catch (error) {
      console.error("PDF Generation Error:", error);
      alert("Failed to generate PDF");
    } finally {
      setDownloading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        Loading...
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gray-900 text-white p-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <h1 className="text-2xl font-bold tracking-wide">
            Manage Banner Contacts
          </h1>
          <span className="text-sm text-gray-300 bg-gray-800 px-3 py-1 rounded-full">
            Total Leads: {leads.length}
          </span>
        </div>

        {/* Toolbar for PDF Downloads */}
        <div className="p-6 border-b border-gray-200 bg-gray-50 flex flex-wrap gap-3">
          <p className="w-full text-sm text-gray-500 font-semibold mb-1 uppercase">
            Download Report:
          </p>
          {["all", "today", "week", "month", "year"].map((period) => (
            <button
              key={period}
              onClick={() => handleDownloadPDF(period)}
              disabled={downloading}
              className="px-4 py-2 bg-white border border-gray-300 text-sm font-medium text-gray-700 rounded hover:bg-gray-100 hover:text-blue-600 transition-colors disabled:opacity-50 shadow-sm"
            >
              {downloading ? "..." : `Download ${period}`}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-600 text-sm uppercase tracking-wider">
                <th className="p-4 border-b font-semibold">Date</th>
                <th className="p-4 border-b font-semibold">Name</th>
                <th className="p-4 border-b font-semibold">Phone</th>
                <th className="p-4 border-b font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm divide-y divide-gray-100">
              {leads.length > 0 ? (
                leads.map((lead) => (
                  <tr
                    key={lead.id}
                    className="hover:bg-blue-50/50 transition-colors"
                  >
                    <td className="p-4">
                      {new Date(lead.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-4 font-medium text-gray-900">
                      {lead.name}
                    </td>
                    <td className="p-4 font-mono text-blue-600">
                      {lead.phone}
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-bold ${
                          lead.status === "New"
                            ? "bg-green-100 text-green-700"
                            : lead.status === "Contacted"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-purple-100 text-purple-700"
                        }`}
                      >
                        {lead.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-gray-500">
                    No leads found yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageBannerContact;
