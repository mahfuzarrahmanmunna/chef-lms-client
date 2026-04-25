"use client";

import React, { useState, useEffect } from "react";
import { Download, Filter, FileText } from "lucide-react";

// 1. Import PDF Libraries correctly
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"; // <--- FIXED: Import as named import

// Types for data
interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  selections: string;
  status: string;
  date: string;
}

const ManageQuiz = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<string>("all"); // all, today, week, month, year

  // Fetch Data when filter changes
  useEffect(() => {
    fetchLeads();
  }, [filter]);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/quiz-leads?filter=${filter}`);
      const data = await res.json();
      setLeads(data);
    } catch (error) {
      console.error("Failed to fetch leads", error);
    } finally {
      setLoading(false);
    }
  };

  // Download PDF Function
  const downloadPDF = () => {
    if (leads.length === 0) return alert("No data to download");

    const doc = new jsPDF();

    // 1. Add Title
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text(`Quiz Leads Report`, 14, 22);

    // 2. Add Subtitle (Filter info)
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100); // Grey color
    const dateStr = new Date().toLocaleDateString();
    doc.text(`Generated: ${dateStr} | Filter: ${filter.toUpperCase()}`, 14, 30);

    // 3. Define Table Columns
    const tableColumn = ["Name", "Email", "Phone", "Selections", "Date"];

    // 4. Map Data for Rows
    const tableRows: any[] = [];

    leads.forEach((lead) => {
      const leadData = [
        lead.name,
        lead.email,
        lead.phone,
        lead.selections,
        lead.date,
      ];
      tableRows.push(leadData);
    });

    // 5. Generate Table (FIXED USAGE)
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 35,
      theme: "grid",
      styles: { fontSize: 9, cellPadding: 3 },
      headStyles: { fillColor: [234, 57, 58] }, // Red header (#EA393A)
      alternateRowStyles: { fillColor: [245, 245, 245] },
    });

    // 6. Save PDF
    doc.save(`quiz-leads-${filter}-${Date.now()}.pdf`);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans p-6">
      <div className="container mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold  mb-2">
              Manage Quiz Leads
            </h1>
            <p className="text-gray-500">View and export student inquiries.</p>
          </div>

          {/* Filter Controls */}
          <div className="flex flex-wrap items-center gap-4 bg-white p-2 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center gap-2 px-3">
              <Filter className="w-4 h-4 text-gray-400" />
              <span className="text-sm font-semibold text-gray-600">
                Filter:
              </span>
            </div>

            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded focus:ring-red-500 focus:border-red-500 block p-2"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="year">This Year</option>
            </select>

            <button
              onClick={downloadPDF}
              disabled={loading || leads.length === 0}
              className="flex items-center gap-2 bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded-md text-sm font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FileText className="w-4 h-4" />
              Download PDF
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <p className="text-gray-500 text-xs font-bold uppercase mb-1">
              Total Results
            </p>
            <p className="text-2xl font-bold text-gray-900">{leads.length}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <p className="text-gray-500 text-xs font-bold uppercase mb-1">
              Filter Active
            </p>
            <p className="text-2xl font-bold text-gray-900 capitalize">
              {filter}
            </p>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100 border-b border-gray-200 text-xs uppercase tracking-wider text-gray-600">
                  <th className="p-4 font-semibold">Name</th>
                  <th className="p-4 font-semibold">Email</th>
                  <th className="p-4 font-semibold">Phone</th>
                  <th className="p-4 font-semibold w-1/4">Selections</th>
                  <th className="p-4 font-semibold">Date</th>
                  <th className="p-4 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-gray-500">
                      Loading data...
                    </td>
                  </tr>
                ) : leads.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-gray-500">
                      No leads found for selected filter.
                    </td>
                  </tr>
                ) : (
                  leads.map((lead) => (
                    <tr
                      key={lead.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xs font-bold">
                            {lead.name.charAt(0)}
                          </div>
                          <span className="font-medium text-gray-900">
                            {lead.name}
                          </span>
                        </div>
                      </td>
                      <td className="p-4 text-sm text-gray-600">
                        {lead.email}
                      </td>
                      <td className="p-4 text-sm text-gray-600 font-mono">
                        {lead.phone}
                      </td>
                      <td
                        className="p-4 text-xs text-gray-500 truncate max-w-xs"
                        title={lead.selections}
                      >
                        {lead.selections}
                      </td>
                      <td className="p-4 text-sm text-gray-500">{lead.date}</td>
                      <td className="p-4 text-right">
                        <button className="text-red-700 hover:text-red-900 text-sm font-semibold">
                          View
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageQuiz;
