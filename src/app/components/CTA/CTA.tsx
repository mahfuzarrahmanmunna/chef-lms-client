"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Phone,
  MapPin,
  User,
  ArrowRight,
  CheckCircle,
  Globe,
  ChevronDown,
  X,
} from "lucide-react";

/* --- Types --- */
interface Country {
  name: string;
  flag: string; // emoji or svg url depending on API version, usually emoji in name.common or flags.png
  code: string; // e.g. "+880"
  cca2: string; // e.g. "BD"
}

/* --- Sub-Component: Custom Country Selector --- */
const CountrySelector: React.FC<{
  selected: Country;
  onSelect: (country: Country) => void;
  countries: Country[];
}> = ({ selected, onSelect, countries }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Filter countries based on search
  const filteredCountries = countries.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.code.includes(search),
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={dropdownRef}
      className="relative w-full md:w-1/3 z-20 text-black"
    >
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full h-full flex items-center justify-between px-4 bg-gray-50 border border-gray-200 hover:border-black transition-colors rounded-l-md "
      >
        <div className="flex items-center gap-2">
          <span className="text-xl leading-none">{selected.flag}</span>
          <span className="text-sm font-bold text-gray-900 ">
            {selected.code}
          </span>
        </div>
        <ChevronDown
          className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-200 shadow-xl rounded-md overflow-hidden max-h-60 flex flex-col">
          {/* Search Input inside Dropdown */}
          <div className="p-2 border-b border-gray-100 bg-gray-50 sticky top-0">
            <div className="relative">
              <Globe className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search country..."
                className="w-full pl-9 pr-8 py-2 text-sm border border-gray-200 rounded focus:outline-none focus:border-red-700 "
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onClick={(e) => e.stopPropagation()}
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-2 top-2.5 text-gray-400 hover:text-black"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* List */}
          <div className="overflow-y-auto flex-1">
            {filteredCountries.length > 0 ? (
              filteredCountries.map((country) => (
                <div
                  key={country.cca2}
                  onClick={() => {
                    onSelect(country);
                    setIsOpen(false);
                    setSearch("");
                  }}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-red-50 cursor-pointer transition-colors border-b border-gray-50 last:border-0"
                >
                  <span className="text-lg">{country.flag}</span>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-gray-900 ">
                      {country.name}
                    </span>
                    <span className="text-xs text-gray-500">
                      {country.code}
                    </span>
                  </div>
                  {selected.cca2 === country.cca2 && (
                    <CheckCircle className="w-4 h-4 text-red-700 ml-auto" />
                  )}
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-sm text-gray-500">
                No countries found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

/* --- Main Component --- */
export default function ContactCTA() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState<Country>({
    name: "Bangladesh",
    flag: "🇧🇩",
    code: "+880",
    cca2: "BD",
  });

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "", // Just the number part
    program: "",
  });

  // 1. Fetch Countries & Set Default to Bangladesh
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await fetch(
          "https://restcountries.com/v3.1/all?fields=name,flags,idd,cca2",
        );
        const data = await res.json();

        // Normalize data: Map complex API objects to our simple interface
        const normalized: Country[] = data
          .map((c: any) => {
            // Handle phone code (e.g., { root: '+8', suffixes: ['80'] } -> +880)
            let code = "";
            if (c.idd && c.idd.root && c.idd.suffixes) {
              code = c.idd.root + c.idd.suffixes[0];
            } else if (c.idd && c.idd.root) {
              code = c.idd.root;
            }

            return {
              name: c.name.common,
              flag: c.flag, // The API often provides an emoji property in v3.1, otherwise use flags.png
              code: code,
              cca2: c.cca2,
            };
          })
          .filter((c: Country) => c.code !== ""); // Filter out countries without codes

        setCountries(normalized);

        // Auto-select Bangladesh
        const bd = normalized.find((c: Country) => c.cca2 === "BD");
        if (bd) setSelectedCountry(bd);
      } catch (error) {
        console.error("Failed to fetch countries", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prepare the payload exactly as the API expects
    const payload = {
      name: formData.name,
      address: formData.address,
      phone: formData.phone, // The number typed in input
      selectedCountry: selectedCountry, // The object { name, code, flag }
      program: formData.program,
    };

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const data = await res.json();
        alert("Success! We will contact you shortly.");
        // Reset form logic here...
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  return (
    <>
      {/* Global Styles for Fonts (Same as previous component) */}
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Manrope:wght@300;400;500;600&display=swap");
        . {
          font-family: "Playfair Display", serif;
        }
        . {
          font-family: "Manrope", sans-serif;
        }

        .angel-shape {
          clip-path: polygon(
            0 0,
            100% 0,
            100% calc(100% - 20px),
            calc(100% - 20px) 100%,
            0 100%
          );
        }
      `}</style>

      <section id="ctaCard" className="pb-24  overflow-hidden">
        <div className="container mx-auto px-6 sm:px-10 lg:px-16 xl:px-24">
          <div className="bg-white rounded-sm shadow-lg border border-gray-100 overflow-hidden">
            <div className="flex flex-col lg:flex-row">
              {/* --- LEFT SIDE: Design Info --- */}
              <div className="lg:w-2/5 bg-[#1a1a1a] text-white p-10 lg:p-14 relative flex flex-col justify-center">
                {/* Decorative element */}
                <div className="absolute top-0 right-0 p-6 opacity-10">
                  <MapPin className="w-32 h-32 text-white" />
                </div>

                <span className="text-[#ea393a] font-bold tracking-[0.3em] text-xs uppercase mb-4">
                  Get In Touch
                </span>
                <h2 className="text-4xl lg:text-5xl  font-bold mb-6 leading-tight">
                  Start Your Culinary Journey Today
                </h2>
                <p className="text-gray-400 font-light leading-relaxed mb-8">
                  Ready to master the art of cooking? Fill out the form, and our
                  admission team will contact you to discuss the best program
                  for your goals.
                </p>

                <div className="space-y-6 border-t border-gray-800 pt-8 mt-auto">
                  <div className="flex items-start gap-4">
                    <div className="bg-gray-800 p-3 rounded-full text-[#ea393a]">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-1">
                        Call Us
                      </p>
                      <p className="text-lg ">+880 1886-880993</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-gray-800 p-3 rounded-full text-[#ea393a]">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-1">
                        Visit Us
                      </p>
                      <p className="text-gray-300 leading-snug">
                        Badda Link Road , Dhaka 1212
                        <br />
                        Bangladesh
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* --- RIGHT SIDE: The Form --- */}
              <div className="lg:w-3/5 p-10 lg:p-14">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
                      Full Name
                    </label>
                    <div className="relative group">
                      <User className="absolute left-4 top-3.5 w-5 h-5 text-gray-400 group-focus-within:text-red-700 transition-colors" />
                      <input
                        type="text"
                        required
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:border-black focus:bg-white transition-all  text-gray-900"
                        placeholder="e.g. Rahim Ahmed"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  {/* Address */}
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
                      Present Address
                    </label>
                    <div className="relative group">
                      <MapPin className="absolute left-4 top-3.5 w-5 h-5 text-gray-400 group-focus-within:text-red-700 transition-colors" />
                      <input
                        type="text"
                        required
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:border-black focus:bg-white transition-all  text-gray-900"
                        placeholder="House, Road, Area..."
                        value={formData.address}
                        onChange={(e) =>
                          setFormData({ ...formData, address: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  {/* Contact Number (With Country Selector) */}
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
                      Contact Number
                    </label>
                    <div className="flex h-12 shadow-sm z-20">
                      {/* Country Selector Component */}
                      {loading ? (
                        <div className="w-1/3 bg-gray-100 animate-pulse rounded-l-md"></div>
                      ) : (
                        <CountrySelector
                          selected={selectedCountry}
                          onSelect={setSelectedCountry}
                          countries={countries}
                        />
                      )}

                      {/* Phone Input */}
                      <input
                        type="tel"
                        required
                        className="flex-1 px-4 py-2 bg-white border-y border-r border-gray-200 rounded-r-md focus:outline-none focus:border-black transition-all  text-gray-900"
                        placeholder="1XXXXXXXXXX"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  {/* Interested Programme */}
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
                      Interested Programme
                    </label>
                    <select
                      required
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:border-black focus:bg-white transition-all  text-gray-900 appearance-none cursor-pointer"
                      value={formData.program}
                      onChange={(e) =>
                        setFormData({ ...formData, program: e.target.value })
                      }
                    >
                      <option value="" disabled>
                        Select a course...
                      </option>
                      <option value="Professional Chef">
                        Professional Chef Course
                      </option>
                      <option value="Barista">Professional Barista</option>
                      <option value="Baking">Baking Mastery</option>
                      <option value="International Cuisine">
                        International Cuisine
                      </option>
                      <option value="Short Course">Basic Short Course</option>
                    </select>
                  </div>

                  {/* Submit Button (Angel Shape) */}
                  <button
                    type="submit"
                    className="w-full sm:w-auto mt-4 bg-black text-white px-10 py-4 font-bold uppercase tracking-widest text-xs hover:bg-[#EA393A] transition-colors duration-300 angel-shape flex items-center justify-center gap-3 group z-0"
                  >
                    <span>Submit Application</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
